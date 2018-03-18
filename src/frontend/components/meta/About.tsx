import * as React from "react";
import * as ReactRedux from "react-redux";
import * as State from "tv/frontend/redux/ducks/state";
import * as metaAbout from "tv/frontend/redux/ducks/meta/about";

interface Props {
  isDisplayed: boolean;
  onClose: () => void;
}

const About: React.SFC<Props> = ({ isDisplayed, onClose }) =>
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

export const connected = ReactRedux.connect(
  (state: State.T, ownProps) => {
    return {
      isDisplayed: state.meta.about
    };
  },
  dispatch => {
    return {
      onClose: () => {
        dispatch(metaAbout.clear());
      }
    };
  }
)(About);
