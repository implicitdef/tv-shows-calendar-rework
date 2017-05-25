import GoogleAuth = require("google-auth-library");
import * as Conf from "tv/server/utils/conf";

const auth = new GoogleAuth();
const client = new auth.OAuth2(Conf.googleClientId, "", "");

// https://developers.google.com/identity/sign-in/web/backend-auth
export function verifyToken(token: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    client.verifyIdToken(
      token,
      Conf.googleClientId,
      (err: any, login: any) => {
        if (err) {
          reject(err);
        } else {
          const payload = login.getPayload();
          const userId = payload.sub;
          resolve(userId);
        }
      });
  });
}
