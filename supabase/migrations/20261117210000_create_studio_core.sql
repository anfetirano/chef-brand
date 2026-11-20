create type public.studio_role as enum ('admin', 'member');
create type public.studio_meeting_status as enum ('scheduled', 'open', 'closed', 'cancelled');

create table public.studio_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role public.studio_role not null default 'member',
  display_name text not null check (char_length(display_name) between 2 and 80),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.studio_meetings (
  id uuid primary key default gen_random_uuid(),
  room_id text not null unique check (room_id ~ '^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$'),
  name text not null check (char_length(name) between 2 and 120),
  status public.studio_meeting_status not null default 'scheduled',
  max_participants smallint not null default 2 check (max_participants = 2),
  created_by uuid not null references public.studio_profiles (user_id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.studio_invitations (
  id uuid primary key default gen_random_uuid(),
  meeting_id uuid not null references public.studio_meetings (id) on delete cascade,
  token_hash bytea not null unique check (octet_length(token_hash) = 32),
  expires_at timestamptz not null,
  revoked_at timestamptz,
  revoked_by uuid references public.studio_profiles (user_id),
  created_by uuid not null references public.studio_profiles (user_id),
  created_at timestamptz not null default now(),
  check (expires_at > created_at),
  check (revoked_at is null or revoked_at >= created_at)
);

create table public.studio_access_attempts (
  id bigint generated always as identity primary key,
  invitation_id uuid references public.studio_invitations (id) on delete set null,
  identity_hash bytea check (identity_hash is null or octet_length(identity_hash) = 32),
  was_allowed boolean not null,
  reason text not null check (char_length(reason) between 2 and 80),
  created_at timestamptz not null default now()
);

create index studio_meetings_created_by_idx on public.studio_meetings (created_by);
create index studio_invitations_meeting_idx on public.studio_invitations (meeting_id);
create index studio_invitations_active_idx
  on public.studio_invitations (meeting_id, expires_at)
  where revoked_at is null;
create index studio_access_attempts_created_at_idx
  on public.studio_access_attempts (created_at desc);

create or replace function public.set_studio_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger studio_profiles_set_updated_at
before update on public.studio_profiles
for each row execute function public.set_studio_updated_at();

create trigger studio_meetings_set_updated_at
before update on public.studio_meetings
for each row execute function public.set_studio_updated_at();

create or replace function public.is_studio_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.studio_profiles
    where user_id = (select auth.uid())
      and role = 'admin'
  );
$$;

revoke all on function public.set_studio_updated_at() from public, anon, authenticated;
revoke all on function public.is_studio_admin() from public, anon, authenticated;
grant execute on function public.is_studio_admin() to authenticated, service_role;

alter table public.studio_profiles enable row level security;
alter table public.studio_profiles force row level security;
alter table public.studio_meetings enable row level security;
alter table public.studio_meetings force row level security;
alter table public.studio_invitations enable row level security;
alter table public.studio_invitations force row level security;
alter table public.studio_access_attempts enable row level security;
alter table public.studio_access_attempts force row level security;

create policy "profiles_select_own_or_admin"
on public.studio_profiles
for select
to authenticated
using (user_id = (select auth.uid()) or public.is_studio_admin());

create policy "admins_manage_meetings"
on public.studio_meetings
for all
to authenticated
using (public.is_studio_admin())
with check (public.is_studio_admin() and created_by = (select auth.uid()));

create policy "admins_manage_invitations"
on public.studio_invitations
for all
to authenticated
using (public.is_studio_admin())
with check (public.is_studio_admin() and created_by = (select auth.uid()));

revoke all on public.studio_profiles from public, anon, authenticated;
revoke all on public.studio_meetings from public, anon, authenticated;
revoke all on public.studio_invitations from public, anon, authenticated;
revoke all on public.studio_access_attempts from public, anon, authenticated;
revoke all on sequence public.studio_access_attempts_id_seq from public, anon, authenticated;
revoke all on type public.studio_role from public, anon, authenticated;
revoke all on type public.studio_meeting_status from public, anon, authenticated;

grant usage on type public.studio_role, public.studio_meeting_status to authenticated, service_role;
grant select on public.studio_profiles to authenticated;
grant select, insert, update, delete on public.studio_meetings to authenticated;
grant select, insert, update, delete on public.studio_invitations to authenticated;
grant select, insert on public.studio_access_attempts to service_role;
grant usage, select on sequence public.studio_access_attempts_id_seq to service_role;

comment on column public.studio_invitations.token_hash is
  'SHA-256 hash of the random invitation token. Plaintext tokens are never stored.';
comment on table public.studio_access_attempts is
  'Server-only audit trail. The service role writes entries after rate-limit and invitation checks.';
