import React, { useState, useEffect, useContext, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Redirect, Route } from "react-router-dom";

import { Grid, Paper, Button, Box, TextField, Typography, Grow, Slide } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import HeaderStore from '../components/HeaderStore.js';
import Footer from '../components/Footer.js';
import AlertMessage from '../components/modals/AlertMessage';
import AlertDialog from '../components/modals/AlertDialog.js';

import useValidations from '../hooks/useValidations.js';
import useCheckFormValues from '../hooks/useCheckFormValues.js';

import CustPersonalDetail from '../components/CustPersonalDetail';
import CustWorkDetail from '../components/CustWorkDetail';
import CustLoanDetail from '../components/CustLoanDetail';
import CustLoanAnalisys from '../components/CustLoanAnalisys.js';
import CustPersReferences from '../components/CustPersReferences';
import CustComReferences from '../components/CustComReferences';
import CustDocsUpload from '../components/CustDocsUpload.js';

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
  customLabelStyle: {
    fontSize: "12px",
  }
}))

function getSteps() {
  return ['Datos Personales del Cliente', 'Datos de la Financiacion','Datos Laborales del Cliente',  'Analisis Preliminar', 'Datos Referencias Personales','Datos Referencias Comerciales','Carga de Documentos'];
}

export default function LoanRequest (){

  const classes = useStyles();  
  const history = useHistory();
  const inicialValuesState={ customerId: "", customerName: "", customerBirthDate:"",customerMobilePrefix:"",customerMobile: "", customerEmail: "", customerCity:"", customerAddress:"", customerOccupation:"",customerSalary:"",customerLaborSeniority:"",companyId:"",companyName:"",companyPhone:"", companyMobilePrefix:"",companyMobile:"", companyAddress:"", companyCity:"",customerHiringType:"", loanId:"",loanProduct:"", loanCapital:"", loanTerm:"", loanPayment:"", loanTotalAmount:"",loanExpireDate:"",loanRequestStatus:"",loanRequestDenialMsg:"",loanDocStatus:"",customerIdFile1:"",customerIdFile2:"",customerInvoiceFile:"",customerTaxFile1:"",customerTaxFile2:"",customerTaxFile3:"",persReference1Id:"",persReference1Name:"",persReference1MobilePrefix:"",persReference1Mobile:"",persReference2Id:"",persReference2Name:"",persReference2MobilePrefix:"",persReference2Mobile:"",comReference1Id:"",comReference1Name:"",comReference1MobilePrefix:"",comReference1Mobile:"",comReference2Id:"",comReference2Name:"",comReference2MobilePrefix:"",comReference2Mobile:"" };
  const inicialFormErrorsState={ customerId: "", customerName: "", customerBirthDate:"",customerMobilePrefix:"",customerMobile: "", customerEmail: "", customerCity:"", customerAddress:"", customerOccupation:"",customerSalary:"",customerLaborSeniority:"",companyId:"",companyName:"",companyPhone:"", companyMobilePrefix:"",companyMobile:"", companyAddress:"", companyCity:"",customerHiringType:"", loanId:"",loanProduct:"", loanCapital:"", loanTerm:"", loanPayment:"", loanTotalAmount:"",loanExpireDate:"",loanRequestStatus:"",loanRequestDenialMsg:"",loanDocStatus:"",customerIdFile1:"",customerIdFile2:"",customerInvoiceFile:"",customerTaxFile1:"",customerTaxFile2:"",customerTaxFile3:"",persReference1Id:"",persReference1Name:"",persReference1MobilePrefix:"",persReference1Mobile:"",persReference2Id:"",persReference2Name:"",persReference2MobilePrefix:"",persReference2Mobile:"",comReference1Id:"",comReference1Name:"",comReference1MobilePrefix:"",comReference1Mobile:"",comReference2Id:"",comReference2Name:"",comReference2MobilePrefix:"",comReference2Mobile:"" };
  
  const {isValidName, isValidPhone, isValidAmount, isValidEmail, noBlanks} = useValidations ();
  const [activeStep, setActiveStep] = useState(0);
  const [values, setValues] = useState(inicialValuesState);
  const [formErrors, setFormErrors] = useState(inicialFormErrorsState);
  
  const {customerId, customerName, customerBirthDate,customerMobile, customerEmail, customerCity, customerAddress, customerOccupation,customerSalary,customerLaborSeniority,companyId,companyName,companyPhone, companyMobile, companyAddress, customerHiringType, loanProduct, loanCapital, loanTerm, loanPayment, loanTotalAmount,loanExpireDate,loanRequestStatus,loanDocStatus,persReference1Id,persReference1Name,persReference1MobilePrefix,persReference1Mobile,persReference2Id,persReference2Name,persReference2MobilePrefix,persReference2Mobile,comReference1Id,comReference1Name,comReference1MobilePrefix,comReference1Mobile,comReference2Id,comReference2Name,comReference2MobilePrefix,comReference2Mobile } = values;
  const [isLoanPreApproved, setIsLoanPreApproved] = useState(false);
  // const [isRequestComplete, setIsRequestComplete] = useState(false);
  const [isAlertOpen,setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState({severity:"",title:"",message:""});
  const [isDialogOpen,setIsDialogOpen] = useState(false);
  const [dialogMessage,setDialogMessage] = useState({title:"",message:""});
  const dialogButtons = {button1:"Salir",button2:"Nueva Solicitud"};
  const dialogBtnsUnmount = {button1:"Salir",button2:"Seguir cargando"};
  // const [isDirty, setIsDirty]=useState(false);

  const steps = getSteps();
  //const LoanContext = createContext({})

  const handleAlertClose = () => {
    setIsAlertOpen(false);
    if (alertMessage.severity==="success"){
      setActiveStep(0); 
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
    setValues(inicialValuesState);
    setFormErrors(inicialFormErrorsState);
    localStorage.clear();
    history.push('/sponsor');
  }

  const handleNext = () => {
    if (activeStep < 6) {
      // caso custPersonalDetail
//      if (isBlankFormCustomer ()){
//        setAlertMessage(prevState => ( {...prevState, severity:"warning", title: "Error en entrada de datos", message:"Favor completar los dados marcados como requeridos, gracias!"}));
//        setIsAlertOpen(true);
//      } else if (isFormErrors()) {
//          setAlertMessage(prevState => ( {...prevState, severity:"warning", title: "Error en entrada de datos", message:"Favor corregir los dados marcados como incorrectos, gracias!"}));
//          setIsAlertOpen(true);
//        } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1); 
//      } 
      
    } else if (activeStep===6) {
      submit()
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

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

  const handleChange = (e, validators) =>{
    const target=e.target;
    setValues (prevState => ({...prevState, [target.name]:target.value }))
    handleValidators(target, validators);
  }

  const handleValidators = (target, validators) => {
    validators.forEach(validation => {         // array 
    const result= validation (target.value)    // value="martin" ou "0985 290979"...
    const errors= formErrors [target.name]     // le os erros do "vetor"
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
          <CustPersonalDetail 
            handleChange={handleChange} values={values} setValues={setValues} formErrors={formErrors} setFormErrors={setFormErrors} isValidName={isValidName} isValidPhone={isValidPhone} isValidAmount={isValidAmount} isValidEmail={isValidEmail} noBlanks={noBlanks} step={activeStep}/>
        );
      case 1:
         return (
          <CustLoanDetail 
            handleChange={handleChange} values={values} setValues={setValues} formErrors={formErrors} setFormErrors={setFormErrors} isValidName={isValidName} isValidPhone={isValidPhone} isValidAmount={isValidAmount} isValidEmail={isValidEmail} noBlanks={noBlanks} step={activeStep}/>
        );
      case 2:
        return (
          <CustWorkDetail 
            handleChange={handleChange} values={values} setValues={setValues} formErrors={formErrors} setFormErrors={setFormErrors} isValidName={isValidName} isValidPhone={isValidPhone} isValidAmount={isValidAmount} isValidEmail={isValidEmail} noBlanks={noBlanks} step={activeStep}/>
        );
      case 3:
        return (
          <CustLoanAnalisys 
            handleChange={handleChange} values={values} setValues={setValues} formErrors={formErrors} setFormErrors={setFormErrors} isLoanPreApproved={isLoanPreApproved} setIsLoanPreApproved={setIsLoanPreApproved} isValidName={isValidName} isValidPhone={isValidPhone} isValidAmount={isValidAmount} isValidEmail={isValidEmail} noBlanks={noBlanks} step={activeStep}/>
        );
      case 4:
          return (
           <CustPersReferences 
             handleChange={handleChange} values={values} setValues={setValues} formErrors={formErrors} setFormErrors={setFormErrors} isValidName={isValidName} isValidPhone={isValidPhone} isValidAmount={isValidAmount} isValidEmail={isValidEmail} noBlanks={noBlanks} step={activeStep}/>
          ) 
      case 5:
        return (
          <CustComReferences 
            handleChange={handleChange} values={values} setValues={setValues} formErrors={formErrors} setFormErrors={setFormErrors} isValidName={isValidName} isValidPhone={isValidPhone} isValidAmount={isValidAmount} isValidEmail={isValidEmail} noBlanks={noBlanks} step={activeStep}/>
        )   
      case 6:
        return (
         <CustDocsUpload 
           handleChange={handleChange} values={values} setValues={setValues} formErrors={formErrors} setFormErrors={setFormErrors} isValidName={isValidName} isValidPhone={isValidPhone} isValidAmount={isValidAmount} isValidEmail={isValidEmail} noBlanks={noBlanks} step={activeStep}/>
        )  
    }
  }

// function getButtonText () {
//   if (activeStep === steps.length - 1){
//     return 'Enviar Solicitud';
//   } else if (! isLoanPreApproved && activeStep===3)  {
//       return "Cargar Nueva"
//   } else {
//       return 'Proximo';
//   }
// }

function getButtonStatus () {
  if (! isLoanPreApproved && activeStep === 3) {
    return true;
  }
}  
  return (
    <>    
    <HeaderStore />

    {/* Coloca o Stepper */}
    <Grid container direction="row" alignItems="center" justify="center" className={classes.stepperStyle}>

      <Grid item xs={12} md={2}/> 
      <Grid item xs={12} md={8}>
        <Stepper activeStep={activeStep} style={{height:100}}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel classes={{label: classes.customLabelStyle}} >{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
      <Grid item xs={12} md={2}/>
    </Grid> 

      {/* Coloca os componentes (custPersonalDetail/custWorkDetail...) para ler inputs de dados */}
    <Typography>
      {getStepContent(activeStep)}
    </Typography>

      {/* Coloca os botoes de Volver x proximo x Finalizar */}            
    <Grid container direction="row" alignItems="center" justify="center" className={classes.buttonAreaStyle}> 
      <Grid item xs={0} md={4} />

      <Grid item xs={6} md={2} style={{textAlign:"left"}} style={{paddingRight:0}} >
        <Button
          onClick={handleExit} className={classes.buttonStyle} disableRipple >
          Salir
         </Button>
      </Grid>
      <Grid item xs={6} md={1} style={{textAlign:"right"}}  >
       
          <Button
            disabled={activeStep === 0} onClick={handleBack} className={classes.buttonStyle} disableRipple>
            Anterior
          </Button>
      
      </Grid>
      <Grid item xs={6} md={2}  >
        <Button className={classes.buttonStyle} disabled={getButtonStatus()} variant="contained" onClick={handleNext} disableRipple >
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
