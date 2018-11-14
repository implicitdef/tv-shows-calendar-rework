import * as React from "react";
import { connect } from "react-redux";
import * as State from "tv/frontend/redux/state";

type StateProps = {
  hasError: boolean;
};
type DispatchProps = {};
type OwnProps = {};
type ThisProps = StateProps & DispatchProps & OwnProps;

const GlobalErrorBanner: React.SFC<ThisProps> = ({ hasError }) =>
  hasError ? (
    <div className="global-error-banner">
      Oops, it looks like something didn't work as it should. Please refresh
      this page to see if things get better.
    </div>
  ) : null;

export default GlobalErrorBanner;

export const connected = connect<StateProps, DispatchProps, OwnProps, State.T>(
  (state: State.T) => ({
    hasError: state.meta.hasGlobalError
  })
)(GlobalErrorBanner);
