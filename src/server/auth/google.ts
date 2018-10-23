import { OAuth2Client } from "google-auth-library";
import * as Conf from "tv/server/utils/conf";

const client = new OAuth2Client(Conf.googleClientId);

// https://developers.google.com/identity/sign-in/web/backend-auth
export async function verifyToken(token: string): Promise<string> {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: Conf.googleClientId
  });
  if (!ticket) throw new Error("empty ticket from google auth library");
  const payload = ticket.getPayload();
  if (!payload) throw new Error("empty payload from google auth library");
  const userId = payload.sub;
  return userId;
}
