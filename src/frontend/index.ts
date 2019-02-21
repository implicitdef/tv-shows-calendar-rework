import 'babel-polyfill'
import 'bootstrap/dist/css/bootstrap.css'
import * as ReactDOM from 'react-dom'
import * as App from 'tv/frontend/components/App'

import * as authThunk from 'tv/frontend/redux/thunks/auth'
import * as google from 'tv/frontend/services/google'
import Store from 'tv/frontend/redux/store'
import { TheDispatch } from 'tv/frontend/redux/actions'
require('tv/frontend/style/index.scss')

window.addEventListener('load', () => {
  console.log(
    `Frontend code started with process.env.NODE_ENV = ${process.env.NODE_ENV}`,
  )
  google.setup()
  const dispatch = Store.dispatch as TheDispatch
  dispatch(authThunk.checkStatusOnStartupAndFetch())
  ReactDOM.render(App.instance, document.getElementById('root'))
})
