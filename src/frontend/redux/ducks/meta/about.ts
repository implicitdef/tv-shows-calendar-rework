import * as redux from "redux";

export type ThisAction =
  | {
      type: "meta/about/SET";
    }
  | {
      type: "meta/about/CLEAR";
    };

type ThisState = boolean;

export default function reducer(
  state: ThisState = false,
  action: ThisAction
): ThisState {
  switch (action.type) {
    case "meta/about/SET":
      return true;
    case "meta/about/CLEAR":
      return false;
    default:
      return state;
  }
}

export const set = (): ThisAction => ({ type: "meta/about/SET" });
export const clear = (): ThisAction => ({ type: "meta/about/CLEAR" });
