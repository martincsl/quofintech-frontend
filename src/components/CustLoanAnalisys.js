import React, {useState, useEffect} from 'react';

import { Grid, Paper, Button, Box, TextField, Typography, Grow, Slide, InputAdornment, FormControl } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import useUnsavedWarning from '../hooks/useUnsavedwarning';
import { TramRounded } from '@material-ui/icons';

const useStyles = makeStyles( (mainTheme) => ({
  contentStyle: {
    position: 'absolute',
    top: '100px',
    /*    backgroundColor:'blue',*/
  },
  formStyle : {
    position:'absolute',
    top: '60px',
    width: '100%',
    height: '80px',
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
    backgroundColor:"#4caf50",
    //backgroundColor:mainTheme.palette.secondary.main,  
  },
  iconBox: {
    width:'100%',
    textAlign: 'center',
    AlignItems: 'center',
    color:"whitesmoke",
  },
  iconStyle: {
    color: "white",
    fontSize:30,
  },
  messageStyle: {
    color: mainTheme.palette.primary.main,
  }
}))

export default function CustLoanAnalisys ({handleChange, values, setValues, formErrors, setFormErrors, isLoanPreApproved, setIsLoanPreApproved, isValidName, isValidPhone, isValidAmount, isValidEmail, noBlanks }) {

  const classes = useStyles();  
//    const [Prompt, setDirty, setPristine] = useUnsavedWarning();

  // useEffect(() => {
  //   isLoanApproved();
  // }, []);


  function isLoanApproved (){
    if ( ! isValidAge().valid || ! isValidLaborSeniority().valid || ! isValidSalaryPaymentRatio().valid ) {
      setIsLoanPreApproved(false);
      return {
        valid: false,
        title: "Analisis Preliminar - Solicitud Rechazada",
        bkColor: "#f44336"
      } ;
    } else {
      setIsLoanPreApproved(true);
      return {
        valid: true,
        title: "Analisis Preliminar - Solicitud Pre-Aprobada",
        bkColor: "#4caf50"
      } ;
    }
  }

  function isValidAge () {
      let yearBorn=values.customerBirthDate.slice(values.customerBirthDate.length - 4);
      let today = new Date();
      let currentYear=today.getFullYear()
      let age = currentYear - yearBorn
      //condiciones de rechazo:
      //menor que 21 
      //entre 21 y 23 pero con menos de 18 meses de antiguedad
      //mayor que 65
      if (yearBorn==="") {
        return {valid:false, message:"Fecha de Nacimiento no fue informada"}  
      }
      else if (age < 21) {
        return {valid:false, message:"Solicitante tiene que tener mas de 21 anos"}  

      } else if ( age> 20 && age < 23 && values.customerLaborSeniority < 19){
          return {valid:false, message:"Entre 21 y 23 anos, antiguedad debe ser al menos de 18 meses"}

      } else if(age > 65) {
         return {valid:false, message:"Solicitante tiene que tener hasta 65 anos"}

      } else
         return {valid: true, message:"Edad de acuerdo a la política de créditos"}
   }  
 
   function isValidLaborSeniority () {

    // 1=contratado con ips, 2=contratado c/ factura 3=funacionario publico, 4=profesional independiente
    if (values.customerLaborSeniority==="") {
      return {valid:false, message:"Antiguedad no fue informada"}
    }
    else if (values.customerHiringType < 4) {
      if (values.customerLaborSeniority < 12) {
        return {valid:false, message:"Antiguedad tiene que ser de al menos 12 meses"}
      }  
    } else if (values.customerLaborSeniority < 18) {
        return {valid:false, message:"Antiguedad de profesional independiente tiene que ser de al menos 18 meses"}
    }
    return {valid:true, message:"Antiguedad de acuerdo a la política de créditos"}
  }

  function isValidSalaryPaymentRatio () {
    if (values.customerSalary===""){
      return {valid: false, message:"Salario no fue informado"}
    }
    else if (values.customerSalary < 2500001) {
      if ((values.customerSalary * 0.2) < values.loanPayment){
        return {valid: false, message:"Cuota no puede ser mayor a 20% del salario"}
      }
    } else if (values.customerSalary > 2500000 && values.customerSalary < 3500001){
        if ((values.customerSalary * 0.22) < values.loanPayment){  
          return {valid: false, message:"Cuota no puede ser mayor a 22% del salario"}
        }
    } else if (values.customerSalary > 3500000 && values.customerSalary < 4500001){
        if ((values.customerSalary * 0.23) < values.loanPayment){
          return {valid: false, message:"Cuota no puede ser mayor a 23% del salario"}
        }
    } if (values.customerSalary > 4500000) {
      if ((values.customerSalary * 0.25) < values.loanPayment){
        return {valid: false, message:"Cuota no puede ser mayor a 25% del salario"}
      }
    }
    return {valid:true, message:"Relación salario/cuota de acuerdo a política de créditos"}
  }

    return (
      <div>
      <Grid container direction="row" alignItems="center" justify="center" className={classes.contentStyle} style={{ minHeight:'70vh'}}>
        <Grid className={classes.formStyle}>
          <Paper elevation={6} spacing={2} className={classes.paperStyle} style={{ backgroundColor: isLoanApproved().valid ? "#4caf50" : "#f44336" }}> 
            <form noValidate>
            
              <Box className={classes.iconBox} style={{height:40}}>
                 {isLoanApproved().valid ? <CheckCircleOutlineIcon style={{fontSize:40}}/> : <HighlightOffIcon style={{fontSize:40}} /> }  
              </Box>
              <Typography align="center" variant="subtitle1" style={{color:'white'}} gutterBottom>{isLoanApproved().title}</Typography>

                  
                  <Box style={{height:5}}/>

                  <Grid item container directio="row" xs={12} md={12} spacing={1} >
                    <Grid item xs={6} xs={3} align="right">
                       {isValidAge().valid ? <CheckCircleOutlineIcon className={classes.iconStyle}/> : <HighlightOffIcon className={classes.iconStyle} /> }  
                    </Grid> 
                    <Grid item xs={6} xs={9} align="left">
                      <Typography variant="subtitle1" align="left" style={{color:'white'}}>Edad:</Typography>
                      <Typography variant="caption" align="left" className={classes.messageStyle}>{isValidAge().message}</Typography>
                    </Grid> 
                  </Grid>
                   
                  <Grid item container directio="row" xs={12} md={12} spacing={1} >
                    <Grid item xs={6} xs={3} align="right">
                      {isValidLaborSeniority().valid ? <CheckCircleOutlineIcon className={classes.iconStyle}/> : <HighlightOffIcon className={classes.iconStyle} /> }  
                    </Grid> 
                    <Grid item xs={6} xs={9}  align="left">
                      <Typography variant="subtitle1"align="left" style={{color:'white'}}>Antiguedad laboral mínima:</Typography>
                      <Typography variant="caption" align="left" className={classes.messageStyle}>{isValidLaborSeniority().message}</Typography>
                    </Grid> 
                  </Grid> 

                  <Grid item container directio="row" xs={12} md={12} spacing={1} >
                    <Grid item xs={6} xs={3} align="right">
                      <CheckCircleOutlineIcon className={classes.iconStyle} /> 
                    </Grid> 
                    <Grid item xs={6} xs={9} align="left">
                      <Typography variant="subtitle1" align="left" style={{color:'white'}}>Monto máximo por profesión:</Typography>
                      <Typography variant="caption" align="left" className={classes.messageStyle}>Monto máximo de acuerdo a la política de crédito</Typography>
                    </Grid> 
                  </Grid> 

                  <Grid item container directio="row" xs={12} md={12} spacing={1} >
                    <Grid item xs={6} xs={3} align="right">
                      {isValidSalaryPaymentRatio().valid ? <CheckCircleOutlineIcon className={classes.iconStyle}/> : <HighlightOffIcon className={classes.iconStyle} /> }  
                    </Grid> 
                    <Grid item xs={6} xs={9} align="left">
                      <Typography variant="subtitle1" align="left" style={{color:'white'}}>Relación salario y monto:</Typography>
                      <Typography variant="caption" align="left" className={classes.messageStyle}>{isValidSalaryPaymentRatio().message}</Typography>
                    </Grid> 
                  </Grid> 

              <Box style={{height:15}}/>
{/*}          <Typography gutterBottom align="center" variant="subtitle1" style={{color:'white'}}>El proximo paso es cargar los documentos respaldatorios.</Typography>  */}
            </form>
          </Paper>
        </Grid>
      </Grid>
      </div>
    )
}