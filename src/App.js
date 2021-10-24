import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core';

import { LoginContext } from './helper/Context';
import mainTheme from './mainTheme';
import Routes from './routes.js'
import './global.css';

function App() {

  const [ userId, setUserId ] = useState ("");
  const [ userName, setUserName ] = useState ("");
  const [ sponsorId, setSponsorId ] = useState ("");
  const [ sponsorName, setSponsorName ] = useState ("");
  
  return (
    <LoginContext.Provider value = {{ userId, setUserId, userName, setUserName, sponsorId, setSponsorId, sponsorName, setSponsorName }} >
      <ThemeProvider theme = { mainTheme } >
        <Routes />
      </ThemeProvider>
    </LoginContext.Provider>
  )
}

export default App;