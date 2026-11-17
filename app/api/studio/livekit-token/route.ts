import { NextResponse, type NextRequest } from "next/server";
import { AccessToken, RoomServiceClient } from "livekit-server-sdk";
import {
  isValidStudioRoomName,
  verifyStudioInvitation,
} from "@/lib/studio/invitations";

export const runtime = "nodejs";

type TokenRequest = {
  room?: unknown;
  name?: unknown;
  invitation?: unknown;
};

function getLiveKitConfiguration() {
  const url = process.env.NEXT_PUBLIC_LIVEKIT_URL;
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;

  if (!url || !apiKey || !apiSecret) {
    throw new Error("LiveKit is not configured.");
  }

  return { url, apiKey, apiSecret };
}

function normalizeDisplayName(value: unknown) {
  if (typeof value !== "string") return null;
  const name = value.trim().replace(/\s+/g, " ");
  return name.length >= 2 && name.length <= 50 ? name : null;
}

export async function POST(request: NextRequest) {
  if (process.env.STUDIO_ENABLED !== "true") {
    return NextResponse.json({ error: "Studio is not enabled." }, { status: 404 });
  }

  let body: TokenRequest;

  try {
    body = (await request.json()) as TokenRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const room = typeof body.room === "string" ? body.room : "";
  const invitation =
    typeof body.invitation === "string" ? body.invitation : "";
  const name = normalizeDisplayName(body.name);

  if (
    !name ||
    !isValidStudioRoomName(room) ||
    !verifyStudioInvitation(invitation, room)
  ) {
    return NextResponse.json(
      { error: "This invitation is invalid or has expired." },
      { status: 403 },
    );
  }

  try {
    const { url, apiKey, apiSecret } = getLiveKitConfiguration();
    const roomService = new RoomServiceClient(url, apiKey, apiSecret);
    const rooms = await roomService.listRooms([room]);

    if (rooms.length === 0) {
      try {
        await roomService.createRoom({
          name: room,
          maxParticipants: 2,
          emptyTimeout: 5 * 60,
          departureTimeout: 30,
        });
      } catch {
        // A simultaneous request may have created the room first.
        const existingRooms = await roomService.listRooms([room]);
        if (existingRooms.length === 0) throw new Error("Room creation failed.");
      }
    }

    const accessToken = new AccessToken(apiKey, apiSecret, {
      identity: crypto.randomUUID(),
      name,
      ttl: "15m",
    });
    accessToken.addGrant({
      room,
      roomJoin: true,
      canPublish: true,
      canSubscribe: true,
      canPublishData: false,
    });

    return NextResponse.json(
      {
        token: await accessToken.toJwt(),
        serverUrl: url,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("Unable to prepare the Studio room", error);
    return NextResponse.json(
      { error: "The meeting room is temporarily unavailable." },
      { status: 503 },
    );
  }
}
