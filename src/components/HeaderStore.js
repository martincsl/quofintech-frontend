import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AppBar, Toolbar, Box, Typography, Button, IconButton, Avatar, Hidden } from '@material-ui/core';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import ErrorIcon from '@material-ui/icons/Error';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

import { LoginContext } from '../helper/Context.js';
import mainLogo from '../assets/LogoQuo.png';
import picMcl from '../assets/mcl.jpg';

const useStyles = makeStyles( (mainTheme) => ({
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
  },
  drawer: {
    width: '240',
    flexShrink: 0,
  },
  drawerPaper: {
    width: '240',
    color: 'white',
    backgroundColor:mainTheme.palette.primary.main
  },
  drawerContainer: {
    overflow: 'auto',
  },
  avatarStyle: {
    display: 'inline-block',

    // marginLeft: 'auto',
    // marginRight: 'auto'
  }
})); 

export default function HeaderStore() {

  const classes = useStyles();
  const [ isOpen, setIsOpen ] = useState(false);
  const { userName, setUserName, sponsorName, setSponsorName } = useContext (LoginContext);
  
  let avatar = `Hola, ${userName}`;
   
  const handleDrawerOpen = () => {
    setIsOpen (true);
  };

  const handleDrawerClose = () => {
    setIsOpen (false);
  };

  return (
    <>
    <AppBar position="static">
      <Toolbar style={{minWidth:'360'}}>
        <img src={mainLogo} style={{ height: '45px' }}/>
        <Hidden smDown>
          <Box style={{ width: '20px' }}/>
          <Button component={Link} to={'/loanrequest'} className={classes.buttonMenuStyle} size="small" disableRipple startIcon={<AddCircleIcon />} >Nueva Solicitud</Button>
          <Button component={Link} to={'/inprocess'} className={classes.buttonMenuStyle} size="small" disableRipple startIcon={<AccountBalanceWalletIcon />} >Solicitudes En Analisis</Button>
          <Button component={Link} to={'/pending'} className={classes.buttonMenuStyle} size="small" disableRipple startIcon={<ReportProblemIcon />} >Solicitudes Pendientes</Button>
          <Button component={Link} to={'/approved'} className={classes.buttonMenuStyle} size="small" disableRipple startIcon={<CheckCircleIcon />} >Solicitudes Aprobadas</Button>
          <Button component={Link} to={'/rejected'} className={classes.buttonMenuStyle} size="small" disableRipple startIcon={<CancelIcon />} >Solicitudes Rechazadas</Button>
          
          <div className={classes.grow} />
          <Button component={Link} to={'/'} className={classes.buttonMenuStyle} size="small" disableRipple startIcon={<ExitToAppIcon />} >Desconectarse</Button>
          <Box className = {classes.avatarStyle} style={{width:'40px'}} >
            <Avatar alt="admin" src={picMcl} />
            {/* <Typography variant="caption" style={{color:"gray",fontSize:9}}>{avatar}</Typography> */}
          </Box>
        </Hidden>

        <div className={classes.toolbarButtons}> 
          <Hidden mdUp>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
              <MenuIcon />
            </IconButton>
          </Hidden>
       </div> 

      </Toolbar>
    </AppBar>

    <Hidden mdUp>
      <Drawer
        className={classes.drawer}
        variant="temporary"
        anchor="right"
        open={isOpen}
        onClose={handleDrawerClose}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerContainer}>
          <List>
            <ListItem button component={Link} to={'/loanrequest'} disableRipple className={classes.buttonDrawerStyle}>
              <ListItemText primary="Nueva Solicitud" />
            </ListItem> 
            <ListItem button component={Link} to={'/inprocess'} disableRipple className={classes.buttonDrawerStyle} >
              <ListItemText primary="En Analisis" />
            </ListItem> 
            <ListItem button component={Link} to={'/pending'} disableRipple className={classes.buttonDrawerStyle}>
              <ListItemText primary="Pendientes" />
            </ListItem> 
            <ListItem button component={Link} to={'/approved'} disableRipple className={classes.buttonDrawerStyle} >
              <ListItemText primary="Aprobadas" />
            </ListItem> 
            <ListItem button component={Link} to={'/rejected'} disableRipple className={classes.buttonDrawerStyle} >
              <ListItemText primary="Rechazadas" />
            </ListItem> 
          </List>
          <Divider />
          <List>
            <ListItem button component={Link} to={'/'} disableRipple className={classes.buttonDrawerStyle} >
              <ListItemText primary="Desconectarse" />
            </ListItem> 
          </List>
        </div>
      </Drawer>
    </Hidden>
    </>
  )
}
