import React, { memo }from 'react';

import { Box, Grid, Hidden, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((mainTheme) => ({
  footerStyle: {
    bottom:"0",
    left:"0",
    width: "100%",
    height:"40px",
    position:"fixed",
    padding: "7px",  
    color: "white",
    backgroundColor: mainTheme.palette.primary.main
  }
})
);

function Footer() {

  const classes = useStyles();
  return (
    <>
    <Box className={classes.footerStyle}>
      <Grid container direction="row" xs={12}>
        <Hidden smDown>
          <Grid item xs={12} md={4}>
            <Typography variant="caption" align="left">Dirección: Pitiantuta 396, Asunción.</Typography>
          </Grid>
        </Hidden>
        <Grid item xs={12} md={4} align="center">
            <Typography variant="caption" align="center">Celular: (0983) 672-450 - E-mail: info@quofintech.com.py</Typography>
        </Grid>
        <Hidden smDown>
          <Grid item xs={12} md={4} align="right">
            <Typography variant="caption" align="right">@Copyright Quo Fintech S.A.</Typography>
          </Grid>
        </Hidden>
      </Grid>
    </Box>
    </>  
)}

export default memo(Footer);