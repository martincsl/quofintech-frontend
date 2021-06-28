import React, {useState, useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import { Redirect, Route } from "react-router-dom";
import { Grid, Paper, TextField, Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import useFormCustomer from '../components/useFormCustomer';
import usePreliminaryLoanValidation from '../hooks/usePreliminaryLoanValidation';

import AlertMessage from './modals/AlertMessage';
import AlertDialog from './modals/AlertDialog';
import CitiesSelect from './selects/CitiesSelect';
import OccupationSelect from './selects/OccupationSelect';
import MobilePrefixSelect from './selects/MobilePrefixSelect';
import NumberFormatDate from './formats/NumberFormatDate.js';
import NumberFormatCI from './formats/NumberFormatCI.js';
import NumberFormatPhone from './formats/NumberFormatPhone.js';

//maxHeight: 48,
const useStyles = makeStyles( (mainTheme) => ({
  root: {
    flexGrow: 1,
  },
  formControl: {
    marginTop: mainTheme.spacing(1),
    minWidth: 260,
    maxHeight: 36,
  },
  contentStyle: {
    position: 'absolute',
    top: '100px',
    /*    backgroundColor:'blue',*/
  },
  formStyle : {
    position:'absolute',
    top: '60px',
    width: '100%',
    height: '60px',
 },
  buttonStyle:{
    color: "white",
    backgroundColor:mainTheme.palette.primary.main,
    textTransform:"none",
    margin: "10px",
    //marginTop: "15px",
    "&:hover": {
    color:mainTheme.palette.secondary.main,
    backgroundColor:mainTheme.palette.primary.main,
    },
  },
  paperStyle: {
    margin: 'auto',
    padding:'10px',
    minWidth: 350,
    maxWidth: 550,
    height: 400,
    backgroundColor:mainTheme.palette.secondary.main,  
  },
  input: {
    display: 'none',
  },
}))

export default function CustPersonalDetail ({handleChange, values, setValues, formErrors, setFormErrors,isValidName, isValidPhone, isValidAmount, isValidEmail, noBlanks }) {

  const classes = useStyles();  
  //const {handleChange, handleChangeStorage, bulkHandleChange, handleChangeSalary, handleSubmit,  chkBlankFormCustomer, chkFormErrors, isValidName, isValidPhone, isValidAmount, isValidEmail, noBlanks,  values, formErrors} =  useFormCustomer ();
  const {isValidAge} = usePreliminaryLoanValidation({values, setValues, formErrors, setFormErrors});
  const [isAlertOpen,setIsAlertOpen]=useState(false);
  const [alertMessage,setAlertMessage]=useState({severity:"",title:"",message:""});
  const [isDialogOpen,setIsDialogOpen]=useState(false);
  const [dialogMessage,setDialogMessage]=useState({title:"",message:""});
  const dialogButtons = {button1:"Salir",button2:"Nueva Solicitud"};
  const dialogBtnsUnmount = {button1:"Salir",button2:"Seguir cargando"};

  useEffect(() => {
    localStorage.setItem("stateData", JSON.stringify(values));
  });

  const handleDialogClose = (value) => {
    setIsDialogOpen(false);
    setDialogMessage( {title: "", message:""});
   if (value==="Seguir Cargando"){
        <Redirect to="/loanrequest" />
    } else {
      alert ("else que hago?");
    } 
  };

{/*} 
  useEffect(() => {
    //  if (values.loanCapital > 0 && values.loanTerm > 0) {

      if (values.customerBirthDate !=="") {
        const result = isValidAge();
        const valid = result.valid;
        
        if (! result.valid) {
          setIsAlertOpen(true);
          setAlertMessage(prevState => ( {...prevState, severity:"warning", title: "Atencion", message:result.message}));
        }
      }
      }, [values.customerBirthDate] );
    */} 

    return (
      <div className={classes.root}>
      <Grid container direction="row" alignItems="center" justify="center" className={classes.contentStyle} style={{ minHeight:'70vh'}}>
        <Grid className={classes.formStyle}>
       
         <Paper elevation={6} spacing={2} className={classes.paperStyle}> 
            <Typography align="center" variant="subtitle1" style={{color:'white'}} gutterBottom>Datos Personales</Typography>
 
            <Grid item container direction="row" spacing={1}>
              <Grid item xs={6} md={3} > 
                <TextField
                  label="Numero de Cedula *"
                  value={values.customerId}
                  onChange={(e) => handleChange (e,[noBlanks])}
                  variant="filled"
                  fullWidth
                  name="customerId"
                  id="formatted-numberformat-input"
                  InputProps={{
                    inputComponent: NumberFormatCI,
                  }}
                />
                {formErrors.customerId ? <div className="error-helper-text">{formErrors.customerId}</div> : null} 
              </Grid>
                 
              <Grid item xs={6} md={9} > 
                <TextField id="customerName" label="Nombre del cliente *" 
                  variant ="filled" margin="none"  fullWidth
                  name="customerName" value={values.customerName} onChange={ (e) => handleChange (e,[isValidName])}
                  error={formErrors.customerName} ></TextField>
                  {formErrors.customerName ? <div className="error-helper-text">{formErrors.customerName}</div> : null} 
              </Grid>
            </Grid>
              
              <Grid item container direction="row" spacing={1}> 
                <Grid item xs={4} md={3} > 
                
                  <TextField
                    label="Fecha Nacimiento *"
                    value={values.customerBirthDate}
                    onChange={(e) => handleChange (e,[noBlanks])}
                    variant="filled"
                    fullWidth
                    name="customerBirthDate"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatDate,
                    }}
                  />
                  {formErrors.customerBirthDate ? <div className="error-helper-text">{formErrors.customerBirthDate}</div> : null} 
                </Grid>
                <Grid item xs={8} md={6} > 
                   <OccupationSelect value={values.customerOccupation} onChange={(e) => handleChange (e,[noBlanks])} name="customerOccupation"/>
                </Grid>
              </Grid>

             <Grid item container direction="row" spacing={1}>
                <Grid item xs={12} md={9}> 
                  <TextField id="customerAddress" label="Dirección *"
                  variant ="filled" margin="none"  type="customerAddress" fullWidth
                  name="customerAddress" value={values.customerAddress} onChange={(e) => handleChange (e,[noBlanks])}
                  error={formErrors.customerAddress}></TextField>
                  {formErrors.customerAddress ? <div className="error-helper-text">{formErrors.customerAddress}</div> : null}
                </Grid>

                <Grid item xs={12} md={3}>
                  <CitiesSelect value={values.customerCity} onChange={(e) => handleChange (e,[noBlanks])} name="customerCity"/> 
                </Grid>
             </Grid>

             <Grid item container direction="row" spacing={1} >
                <Grid item xs={4} md={3}>
                  <MobilePrefixSelect value={values.customerMobilePrefix} onChange={(e) => handleChange (e,[noBlanks])} name="customerMobilePrefix"/> 
                </Grid>

                <Grid item xs={4} md={3}>
                  <TextField
                    label="Celular *"
                    value={values.customerMobile}
                    onChange={(e) => handleChange (e,[noBlanks])}
                    variant="filled"
                    fullWidth
                    name="customerMobile"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatPhone,
                    }}
                  />
                  {formErrors.customerMobile ? <div className="error-helper-text">{formErrors.customerMobile}</div> : null}
                </Grid>
 
                <Grid item xs={9} md={6}> 
                  <TextField id="customerEmail" label="E-mail *"
                  variant ="filled" margin="none"  type="customerEmail" fullWidth
                  name="customerEmail" value={values.customerEmail} onChange={(e) => handleChange (e,[noBlanks])}
                  error={formErrors.customerEmail}></TextField>
                  {formErrors.customerEmail ? <div className="error-helper-text">{formErrors.customerEmail}</div> : null}
                </Grid>
             </Grid>

             </Paper> 
        </Grid>
      </Grid>
      <AlertDialog open={isDialogOpen} onClose={handleDialogClose} severity="success" title={dialogMessage.title} buttons={dialogButtons}>
        {dialogMessage.message}
      </AlertDialog> 
    </div>
    )
}
