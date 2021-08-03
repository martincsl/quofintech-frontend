import React, {useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';

import { Grid, Paper, Typography, TextField, Button, Box, Grow } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CastConnectedIcon from '@material-ui/icons/CastConnected';

import api from '../services/api';
import useForm from '../components/useForm.js';
import useUnsavedWarning from '../hooks/useUnsavedWarning.js';
import { LoginContext } from '../helper/Context.js';

import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
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
  paperAlertStyle: {
    margin: 'auto',
    padding:'10px',
    minWidth: 350,
    maxWidth:500,
    backgroundColor:"red",  
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
  // const { handleChange, handleSubmit, chkBlankFormLogin, chkFormErrors, noBlanks, values, formErrors } = useForm (submit);
  const { handleChange, handleSubmit, chkBlankFormLogin, chkFormErrors, noBlanks, values, formErrors } = useForm (handleLogon);
  const { contactName, contactMobile, contactEmail, contactMsg, userId, userPassword } = values;
  const data = { userId, userPassword } ;
  const [ isAlertOpen, setIsAlertOpen ] = useState(false);
  const [ alertMessage, setAlertMessage ] = useState({severity:"", title:"", message:""});
  const [ Prompt, setIsDirty, setIsPristine ] = useUnsavedWarning();
  const { userName, setUserName} = useContext (LoginContext);

  // const [id, setId]=useState();
  const history = useHistory();


  // async function handleLogon (e) {
  async function handleLogon () {

    // e.preventDefault();
    setIsPristine();
    try {
      alert(userId);
      alert(userPassword);
      // const response = await api.post('sessions', {'userId':userId, 'userPassword': userPassword});
      const response = await api.post('sessions', { userId, userPassword });
      
      // const response = await api.post('sessions', data);
      
      // console.log(response.data.name);

      localStorage.setItem('userId',userId);
      // localStorage.setItem('userPassword',response.data.userPassword);
  
      history.push ('/sponsor')

    } catch {
        // alert('Falha no Login. nao existe ONG cadastrada com essa Id')
        alert('Error de Login. No existe este usuario')

    }

  }
  //  const {user, password} = values
  

  const handleAlertClose = () => {
    setIsAlertOpen(false);
    setUserName(values.user);
    // alert (userName);
    if ( alertMessage.severity === "success" ) {
      history.push('/sponsor');
    }
  };

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

  return (
    <>
    <Header />

    <Grid container alignItems="center" justify="center" className={classes.contentStyle} style={{ minHeight:'70vh'}}>
      <Grid />
      <Grow in timeout = {1000}>
      <Grid item container className={classes.formStyle}>
        <Paper elevation={6} spacing={2} className={classes.paperStyle}>
          {/* <form onSubmit={handleSubmit} noValidate> */}
          <form onSubmit={handleLogon} noValidate>

            <Typography align="center" variant="subtitle1" style={{color:'white'}} gutterBottom>Conectarse a la Plataforma de Quo</Typography>
            <Box className={classes.iconBox} >
              <CastConnectedIcon className={classes.iconStyle} style={{ fontSize: 40 }}/>
            </Box>
          
            <Grid item xs={12} md={12} spacing={1}> 
              <TextField id="userId" label="Nombre de usuario *" 
                variant ="filled" margin="dense" size="small" fullWidth  
                name="userId" value={values.userId} 
                onChange={ (e) => {
                  handleChange (e,[noBlanks]);
                  setIsDirty ();
                }}
              error={formErrors.userId} ></TextField>
              {formErrors.userId ? <div className="error-helper-text">{formErrors.userId}</div> : null}
            </Grid>
            
            <Grid item xs={12} md={9} spacing={1}> 
              <TextField id="userPassword" label="Contraseña *"
                  variant ="filled" margin="dense" size="small" type="userPassword" fullWidth
                  name="userPassword" value={values.userPassword} 
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
}