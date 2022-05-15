import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { Grid, Paper, Typography, TextField, Button, Box, Grow } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CastConnectedIcon from '@material-ui/icons/CastConnected';

import { LoginContext } from '../helper/Context.js';
import api from '../services/api';
import useForm from '../components/useForm.js';
import useUnsavedWarning from '../hooks/useUnsavedWarning.js';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import AlertMessage from '../components/modals/AlertMessage.js';

const useStyles = makeStyles((mainTheme) => ({
  contentStyle: {
    position: 'absolute',
    top: '65px'
  },
  paperStyle: {
    margin: 'auto',
    padding:'10px',
    minWidth: 350,
    maxWidth: 500,
    backgroundColor:mainTheme.palette.secondary.main,  
  },
  buttonStyle:{
    color: "white",
    backgroundColor:mainTheme.palette.primary.main,
    textTransform:"none",
    margin: "10px",
//    marginTop: "15px",
    "&:hover": {
      color:mainTheme.palette.secondary.main,
      backgroundColor:mainTheme.palette.primary.main,
    },
  },
  iconBox:{
    width:'100%',
    textAlign: 'center',
    AlignItems: 'center',
  },
  iconStyle:{
    color: mainTheme.palette.primary.main, 
  },
  inputStyle: {
    background: "white",
  },
  alertStyle:{
    position:'relative',
    top: '180px'
  },
  formStyle:{
    backgroundColor:'white'
  }
}))

  export default function Login () {

    const classes = useStyles();  
    const { handleChange, handleChangeUserId, handleSubmit, chkBlankFormLogin, noBlanks, userId, values, formErrors } = useForm (handleLogon);
    // const { userId, userPassword } = values;
    const { userPassword } = values;
    const [ isAlertOpen, setIsAlertOpen ] = useState(false);
    const [ alertMessage, setAlertMessage ] = useState({severity:"", title:"", message:""});
    const [ Prompt, setIsDirty, setIsPristine ] = useUnsavedWarning();
    const { setUserId, setUserName, setSponsorId, setSponsorName} = useContext (LoginContext);
    const history = useHistory();
    // localStorage.clear();
    // localStorage.clear();
    async function handleLogon () {


    if (chkBlankFormLogin ()){
      // setAlertMessage(prevState => ( {...prevState, severity:"warning", title: "Error en entrada de datos", message:"Favor completar los dados marcados como requeridos, gracias !"}));
      setAlertMessage({severity:"warning", title: "Error en entrada de datos", message:"Favor completar los dados marcados como requeridos, gracias !"});
      setIsAlertOpen(true);
    } 
      else {
        setIsPristine();
        try {
          console.count();
          const data = { userId, userPassword } ;
          const response = await api.post('/sessions', data );
          setUserId (response.data.userId);
          setUserName (response.data.userName);
          setSponsorId (response.data.sponsorId);
          setSponsorName (response.data.sponsorName);
          setAlertMessage (prevState => ({...prevState, severity:"success", title: "Sesión iniciada con exito", message: "Iniciando la sesión en la plataforma de Quo" }));
          setIsAlertOpen (true);
          localStorage.setItem('sponsorId',response.data.sponsorId);
          localStorage.setItem('sponsorName',response.data.sponsorName);
          localStorage.setItem('userId',response.data.userId);
          localStorage.setItem('userName',response.data.userName);
        } catch (err) {
          if (err.response) {
            const errorMsg = Object.values(err.response.data);
            setAlertMessage(prevState => ({...prevState, severity:"warning", title: "Error en inicio de sessión", message: errorMsg }));
            setIsAlertOpen(true);
          } else if(err.request) {
              setAlertMessage(prevState => ({...prevState, severity:"warning", title: "Error en inicio de sessión", message: "Servidor no disponible. Favor intentar nuevamente en unos minutos." }));
              setIsAlertOpen(true);
            } else {
                setAlertMessage(prevState => ({...prevState, severity:"warning", title: "Error en inicio de sessión", message: "Servidor no disponible. Favor intentar nuevamente en unos minutos." }));
                setIsAlertOpen(true);
              }
          }
      }

    }
 
  const handleAlertClose = () => {
    setAlertMessage(prevState => ({...prevState, severity:"", title: "", message: "" }));
    setIsAlertOpen(false);
    if ( alertMessage.severity === "success" ) {
      history.push('/sponsor');
    }
  };

  return (
    <>
    <Header />

    <Grid container alignItems="center" justify="center" className={classes.contentStyle} style={{ minHeight:'70vh'}}>
      <Grid />
      <Grow in timeout = {1000}>
      <Grid item container className={classes.formStyle}>
        <Paper elevation={6} spacing={2} className={classes.paperStyle}>
          {/* <form onSubmit={handleSubmit} noValidate> */}
          <form onSubmit={handleSubmit} noValidate>

            <Typography align="center" variant="subtitle1" style={{color:'white'}} gutterBottom>Conectarse a la Plataforma de Quo</Typography>
            <Box className={classes.iconBox} >
              <CastConnectedIcon className={classes.iconStyle} style={{ fontSize: 40 }}/>
            </Box>
          
            <Grid item xs={12} md={12} spacing={1}> 
              <TextField id="userId" label="Usuario *" 
                variant ="filled" margin="dense" size="small" fullWidth  
                name="userId" 
                value= { userId } 
                onChange={ (e) => {
                  handleChangeUserId (e,[noBlanks]);
                  setIsDirty ();
                }}
              error={formErrors.userId} 
              ></TextField>
              {formErrors.userId ? <div className="error-helper-text">{formErrors.userId}</div> : null}
            </Grid>
            
            <Grid item xs={12} md={9} spacing={1}> 
              <TextField id="userPassword" label="Contraseña *"
                  variant ="filled" margin="dense" size="small" type="password" fullWidth
                  name="userPassword" 
                  value={values.userPassword} 
                  onChange={ (e) => {
                  handleChange (e,[noBlanks]);
                  setIsDirty ();
                }}
                error={formErrors.userPassword}></TextField>
                {formErrors.userPassword ? <div className="error-helper-text">{formErrors.userPassword}</div> : null}
          
            </Grid>
            <Grid container direction="row" alignItems="center" justify="center"> 
              <Button type="submit" className={classes.buttonStyle} variant="outlined" disableRipple >Iniciar Sesión</Button>
            </Grid>
          </form>
        </Paper>
      </Grid>
      </Grow>
      <Grid />
    </Grid>
    {Prompt}
    <AlertMessage open={isAlertOpen} onClose={handleAlertClose} severity={alertMessage.severity} title={alertMessage.title}>
      {alertMessage.message}
    </AlertMessage>
    <Footer />
    </>
  )
    // function submit() {
  //   if (chkBlankFormLogin ()){
  //     setAlertMessage(prevState => ( {...prevState, severity:"warning", title: "Error en entrada de datos", message:"Favor completar los dados marcados como requeridos, gracias!"}));
  //     setIsAlertOpen(true);
 
  //   } else if (chkFormErrors()) {
  //     setAlertMessage(prevState => ( {...prevState, severity:"warning", title: "Error en entrada de datos", message:"Favor corregir los dados marcados como incorrectos, gracias!"}));
  //     setIsAlertOpen(true);
   
  //     } else {

  //       setIsPristine();
  //       setAlertMessage(prevState => ( {...prevState, severity:"success", title: "Iniciando Sesión en la plataforma de Quo", message:""}));
  //       setIsAlertOpen(true);
        
  //       // console.log(isDirty);
  //       // history.push('/sponsor');  
  //     }
  // } 
}