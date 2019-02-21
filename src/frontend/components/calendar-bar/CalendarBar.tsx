import * as React from 'react'
import { useCallback } from 'react'
import { TheState } from 'tv/frontend/redux/state'
import { useThisDispatch, useThisMappedState } from 'tv/frontend/redux/utils'
import SearchBox from 'tv/frontend/components/calendar-bar/SearchBox'
import { loggedInStatusSelector } from 'tv/frontend/redux/ducks/auth'
import { calendarActions } from 'tv/frontend/redux/ducks/calendar'

export default function CalendarBar() {
  const mapState = useCallback(
    (state: TheState) => ({
      year: state.calendar.year,
      showAddShowButton: loggedInStatusSelector(state) === 'loggedIn',
    }),
    [],
  )
  const { year, showAddShowButton } = useThisMappedState(mapState)
  const dispatch = useThisDispatch()
  const searchBoxOrNot = showAddShowButton ? <SearchBox /> : null
  return (
    <div className='calendar-bar row no-gutters'>
      <div className='col-md-3 col-sm-6'>{searchBoxOrNot}</div>
      <div className='calendar-bar__nav col-md-6 col-sm-6'>
        <a
          className='calendar-bar__back'
          onClick={() => {
            dispatch(calendarActions.decrementYear())
          }}
        >
          {'<'}
        </a>
        <span className='calendar-bar__year'>{year}</span>
        <a
          className='calendar-bar__forward'
          onClick={() => {
            dispatch(calendarActions.incrementYear())
          }}
        >
          >
        </a>
      </div>
    </div>
  )
}
