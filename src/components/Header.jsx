import React, { useState, memo } from 'react';
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

function Header() {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const menuOptions = [
    { id:0,
      title:"Quienes Somos",
      route:"/who-we-are"
    },
    { id:1,
      title:"Como Funciona ?",
      route:"/how-it-works"
    },
    { id:2,
      title:"Beneficios",
      route:"/benefits"
    },
    { id:3,
      title:"Contáctanos",
      route:"/contact"
    },
    { id:4,
      title:"Conectarse",
      route:"/login"
    },
  ]
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
            <Button component={Link} to={menuOptions[0].route} className={classes.buttonMenuStyle}  size="large" disableRipple>{menuOptions[0].title}</Button>
            <Button component={Link} to={menuOptions[1].route} className={classes.buttonMenuStyle} size="large" disableRipple>{menuOptions[1].title}</Button>
            <Button component={Link} to={menuOptions[2].route} className={classes.buttonMenuStyle} size="large" disableRipple>{menuOptions[2].title}</Button>
            <Button component={Link} to={menuOptions[3].route} className={classes.buttonMenuStyle} size="large" disableRipple>{menuOptions[3].title}</Button>
            <div className={classes.grow} />
            <Button component={Link} to={menuOptions[4].route} className={classes.buttonMenuStyle} size="large" disableRipple>{menuOptions[4].title}</Button>
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
            <ListItem button component={Link} to={menuOptions[0].route} disableRipple className={classes.buttonDrawerStyle}>
              <ListItemText primary={menuOptions[0].title} />
            </ListItem> 
            <ListItem button component={Link} to={menuOptions[1].route} disableRipple className={classes.buttonDrawerStyle} >
              <ListItemText primary={menuOptions[1].title} />
            </ListItem> 
            <ListItem button component={Link} to={menuOptions[2].route} disableRipple className={classes.buttonDrawerStyle}>
              <ListItemText primary={menuOptions[2].title} />
            </ListItem> 
            <ListItem button component={Link} to={menuOptions[3].route} disableRipple className={classes.buttonDrawerStyle} >
              <ListItemText primary={menuOptions[3].title} />
            </ListItem> 
          </List>
          <Divider />
          <List>
            <ListItem button component={Link} to={menuOptions[4].route} disableRipple className={classes.buttonDrawerStyle} >
              <ListItemText primary={menuOptions[4].title} />
            </ListItem> 
        </List>
        </div>
      </Drawer>
    </Hidden>
    </>
  )
}

export default memo(Header);