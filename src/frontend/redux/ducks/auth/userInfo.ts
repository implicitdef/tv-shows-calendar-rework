import * as google from "tv/frontend/services/google";

export interface ThisAction {
  type: "auth/userInfo/SET";
  payload: google.User | null;
}

type ThisState = google.User | null;

export default function reducer(
  state: ThisState = null,
  action: ThisAction
): ThisState {
  switch (action.type) {
    case "auth/userInfo/SET":
      return action.payload;
    default:
      return state;
  }
}

export const set = (user: google.User | null): ThisAction => ({
  type: "auth/userInfo/SET",
  payload: user
});
