import * as redux from "redux";
import * as reduxThunk from "redux-thunk";
import * as Domain from "tv/shared/domain";
import * as api from "tv/frontend/services/api";
import * as Actions from "tv/frontend/redux/ducks/actions";
import * as duckMetaHasGlobalError from "tv/frontend/redux/ducks/meta/hasGlobalError";
import * as duckMetaRunningCalls from "tv/frontend/redux/ducks/meta/runningCalls";
import * as State from "tv/frontend/redux/ducks/state";

export type ThisAction = {
  type: "calendar/year/SET";
  payload: number;
}

type ThisState = number;

export default function reducer(
  state: ThisState = 2000,
  action: ThisAction
): ThisState {
  switch (action.type) {
    case "calendar/year/SET":
      return action.payload;
    default:
      return state;
  }
}

export const set = (year: number): ThisAction => ({
  type: "calendar/year/SET",
  payload: year
});
