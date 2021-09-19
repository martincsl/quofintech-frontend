import React, {useContext} from 'react';

import { Grid, Paper, Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import HeaderStore from '../components/HeaderStore';
import Footer from '../components/Footer';
import TableCollatDocs from '../components/TableCollatDocs';
import { LoginContext } from '../helper/Context.js';

const useStyles = makeStyles( (mainTheme) => ({
    contentStyle: {
      position: 'absolute',
      top: '65px',
    },
    buttonStyle: {
      color: "white",
      font: "14px",
      backgroundColor:mainTheme.palette.secondary.main,
      textTransform:"none",
      margin: "0px",
    },
    titleStyle: {
      width: "100%",   
      padding: "15px",   
      color: mainTheme.palette.secondary.main,
      backgroundColor: "white",
      marginBottom: "10px",
    },
    boxStyle: {
      width: "100%",   
      padding: "1px",   
      color: "white",
      backgroundColor: mainTheme.palette.secondary.main,
      marginBottom: "1px",
    },
    paperStyle: {
      width: "100%",   
      height:"230px",
      marginLeft:"3px",
      marginRight:"0px",
      color: "white",
      backgroundColor: mainTheme.palette.secondary.main,
      padding: "10px",
    },
    iconStyle: {
      textAlign: "center",
      display: "block",
      justifyContent: "center",
      alignItems: "center",
      margin: "auto",
      marginTop: "10px",
    }
  }))

export default function Sponsor() {

  const classes = useStyles();
  const { sponsorName } = useContext (LoginContext);
  let title=`Resumen de Pagarés - ${sponsorName}`;

  localStorage.clear();

  return (

    <>
    <HeaderStore />  

    <Grid container direction="column" alignItems="center" style= {{ minHeight: '90vh'}} >

      <Grid item xs={12} style= {{ minHeight: '0vh'}} /> 

      <Grid item xs={12} style= {{ width: '100%'}} >
        <Box className={classes.titleStyle}>      
          <Typography align="center" variant="h6" ><b>{title}</b></Typography>
        </Box>
      </Grid>
    
      <Grid item container direction="row" spacing={1} >
        
        <Grid item xs={12} md={3} >
          <Paper className={classes.paperStyle} >
            <Typography align="center" style={{color:"#1C1C49"}} gutterBottom><b>Resumen de Solicitudes</b></Typography> 
            <Button className={classes.buttonStyle} size="medium" fullWidth>Enviadas: 312</Button>
            <Button className={classes.buttonStyle} size="medium"fullWidth>Aprobadas: 98</Button>
            <Button className={classes.buttonStyle} size="medium"fullWidth>Rechazadas: 199</Button>
            <Button className={classes.buttonStyle} size="medium"fullWidth>En proceso: 12</Button>
            <Button className={classes.buttonStyle} size="medium"fullWidth>Pendientes: 3</Button>
          </Paper>
        </Grid>  
        <Grid item xs={12} md={6} > 
          <TableCollatDocs />
        </Grid>
        <Grid item xs={12} md={3} /> 
      </Grid>
    </Grid>
    
    <Grid container direction="column" alignItems="center" style= {{ minHeight: '5vh'}} />
    <Footer />
    </>
  );
}