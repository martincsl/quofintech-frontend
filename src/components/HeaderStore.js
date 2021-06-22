import React from 'react';
import {Link} from 'react-router-dom';

import { Button,ThemeProvider, createMuiTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Hidden } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import mainLogo from '../assets/LogoQuo.png';
import mainTheme from '../mainTheme.js';
import Routes from '../routes.js'


const useStyles = makeStyles({
  buttonMenuStyle:{
    color: "white",
    textTransform:"none",
    margin: "2px",
    "&:hover": {
      color:"orangered"
    },
  },
  grow:{
    flexGrow: 1
  },
  toolbarButtons: {
    marginLeft: 'auto',
  }
})

export default function HeaderStore() {

  const classes=useStyles();
  return(

    <ThemeProvider theme ={ mainTheme }>
      <AppBar position="static">
        <Toolbar style={{minWidth:'360'}}>
          <img src={mainLogo} style={{ height: '45px' }}/>
          <Hidden smDown>
            <Box style={{ width: '20px' }}/>
            <Button component={Link} to={'/loanrequest'} className={classes.buttonMenuStyle} size="large" disableRipple>Cargar Nueva Solicitud</Button>
            <Button component={Link} to={'/inprocess'} className={classes.buttonMenuStyle} size="large" disableRipple>Solicitudes En Analisis</Button>
            <Button component={Link} to={'/pending'} className={classes.buttonMenuStyle} size="large" disableRipple>Solicitudes Pendientes</Button>
            <Button component={Link} to={'/approved'} className={classes.buttonMenuStyle} size="large" disableRipple>Solicitudes Aprobadas</Button>
            <Button component={Link} to={'/rejected'} className={classes.buttonMenuStyle} size="large" disableRipple>Solicitudes Rechazadas</Button>
            
            <div className={classes.grow} />
            
            <Button component={Link} to={'/'} className={classes.buttonMenuStyle} size="large" disableRipple>Desconectarse</Button>
          </Hidden>
          <div className={classes.toolbarButtons}>
            <IconButton edge="end" color="inherit" aria-label="menu">
              <Hidden mdUp>
                <MenuIcon />
              </Hidden>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}
