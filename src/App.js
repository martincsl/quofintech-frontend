import React from 'react';
import { ThemeProvider } from '@material-ui/core';

import mainTheme from './mainTheme';
import Routes from './routes.js'
import './global.css';

function App() {

  return (

    <ThemeProvider theme={mainTheme}>
         <Routes />
    </ThemeProvider>
  )
}

export default App;
