import { execFileSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const clipboard = execFileSync("pbpaste", { encoding: "utf8" });
const values = Object.fromEntries(
  clipboard
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const separator = line.indexOf("=");
      return separator > 0
        ? [line.slice(0, separator), line.slice(separator + 1)]
        : ["", ""];
    }),
);

const livekitUrl = values.LIVEKIT_URL;
const apiKey = values.LIVEKIT_API_KEY;
const apiSecret = values.LIVEKIT_API_SECRET;

if (
  !livekitUrl?.startsWith("wss://") ||
  !apiKey?.startsWith("API") ||
  !apiSecret ||
  apiSecret.length < 32
) {
  execFileSync("pbcopy", { input: "" });
  throw new Error("The clipboard does not contain a valid LiveKit environment block.");
}

const localEnvironment = [
  "STUDIO_ENABLED=true",
  `STUDIO_INVITE_SECRET=${randomBytes(48).toString("base64url")}`,
  `LIVEKIT_API_KEY=${apiKey}`,
  `LIVEKIT_API_SECRET=${apiSecret}`,
  `NEXT_PUBLIC_LIVEKIT_URL=${livekitUrl}`,
  "",
].join("\n");

writeFileSync(join(process.cwd(), ".env.local"), localEnvironment, {
  encoding: "utf8",
  mode: 0o600,
});
execFileSync("pbcopy", { input: "" });

console.log("LiveKit credentials imported and clipboard cleared.");
