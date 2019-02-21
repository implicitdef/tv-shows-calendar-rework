import * as authDuck from 'tv/frontend/redux/ducks/auth'
import * as calendarDuck from 'tv/frontend/redux/ducks/calendar'
import * as metaDuck from 'tv/frontend/redux/ducks/meta'
import * as searchDuck from 'tv/frontend/redux/ducks/search'

export type TheState = {
  auth: authDuck.AuthState
  meta: metaDuck.ThisState
  search: searchDuck.ThisState
  calendar: calendarDuck.CalendarState
}
