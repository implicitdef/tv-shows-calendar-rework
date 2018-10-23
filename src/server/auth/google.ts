import { OAuth2Client } from "google-auth-library";
import * as Conf from "tv/server/utils/conf";

const client = new OAuth2Client(Conf.googleClientId);

// https://developers.google.com/identity/sign-in/web/backend-auth
export async function verifyToken(token: string): Promise<string> {
  console.log("@@@ verifying token", token);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: Conf.googleClientId
  });
  console.log("@@@ received ticket", ticket);
  if (!ticket) throw new Error("empty ticket from google auth library");
  const payload = ticket.getPayload();
  console.log("@@@ received payload", payload);
  if (!payload) throw new Error("empty payload from google auth library");
  const userId = payload.sub;
  console.log("@@@ got user id", userId);
  return userId;
}
