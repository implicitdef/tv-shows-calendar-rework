import * as moment from 'moment'
import * as React from 'react'
import * as DateUtils from 'tv/frontend/services/dateUtils'

const Marker: React.SFC<{
  now: moment.Moment
}> = ({ now }) => (
  <div
    className='calendar-core__marker'
    style={{ left: `${DateUtils.dateLeftOffset(now)}%` }}
  >
    <div className='calendar-core__marker-bar' />
  </div>
)

export default Marker
