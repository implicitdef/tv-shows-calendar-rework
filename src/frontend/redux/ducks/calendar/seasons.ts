import * as redux from "redux";
import * as reduxThunk from "redux-thunk";
import * as Domain from "tv/shared/domain";
import * as calendarDataFetcher from "tv/frontend/services/calendarDataFetcher";
import * as Actions from "tv/frontend/redux/ducks/actions";
import * as metaHasGlobalError from "tv/frontend/redux/ducks/meta/hasGlobalError";
import * as metaRunningCalls from "tv/frontend/redux/ducks/meta/runningCalls";
import * as State from "tv/frontend/redux/ducks/state";

export interface ThisAction {
  type: "calendar/seasons/LOADED";
  payload: Domain.SeasonWithShow[];
}

type ThisState = Domain.SeasonWithShow[];

export default function reducer(
  state: ThisState = [],
  action: ThisAction
): ThisState {
  switch (action.type) {
    case "calendar/seasons/LOADED":
      return action.payload;
    default:
      return state;
  }
}

const loaded = (seasons: Domain.SeasonWithShow[]): ThisAction => ({
  type: "calendar/seasons/LOADED",
  payload: seasons
});

export const fetch = (): Actions.TT<void> => {
  return async (dispatch, getState) => {
    try {
      const isLoggedIn = getState().auth.loggedIn;
      const seasons = await calendarDataFetcher.getSeasonsWithShows(
        dispatch,
        isLoggedIn
      );
      dispatch(loaded(seasons));
    } catch (e) {
      dispatch(metaHasGlobalError.set());
    }
  };
};
