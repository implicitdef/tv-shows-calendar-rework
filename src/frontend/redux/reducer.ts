import { combineReducers, Reducer } from "redux";
import auth from "tv/frontend/redux/ducks/auth";
import meta from "tv/frontend/redux/ducks/meta";
import search from "tv/frontend/redux/ducks/search";
import calendar from "tv/frontend/redux/ducks/calendar";
import * as State from "tv/frontend/redux/state";

export const f: Reducer<State.T> = combineReducers({
  auth,
  meta,
  search,
  calendar
});
