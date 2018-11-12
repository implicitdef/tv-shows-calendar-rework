import * as moment from "moment";
import * as React from "react";
import * as DateUtils from "tv/frontend/services/dateUtils";

interface ThisProps {
  now: moment.Moment;
}

// Columns suggesting the months behind the series
const Marker: React.SFC<ThisProps> = ({ now }) => (
  <div
    className="calendar__marker"
    style={{ left: `${DateUtils.dateLeftOffset(now)}%` }}
  >
    <div className="calendar__marker-bar" />
  </div>
);

export default Marker;
