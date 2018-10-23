import * as Actions from "tv/frontend/redux/ducks/actions";
import * as duckCalendarSearch from "tv/frontend/redux/ducks/calendar/search";
import * as duckCalendarSeasons from "tv/frontend/redux/ducks/calendar/seasons";
import * as duckMetaHasGlobalError from "tv/frontend/redux/ducks/meta/hasGlobalError";
import * as api from "tv/frontend/services/api";

export const unfollowShow = (id: number): Actions.TT<void> => {
  return async (dispatch, getState) => {
    try {
      await api.unfollowShow({ dispatch, getState }, id);
      dispatch(duckCalendarSeasons.fetch());
    } catch (e) {
      dispatch(duckMetaHasGlobalError.set());
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
      dispatch(duckMetaHasGlobalError.set());
    }
  };
};
