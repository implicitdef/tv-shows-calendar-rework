import * as React from 'react'
import { StoreContext } from 'redux-react-hook'
import CalendarBar from 'tv/frontend/components/calendar-bar/CalendarBar'
import CalendarCore from 'tv/frontend/components/calendar-core/CalendarCore'
import About from 'tv/frontend/components/meta/About'
import AuthBar from 'tv/frontend/components/meta/AuthBar'
import PlainLook from 'tv/frontend/components/meta/PlainLook'
import GlobalErrorBanner from 'tv/frontend/components/meta/GlobalErrorBanner'
import Store from 'tv/frontend/redux/store'
import { withPlainLook } from 'tv/frontend/services/conf'

const App: React.SFC<{}> = ({}) => {
  return (
    <StoreContext.Provider value={Store}>
      <div className='page container-fluid'>
        {withPlainLook && <PlainLook />}
        <GlobalErrorBanner />
        <AuthBar />
        <About />
        <CalendarBar />
        <CalendarCore />
      </div>
    </StoreContext.Provider>
  )
}

export const instance = <App />
