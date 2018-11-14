import { combineReducers, Reducer } from "redux";
import auth from "tv/frontend/redux/ducks/auth";
import meta from "tv/frontend/redux/ducks/meta";
import duckCalendarSearch from "tv/frontend/redux/ducks/calendar/search";
import duckCalendarSeasons from "tv/frontend/redux/ducks/calendar/seasons";
import duckCalendarYear from "tv/frontend/redux/ducks/calendar/year";
import * as State from "tv/frontend/redux/state";

export const f: Reducer<State.T> = combineReducers({
  auth,
  meta,
  calendar: combineReducers({
    search: duckCalendarSearch,
    seasons: duckCalendarSeasons,
    year: duckCalendarYear
  })
});
