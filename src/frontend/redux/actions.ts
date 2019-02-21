import * as redux from 'redux'
import * as reduxThunk from 'redux-thunk'
import { TheState } from 'tv/frontend/redux/state'
import { AuthAction } from 'tv/frontend/redux/ducks/auth'
import { MetaAction } from 'tv/frontend/redux/ducks/meta'
import { SearchAction } from 'tv/frontend/redux/ducks/search'
import { CalendarAction } from 'tv/frontend/redux/ducks/calendar'

export type PlainAction = redux.Action<String> &
  (AuthAction | MetaAction | SearchAction | CalendarAction)

// alias for our redux-thunk actions
export type SomeThunkAction<R> = reduxThunk.ThunkAction<
  Promise<R>,
  TheState,
  null,
  PlainAction
>

export type TheDispatch = reduxThunk.ThunkDispatch<TheState, null, PlainAction>
