import * as React from "react";
import { useCallback } from "react";
import { useDispatch, useMappedState } from "redux-react-hook";
import * as Actions from "tv/frontend/redux/actions";
import * as metaDuck from "tv/frontend/redux/ducks/meta";

export default function About() {
  const mapState = useCallback(
    state => ({
      isDisplayed: metaDuck.isAboutDisplayedSelector(state)
    }),
    []
  );
  const { isDisplayed } = useMappedState(mapState);
  const dispatch = useDispatch<Actions.T>();
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
