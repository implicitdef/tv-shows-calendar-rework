import * as redux from "redux";
import * as reduxThunk from "redux-thunk";
import * as Domain from "tv/shared/domain";
import * as calendarDataFetcher from "tv/frontend/services/calendarDataFetcher";
import * as Actions from "tv/frontend/redux/actions";
import * as metaDuck from "tv/frontend/redux/ducks/meta";
import * as State from "tv/frontend/redux/state";
import * as authDuck from "tv/frontend/redux/ducks/auth";

export type ThisAction = {
  type: "calendar/seasons/LOADED";
  payload: Domain.SeasonWithShow[];
};

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
      const seasons = await calendarDataFetcher.getSeasonsWithShows(
        { dispatch, getState },
        authDuck.isUserLoggedInSelector(getState())
      );
      dispatch(loaded(seasons));
    } catch (e) {
      dispatch(metaDuck.actions.registerGlobalError());
    }
  };
};
