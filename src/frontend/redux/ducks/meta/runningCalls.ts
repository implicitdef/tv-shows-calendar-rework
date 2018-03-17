import * as redux from "redux";

export type ThisAction =
  | {
      type: "meta/runningCalls/START";
    }
  | {
      type: "meta/runningCalls/END";
    };

type ThisState = number;

export default function reducer(
  state: ThisState = 0,
  action: ThisAction
): ThisState {
  switch (action.type) {
    case "meta/runningCalls/START":
      return state + 1;
    case "meta/runningCalls/END":
      return Math.max(state - 1, 0);
    default:
      return state;
  }
}

export const start = (): ThisAction => ({ type: "meta/runningCalls/START" });
export const end = (): ThisAction => ({ type: "meta/runningCalls/END" });
