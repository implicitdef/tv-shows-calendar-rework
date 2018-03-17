import * as redux from "redux";

export type ThisAction =
  | {
      type: "meta/hasGlobalError/SET";
    }
  | {
      type: "meta/hasGlobalError/CLEAR";
    };

type ThisState = boolean;

export default function reducer(
  state: ThisState = false,
  action: ThisAction
): ThisState {
  switch (action.type) {
    case "meta/hasGlobalError/SET":
      return true;
    case "meta/hasGlobalError/CLEAR":
      return false;
    default:
      return state;
  }
}

export const set = (): ThisAction => ({ type: "meta/hasGlobalError/SET" });
export const clear = (): ThisAction => ({ type: "meta/hasGlobalError/CLEAR" });
