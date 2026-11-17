import { createHmac, randomUUID } from "node:crypto";

const [room, lifetimeInput = "60", baseUrl = "http://localhost:3000"] =
  process.argv.slice(2);
const lifetimeMinutes = Number(lifetimeInput);
const secret = process.env.STUDIO_INVITE_SECRET;
const roomPattern = /^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$/;

if (!room || !roomPattern.test(room)) {
  console.error("Usage: npm run studio:invite -- <room-name> [minutes] [base-url]");
  process.exit(1);
}

if (!secret || secret.length < 32) {
  console.error("STUDIO_INVITE_SECRET must contain at least 32 characters.");
  process.exit(1);
}

if (!Number.isFinite(lifetimeMinutes) || lifetimeMinutes < 1 || lifetimeMinutes > 1440) {
  console.error("Invitation lifetime must be between 1 and 1440 minutes.");
  process.exit(1);
}

const invitation = {
  room,
  expiresAt: Date.now() + lifetimeMinutes * 60_000,
  invitationId: randomUUID(),
};
const payload = Buffer.from(JSON.stringify(invitation)).toString("base64url");
const signature = createHmac("sha256", secret)
  .update(payload)
  .digest("base64url");
const invite = `${payload}.${signature}`;
const url = new URL(`/studio/room/${room}`, baseUrl);
url.searchParams.set("invite", invite);

console.log(url.toString());
