import * as React from "react";
import * as Calendar from "tv/frontend/components/calendar-core/Calendar";
import * as CalendarBar from "tv/frontend/components/calendar-wrap/CalendarBar";
import * as About from "tv/frontend/components/meta/About";
import * as AuthBar from "tv/frontend/components/meta/AuthBar";
import * as GlobalErrorBanner from "tv/frontend/components/meta/GlobalErrorBanner";
import { Provider } from "react-redux";
import Store from "tv/frontend/redux/store";

const App: React.SFC<{}> = ({}) => {
  return (
    <Provider store={Store}>
      <div className="page container-fluid">
        <GlobalErrorBanner.connected />
        <AuthBar.connected />
        <About.connected />
        <CalendarBar.connected />
        <Calendar.connected />
      </div>
    </Provider>
  );
};

export const instance = <App />;
