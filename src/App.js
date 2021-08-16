import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core';

import { LoginContext } from './helper/Context';
import mainTheme from './mainTheme';
import Routes from './routes.js'
import './global.css';

function App() {

  const [ userName, setUserName ] = useState("");
  const [ sponsorName, setSponsorName ] = useState("");
  
  return (
    <LoginContext.Provider value = {{ userName, setUserName },{ sponsorName, setSponsorName }} >
      <ThemeProvider theme ={ mainTheme }>
        <Routes />
      </ThemeProvider>
    </LoginContext.Provider>
  )
}

export default App;