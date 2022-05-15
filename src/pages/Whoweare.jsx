import React from 'react';

import { Grid, Box, Paper, Typography, Grow, Slide } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import picMcl from '../assets/mcl.jpg';
import picElh from '../assets/picelh.jpg';
import picMaz from '../assets/picmaz.jpg';

const useStyles = makeStyles( (mainTheme) => ({
  contentStyle: {
    position: 'absolute',
    top: '65px'
  },
  titleStyle:{
    width: "100%",
    padding: "15px",
    color: mainTheme.palette.secondary.main,
    backgroundColor: "white",
    marginBottom: "0px",
  },
  paragraphStyle:{
    paddingLeft:"10px",
    paddingRight:"10px",
  },
  bannerStyle:{
    width: "100%",
    padding: "15px",
    color: "white",
    backgroundColor: mainTheme.palette.secondary.main,
    marginBottom: "10px",
  },
  boxStyle:{
    width: "100%",
    padding: "1px",
    color: "white",
    backgroundColor: mainTheme.palette.primary.main,
    marginBottom: "10px",
  },
  paperStyle:{
    // minHeight: '45vh',
    height: '100%',
    [mainTheme.breakpoints.up('md')]: {
      "&:hover": {
        marginTop:"-5px",
      },
    },
  },
  photoStyle:{
    height: '90px',
    textAlign: "center",
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    marginTop: "15px",
    marginBottom:"10px",
  },  
  photoMazStyle:{
    height: '360px',
    textAlign: "center",
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    marginTop: "10px",
  }  
}))  

export default function Whoweare () {

  const classes = useStyles();

  return (
    <>
    <Header />

    <Grid container direction="column" alignItems="center" className={classes.contentStyle} >
      <Grid item xs={12} style= {{ minHeight: '0vh'}}/> 
      <Grid item xs={12} style= {{ width: '100%'}}>
        <Box className={classes.titleStyle}>      
          <Typography align="center" variant="h6" ><b>Quienes Somos</b></Typography>
         </Box>
      </Grid >

      <Slide in direction = "up" timeout = {1000}>
      <Grid item xs={12}>
        <Box className={classes.paragraphStyle}>   
          <Typography align="center" gutterBottom>En Quo Fintech nos motiva ayudar a las empresas a aumentar sus ventas y fidelizar sus clientes, a través de la venta a crédito.</Typography>
          <Typography align="center" gutterBottom>Somos una plataforma de cuotas, que se encarga de la evaluación y aprobación del crédito y de la gestión de cobranza.</Typography>
          <Typography align="center"><b>Su empresa recibe el monto al contado, no asumiendo ningún riesgo de la financiación.</b></Typography>
        </Box>
      </Grid>
      </Slide>

      <Grid item xs={12} style= {{ minHeight: '2vh'}}/> 
      <Grid item xs={12} style= {{ width: '100%'}}>
        <Box className={classes.bannerStyle}>      
          <Typography align="center" variant="subtitle1" ><b>Nuestro Equipo</b></Typography>
         </Box>
      </Grid>
      
      <Grow in timeout = {2000}>
      <Grid item container xs={12} spacing={2} >
        <Grid item direction="row" xs={12} sm={12} md={4}>
          <Paper elevation={6} className={classes.paperStyle} >
            <Typography variant="subtitle1" align="center" gutterBottom className={classes.boxStyle}>Martin Calcena Simoes Lopes</Typography>   
            <img src={picMcl} alt="Martin" className={classes.photoStyle} /> 
            <Box className={classes.paragraphStyle}>
              <Typography variant="subtitle1" align="center" gutterBottom><b>Director Gerente General</b></Typography>
              <Typography variant="subtitle2" align="center" gutterBottom>Experiencia profesional desarrollada en negocios y finanzas en Brasil, Paraguay y Estados Unidos trabajando en Texaco, Dairy Partners America (Nestlé), AON Affinity y CSA</Typography>
              <Typography variant="subtitle2" align="center" gutterBottom>Licenciado en Administración con MBA en Finanzas</Typography>
            </Box>
          </Paper>  
        </Grid>
        <Grid item direction="row" xs={12}  sm={12} md={4}>
          <Paper elevation={6} className={classes.paperStyle}  >    
            <Typography variant="subtitle1" align="center" gutterBottom className={classes.boxStyle}>Monica Arguello Zerba</Typography>   
            <img src={picMaz} alt="Monica" className={classes.photoStyle} />  
            <Box className={classes.paragraphStyle}>
              <Typography variant="subtitle1" align="center" gutterBottom><b>Gerente Comercial</b></Typography>
              <Typography variant="subtitle2" align="center" gutterBottom>Experiencia comercial en empresas de electrodomésticos, callcenter y financieras como Bouncopy, Electroban, Facilandia, Financiera Paraguayo-Japonesa y Satecsa entre otras.</Typography>
             <Typography variant="subtitle2" align="center" gutterBottom>Licenciada en Psicologia</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item direction="row" xs={12}  sm={12} md={4}>
          <Paper elevation={6} className={classes.paperStyle} >    
            <Typography variant="subtitle1" align="center" gutterBottom className={classes.boxStyle}>Ezequiel Lopez Hernandez</Typography>   
            <img src={picElh} alt="Ezequiel" className={classes.photoStyle} />  
            <Box className={classes.paragraphStyle}>
              <Typography variant="subtitle1" align="center" gutterBottom><b>Director de Tecnologia</b></Typography>
              <Typography variant="subtitle2" align="center" gutterBottom>Desarrollo de plataformas en sistemas Android e IOS, bases de datos y softwares para empresas de call center, financieras, entre otros rubros.</Typography>
              <Typography variant="subtitle2" align="center" gutterBottom>Programador Web y Mobile</Typography>
            </Box>
           </Paper>
        </Grid>
    
      </Grid>
      </Grow>
      <Grid style={{height:'8vh'}} />
    </Grid>

    <Footer />
    </>
  )
}

