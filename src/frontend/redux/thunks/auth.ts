import * as Actions from "tv/frontend/redux/actions";
import * as duckCalendarSeasons from "tv/frontend/redux/ducks/calendar/seasons";
import * as metaDuck from "tv/frontend/redux/ducks/meta";
import * as authDuck from "tv/frontend/redux/ducks/auth";
import * as google from "tv/frontend/services/google";

export const login = (): Actions.TT<void> => {
  return async dispatch => {
    try {
      await google.login();
      const token = await google.getToken();
      const user = await google.getUserInfo();
      dispatch(authDuck.actions.login({ token, user }));
      await dispatch(duckCalendarSeasons.fetch());
    } catch (e) {
      dispatch(metaDuck.actions.registerGlobalError());
    }
  };
};

export const logout = (): Actions.TT<void> => {
  return async dispatch => {
    try {
      await google.logout();
      dispatch(authDuck.actions.logout());
      await dispatch(duckCalendarSeasons.fetch());
    } catch (e) {
      dispatch(metaDuck.actions.registerGlobalError());
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
        dispatch(authDuck.actions.login({ token, user }));
      }
      await dispatch(duckCalendarSeasons.fetch());
    } catch (e) {
      dispatch(authDuck.actions.logout());
    }
  };
};
