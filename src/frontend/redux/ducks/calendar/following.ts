import * as redux from "redux";
import * as reduxThunk from "redux-thunk";
import * as Domain from "tv/shared/domain";
import * as api from "tv/frontend/services/api";
import * as Actions from "tv/frontend/redux/ducks/actions";
import * as metaHasGlobalError from "tv/frontend/redux/ducks/meta/hasGlobalError";
import * as metaRunningCalls from "tv/frontend/redux/ducks/meta/runningCalls";
import * as State from "tv/frontend/redux/ducks/state";
import * as calendarSearch from "tv/frontend/redux/ducks/calendar/search";
import * as calendarSeasons from "tv/frontend/redux/ducks/calendar/seasons";

export const unfollowShow = (id: number): Actions.TT<void> => {
  return async dispatch => {
    try {
      await api.unfollowShow(dispatch, id);
      dispatch(calendarSeasons.fetch());
    } catch (e) {
      dispatch(metaHasGlobalError.set());
    }
  };
};

export const followShow = (id: number): Actions.TT<void> => {
  return async dispatch => {
    try {
      dispatch(calendarSearch.clear());
      await api.followShow(dispatch, id);
      const otherAction = calendarSeasons.fetch();
      dispatch(otherAction);
    } catch (e) {
      dispatch(metaHasGlobalError.set());
    }
  };
};
