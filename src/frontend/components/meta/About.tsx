import * as React from "react";
import { connect } from "react-redux";
import * as State from "tv/frontend/redux/state";
import * as metaDuck from "tv/frontend/redux/ducks/meta";
import * as Actions from "tv/frontend/redux/actions";

type StateProps = {
  isDisplayed: boolean;
};
type DispatchProps = {
  onClose: () => void;
};
type OwnProps = {};
type ThisProps = StateProps & DispatchProps & OwnProps;

const About: React.SFC<ThisProps> = ({ isDisplayed, onClose }) =>
  isDisplayed ? (
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

export const connected = connect<StateProps, DispatchProps, OwnProps, State.T>(
  (state: State.T) => ({
    isDisplayed: metaDuck.isAboutDisplayedSelector(state)
  }),
  (dispatch: Actions.ThisDispatch) => ({
    onClose: () => {
      dispatch(metaDuck.actions.hideAbout());
    }
  })
)(About);
