import * as redux from "redux";
import * as reduxThunk from "redux-thunk";
import * as Domain from "tv/shared/domain";
import * as api from "tv/frontend/services/api";
import * as google from "tv/frontend/services/google";
import * as Actions from "tv/frontend/redux/ducks/actions";
import * as duckCalendarSeasons from "tv/frontend/redux/ducks/calendar/seasons";
import * as duckMetaHasGlobalError from "tv/frontend/redux/ducks/meta/hasGlobalError";
import * as duckMetaRunningCalls from "tv/frontend/redux/ducks/meta/runningCalls";
import * as State from "tv/frontend/redux/ducks/state";
import * as duckAuthUserInfo from "tv/frontend/redux/ducks/auth/userInfo";

export type ThisAction =
  | {
      type: "auth/loggedIn/SET_LOGGED_IN_TOKEN";
      payload: string;
    }
  | {
      type: "auth/loggedIn/SET_LOGGED_OUT";
      payload: null;
    };

type ThisState = { token: string | null };

export default function reducer(
  state: ThisState = { token: null },
  action: ThisAction
): ThisState {
  switch (action.type) {
    case "auth/loggedIn/SET_LOGGED_IN_TOKEN":
      return { ...state, token: action.payload };
    case "auth/loggedIn/SET_LOGGED_OUT":
      return { ...state, token: null };
    default:
      return state;
  }
}

const setToken = (token: string): ThisAction => ({
  type: "auth/loggedIn/SET_LOGGED_IN_TOKEN",
  payload: token
});

const setLoggedOut = (): ThisAction => ({
  type: "auth/loggedIn/SET_LOGGED_OUT",
  payload: null
});

export const login = (): Actions.TT<void> => {
  return async dispatch => {
    try {
      await google.login();
      const token = await google.getToken();
      const user = await google.getUserInfo();
      dispatch(setToken(token));
      dispatch(duckAuthUserInfo.set(user));
      await dispatch(duckCalendarSeasons.fetch());
    } catch (e) {
      dispatch(duckMetaHasGlobalError.set());
    }
  };
};

export const logout = (): Actions.TT<void> => {
  return async dispatch => {
    try {
      await google.logout();
      dispatch(setLoggedOut());
      dispatch(duckAuthUserInfo.set(null));
      await dispatch(duckCalendarSeasons.fetch());
    } catch (e) {
      dispatch(duckMetaHasGlobalError.set());
    }
  };
};

export const checkStatusOnStartupAndFetch = (): Actions.TT<void> => {
  return async dispatch => {
    try {
      const isLoggedIn = await google.isLoggedIn();
      if (isLoggedIn) {
        const user = await google.getUserInfo();
        const token = await google.getToken();
        dispatch(setToken(token));
        dispatch(duckAuthUserInfo.set(user));
      }
      await dispatch(duckCalendarSeasons.fetch());
    } catch (e) {
      dispatch(setLoggedOut());
      dispatch(duckAuthUserInfo.set(null));
    }
  };
};
