import * as google from "tv/frontend/services/google";

import { ActionsUnion, createAction } from "@martin_hotell/rex-tils";
import * as api from "tv/frontend/services/api";
import * as Domain from "tv/shared/domain";
import * as metaDuck from "tv/frontend/redux/ducks/meta";

import { createSelector } from "reselect";
import * as State from "tv/frontend/redux/state";

export type ThisState = {
  results: Domain.Show[];
  input: string | null;
  isOpen: boolean;
};

export const initial = {
  results: [],
  input: null,
  isOpen: false
};

const searchSelector = (state: State.T) => state.search;
export const resultsSelector = createSelector(
  searchSelector,
  search => search.results
);
export const inputSelector = createSelector(
  searchSelector,
  search => search.input || ""
);
export const isOpenSelector = createSelector(
  searchSelector,
  search => search.isOpen
);

export const SET_RESULTS = "meta.SET_RESULTS";
export const SET_INPUT = "meta.SET_INPUT";
export const SET_IS_OPEN = "meta.SET_IS_OPEN";
export const CLEAR = "meta.CLEAR";

export const actions = {
  setResults: (value: Domain.Show[]) => createAction(SET_RESULTS, value),
  setInput: (value: string) => createAction(SET_INPUT, value),
  clear: () => createAction(CLEAR),
  open: () => createAction(SET_IS_OPEN, true),
  close: () => createAction(SET_IS_OPEN, false)
};

export type ThisAction = ActionsUnion<typeof actions>;

export default (state: ThisState = initial, action: ThisAction): ThisState => {
  switch (action.type) {
    case SET_RESULTS: {
      return {
        ...state,
        results: action.payload
      };
    }
    case SET_INPUT: {
      return {
        ...state,
        input: action.payload
      };
    }
    case CLEAR: {
      return {
        ...state,
        results: [],
        input: null
      };
    }
    case SET_IS_OPEN: {
      return {
        ...state,
        isOpen: action.payload
      };
    }
    default:
      return state;
  }
};
