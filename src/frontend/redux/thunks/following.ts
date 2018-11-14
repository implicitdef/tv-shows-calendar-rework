import * as Actions from "tv/frontend/redux/actions";
import * as searchDuck from "tv/frontend/redux/ducks/search";
import * as metaDuck from "tv/frontend/redux/ducks/meta";
import * as calendarThunk from "tv/frontend/redux/thunks/calendar";
import * as api from "tv/frontend/services/api";

export const unfollowShow = (id: number): Actions.TT<void> => {
  return async (dispatch, getState) => {
    try {
      await api.unfollowShow({ dispatch, getState }, id);
      dispatch(calendarThunk.fetchSeasons());
    } catch (e) {
      dispatch(metaDuck.actions.registerGlobalError());
    }
  };
};

export const followShow = (id: number): Actions.TT<void> => {
  return async (dispatch, getState) => {
    try {
      dispatch(searchDuck.actions.clear());
      await api.followShow({ dispatch, getState }, id);
      dispatch(calendarThunk.fetchSeasons());
    } catch (e) {
      dispatch(metaDuck.actions.registerGlobalError());
    }
  };
};
