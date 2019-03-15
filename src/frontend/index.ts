import 'babel-polyfill'
import 'bootstrap/dist/css/bootstrap.css'
import * as ReactDOM from 'react-dom'
import * as App from 'tv/frontend/components/App'
import { TheDispatch } from 'tv/frontend/redux/actions'
import Store from 'tv/frontend/redux/store'
import * as authThunk from 'tv/frontend/redux/thunks/auth'
import * as google from 'tv/frontend/services/google'

require('tv/frontend/style/index.scss')

window.addEventListener('load', async () => {
  console.log(
    `Frontend code started with process.env.NODE_ENV = ${process.env.NODE_ENV}`,
  )
  google.setup()
  const dispatch = Store.dispatch as TheDispatch
  await dispatch(authThunk.createApolloClientAndStoreIt())
  dispatch(authThunk.checkStatusOnStartupAndFetch())
  ReactDOM.render(App.instance, document.getElementById('root'))
})
