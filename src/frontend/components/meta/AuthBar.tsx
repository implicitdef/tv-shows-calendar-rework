import * as React from "react";
import { connect } from "react-redux";
import * as Actions from "tv/frontend/redux/actions";
import * as authDuck from "tv/frontend/redux/ducks/auth";
import * as authThunk from "tv/frontend/redux/thunks/auth";
import * as metaDuck from "tv/frontend/redux/ducks/meta";
import * as State from "tv/frontend/redux/state";

type StateProps = {
  loggedIn: boolean;
  email: string | null;
};
type DispatchProps = {
  onClickAbout: () => void;
  onLogin: () => void;
  onLogout: () => void;
};
type OwnProps = {};
type ThisProps = StateProps & DispatchProps & OwnProps;

const AuthBar: React.SFC<ThisProps> = ({
  loggedIn,
  email,
  onClickAbout,
  onLogin,
  onLogout
}) => (
  <div className="auth-bar">
    <a className="auth-bar__button" onClick={onClickAbout}>
      about
    </a>
    {loggedIn && email ? <span>{email}</span> : ""}
    {loggedIn || (
      <a className="auth-bar__button" onClick={onLogin}>
        sign in with Google
      </a>
    )}
    {loggedIn && (
      <a className="auth-bar__button" onClick={onLogout}>
        sign out
      </a>
    )}
  </div>
);

export default AuthBar;

export const connected = connect<StateProps, DispatchProps, OwnProps, State.T>(
  (state: State.T) => ({
    loggedIn: !!authDuck.isUserLoggedInSelector(state),
    email: authDuck.userEmailSelector(state)
  }),
  (dispatch: Actions.ThisDispatch) => ({
    onClickAbout: () => {
      dispatch(metaDuck.actions.displayAbout());
    },
    onLogin: () => {
      dispatch(authThunk.login());
    },
    onLogout: () => {
      dispatch(authThunk.logout());
    }
  })
)(AuthBar);
