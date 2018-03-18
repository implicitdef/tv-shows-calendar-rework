import * as React from "react";
import * as ReactRedux from "react-redux";
import * as authLoggedIn from "tv/frontend/redux/ducks/auth/loggedIn";
import * as metaAbout from "tv/frontend/redux/ducks/meta/about";
import * as State from "tv/frontend/redux/ducks/state";

interface ThisProps {
  loggedIn: boolean;
  email: string | null;
  onClickAbout: () => void;
  onLogin: () => void;
  onLogout: () => void;
}

const AuthBar: React.SFC<ThisProps> = props => (
  <div className="auth-bar">
    <a className="auth-bar__button" onClick={props.onClickAbout}>
      about
    </a>
    {props.loggedIn && props.email ? <span>{props.email}</span> : ""}
    {props.loggedIn || (
      <a className="auth-bar__button" onClick={props.onLogin}>
        sign in with Google
      </a>
    )}
    {props.loggedIn && (
      <a className="auth-bar__button" onClick={props.onLogout}>
        sign out
      </a>
    )}
  </div>
);

export default AuthBar;

export const connected = ReactRedux.connect(
  (state: State.T, ownProps) => {
    return {
      loggedIn: state.auth.loggedIn,
      email: state.auth.userInfo ? state.auth.userInfo.email : null
    };
  },
  dispatch => {
    return {
      onClickAbout: () => {
        dispatch(metaAbout.set());
      },
      onLogin: () => {
        dispatch(authLoggedIn.login());
      },
      onLogout: () => {
        dispatch(authLoggedIn.logout());
      }
    };
  }
)(AuthBar);
