import React, {useEffect} from 'react';

import { Grid, Paper, Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import usePreliminaryLoanValidation from '../hooks/usePreliminaryLoanValidation';

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
    position:'absolute',
    padding:'10px',
    top: '60px',
    width: '100%',
    maxWidth: 550,
    height: 400,
    [mainTheme.breakpoints.down('sm')]: {
      top: '0px',
      minWidth: 350,
      height: 500,
      marginLeft:5,
      marginRight: 5,
    },
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

// export default function CustLoanAnalisys ({handleChange, values, setValues, formErrors, setFormErrors, isLoanPreApproved, setIsLoanPreApproved, isValidName, isValidPhone, isValidAmount, isValidEmail, noBlanks }) {
export default function CustLoanAnalisys ({values, isLoanPreApproved, setIsLoanPreApproved}) {
  
  const {isValidAge, isValidLaborSeniority, isValidSalaryPaymentRatio} = usePreliminaryLoanValidation(values);
  const classes = useStyles();  

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

  return (
    <>
    <Grid container direction="row" alignItems="center" justify="center" className={classes.contentStyle} style={{ minHeight:'70vh'}}>
      {/* <Grid className={classes.formStyle}> */}
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
          </form>
        </Paper>
      {/* </Grid> */}
    </Grid>
    </>
  )
}