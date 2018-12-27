import * as moment from "moment";
import * as React from "react";
import { connect, DispatchProp } from "react-redux";
import Marker from "tv/frontend/components/calendar-core/parts/Marker";
import MonthsBackground from "tv/frontend/components/calendar-core/parts/MonthsBackground";
import MonthsRow from "tv/frontend/components/calendar-core/parts/MonthsRow";
import SeasonRow from "tv/frontend/components/calendar-core/parts/SeasonRow";
import * as Actions from "tv/frontend/redux/actions";
import * as followingThunk from "tv/frontend/redux/thunks/following";
import * as State from "tv/frontend/redux/state";
import * as DateUtils from "tv/frontend/services/dateUtils";
import * as Domain from "tv/shared/domain";
import * as authDuck from "tv/frontend/redux/ducks/auth";

type StateProps = {
  year: number;
  seasons: Domain.SeasonWithShow[];
  showRemoveButtons: boolean;
};
type OwnProps = {
  mockedNow?: moment.Moment;
};
type ThisProps = StateProps &
  OwnProps & {
    dispatch: Actions.ThisDispatch;
  };

const Calendar: React.SFC<ThisProps> = ({
  year,
  mockedNow,
  seasons,
  showRemoveButtons,
  dispatch
}) => {
  const now = mockedNow || moment();
  const marker = now.year() === year ? <Marker now={now} /> : "";
  return (
    <div className="calendar">
      <div className="col-12 calendar__inner">
        {marker}
        <MonthsBackground year={year} />
        <MonthsRow year={year} />
        {seasons
          .filter(season => {
            return DateUtils.isTimeRangeInYear(season.time, year);
          })
          .map((season, index) => {
            const onClose = () =>
              dispatch(followingThunk.unfollowShow(season.show.id));
            return (
              <SeasonRow
                key={`${season.show.id}S${season.number}`}
                index={index}
                season={season}
                year={year}
                onClose={onClose}
                showRemoveButtons={showRemoveButtons}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Calendar;

export const connected = connect<StateProps, {}, OwnProps, State.T>(
  (state: State.T) => ({
    year: state.calendar.year,
    seasons: state.calendar.seasons,
    showRemoveButtons: authDuck.isUserLoggedInSelector(state)
  })
)(Calendar);
