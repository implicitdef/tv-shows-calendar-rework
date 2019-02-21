import { AuthState } from 'tv/frontend/redux/ducks/auth'
import { MetaState } from 'tv/frontend/redux/ducks/meta'
import { SearchState } from 'tv/frontend/redux/ducks/search'
import { CalendarState } from 'tv/frontend/redux/ducks/calendar'

export type TheState = {
  auth: AuthState
  meta: MetaState
  search: SearchState
  calendar: CalendarState
}
