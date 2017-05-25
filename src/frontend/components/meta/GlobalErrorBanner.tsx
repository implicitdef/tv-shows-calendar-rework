import * as React from "react";
import * as ReactRedux from "react-redux";
import * as State from "tv/frontend/redux/ducks/state";

interface Props {
  hasError: boolean;
}

const GlobalErrorBanner: React.SFC<Props> = ({
  hasError,
}) => (
  hasError ? <div className="global-error-banner">
    Oops, it looks like something didn't work as it should. Please refresh this page to see if things get better.
  </div> : null
);

export default GlobalErrorBanner;

export const connected = ReactRedux.connect(
  (state: State.T, ownProps) => {
    return {
      hasError : state.meta.hasGlobalError,
    };
  },
  (dispatch) => {
    return {
    };
  },
)(GlobalErrorBanner);
