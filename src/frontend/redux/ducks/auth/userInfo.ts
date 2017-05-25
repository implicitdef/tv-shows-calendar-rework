import * as redux from "redux";
import * as reduxThunk from "redux-thunk";
import * as Domain from "tv/shared/domain";
import * as api from "tv/frontend/services/api";
import * as authStorage from "tv/frontend/services/authStorage";
import * as google from "tv/frontend/services/google";
import * as Actions from "tv/frontend/redux/ducks/actions";
import * as calendarSeasons from "tv/frontend/redux/ducks/calendar/seasons";
import * as metaHasGlobalError from "tv/frontend/redux/ducks/meta/hasGlobalError";
import * as metaRunningCalls from "tv/frontend/redux/ducks/meta/runningCalls";
import * as State from "tv/frontend/redux/ducks/state";

export interface ThisAction {
  type: "auth/userInfo/SET";
  payload: google.User | null;
}

type ThisState = google.User | null;

export default function reducer(state: ThisState = null, action: ThisAction): ThisState {
  switch (action.type) {
    case "auth/userInfo/SET":
      return action.payload;
    default:
      return state;
  }
}

export const set = (user: google.User | null): ThisAction => ({
  type: "auth/userInfo/SET",
  payload: user,
});
