import * as React from 'react'
import { StoreContext } from 'redux-react-hook'
import CalendarCore from 'tv/frontend/components/calendar-core/CalendarCore'
import CalendarBar from 'tv/frontend/components/calendar-bar/CalendarBar'
import About from 'tv/frontend/components/meta/About'
import AuthBar from 'tv/frontend/components/meta/AuthBar'
import GlobalErrorBanner from 'tv/frontend/components/meta/GlobalErrorBanner'
import Store from 'tv/frontend/redux/store'

const App: React.SFC<{}> = ({}) => {
  return (
    <StoreContext.Provider value={Store}>
      <div className='page container-fluid'>
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
