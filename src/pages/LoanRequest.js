import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Redirect } from "react-router-dom";

import { Grid, Typography, Button, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import HeaderStore from '../components/HeaderStore.js';
import Footer from '../components/Footer.js';
import CustPersonalDetail from '../components/CustPersonalDetail';
import CustWorkDetail from '../components/CustWorkDetail';
import CustLoanDetail from '../components/CustLoanDetail';
import CustLoanAnalisys from '../components/CustLoanAnalisys.js';
import CustPersReferences from '../components/CustPersReferences';
import CustComReferences from '../components/CustComReferences';
import CustDocsUpload from '../components/CustDocsUpload.js';

import AlertMessage from '../components/modals/AlertMessage';
import AlertDialog from '../components/modals/AlertDialog.js';

import useValidations from '../hooks/useValidations.js';
import useUnsavedWarning from '../hooks/useUnsavedWarning';

import CustomerStepper from '../components/CustomerStepper';
import useStepper from '../hooks/useStepper';

const useStyles = makeStyles( (mainTheme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: mainTheme.spacing(1),
  },
  instructions: {
    marginTop: mainTheme.spacing(1),
    marginBottom: mainTheme.spacing(1),
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
  buttonAreaStyle:{
    position: 'absolute',
    top: '500px',
  },
  buttonStyle:{
    color: "white",
    backgroundColor:mainTheme.palette.primary.main,
    textTransform:"none",
    margin: "10px",
    minWidth:"110px",
    //marginTop: "15px",
    "&:disabled": {
      color:"gray",
      backgroundColor:mainTheme.palette.primary.main,
    },
    "&:hover": {
      color:mainTheme.palette.secondary.main,
      backgroundColor:mainTheme.palette.primary.main,
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
  formStyle : {
     position:'absolute',
     top: '80px',
     width: '100%',
     height: '60px',
  },
  iconStyle: {
    textAlign: "center",
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    marginTop: "10px",
  },

}))

function getSteps() {
  return ['Datos Personales del Cliente', 'Datos de la Financiacion','Datos Laborales del Cliente',  'Analisis Preliminar', 'Datos Referencias Personales','Datos Referencias Comerciales','Carga de Documentos'];
}

export default function LoanRequest (){

  const classes = useStyles();  
  const history = useHistory();

  const inicialValuesState={ customerId: "", customerName: "", customerBirthDate:"",customerMobilePrefix:"",customerMobile: "", customerEmail: "", customerCity:"", customerAddress:"", customerOccupation:"",customerSalary:"",customerLaborSeniority:"",companyId:"",companyName:"",companyPhone:"", companyMobilePrefix:"",companyMobile:"", companyAddress:"", companyCity:"",customerHiringType:"", loanId:"",loanProduct:"", loanCapital:"", loanTerm:"", loanPayment:"", loanTotalAmount:"",loanExpireDate:"",loanRequestStatus:"",loanRequestDenialMsg:"",loanDocStatus:"",customerIdFile1:"",customerIdFile2:"",customerInvoiceFile:"",customerTaxFile1:"",customerTaxFile2:"",customerTaxFile3:"",persReference1Id:"",persReference1Name:"",persReference1MobilePrefix:"",persReference1Mobile:"",persReference2Id:"",persReference2Name:"",persReference2MobilePrefix:"",persReference2Mobile:"",comReference1Id:"",comReference1Name:"",comReference1MobilePrefix:"",comReference1Mobile:"",comReference2Id:"",comReference2Name:"",comReference2MobilePrefix:"",comReference2Mobile:"" };
  const inicialFormErrorsState={ customerId: "", customerName: "", customerBirthDate:"",customerMobilePrefix:"",customerMobile: "", customerEmail: "", customerCity:"", customerAddress:"", customerOccupation:"",customerSalary:"",customerLaborSeniority:"",companyId:"",companyName:"",companyPhone:"", companyMobilePrefix:"",companyMobile:"", companyAddress:"", companyCity:"",customerHiringType:"", loanId:"",loanProduct:"", loanCapital:"", loanTerm:"", loanPayment:"", loanTotalAmount:"",loanExpireDate:"",loanRequestStatus:"",loanRequestDenialMsg:"",loanDocStatus:"",customerIdFile1:"",customerIdFile2:"",customerInvoiceFile:"",customerTaxFile1:"",customerTaxFile2:"",customerTaxFile3:"",persReference1Id:"",persReference1Name:"",persReference1MobilePrefix:"",persReference1Mobile:"",persReference2Id:"",persReference2Name:"",persReference2MobilePrefix:"",persReference2Mobile:"",comReference1Id:"",comReference1Name:"",comReference1MobilePrefix:"",comReference1Mobile:"",comReference2Id:"",comReference2Name:"",comReference2MobilePrefix:"",comReference2Mobile:"" };
  const [values, setValues] = useState(inicialValuesState);
  const [formErrors, setFormErrors] = useState(inicialFormErrorsState);
  const {customerId, customerName, customerBirthDate,customerMobile, customerEmail, customerCity, customerAddress, customerOccupation,customerSalary,customerLaborSeniority,companyId,companyName,companyPhone, companyMobile, companyAddress, customerHiringType, loanProduct, loanCapital, loanTerm, loanPayment, loanTotalAmount,loanExpireDate,loanRequestStatus,loanDocStatus,persReference1Id,persReference1Name,persReference1MobilePrefix,persReference1Mobile,persReference2Id,persReference2Name,persReference2MobilePrefix,persReference2Mobile,comReference1Id,comReference1Name,comReference1MobilePrefix,comReference1Mobile,comReference2Id,comReference2Name,comReference2MobilePrefix,comReference2Mobile } = values;

  const {isValidCustomerId, isValidName, isValidDay, isValidDate, isValidPhone, isValidAmount, isValidEmail, noBlanks} = useValidations ();

  const [activeStep, setActiveStep] = useState(0);
  const {handleBack, handleNext, handleReset} = useStepper(setActiveStep, submit);
  const steps = getSteps();

  const [ Prompt, setIsDirty, setIsPristine ] = useUnsavedWarning();
  const [isLoanPreApproved, setIsLoanPreApproved] = useState(false);

  const [isAlertOpen,setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState({severity:"",title:"",message:""});
  const [isDialogOpen,setIsDialogOpen] = useState(false);
  const [dialogMessage,setDialogMessage] = useState({title:"",message:""});
  const dialogButtons = {button1:"Salir",button2:"Nueva Solicitud"};
  const dialogBtnsUnmount = {button1:"Salir",button2:"Seguir cargando"};

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

  function chkFormErrors () {
    let isError = false;
    Object.keys(formErrors).forEach( (key) => {   // key es el nombre del key
      if (formErrors[key] != ""){                //errors[key] es el contenido del key
        isError=true;
      }
    })
    return isError;
  }

  function chkBlankFormCustomer () {
    let isError = false;
    const valuesToCheck={customerId, customerName, customerBirthDate,customerMobile, customerEmail, customerCity, customerAddress, customerOccupation,customerSalary,customerLaborSeniority,companyId,companyName, companyMobile, customerHiringType, loanCapital, loanTerm, loanPayment, loanTotalAmount,loanExpireDate,persReference1Id,persReference1Name,persReference1MobilePrefix,persReference1Mobile,persReference2Id,persReference2Name,persReference2MobilePrefix,persReference2Mobile,comReference1Id,comReference1Name,comReference1MobilePrefix,comReference1Mobile,comReference2Id,comReference2Name,comReference2MobilePrefix,comReference2Mobile}
    Object.keys(valuesToCheck).forEach( (key) => {   // key es el nombre del key
      if (values [key] === ""){                //values[key] es el contenido del key
        setFormErrors(prevState => ( {...prevState, [key]:  "Esta informacion es requerida"}));
        isError=true;
      }
    })
    return isError;
  }

  const handleBlur = (e, validators) => {
    const target = e.target;
    setValues (prevState => ({...prevState, [target.name]:target.value }))
    handleValidators(target, validators);
  }

  const handleChange = (e, validators) => {
    const target = e.target;
    setValues (prevState => ({...prevState, [target.name]:target.value }))
    handleValidators(target, validators);
  }

  const handleValidators = (target, validators) => {

    validators.forEach (validation => {         // array 
    const result = validation (target.value)    // value="martin" ou "0985 290979"...
    const errors = formErrors [target.name]     // le os erros do "vetor"
      if (result.valid) {                      // se o retorno da funcao eh true, ou seja se o input eh valido.....
 //       if (errors.includes (result.message)){   //"limpa" as mesgs de erro
          setFormErrors (prevState => ( {...prevState, [target.name]: ""}))
 //       }
      } else { 
          if (!errors.includes(result.message)) {   // se ja existe a mensagem, nao inclui novamente
            setFormErrors (prevState => ( {...prevState, [target.name]: result.message}))
          }
        }
    })
  }

  function submit() {

    if (chkBlankFormCustomer ()){
      setAlertMessage(prevState => ( {...prevState, severity:"warning", title: "Error en entrada de datos", message:"Favor completar los dados marcados como requeridos, gracias!"}));
      setIsAlertOpen(true);

    } else if (chkFormErrors()) {
        setAlertMessage(prevState => ( {...prevState, severity:"warning", title: "Error en entrada de datos", message:"Favor corregir los dados marcados como incorrectos, gracias!"}));
        setIsAlertOpen(true);

      } else {
          setDialogMessage( {title: "Solicitud cargada con exito !", message:"Desea cargar una nueva solicitud ?"});
          setIsDialogOpen(true);   
      } 
  } //submit

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <CustPersonalDetail handleChange={handleChange} handleBlur={handleBlur} values={values} setValues={setValues} formErrors={formErrors} setFormErrors={setFormErrors} isValidCustomerId={isValidCustomerId} isValidName={isValidName} isValidDay={isValidDay} isValidDate={isValidDate} isValidPhone={isValidPhone} isValidAmount={isValidAmount} isValidEmail={isValidEmail} noBlanks={noBlanks} step={activeStep}/> );
      case 1:
         return (
          <CustLoanDetail handleChange={handleChange} values={values} setValues={setValues} formErrors={formErrors} setFormErrors={setFormErrors} isValidName={isValidName} isValidPhone={isValidPhone} isValidAmount={isValidAmount} isValidEmail={isValidEmail} noBlanks={noBlanks} step={activeStep}/> );
      case 2:
        return (
          <CustWorkDetail handleChange={handleChange} values={values} setValues={setValues} formErrors={formErrors} setFormErrors={setFormErrors} isValidName={isValidName} isValidPhone={isValidPhone} isValidAmount={isValidAmount} isValidEmail={isValidEmail} noBlanks={noBlanks} step={activeStep}/> );
      case 3:
        return (
          <CustLoanAnalisys values={values} isLoanPreApproved={isLoanPreApproved} setIsLoanPreApproved={setIsLoanPreApproved} /> );
      case 4:
          return (
           <CustPersReferences handleChange={handleChange} values={values} setValues={setValues} formErrors={formErrors} setFormErrors={setFormErrors} isValidName={isValidName} isValidPhone={isValidPhone} isValidAmount={isValidAmount} isValidEmail={isValidEmail} noBlanks={noBlanks} step={activeStep}/> );
      case 5:
        return (
          <CustComReferences handleChange={handleChange} values={values} setValues={setValues} formErrors={formErrors} setFormErrors={setFormErrors} isValidName={isValidName} isValidPhone={isValidPhone} isValidAmount={isValidAmount} isValidEmail={isValidEmail} noBlanks={noBlanks} step={activeStep}/> );   
      case 6:
        return (
          <CustDocsUpload handleChange={handleChange} values={values} setValues={setValues} formErrors={formErrors} setFormErrors={setFormErrors} isValidName={isValidName} isValidPhone={isValidPhone} isValidAmount={isValidAmount} isValidEmail={isValidEmail} noBlanks={noBlanks} step={activeStep}/> ); 
    } 
  }

function getIsButtonDisabled () {
  if (! isLoanPreApproved && activeStep === 3) {
    return true;
  }
}  
  return (
    <>    
    <HeaderStore />

    <Grid container direction="row" alignItems="center" justify="center" className={classes.stepperStyle}>

      <Grid item xs={12} md={2}/> 
      <Grid item xs={12} md={8}>
        <Hidden smDown>
          <CustomerStepper activeStep={activeStep} steps={steps} />
        </Hidden>
      </Grid>
      <Grid item xs={12} md={2}/>
    </Grid> 

    <Typography>
      {getStepContent(activeStep)}
    </Typography>

    <Grid container direction="row" alignItems="center" justify="center" className={classes.buttonAreaStyle}> 

      <Grid item xs={0} md={4} />

      <Grid item xs={6} md={2} style={{textAlign:"left"}} style={{paddingRight:0}} >
        <Button onClick={handleExit} className={classes.buttonStyle} disableRipple >
          Salir
         </Button>
      </Grid>
     
      <Grid item xs={6} md={1} style={{textAlign:"right"}} >
        <Button disabled={activeStep === 0} onClick={() => handleBack(activeStep)} className={classes.buttonStyle} disableRipple>
          Anterior
        </Button>
      </Grid>
     
      <Grid item xs={6} md={2} >
        <Button className={classes.buttonStyle} disabled={getIsButtonDisabled()} variant="contained" onClick={() => handleNext(activeStep)} disableRipple >
          {activeStep === steps.length - 1 ? 'Enviar Solicitud' : 'Próximo'}
        </Button>
      </Grid>
      <Grid item xs={0} md={3} />
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
