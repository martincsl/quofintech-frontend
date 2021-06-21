import React from 'react';

import { Grid, Hidden, Paper, Box, Card, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

import iconCash from '../assets/cash.png';
import iconGraph from '../assets/graph.png';
import iconCoins from '../assets/coins.png';
import iconApp from '../assets/app-money.png';
import iconFolder from '../assets/folder.png';
import iconSaving from '../assets/saving.png';

const useStyles = makeStyles({
  contentStyle: {
    position: 'absolute',
    top: '65px'
  },
  titleStyle:{
    width: "100%",   
    padding: "15px",   
    color: "orangered",
    backgroundColor: "white",
    marginBottom: "10px",
  },
  boxStyle:{
    width: "100%",   
    padding: "1px",   
    color: "white",
    backgroundColor: "orangered",
    marginBottom: "1px",
  },
  paperStyle:{
    width: "100%",   
    height:"100%",
    marginLeft:"auto",
    marginRight:"auto",
  },
  iconStyle:{
    textAlign: "center",
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    marginTop: "10px",
  }
})  

export default function Services (){

  const classes=useStyles();  
  return(

    <div>
      <Header />  

      <Grid container direction="column" alignItems="center" className={classes.contentStyle} style= {{ minHeight: '90vh'}}>
        <Grid item xs={12} style= {{ minHeight: '0vh'}}/> 
        <Grid item xs={12} style= {{ width: '100%'}}>
          <Box className={classes.titleStyle}>      
            <Typography align="center" variant="h6" ><b>Servicios</b></Typography>
          </Box>
        </Grid>

        <Grid item container direction="row" spacing={2} xs={12}>
          <Grid item direction="row" spacing={1} xs={12} sm={6} md={4}>
            <Paper elevation={1} className={classes.paperStyle} style={{minHeight:'30vh'}}>
              <Typography align="center" variant="subtitle1" className={classes.boxStyle}><b>Presupuesto anual con control mensual</b></Typography>
              <img src={iconCash} className={classes.iconStyle} />  
              <Typography display="block" align="center" variant="body2" ><b>"No hay viento favorable para un barco sin rumbo". Sabes hacia donde vas y que necesitas para lograrlo?</b></Typography>
            </Paper> 
          </Grid> 

          <Grid item direction="row" spacing={2} xs={12} sm={6} md={4}>
            <Paper elevation={1} className={classes.paperStyle} style={{minHeight:'30vh'}}>
              <Typography align="center" variant="subtitle1" className={classes.boxStyle}><b>Proyección de Flujo de Caja</b></Typography>
              <img src={iconGraph} className={classes.iconStyle} />  
              <Typography display="block" align="center" variant="body2" ><b>Sabes cuanto realmente generás de caja? Muchas empresas tienen ganancia contable pero flujo de caja negativo. Si la ganancia  de tu empresa no aparece en tu cuenta, podemos ayudarlo</b></Typography>
            </Paper> 
          </Grid> 

          <Grid item direction="row" spacing={2} xs={12} sm={6} md={4}>
            <Paper elevation={1} className={classes.paperStyle}  style={{minHeight:'30vh'}}>
              <Typography align="center" variant="subtitle1" className={classes.boxStyle}><b>Preparación de documentos para bancos</b></Typography>
              <img src={iconCoins} className={classes.iconStyle}/>  
              <Typography display="block" align="center" variant="body2" ><b>Sentis que no avanzás con el banco porque siempre falta un documento. Nosotros preparamos y actualiazmos mensualmente los documentos para que tengas todo al dia</b></Typography>
            </Paper> 
          </Grid> 

          <Grid item direction="row" spacing={2} xs={12} sm={6} md={4}>
            <Paper elevation={1} className={classes.paperStyle} style={{minHeight:'30vh'}}>
              <Typography align="center" variant="subtitle1" className={classes.boxStyle}><b>Negociacion de Préstamos con instituciones</b></Typography>
              <img src={iconApp} className={classes.iconStyle} />  
              <Typography display="block" align="center" variant="body2" ><b>El banco no libera el crédito mismo con los buenos resultados? Nosostros de ayudamos en la negociación con bancos, financieras y otras instituciones.</b></Typography>
            </Paper>
          </Grid>

          <Grid item direction="row" spacing={2} xs={12} sm={6} md={4}>
            <Paper elevation={1} className={classes.paperStyle} style={{minHeight:'30vh'}}>
              <Typography align="center" variant="subtitle1" className={classes.boxStyle} ><b>Analisis de Proyectos de inversión</b></Typography>
              <img src={iconSaving} className={classes.iconStyle} style={{height:'65px'}}/>  
              <Typography display="block" align="center" variant="body2" ><b>Sabes si realmente vale la pena la nueva inversión que queres hacer? Como decidir si tenes mas de una alternativa? utilizamos las mejores herramientas para ayudarte</b></Typography>
            </Paper>
          </Grid>

          <Grid item direction="row" spacing={1} xs={12} sm={6} md={4}>
            <Paper elevation={1} className={classes.paperStyle}style={{minHeight:'30vh'}}>
              <Typography align="center" variant="subtitle1" className={classes.boxStyle}><b>Valuación de la empresa</b></Typography>
              <img src={iconFolder} className={classes.iconStyle} />  
              <Typography display="block" align="center" variant="body2" ><b>Sabes cuanto vale tu empresa? la valuación no es importante apenas para grandes empresas. Si tenes una empresa con resultados constantes, ella puede valer más de lo que te imaginas.</b></Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid style={{height:'2vh'}} />
      </Grid> 
      <Footer />
    </div>
  )
}