import * as React from "react";
import { connect } from "react-redux";
import SearchBox from "tv/frontend/components/calendar-wrap/SearchBox";
import * as Actions from "tv/frontend/redux/actions";
import * as authDuck from "tv/frontend/redux/ducks/auth";
import * as duckCalendarYear from "tv/frontend/redux/ducks/calendar/year";
import * as searchDuck from "tv/frontend/redux/ducks/search";
import * as State from "tv/frontend/redux/state";
import * as followingThunk from "tv/frontend/redux/thunks/following";
import * as searchThunk from "tv/frontend/redux/thunks/search";
import * as Domain from "tv/shared/domain";

type StateProps = {
  year: number;
  showAddShowButton: boolean;
  searchShows: Domain.Show[];
  searchInput: string;
  searchOpen: boolean;
};

type DispatchProps = {
  onSetYear: (year: number) => void;
  searchOnInput: (input: string) => void;
  searchOnSubmit: (selectedShow: Domain.Show) => void;
  searchOnBlur: () => void;
  searchOnOpen: () => void;
};
type OwnProps = {};
type ThisProps = StateProps & DispatchProps & OwnProps;

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

export const connected = connect<StateProps, DispatchProps, OwnProps, State.T>(
  (state: State.T) => ({
    year: state.calendar.year,
    showAddShowButton: authDuck.isUserLoggedInSelector(state),
    searchShows: searchDuck.resultsSelector(state),
    searchInput: searchDuck.inputSelector(state),
    searchOpen: searchDuck.isOpenSelector(state)
  }),
  (dispatch: Actions.ThisDispatch) => ({
    onSetYear: (year: number) => {
      dispatch(duckCalendarYear.set(year));
    },
    searchOnInput: (input: string) => {
      dispatch(searchThunk.searchShows(input));
    },
    searchOnSubmit: (show: Domain.Show) => {
      dispatch(followingThunk.followShow(show.id));
    },
    searchOnBlur: () => {
      dispatch(searchDuck.actions.close());
    },
    searchOnOpen: () => {
      dispatch(searchDuck.actions.open());
    }
  })
)(CalendarBar);
