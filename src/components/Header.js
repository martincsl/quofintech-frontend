import React from 'react';
import {Link} from 'react-router-dom';

import { Button,ThemeProvider,  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Hidden } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import { Drawer, List, ListItem, ListItemText, ListItemIcon, Divider } from '@material-ui/core';

import mainLogo from '../assets/LogoQuo.png';

import mainTheme from '../mainTheme.js';
import Routes from '../routes.js'

const useStyles = makeStyles( (mainTheme) => ({
  buttonMenuStyle:{
    color: "white",
    backgroundColor:mainTheme.palette.primary.main,
    textTransform:"none",
    margin: "2px",
    "&:hover": {
      color:mainTheme.palette.secondary.main,
    }
  },
  buttonDrawerStyle:{
    color: "white",
    textTransform:"none",
    "&:hover": {
      color:mainTheme.palette.secondary.main
    },
  },
  logoStyle:{
    position: "relative",
    top:"5px"
  },
  grow:{
    flexGrow: 1
  },
  toolbarButtons: {
    marginLeft: 'auto',
  },
  root: {
    display: 'flex',
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
  }
})); 

export default function Header() {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
      <>
      <ThemeProvider theme = {mainTheme}>
      <AppBar position="fixed" style={{top:'0px'}}>
        <Toolbar style={{minWidth:'360'}}>

          <Link to={'/main'}> 
            <img src={mainLogo} className={classes.logoStyle} style={{ height: '45px'}}/>
         </Link>   

          <Hidden smDown>
            <Box style={{ width: '20px' }}/>    
              <Button component={Link} to={'/whoweare'} className={classes.buttonMenuStyle} size="large" disableRipple>Quienes Somos</Button>
              <Button component={Link} to={'/howitworks'} className={classes.buttonMenuStyle} size="large" disableRipple>Como Funciona?</Button>
              <Button component={Link} to={'/benefits'} className={classes.buttonMenuStyle} size="large" disableRipple>Beneficios</Button>
              <Button component={Link} to={'/contact'} className={classes.buttonMenuStyle} size="large" disableRipple>Contáctanos</Button>
              <div className={classes.grow} />
{/*}               <Button component={Link} to={'/register'} className={classes.buttonMenuStyle} size="large" disableRipple>Catastrarse</Button> */}
               <Button component={Link} to={'/login'} className={classes.buttonMenuStyle} size="large" disableRipple>Conectarse</Button>
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
        open={open}
        onClose={handleDrawerClose}
        classes={{
          paper: classes.drawerPaper,
        }}
       >
       <div className={classes.drawerContainer}>
          <List>
          <ListItem button component={Link} to={'/whoweare'} disableRipple className={classes.buttonDrawerStyle}>
               <ListItemText primary="Quienes Somos" />
            </ListItem> 
            <ListItem button component={Link} to={'/howitworks'} disableRipple className={classes.buttonDrawerStyle} >
               <ListItemText primary="Como Funciona?" />
            </ListItem> 
            <ListItem button component={Link} to={'/benefits'} disableRipple className={classes.buttonDrawerStyle}>
               <ListItemText primary="Beneficios" />
            </ListItem> 
            <ListItem button component={Link} to={'/contact'} disableRipple className={classes.buttonDrawerStyle} >
               <ListItemText primary="Contáctanos" />
            </ListItem> 
           
          </List>
          <Divider />
          <List>
            <ListItem button component={Link} to={'/register'} disableRipple className={classes.buttonDrawerStyle}>
               <ListItemText primary="Catastrarse" />
            </ListItem> 
            <ListItem button component={Link} to={'/login'} disableRipple className={classes.buttonDrawerStyle} >
               <ListItemText primary="Conectarse" />
            </ListItem> 
         </List>
        </div>
      </Drawer>
      </Hidden>
      </ThemeProvider>
    </>
  )
}
