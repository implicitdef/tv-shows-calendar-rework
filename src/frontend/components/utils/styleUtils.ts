import * as moment from 'moment'
import { CSSProperties } from 'react'
import {
  bringDateInYear,
  dateLeftOffset,
  offsetBetween,
} from 'tv/frontend/services/dateUtils'
import { Moment } from 'moment'

// Computes the CSS to apply to a div to represent
// some month of a certain year
// The subperiod might actually overlap on some other year.
export function getStyleForMonthInYear({
  year,
  monthNumber,
}: {
  year: number
  monthNumber: number
}): CSSProperties {
  const start = moment(year, 'YYYY')
    .month(monthNumber)
    .startOf('month')
  const end = moment(year, 'YYYY')
    .month(monthNumber)
    .endOf('month')
  return getStyleForPeriodInYear({
    year,
    start,
    end,
  })
}

// Computes the CSS to apply to a div to represent
// some subperiod of a certain year
// The subperiod might actually overlap on some other year.
export function getStyleForPeriodInYear({
  year,
  start,
  end,
}: {
  year: number
  start: Moment
  end: Moment
}): CSSProperties {
  const startInYear = bringDateInYear(start, year)
  const endInYear = bringDateInYear(end, year)
  const leftOffset = dateLeftOffset(startInYear)
  const width = offsetBetween(startInYear, endInYear)
  return {
    left: `${leftOffset}%`,
    // We set both width and minWidth, but only one of them
    // is used depending if we're :hover or not.
    // cf override in CSS
    minWidth: `${width}%`,
    width: `${width}%`,
  }
}
