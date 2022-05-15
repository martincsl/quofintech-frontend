import React from 'react';

import { Grid, Hidden, Typography, Grow } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

import beginImg from '../assets/begin.png';
import saleImg from '../assets/sale.png';
import collectImg from '../assets/collect.png';

const useStyles = makeStyles( (mainTheme) => ({
  contentStyle: {
    position: 'absolute',
    top: '65px',
  },
  titleStyle: {
    width: "100%",
    padding: "15px",
    color: mainTheme.palette.secondary.main,
    backgroundColor: "white",
    marginBottom: "10px",
  },
  bannerStyle: {
    width: "100%",
    padding: "15px",
    color: "white",
    backgroundColor: mainTheme.palette.secondary.main,
    marginBottom: "10px",
    },
  photoStyle: {
    height: '30px',
    marginLeft: "auto",
    marginRight: "auto",
  }
}))

export default function Howitworks () {

  const classes = useStyles();

  return (

    <div>
      <Header />
 
      <Grid container direction="column" className={classes.contentStyle}>
        <Grid item xs={12} className={classes.titleStyle}>
          <Typography align="center" variant="h6" ><b>Como Funciona ?</b></Typography>
        </Grid>

        <Grid item xs={12} className={classes.bannerStyle}>
          <Typography align="center" variant="subtitle1" ><b>1. El Inicio</b></Typography> 
        </Grid>
        <Grow in timeout={1000}>
        <Grid align="center">
          <Hidden smUp>
            <img src={beginImg} style={{ height: '90px' }}/>  
          </Hidden>
          <Hidden xsDown>
            <img src={beginImg} style={{ height: '210px' }}/>  
          </Hidden>
        </Grid>
        </Grow>

        <Grid item xs={12} className={classes.bannerStyle}>
          <Typography align="center" variant="subtitle1" ><b>2. La Venta</b></Typography> 
        </Grid>
        <Grow in timeout={1000}>
        <Grid align="center">
          <Hidden smUp>
            <img src={saleImg} style={{ height: '120px' }}/> 
          </Hidden> 
          <Hidden xsDown>
            <img src={saleImg} style={{ height: '210px' }}/> 
          </Hidden>
        </Grid>
        </Grow>

        <Grid item xs={12} className={classes.bannerStyle}>
          <Typography align="center" variant="subtitle1" ><b>3. El Cobro</b></Typography> 
        </Grid>
        <Grow in timeout={1000}>
          <Grid align="center" style={{marginBottom: '60px'}}>
            <Hidden smUp>
              <img src={collectImg} style={{ height: '86px' }}/> 
            </Hidden>
            <Hidden xsDown>
              <img src={collectImg} style={{ height: '150px' }}/> 
            </Hidden>
          </Grid>
        </Grow>
      </Grid>
 
       <Footer /> 
      </div>
    )
  }