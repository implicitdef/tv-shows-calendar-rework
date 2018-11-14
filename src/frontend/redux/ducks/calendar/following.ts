import * as Actions from "tv/frontend/redux/actions";
import * as duckCalendarSearch from "tv/frontend/redux/ducks/calendar/search";
import * as duckCalendarSeasons from "tv/frontend/redux/ducks/calendar/seasons";
import * as metaDuck from "tv/frontend/redux/ducks/meta";
import * as api from "tv/frontend/services/api";

export const unfollowShow = (id: number): Actions.TT<void> => {
  return async (dispatch, getState) => {
    try {
      await api.unfollowShow({ dispatch, getState }, id);
      dispatch(duckCalendarSeasons.fetch());
    } catch (e) {
      dispatch(metaDuck.actions.registerGlobalError());
    }
  };
};

export const followShow = (id: number): Actions.TT<void> => {
  return async (dispatch, getState) => {
    try {
      dispatch(duckCalendarSearch.clear());
      await api.followShow({ dispatch, getState }, id);
      const otherAction = duckCalendarSeasons.fetch();
      dispatch(otherAction);
    } catch (e) {
      dispatch(metaDuck.actions.registerGlobalError());
    }
  };
};
