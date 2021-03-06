import React from 'react';

import { Grid, Paper, Box, Typography, Grow, Slide } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

import iconCash from '../assets/cash.png';
import iconGraph from '../assets/graph.png';
import iconCoins from '../assets/coins.png';
import iconApp from '../assets/app-money.png';
import iconFolder from '../assets/folder.png';
import iconSaving from '../assets/saving.png';

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
  boxStyle: {
    width: "100%",   
    padding: "1px",   
    color: "white",
    backgroundColor: mainTheme.palette.secondary.main,
    marginBottom: "1px",
  },
  paperStyle: {
    width: "100%",   
    height:"100%",
    marginLeft:"auto",
    marginRight:"auto",
    padding: "5px",
    [mainTheme.breakpoints.up('md')]: {
    "&:hover": {
      marginTop:"-5px",
    },},
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

export default function Benefits (){

  const classes = useStyles();  
  return (
    <>
    <Header />

    <Grid container direction="column" alignItems="center" className={classes.contentStyle} style= {{ minHeight: '85vh'}}>
      <Grid item xs={12} style= {{ minHeight: '0vh'}}/>
      <Grid item xs={12} style= {{ width: '100%'}}>
        <Box className={classes.titleStyle}>
          <Typography align="center" variant="h6" ><b>Beneficios</b></Typography>
        </Box>
      </Grid>

      <Grid item container direction="row" spacing={2} xs={12}>
      
        <Grid item direction="row" spacing={1} xs={12} sm={6} md={4}>
          <Grow in direction = "up" timeout = {1000}> 
            <Paper elevation={1} className={classes.paperStyle} style={{minHeight:'30vh'}}>
              <Typography align="center" variant="subtitle1" className={classes.boxStyle}><b>Vend?? en cuotas, cobra al contado</b></Typography>
                <img src={iconCash} className={classes.iconStyle}/>
              <Typography display="block" align="center" variant="body2" ><b>Quo posibilita que vendas financiado a tus clientes, sin que tengas que preocuparte por el an??lisis de cr??dito, la cobranza y la financiaci??n.</b></Typography>
            </Paper>
          </Grow>
        </Grid>

        <Grid item direction="row" spacing={2} xs={12} sm={6} md={4}>
          <Grow in direction = "up" timeout = {1200}> 
            <Paper elevation={1} className={classes.paperStyle} style={{minHeight:'30vh'}}>
              <Typography align="center" variant="subtitle1" className={classes.boxStyle}><b>Cuotas m??s bajas, mayores ventas</b></Typography>
              <img src={iconGraph} className={classes.iconStyle}/>
              <Typography display="block" align="center" variant="body2" ><b>Teniendo la opci??n de pagar en cuotas, m??s clientes pueden comprar.</b></Typography>
            </Paper> 
          </Grow>
        </Grid> 

        <Grid item direction="row" spacing={2} xs={12} sm={6} md={4}>
          <Grow in direction = "up" timeout = {1400}> 
            <Paper elevation={1} className={classes.paperStyle}  style={{minHeight:'30vh'}}>
              <Typography align="center" variant="subtitle1" className={classes.boxStyle}><b>Sin riesgos</b></Typography>
              <img src={iconCoins} className={classes.iconStyle}/>
              <Typography display="block" align="center" variant="body2" ><b>Quo Asume la morosidad e incobrabilidad.</b></Typography>
            </Paper>
          </Grow> 
        </Grid>

        <Grid item direction="row" spacing={2} xs={12} sm={6} md={4}>
          <Grow in direction = "up" timeout = {1600}> 
            <Paper elevation={1} className={classes.paperStyle} style={{minHeight:'30vh'}}>
              <Typography align="center" variant="subtitle1" className={classes.boxStyle}><b>F??cil</b></Typography>
              <img src={iconApp} className={classes.iconStyle}/>
              <Typography display="block" align="center" variant="body2" ><b>Sin instalaciones ni computadoras exclusivas. Bajando la app de celular o la a trav??s de p??gina web, podes ingresar los datos de tus clientes, para el an??lisis de cr??dito.</b></Typography>
            </Paper>
          </Grow>
        </Grid>

          <Grid item direction="row" spacing={2} xs={12} sm={6} md={4}>
            <Grow in direction = "up" timeout = {1600}> 
              <Paper elevation={1} className={classes.paperStyle} style={{minHeight:'30vh'}}>
                <Typography align="center" variant="subtitle1" className={classes.boxStyle} ><b>Sin costo</b></Typography>
                <img src={iconSaving} className={classes.iconStyle} style={{height:'65px'}}/>
                <Typography display="block" align="center" variant="body2" ><b>Sin costos, ni comisiones para el comercio.</b></Typography>
              </Paper>
            </Grow>  
          </Grid>

          <Grid item direction="row" spacing={1} xs={12} sm={6} md={4} >
          <Grow in direction = "up" timeout = {1600}> 
            <Paper elevation={1} className={classes.paperStyle} style={{minHeight:'30vh'}}>
              <Typography align="center" variant="subtitle1" className={classes.boxStyle}><b>Practico</b></Typography>
              <img src={iconFolder} className={classes.iconStyle}/>
              <Typography display="block" align="center" variant="body2" ><b>Sin cupos m??nimos de ventas.</b></Typography>
            </Paper>
            </Grow>
          </Grid>
      </Grid>
      <Grid style={{height:'8vh'}} />
      
      </Grid>
      <Footer />
    </>
  )
}