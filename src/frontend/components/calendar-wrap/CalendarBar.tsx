import * as React from "react";
import { connect } from "react-redux";
import * as SearchBox from "tv/frontend/components/calendar-wrap/SearchBox";
import * as Actions from "tv/frontend/redux/actions";
import * as authDuck from "tv/frontend/redux/ducks/auth";
import * as duckCalendar from "tv/frontend/redux/ducks/calendar";
import { useCallback } from "react";
import { State } from "tv/frontend/redux/state";
import { useThisMappedState, useThisDispatch } from "tv/frontend/redux/utils";

export default function CalendarBar() {
  const mapState = useCallback(
    (state: State) => ({
      year: state.calendar.year,
      showAddShowButton: authDuck.isUserLoggedInSelector(state)
    }),
    []
  );
  const { year, showAddShowButton } = useThisMappedState(mapState);
  const dispatch = useThisDispatch();
  const searchBoxOrNot = showAddShowButton ? <SearchBox.connected /> : null;
  return (
    <div className="calendar-bar row no-gutters">
      <div className="col-md-3 col-sm-6">{searchBoxOrNot}</div>
      <div className="calendar-bar__nav col-md-6 col-sm-6">
        <a
          className="calendar-bar__back"
          onClick={() => {
            dispatch(duckCalendar.actions.decrementYear());
          }}
        >
          {"<"}
        </a>
        <span className="calendar-bar__year">{year}</span>
        <a
          className="calendar-bar__forward"
          onClick={() => {
            dispatch(duckCalendar.actions.incrementYear());
          }}
        >
          >
        </a>
      </div>
    </div>
  );
}
