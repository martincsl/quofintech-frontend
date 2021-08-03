import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Redirect } from "react-router-dom";

import { Grid, Typography, Button, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import HeaderStore from '../components/HeaderStore.js';
import Footer from '../components/Footer.js';
import StepperButton from '../components/StepperButtons.js';
import CustPersonalDetail from '../components/CustPersonalDetail';
import CustWorkDetail from '../components/CustWorkDetail';
import CustLoanDetail from '../components/CustLoanDetail';
import CustLoanAnalisys from '../components/CustLoanAnalisys.js';
import CustPersReferences from '../components/CustPersReferences';
import CustComReferences from '../components/CustComReferences';
import CustDocsUpload from '../components/CustDocsUpload.js';
import AlertMessage from '../components/modals/AlertMessage';
import AlertDialog from '../components/modals/AlertDialog.js';
import CustomerStepper from '../components/CustomerStepper';

import useValidations from '../hooks/useValidations.js';
import useUnsavedWarning from '../hooks/useUnsavedWarning';
import useStepper from '../hooks/useStepper';

const useStyles = makeStyles( (mainTheme) => ({
  root: {
    width: '100%',
  },
  stepperStyle: {
    position: 'absolute',
    top: '65px',
    width: "100%",
    height:'120px',
    padding: "5px",
    color: mainTheme.palette.secondary.main,
    backgroundColor:"white",
    marginBottom: "0px",
  },
  contentStyle: {
    position: 'absolute',
    top: '120px',
  },
  paperStyleBtn: {
    position:'absolute',
    top: '500px',
    width: '100%',
    height: 60,
    // maxWidth: 850,
    margin: 'auto',
    padding:'5px',
    [mainTheme.breakpoints.down('sm')]: {
      // top:'320px',
      minWidth: 350,
      height: 500,
      marginLeft:5,
      marginRight: 5,
    },
  },
  paperStyle: {
    margin: 'auto',
    padding:'10px',
    minWidth: 350,
    maxWidth: 500,
    height:360,
    backgroundColor:mainTheme.palette.secondary.main,  
  },

}))

function getSteps() {
  return ['Datos Personales del Cliente', 'Datos de la Financiacion','Datos Laborales del Cliente',  'Analisis Preliminar', 'Datos Referencias Personales','Datos Referencias Comerciales','Carga de Documentos'];
}

export default function LoanRequest (){

  const classes = useStyles ();  
  const history = useHistory ();

  const inicialValuesState = { customerId: "", customerName: "", customerBirthDate:"",customerMobilePrefix:"",customerMobile: "", customerEmail: "", customerCity:"", customerAddress:"", customerOccupation:"",customerSalary:"",customerLaborSeniority:"",companyId:"",companyName:"",companyPhone:"", companyMobilePrefix:"",companyMobile:"", companyAddress:"", companyCity:"",customerHiringType:"", loanId:"",loanProduct:"", loanCapital:"", loanTerm:"", loanPayment:"", loanTotalAmount:"",loanExpireDate:"",loanRequestStatus:"",loanRequestDenialMsg:"",loanDocStatus:"",customerIdFile1:"",customerIdFile2:"",customerInvoiceFile:"",customerTaxFile1:"",customerTaxFile2:"",customerTaxFile3:"",persReference1Id:"",persReference1Name:"",persReference1MobilePrefix:"",persReference1Mobile:"",persReference2Id:"",persReference2Name:"",persReference2MobilePrefix:"",persReference2Mobile:"",comReference1Id:"",comReference1Name:"",comReference1MobilePrefix:"",comReference1Mobile:"",comReference2Id:"",comReference2Name:"",comReference2MobilePrefix:"",comReference2Mobile:"" };
  const inicialFormErrorsState = { customerId: "", customerName: "", customerBirthDate:"",customerMobilePrefix:"",customerMobile: "", customerEmail: "", customerCity:"", customerAddress:"", customerOccupation:"",customerSalary:"",customerLaborSeniority:"",companyId:"",companyName:"",companyPhone:"", companyMobilePrefix:"",companyMobile:"", companyAddress:"", companyCity:"",customerHiringType:"", loanId:"",loanProduct:"", loanCapital:"", loanTerm:"", loanPayment:"", loanTotalAmount:"",loanExpireDate:"",loanRequestStatus:"",loanRequestDenialMsg:"",loanDocStatus:"",customerIdFile1:"",customerIdFile2:"",customerInvoiceFile:"",customerTaxFile1:"",customerTaxFile2:"",customerTaxFile3:"",persReference1Id:"",persReference1Name:"",persReference1MobilePrefix:"",persReference1Mobile:"",persReference2Id:"",persReference2Name:"",persReference2MobilePrefix:"",persReference2Mobile:"",comReference1Id:"",comReference1Name:"",comReference1MobilePrefix:"",comReference1Mobile:"",comReference2Id:"",comReference2Name:"",comReference2MobilePrefix:"",comReference2Mobile:"" };
  const [values, setValues] = useState(inicialValuesState);
  const [formErrors, setFormErrors] = useState(inicialFormErrorsState);

  const [activeStep, setActiveStep] = useState(0);
  const [isLoanPreApproved, setIsLoanPreApproved] = useState(false);

  const [isAlertOpen,setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState({severity:"",title:"",message:""});
  const [isDialogOpen,setIsDialogOpen] = useState(false);
  const [dialogMessage,setDialogMessage] = useState({title:"",message:""});
  
  const { chkFormErrors,chkBlankFormCustomer } = useValidations();
  const [ Prompt, setIsDirty, setIsPristine ] = useUnsavedWarning();

  const { handleBack, handleNext, handleReset } = useStepper(setActiveStep, submit);

  const steps = getSteps();
  const dialogButtons = {button1:"Salir",button2:"Nueva Solicitud"};
  const dialogBtnsUnmount = {button1:"Salir",button2:"Seguir cargando"};
  const {customerId, customerName, customerBirthDate,customerMobile, customerEmail, customerCity, customerAddress, customerOccupation,customerSalary,customerLaborSeniority,companyId,companyName,companyPhone, companyMobile, companyAddress, customerHiringType, loanProduct, loanCapital, loanTerm, loanPayment, loanTotalAmount,loanExpireDate,loanRequestStatus,loanDocStatus,persReference1Id,persReference1Name,persReference1MobilePrefix,persReference1Mobile,persReference2Id,persReference2Name,persReference2MobilePrefix,persReference2Mobile,comReference1Id,comReference1Name,comReference1MobilePrefix,comReference1Mobile,comReference2Id,comReference2Name,comReference2MobilePrefix,comReference2Mobile } = values;

  const handleAlertClose = () => {
    setIsAlertOpen(false);
    if (alertMessage.severity==="success"){
      setActiveStep(0); 
    } else {
      handleNext(activeStep);
    }
  };

  const handleDialogClose = (value) => {
    setIsDialogOpen(false);
    setDialogMessage( {title: "", message:""});

    if (value==="Nueva Solicitud"){
      setActiveStep(0); 
      setValues(inicialValuesState);
      setFormErrors(inicialFormErrorsState);
      localStorage.clear();
    } else if (value==="Seguir Cargando"){
        <Redirect to="/loanrequest" />
    } else {
      history.push('/sponsor');
    } 
  };

  const handleExit = () => {
    setIsPristine();
    setValues(inicialValuesState);
    setFormErrors(inicialFormErrorsState);
    localStorage.clear();
    history.push('/sponsor');
  }

  function submit() {

    // if (chkBlankFormCustomer (setFormErrors, values)){
    //   setAlertMessage(prevState => ( {...prevState, severity:"warning", title: "Error en entrada de datos", message:"Favor completar los dados marcados como requeridos, gracias!"}));
    //   setIsAlertOpen(true);

    // } else if (chkFormErrors(formErrors)) {
    //     setAlertMessage(prevState => ( {...prevState, severity:"warning", title: "Error en entrada de datos", message:"Favor corregir los dados marcados como incorrectos, gracias!"}));
    //     setIsAlertOpen(true);

    //   } else {
          setDialogMessage( {title: "Solicitud cargada con exito !", message:"Desea cargar una nueva solicitud ?"});
          setIsDialogOpen(true);   
      // } 
  } //submit

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <CustPersonalDetail values={values} setValues={setValues} formErrors={formErrors} setFormErrors={setFormErrors} step={activeStep}/> );
      case 1:
         return (
          <CustLoanDetail values={values} setValues={setValues} formErrors={formErrors} setFormErrors={setFormErrors}  step={activeStep}/> );
      case 2:
        return (
          <CustWorkDetail values={values} setValues={setValues} formErrors={formErrors} setFormErrors={setFormErrors}  step={activeStep}/> );
          // <CustWorkDetail values={values} setValues={setValues} formErrors={formErrors} setFormErrors={setFormErrors} isValidName={isValidName} isValidPhone={isValidPhone} isValidAmount={isValidAmount} isValidEmail={isValidEmail} noBlanks={noBlanks} step={activeStep}/> );
      case 3:
        return (
          <CustLoanAnalisys values={values} isLoanPreApproved={isLoanPreApproved} setIsLoanPreApproved={setIsLoanPreApproved} /> );
      case 4:
        return (
           <CustPersReferences values={values} setValues={setValues} formErrors={formErrors} setFormErrors={setFormErrors}  step={activeStep}/> );
      case 5:
        return (
          <CustComReferences values={values} setValues={setValues} formErrors={formErrors} setFormErrors={setFormErrors}  step={activeStep}/> );   
      case 6:
        return (
          <CustDocsUpload values={values} setValues={setValues} formErrors={formErrors} setFormErrors={setFormErrors}  step={activeStep}/> ); 
    } 
  }

  return (
    <>
    <HeaderStore />

    {/* <Hidden xsDown> */}
      {/* <Grid container direction="row" alignItems="center" justify="center" className={classes.stepperStyle}> */}
      <Grid container direction="row" className={classes.stepperStyle}>
    
        <Grid item xs={12} sm={1} md={2} /> 

        <Grid item xs={12} sm={10} md={8} style={{backgroundColor:'red'}}>
          <CustomerStepper activeStep={activeStep} steps={steps} />
        </Grid>
        
        <Grid item xs={12} sm={1} md={2} />

      </Grid> 

    {/* </Hidden> */}
    <Typography>
      {getStepContent(activeStep)}
    </Typography>

    <Grid container direction="row" alignItems="center" justify="center" className={classes.paperStyleBtn} style={{backgroundColor:'red'}} > 

      <Grid item xs={0} sm={2} md={4} />
     
      <Grid container item direction="row" alignItems="center" justify="center" xs={12} sm={8} md={4}  >
        <StepperButton handleExit={handleExit} handleBack={handleBack} handleNext={handleNext} activeStep={activeStep} stepsLength={steps.length} isLoanPreApproved={isLoanPreApproved}/>
      </Grid>

      <Grid item xs={0} sm={2} md={4} />
    </Grid>

    <AlertMessage open={isAlertOpen} onClose={handleAlertClose} severity={alertMessage.severity} title={alertMessage.title}>
      {alertMessage.message}
    </AlertMessage>

    <AlertDialog open={isDialogOpen} onClose={handleDialogClose} severity="success" title={dialogMessage.title} buttons={dialogButtons}>
      {dialogMessage.message}
    </AlertDialog> 

   <Footer />
   </>
  )
}
