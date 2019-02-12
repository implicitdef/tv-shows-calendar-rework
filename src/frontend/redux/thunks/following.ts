import * as searchDuck from "tv/frontend/redux/ducks/search";
import * as metaDuck from "tv/frontend/redux/ducks/meta";
import * as calendarThunk from "tv/frontend/redux/thunks/calendar";
import * as api from "tv/frontend/services/api";
import { SomeThunkAction } from "tv/frontend/redux/actions";

export const unfollowShow = (id: number): SomeThunkAction<void> => {
  return async (dispatch, getState) => {
    try {
      await api.unfollowShow({ dispatch, getState }, id);
      dispatch(calendarThunk.fetchSeasons());
    } catch (e) {
      dispatch(metaDuck.actions.registerGlobalError());
    }
  };
};

export const followShow = (id: number): SomeThunkAction<void> => {
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
