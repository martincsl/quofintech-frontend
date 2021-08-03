import React from 'react';

import { Box, Typography, Slide } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

const useStyles = makeStyles( (mainTheme) => ({

  socialNetworkBox: {
    position:'fixed',
    marginTop:'150px',
    // position: 'absolute',
    bottom: '40px',
    color:mainTheme.palette.secondary.main,
    backgroundColor:'none',
    width:'100%',
    textAlign: 'center',
    AlignItems: 'center',
  }, 
  iconStyle: {
    color: mainTheme.palette.secondary.main, 
    fontSize: 30,
    backgroundColor: 'none',  
    margin:'5px',
  }
}))

export default function SocialNetworkLinks () {
  
  const classes = useStyles();  

  return (
    <>
    <Slide in direction = "up" timeout = {1600}>
      <Box className={classes.socialNetworkBox} >
        <Typography>Seguinos en nuestras redes sociales</Typography>
        <LinkedInIcon className={classes.iconStyle} />
        <TwitterIcon className={classes.iconStyle} />
        <FacebookIcon className={classes.iconStyle} />
        <InstagramIcon className={classes.iconStyle} />
      </Box>
    </Slide>
    </>
  )
}