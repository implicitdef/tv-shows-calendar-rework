import * as React from "react";
import * as Calendar from "tv/frontend/components/calendar-core/Calendar";
import * as CalendarBar from "tv/frontend/components/calendar-wrap/CalendarBar";
import About from "tv/frontend/components/meta/About";
import * as AuthBar from "tv/frontend/components/meta/AuthBar";
import * as GlobalErrorBanner from "tv/frontend/components/meta/GlobalErrorBanner";
import { Provider } from "react-redux";
import { StoreContext } from "redux-react-hook";
import Store from "tv/frontend/redux/store";

// TODO improve setup of useDispatch so that we can dispatch only our action and our thunks

const App: React.SFC<{}> = ({}) => {
  return (
    <StoreContext.Provider value={Store}>
      <Provider store={Store}>
        <div className="page container-fluid">
          <GlobalErrorBanner.connected />
          <AuthBar.connected />
          <About />
          <CalendarBar.connected />
          <Calendar.connected />
        </div>
      </Provider>
    </StoreContext.Provider>
  );
};

export const instance = <App />;
