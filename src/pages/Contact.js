import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Grid, Paper, Box, Typography, TextField, Button, Grow } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import ContactMailIcon from '@material-ui/icons/ContactMail';

import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import AlertMessage from '../components/modals/AlertMessage';

import useForm from '../components/useForm.js';
import useUnsavedWarning from '../hooks/useUnsavedWarning';

const useStyles = makeStyles( (mainTheme) => ({
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
    fontSize:12,
    margin: "10px",
    //marginTop: "15px",
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
  formStyle:{
    backgroundColor:'white'
  }
}))

export default function Contact () {

  const classes = useStyles();  
  const { handleChange, handleSubmit, chkBlankFormContact, chkFormErrors, isValidName, isValidPhone, isValidEmail, noBlanks, isValidUser, isValidPassword,values, formErrors} = useForm (submit);
  const [ isAlertOpen, setIsAlertOpen ] = useState(false);
  const [ alertMessage, setAlertMessage ] = useState({severity:"",title:"",message:""});
  const [ Prompt, setIsDirty, setIsPristine ] = useUnsavedWarning();

  const history = useHistory();

  const handleAlertClose = () => {
    setIsAlertOpen(false);
    if (alertMessage.severity==="success"){
      history.push('/main');  
    }
  };

  function submit() {
    if (chkBlankFormContact ()){
      setAlertMessage(prevState => ( {...prevState, severity:"warning", title: "Error en entrada de datos", message:"Favor completar los dados marcados como requeridos, gracias!"}));
      setIsAlertOpen(true);
    } else if (chkFormErrors()) {
        setAlertMessage(prevState => ( {...prevState, severity:"warning", title: "Error en entrada de datos", message:"Favor corregir los dados marcados como incorrectos, gracias!"}));
        setIsAlertOpen(true);
      } else {
          setIsPristine();
          setAlertMessage(prevState => ( {...prevState, severity:"success", title: "Mensaje enviado con exito", message:"Nuestro equipo estara revisando para darle una respuesta, gracias!"}));
          setIsAlertOpen(true);
        }
  } 

  return (
    <>
    <Header />

    <Grid container direction="row" alignItems="center" justify="center" className={classes.contentStyle} style={{ minHeight:'80vh'}}>
      <Grid />
      <Grow in timeout = {1000}>
      <Grid item container className={classes.formStyle}>
        <Paper elevation={6} spacing={2} className={classes.paperStyle}>
            <form onSubmit={handleSubmit} noValidate>
              
            <Typography align="center" variant="subtitle1" style={{color:'white'}} gutterBottom>Contacto</Typography>
            <Box className={classes.iconBox} >
              <ContactMailIcon className={classes.iconStyle} style={{ fontSize: 40 }}/>
            </Box>
            <Grid item xs={12}> 
              <TextField id="name" label="Nombre *" 
                variant ="filled" margin="dense" size="small" fullWidth  
                name="name" value={values.name} 
                onChange={ (e) => {
                  handleChange (e,[noBlanks]);
                  setIsDirty();
                }}

                error={formErrors.name} ></TextField>
                {formErrors.name ? <div className="error-helper-text">{formErrors.name}</div> : null}
            </Grid>
            <Grid item xs={12} md={9}> 
              <TextField id="phone" label="Celular"
                variant ="filled" margin="dense" size="small" fullWidth
                name="phone" value={values.phone} 
                onChange={ (e) => {
                  handleChange (e,[noBlanks]);
                  setIsDirty();
                }}
                error={formErrors.phone}></TextField>
                {formErrors.phone ? <div className="error-helper-text">{formErrors.phone}</div> : null}
            </Grid>  
            <Grid item xs={12}>
            <TextField id="email" label="E-mail *" 
              variant ="filled" margin="dense" size="small" fullWidth 
              name="email" value={values.email} 
              onChange={ (e) => {
                handleChange (e,[noBlanks]);
                setIsDirty();
              }}
              onBlur = { (e) => { handleChange (e,[isValidEmail])}}
              error={formErrors.email}></TextField>
              {formErrors.email ? <div className="error-helper-text">{formErrors.email}</div> : null}
            </Grid>
            <Grid item xs={12}>
              <Typography align="left" variant="subtitle1" style={{color:'white'}} gutterBottom>Mensaje *</Typography>
              <div>
                <textarea name="message" placeholder="Escriba su mensaje" rows="4" 
                  onChange={ (e) => {
                    handleChange (e,[noBlanks]);
                    setIsDirty();
                  }}
                ></textarea>
                {formErrors.message ? <div className="error-helper-text">{formErrors.message}</div> : null}
              </div>
            </Grid>
            <Grid container direction="row" alignItems="center" justify="center"> 
              <Button type="submit" className={classes.buttonStyle} variant="outlined" disableRipple >Enviar Mensaje</Button>
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
}