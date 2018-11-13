import * as Actions from "tv/frontend/redux/ducks/actions";
import * as duckCalendarSeasons from "tv/frontend/redux/ducks/calendar/seasons";
import * as duckMetaHasGlobalError from "tv/frontend/redux/ducks/meta/hasGlobalError";
import * as duckNewAuth from "tv/frontend/redux/ducks/newAuth";
import * as google from "tv/frontend/services/google";

export const login = (): Actions.TT<void> => {
  return async dispatch => {
    try {
      await google.login();
      const token = await google.getToken();
      const user = await google.getUserInfo();
      dispatch(duckNewAuth.actions.setToken(token));
      dispatch(duckNewAuth.actions.setUserInfo(user));
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
      dispatch(duckNewAuth.actions.setToken(null));
      dispatch(duckNewAuth.actions.setUserInfo(null));
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
        dispatch(duckNewAuth.actions.setToken(token));
        dispatch(duckNewAuth.actions.setUserInfo(user));
      }
      await dispatch(duckCalendarSeasons.fetch());
    } catch (e) {
      dispatch(duckNewAuth.actions.setToken(null));
      dispatch(duckNewAuth.actions.setUserInfo(null));
    }
  };
};
