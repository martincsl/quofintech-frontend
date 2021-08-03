import React from 'react';
import { Link } from 'react-router-dom';

import { Grid, Button, Typography, Slide, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import mainVideo from './assets/videoQuoWeb.mp4';
// import MobileImg from './assets/FotoQuoMobile.jpg';
import SmallScrreenImg from './assets/FotoQuoReduc.jpg';

import Header from './components/Header'
import Footer from './components/Footer'
import Carousel from './Carousel';
import SocialNetworksLinks from './components/SocialNetworksLinks';

const useStyles = makeStyles( (mainTheme) => ({
  contentStyle: {
    position: 'absolute',
    top: '65px'
  },
  buttonStyle:{
    color: "white",
    backgroundColor:mainTheme.palette.secondary.main,
    textTransform:"none",
    width: "290px",
    margin: "2px",
    "&:hover": {
      color:mainTheme.palette.secondary.main,
      backgroundColor:mainTheme.palette.primary.main,
    },
  },
  inputStyle: {
    background: "white",
  },
  formStyle:{
    backgroundColor:'orange'
  },
}))

export default function Main () {

  const classes = useStyles();  

  return (
    // <div className="main-container">
    <div>
    <Header />
   
      <div className="video-container">
        {/* <Hidden smDown> */}
        <Hidden xsDown>

          <video autoPlay loop muted
          >
            <source src={mainVideo} type="video/mp4"/>
          </video>
        </Hidden>   
      </div>  

      {/* <div className="image-container">
        <Hidden smUp>
          <img src={MobileImg} alt="mobile image" />  
        </Hidden>
      </div> */}
      
      {/* <Hidden mdUp> */}
      <Hidden smUp>
        <div className="image-ss-container">
          <img src={SmallScrreenImg} alt="small screen image" />  
        </div>
      </Hidden>
      <div className="video-section-info">
        <Grid container direction="row" alignItems="center" justify="center" style={{ minHeight:'30vh'}} /> 

         <Grid container direction="row" alignItems="center" justify="center" style={{minHeight:'35px'}}>
           <div style={{backgroundColor:'white'},{height:'20vh'}}></div>
          <Hidden mdUp>
            <Grid item spacing={2} xs={12} > 
              <Typography align="center" variant="h4" >Aumenta sus ventas hoy!</Typography>
            </Grid>
          </Hidden>

          <Hidden smDown>

            <Grid item container direction="column" alignItems="center" justify="center" spacing={2}  >
              <Carousel />
            </Grid>
          </Hidden>
          <Slide in direction = "up" timeout = {1000}>
            <Grid item container direction="row" alignItems="center" justify="center" spacing={2} xs={12} > 
             <Button className={classes.buttonStyle} component={Link} to={'/contact'} variant="outlined" size ="large" disableRipple>Me interesa ! Quiero catastrarme</Button>
             <Button className={classes.buttonStyle} component={Link} to={'/login'}variant="contained" size ="large"disableRipple>Ya soy cliente, quiero conectarme</Button>
            </Grid>
          </Slide>
      </Grid>
      <SocialNetworksLinks />
      <Footer />
    
    </div> 

  </div>
)
}