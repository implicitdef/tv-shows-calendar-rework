import * as React from "react";
import { connect } from "react-redux";
import * as duckAuthLoggedIn from "tv/frontend/redux/ducks/auth/loggedIn";
import * as duckMetaAbout from "tv/frontend/redux/ducks/meta/about";
import * as State from "tv/frontend/redux/ducks/state";
import * as Actions from "tv/frontend/redux/ducks/actions";

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

export const connected = connect(
  (state: State.T, ownProps) => {
    return {
      loggedIn: !!state.auth.loggedIn.token,
      email: state.auth.userInfo ? state.auth.userInfo.email : null
    };
  },
  d => {
    const dispatch = d as Actions.ThisDispatch;
    return {
      onClickAbout: () => {
        dispatch(duckMetaAbout.set());
      },
      onLogin: () => {
        dispatch(duckAuthLoggedIn.login());
      },
      onLogout: () => {
        dispatch(duckAuthLoggedIn.logout());
      }
    };
  }
)(AuthBar);
