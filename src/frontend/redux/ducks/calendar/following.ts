import * as redux from "redux";
import * as reduxThunk from "redux-thunk";
import * as Domain from "tv/shared/domain";
import * as api from "tv/frontend/services/api";
import * as Actions from "tv/frontend/redux/ducks/actions";
import * as duckMetaHasGlobalError from "tv/frontend/redux/ducks/meta/hasGlobalError";
import * as duckMetaRunningCalls from "tv/frontend/redux/ducks/meta/runningCalls";
import * as State from "tv/frontend/redux/ducks/state";
import * as duckCalendarSearch from "tv/frontend/redux/ducks/calendar/search";
import * as duckCalendarSeasons from "tv/frontend/redux/ducks/calendar/seasons";

export const unfollowShow = (id: number): Actions.TT<void> => {
  return async dispatch => {
    try {
      await api.unfollowShow(dispatch, id);
      dispatch(duckCalendarSeasons.fetch());
    } catch (e) {
      dispatch(duckMetaHasGlobalError.set());
    }
  };
};

export const followShow = (id: number): Actions.TT<void> => {
  return async dispatch => {
    try {
      dispatch(duckCalendarSearch.clear());
      await api.followShow(dispatch, id);
      const otherAction = duckCalendarSeasons.fetch();
      dispatch(otherAction);
    } catch (e) {
      dispatch(duckMetaHasGlobalError.set());
    }
  };
};
