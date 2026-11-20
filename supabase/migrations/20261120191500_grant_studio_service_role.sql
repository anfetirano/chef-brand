grant select, insert, update, delete
  on public.studio_profiles, public.studio_meetings, public.studio_invitations
  to service_role;

revoke all on public.studio_access_attempts from service_role;
grant select, insert on public.studio_access_attempts to service_role;
