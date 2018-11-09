import * as moment from "moment";
import * as React from "react";
import { connect } from "react-redux";
import * as Domain from "tv/shared/domain";
import * as calendarFollowing from "tv/frontend/redux/ducks/calendar/following";
import * as State from "tv/frontend/redux/ducks/state";
import * as Actions from "tv/frontend/redux/ducks/actions";
import * as Connect from "tv/frontend/redux/ducks/state";
import * as DateUtils from "tv/frontend/services/dateUtils";
import PeriodInYearBox from "tv/frontend/components/calendar-core/boxes/PeriodInYearBox";
import Marker from "tv/frontend/components/calendar-core/parts/Marker";
import MonthsBackground from "tv/frontend/components/calendar-core/parts/MonthsBackground";
import MonthsRow from "tv/frontend/components/calendar-core/parts/MonthsRow";
import SeasonRow from "tv/frontend/components/calendar-core/parts/SeasonRow";

interface ThisProps {
  year: number;
  mockedNow?: moment.Moment;
  seasons: Domain.SeasonWithShow[];
  showRemoveButtons: boolean;
  onShowRemove: (show: Domain.Show) => void;
}

const Calendar: React.SFC<ThisProps> = ({
  year,
  mockedNow,
  seasons,
  showRemoveButtons,
  onShowRemove
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
            const onClose = () => onShowRemove(season.show);
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

export const connected = connect(
  (state: State.T) => {
    return {
      year: state.calendar.year,
      seasons: state.calendar.seasons,
      showRemoveButtons: !!state.auth.loggedIn.token
    };
  },
  d => {
    const dispatch = d as Actions.ThisDispatch;
    return {
      onShowRemove: (show: Domain.Show) => {
        dispatch(calendarFollowing.unfollowShow(show.id));
      }
    };
  }
)(Calendar);
