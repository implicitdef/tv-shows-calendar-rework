import * as Conf from "tv/frontend/services/conf";

const W = window as any;

export interface User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}

// to ensure our calls are made after gapi is loaded
// we have to wrap it in a promise
let gapiPromiseResolve: (googleAuth: any) => void;
const gapiPromise = new Promise<any>((resolve, reject) => {
  gapiPromiseResolve = resolve;
});
let googleAuth: any = null;
const googleAuthPromise = gapiPromise.then((gapi) => {
  return new Promise<void>((resolve, reject) => {
    gapi.load("auth2", () => {
      // normally here we'd resolve the promise with
      // the returned object.
      // However this object is weird and if we do that
      // the browser hangs inexplicably....
      // so we resolve with nothing and have to store
      // the object in an outside variable
      googleAuth = gapi.auth2.init({
        client_id: Conf.googleClientId,
      });
      // still have to wait for full initialization
      googleAuth.then(() => {
        resolve();
      });
    });
  });
});

// Google + SDK setup
export const setup = () => {
  W.gapiLoadedCallback = () => {
    gapiPromiseResolve(W.gapi);
  };
  const script = document.createElement( "script" );
  script.src = "https://apis.google.com/js/platform.js?onload=gapiLoadedCallback";
  script.setAttribute("async", "");
  script.setAttribute("defer", "");
  document.body.appendChild(script);
};

export async function isLoggedIn(): Promise<boolean> {
  await googleAuthPromise;
  return googleAuth.isSignedIn.get();
}
export async function login(): Promise<void> {
  await googleAuthPromise;
  await googleAuth.signIn();
}
export async function logout(): Promise<void> {
  await googleAuthPromise;
  await googleAuth.signOut();
}
export async function getUserInfo(): Promise<User> {
  await googleAuthPromise;
  const basicProfile = googleAuth.currentUser.get().getBasicProfile();
  return {
    id : basicProfile.getId(),
    name : basicProfile.getName(),
    email : basicProfile.getEmail(),
    image : basicProfile.getImageUrl(),
  };
}
export async function getToken(): Promise<string> {
  await googleAuthPromise;
  return googleAuth.currentUser.get().getAuthResponse().id_token;
}
