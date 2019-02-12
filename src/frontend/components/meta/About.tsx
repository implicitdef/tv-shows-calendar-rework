import * as React from "react";
import { useCallback } from "react";
import * as metaDuck from "tv/frontend/redux/ducks/meta";
import { TheState } from "tv/frontend/redux/state";
import { useThisDispatch, useThisMappedState } from "tv/frontend/redux/utils";

export default function About() {
  const mapState = useCallback(
    (state: TheState) => ({
      isDisplayed: metaDuck.isAboutDisplayedSelector(state)
    }),
    []
  );
  const { isDisplayed } = useThisMappedState(mapState);
  const dispatch = useThisDispatch();
  const onClose = () => dispatch(metaDuck.actions.hideAbout());
  return isDisplayed ? (
    <div className="about">
      <p>
        This calendar helps you keep track of when your favorites TV shows are
        aired, season by season. Useful for binge-watchers who wait the end of a
        season to watch it.
      </p>
      <p> Create an account to add or remove TV shows from the calendar.</p>
      <button onClick={onClose} className="about__close">
        &times;
      </button>
    </div>
  ) : null;
}
