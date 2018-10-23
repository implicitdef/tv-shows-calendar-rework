import * as moment from "moment";
import * as React from "react";
import * as ReactRedux from "react-redux";
import * as Domain from "tv/shared/domain";
import * as calendarFollowing from "tv/frontend/redux/ducks/calendar/following";
import * as duckCalendarSearch from "tv/frontend/redux/ducks/calendar/search";
import * as duckCalendarYear from "tv/frontend/redux/ducks/calendar/year";
import * as State from "tv/frontend/redux/ducks/state";
import * as Actions from "tv/frontend/redux/ducks/actions";
import * as DateUtils from "tv/frontend/services/dateUtils";
import PeriodInYearBox from "tv/frontend/components/calendar-core/boxes/PeriodInYearBox";
import Marker from "tv/frontend/components/calendar-core/parts/Marker";
import MonthsBackground from "tv/frontend/components/calendar-core/parts/MonthsBackground";
import MonthsRow from "tv/frontend/components/calendar-core/parts/MonthsRow";
import SeasonRow from "tv/frontend/components/calendar-core/parts/SeasonRow";
import SearchBox from "tv/frontend/components/calendar-wrap/SearchBox";

interface ThisProps {
  year: number;
  showAddShowButton: boolean;
  onSetYear: (year: number) => void;
  searchShows: Domain.Show[];
  searchInput: string;
  searchOpen: boolean;
  searchOnInput: (input: string) => void;
  searchOnSubmit: (selectedShow: Domain.Show) => void;
  searchOnBlur: () => void;
  searchOnOpen: () => void;
}

const CalendarBar: React.SFC<ThisProps> = ({
  year,
  showAddShowButton,
  onSetYear,
  searchShows,
  searchInput,
  searchOpen,
  searchOnInput,
  searchOnSubmit,
  searchOnBlur,
  searchOnOpen
}) => {
  const onPreviousYear = () => {
    onSetYear(year - 1);
  };
  const onNextYear = () => {
    onSetYear(year + 1);
  };
  const searchProps = {
    shows: searchShows,
    input: searchInput,
    open: searchOpen,
    onInput: searchOnInput,
    onSubmit: searchOnSubmit,
    onBlur: searchOnBlur,
    onOpen: searchOnOpen
  };
  const searchBoxOrNot = showAddShowButton ? (
    <SearchBox {...searchProps} />
  ) : null;
  return (
    <div className="calendar-bar row no-gutters">
      <div className="col-md-3 col-sm-6">{searchBoxOrNot}</div>
      <div className="calendar-bar__nav col-md-6 col-sm-6">
        <a className="calendar-bar__back" onClick={onPreviousYear}>
          {"<"}
        </a>
        <span className="calendar-bar__year">{year}</span>
        <a className="calendar-bar__forward" onClick={onNextYear}>
          >
        </a>
      </div>
    </div>
  );
};

export default CalendarBar;

export const connected = ReactRedux.connect(
  (state: State.T, ownProps) => {
    return {
      year: state.calendar.year,
      showAddShowButton: !!state.auth.loggedIn.token,
      searchShows: state.calendar.search.results,
      searchInput: state.calendar.search.input,
      searchOpen: state.calendar.search.open
    };
  },
  d => {
    const dispatch = d as Actions.ThisDispatch;
    return {
      onSetYear: (year: number) => {
        dispatch(duckCalendarYear.set(year));
      },
      searchOnInput: (input: string) => {
        dispatch(duckCalendarSearch.searchShows(input));
      },
      searchOnSubmit: (show: Domain.Show) => {
        dispatch(calendarFollowing.followShow(show.id));
      },
      searchOnBlur: () => {
        dispatch(duckCalendarSearch.close());
      },
      searchOnOpen: () => {
        dispatch(duckCalendarSearch.open());
      }
    };
  }
)(CalendarBar);
