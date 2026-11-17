import "server-only";

import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

type StudioInvitation = {
  room: string;
  expiresAt: number;
  invitationId: string;
};

const ROOM_PATTERN = /^[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?$/;

function getInvitationSecret() {
  const secret = process.env.STUDIO_INVITE_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("STUDIO_INVITE_SECRET must contain at least 32 characters.");
  }

  return secret;
}

function sign(payload: string) {
  return createHmac("sha256", getInvitationSecret())
    .update(payload)
    .digest("base64url");
}

export function isValidStudioRoomName(room: string) {
  return ROOM_PATTERN.test(room);
}

export function createStudioInvitation(room: string, lifetimeMinutes = 60) {
  if (!isValidStudioRoomName(room)) {
    throw new Error("Room names must use lowercase letters, numbers, and hyphens.");
  }

  const invitation: StudioInvitation = {
    room,
    expiresAt: Date.now() + lifetimeMinutes * 60_000,
    invitationId: randomUUID(),
  };
  const payload = Buffer.from(JSON.stringify(invitation)).toString("base64url");

  return `${payload}.${sign(payload)}`;
}

export function verifyStudioInvitation(token: string, expectedRoom: string) {
  const [payload, receivedSignature, ...rest] = token.split(".");

  if (!payload || !receivedSignature || rest.length > 0) {
    return false;
  }

  const expectedSignature = sign(payload);
  const received = Buffer.from(receivedSignature);
  const expected = Buffer.from(expectedSignature);

  if (received.length !== expected.length || !timingSafeEqual(received, expected)) {
    return false;
  }

  try {
    const invitation = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as Partial<StudioInvitation>;

    return (
      invitation.room === expectedRoom &&
      typeof invitation.expiresAt === "number" &&
      invitation.expiresAt > Date.now() &&
      typeof invitation.invitationId === "string"
    );
  } catch {
    return false;
  }
}
