import axios, { AxiosInstance, AxiosResponse } from 'axios'
import * as Constants from 'tv/shared/constants'
import * as authThunk from 'tv/frontend/redux/thunks/auth'
import * as authDuck from 'tv/frontend/redux/ducks/auth'

import { TheState } from 'tv/frontend/redux/state'
import { TheDispatch } from 'tv/frontend/redux/actions'

export type Wirings = {
  dispatch: TheDispatch
  getState: () => TheState
}

export function getAxios({ dispatch, getState }: Wirings): AxiosInstance {
  const instance = axios.create()
  instance.interceptors.request.use(config => {
    const token = authDuck.tokenSelector(getState())
    if (token == null) {
      return config
    } else {
      config.headers[Constants.AUTH_TOKEN_HEADER] = token
      return config
    }
  })
  instance.interceptors.response.use(
    response => response,
    error => {
      if (error.response) {
        const r = error.response as AxiosResponse
        if (r.status === 401) {
          dispatch(authThunk.logout())
        }
      }
      return error
    },
  )
  return instance
}
