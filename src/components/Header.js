import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { AppBar, Toolbar, IconButton, Box, Button, Hidden } from '@material-ui/core';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MenuIcon from '@material-ui/icons/Menu';
import mainLogo from '../assets/LogoQuo.png';

const useStyles = makeStyles( (mainTheme) => ({
  buttonMenuStyle: {
    color: "white",
    backgroundColor:mainTheme.palette.primary.main,
    textTransform:"none",
    margin: "2px",
    "&:hover": {
      color:mainTheme.palette.secondary.main,
    }
  },
  buttonDrawerStyle: {
    color: "white",
    textTransform:"none",
    "&:hover": {
      color:mainTheme.palette.secondary.main
    },
  },
  logoStyle: {
    position: "relative",
    // padding: "24px",
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
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
    <AppBar position="fixed" style={{top:'0px', height: '64px'}}>
      <Toolbar style={{minWidth:'360',height: '64px',paddingLeft:'24px'}}>

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
            <ListItem button component={Link} to={'/login'} disableRipple className={classes.buttonDrawerStyle} >
               <ListItemText primary="Conectarse" />
            </ListItem> 
         </List>
        </div>
      </Drawer>
    </Hidden>
    </>
  )
}
