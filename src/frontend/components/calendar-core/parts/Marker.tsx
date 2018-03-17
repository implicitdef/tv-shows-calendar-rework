import * as moment from "moment";
import * as React from "react";
import * as DateUtils from "tv/frontend/services/dateUtils";

interface ThisProps {
  now: moment.Moment;
}

// Columns suggesting the months behind the series
const Marker: React.SFC<ThisProps> = ({ now }) => {
  const style = {
    left: `${DateUtils.dateLeftOffset(now)}%`
  };
  return (
    <div className="calendar__marker" style={style}>
      <div className="calendar__marker-bar" />
    </div>
  );
};

export default Marker;
