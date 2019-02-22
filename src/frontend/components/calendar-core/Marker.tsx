import * as React from 'react'
import { dateLeftOffset } from 'tv/frontend/services/dateUtils'
import { Moment } from 'moment'

const Marker: React.SFC<{
  now: Moment
}> = ({ now }) => (
  <div
    className='calendar-core__marker'
    style={{ left: `${dateLeftOffset(now)}%` }}
  >
    <div className='calendar-core__marker-bar' />
  </div>
)

export default Marker
