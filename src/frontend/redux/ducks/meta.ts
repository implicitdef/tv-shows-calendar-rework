import * as google from "tv/frontend/services/google";

import { ActionsUnion, createAction } from "@martin_hotell/rex-tils";

import { createSelector } from "reselect";
import * as State from "tv/frontend/redux/state";

export type ThisState = {
  isAboutDisplayed: boolean;
  hasGlobalError: boolean;
};

export const initial = {
  isAboutDisplayed: false,
  hasGlobalError: false
};

const metaSelector = (state: State.T) => state.meta;
export const isAboutDisplayedSelector = createSelector(
  metaSelector,
  auth => auth.isAboutDisplayed
);
export const hasGlobalErrorSelector = createSelector(
  metaSelector,
  auth => auth.hasGlobalError
);

export const SET_IS_ABOUT_DISPLAYED = "meta.SET_IS_ABOUT_DISPLAYED";
export const SET_HAS_GLOBAL_ERROR = "meta.SET_GLOBAL_ERROR";

export const actions = {
  displayAbout: () => createAction(SET_IS_ABOUT_DISPLAYED, true),
  hideAbout: () => createAction(SET_IS_ABOUT_DISPLAYED, false),
  registerGlobalError: () => createAction(SET_HAS_GLOBAL_ERROR, true),
  clearGlobalError: () => createAction(SET_HAS_GLOBAL_ERROR, false)
};

export type ThisAction = ActionsUnion<typeof actions>;

export default (state: ThisState = initial, action: ThisAction): ThisState => {
  switch (action.type) {
    case SET_IS_ABOUT_DISPLAYED: {
      return {
        ...state,
        isAboutDisplayed: action.payload
      };
    }
    case SET_HAS_GLOBAL_ERROR: {
      return {
        ...state,
        hasGlobalError: action.payload
      };
    }
    default:
      return state;
  }
};
