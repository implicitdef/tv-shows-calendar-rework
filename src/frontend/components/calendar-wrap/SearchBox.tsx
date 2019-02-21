import * as React from 'react'
import { useCallback } from 'react'
import * as searchDuck from 'tv/frontend/redux/ducks/search'
import { TheState } from 'tv/frontend/redux/state'
import * as followingThunk from 'tv/frontend/redux/thunks/following'
import * as searchThunk from 'tv/frontend/redux/thunks/search'
import { useThisDispatch, useThisMappedState } from 'tv/frontend/redux/utils'
import * as Domain from 'tv/shared/domain'

export default function SearchBox() {
  const mapState = useCallback(
    (state: TheState) => ({
      shows: searchDuck.resultsSelector(state),
      input: searchDuck.inputSelector(state),
      open: searchDuck.isOpenSelector(state),
    }),
    [],
  )
  const { shows, input, open } = useThisMappedState(mapState)
  const dispatch = useThisDispatch()
  const onInput = (input: string) => dispatch(searchThunk.searchShows(input))
  const onSubmit = (show: Domain.Show) =>
    dispatch(followingThunk.followShow(show.id))
  const onOpen = () => dispatch(searchDuck.actions.open())
  return (
    <div className='search-box'>
      <input
        type='text'
        className='search-box__input'
        onChange={e => onInput(e.target.value)}
        value={input}
        onFocus={onOpen}
        placeholder='Add a TV show'
      />
      <div className='search-box__results'>
        <ul className='search-box__results-inner'>
          {open &&
            shows.slice(0, 10).map(show => (
              <li
                key={show.id}
                onClick={() => {
                  onSubmit(show)
                }}
              >
                {show.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
