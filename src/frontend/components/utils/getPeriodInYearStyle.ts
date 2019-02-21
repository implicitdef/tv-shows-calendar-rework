import * as moment from "moment";
import * as DateUtils from "tv/frontend/services/dateUtils";
import { CSSProperties } from "react";

// Computes the CSS to apply to a div to represent
// some subperiod of a certain year
// The subperiod might actually overlap on some other year.
export function getStyleForPeriodInYear({
  year,
  start,
  end
}: {
  year: number;
  start: moment.Moment;
  end: moment.Moment;
}): CSSProperties {
  const startInYear = DateUtils.bringDateInYear(start, year);
  const endInYear = DateUtils.bringDateInYear(end, year);
  const leftOffset = DateUtils.dateLeftOffset(startInYear);
  const width = DateUtils.offsetBetween(startInYear, endInYear);
  return {
    left: `${leftOffset}%`,
    // We set both width and minWidth, but only one of them
    // is used depending if we're :hover or not.
    // cf override in CSS
    minWidth: `${width}%`,
    width: `${width}%`
  };
}
