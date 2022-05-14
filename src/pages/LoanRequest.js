import React, { useState, useContext, useEffect } from 'react';
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

import { LoginContext } from '../helper/Context.js';
import api from '../services/api';
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
  // return ['Estimar Receita', 'Estimar Margem','Estimar Investimento (Capex)',  'Estimar Var. Capital de Giro', 'Estimar Custo de Capital','Estimar Estrutura de Capital'];
  // return ['Estimar Ingresos', 'Estimar Margen','Estimar Inversion (Capex)',  'Estimar Var. Capital de Trabajo', 'Estimar Costo de Capital','Estimar Estructura de Capital'];
  // return ['Revenue Estimate', 'Margin Estimate','Capex Estimate',  'Working Capital Chgs. Estimate', 'Cost of Capital Estimate','Capital Structure Estimate'];
  // return ['Revenue', 'Margin','Capex',  'Working Capital Chgs.', 'Cost of Capital','Capital Structure','CAPM'];
}

export default function LoanRequest (){

  const classes = useStyles ();  
  const history = useHistory ();

  const inicialValuesState = { customerId: "", customerName: "", customerBirthDate:"",customerMobilePrefix:"",customerMobile: "", customerEmail: "", customerCity:"", customerAddress:"", customerOccupation:"",customerSalary:"",customerLaborSeniority:"",companyId:"",companyName:"",companyPhone:"", companyMobilePrefix:"",companyMobile:"", companyAddress:"", companyCity:"", customerHiringType:"", loanId:"",loanProduct:"", loanCapital:"", loanTerm:"", loanPayment:"", loanTotalAmount:"",loanExpireDate:"",loanRequestStatus:"",loanRequestDenialMsg:"",loanDocStatus:"",customerIdFile1:"",customerIdFile2:"",customerInvoiceFile:"",customerTaxFile1:"",customerTaxFile2:"",customerTaxFile3:"",persReference1Id:"",persReference1Name:"",persReference1MobilePrefix:"",persReference1Mobile:"",persReference2Id:"",persReference2Name:"",persReference2MobilePrefix:"",persReference2Mobile:"",comReference1Id:"",comReference1Name:"",comReference1MobilePrefix:"",comReference1Mobile:"",comReference2Id:"",comReference2Name:"",comReference2MobilePrefix:"",comReference2Mobile:"" };
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
  const { customerId, customerName, customerBirthDate,customerMobilePrefix,customerMobile, customerEmail, customerCity, customerAddress, customerOccupation,customerSalary,customerLaborSeniority,companyId,companyName,companyPhone, companyMobilePrefix,companyMobile, companyAddress, companyCity, customerHiringType, loanProduct, loanCapital, loanTerm, loanPayment, loanTotalAmount,loanExpireDate,loanRequestStatus,loanRequestDenialMsg,loanDocStatus,persReference1Id,persReference1Name,persReference1MobilePrefix,persReference1Mobile,persReference2Id,persReference2Name,persReference2MobilePrefix,persReference2Mobile,comReference1Id,comReference1Name,comReference1MobilePrefix,comReference1Mobile,comReference2Id,comReference2Name,comReference2MobilePrefix,comReference2Mobile } = values;
  const { sponsorId, setSponsorId, sponsorName,  setSponsorName, userId, setUserId, userName, setUserName } = useContext (LoginContext);

  setSponsorId (localStorage.getItem('sponsorId'));
  setSponsorName (localStorage.getItem('sponsorName'));
  setUserId (localStorage.getItem('userId'));
  setUserName (localStorage.getItem('userName'));

  async function handleCustomer() {
    alert("entrou em handleCustomer");
    // busca o cliente na base de dados 
    try {
    const response = await api.get ('/customers', { headers:{Authorization: customerId}})
        try {
          const data = {customerId, customerMobilePrefix, customerMobile, customerEmail, customerCity, customerAddress, customerOccupation,customerSalary, customerHiringType, customerLaborSeniority } ;
          const response = await api.put ('/customers', data);
          return { valid: true, message:"Éxito en actualización de cliente" };
        } catch (err) {
            const errorMsg = Object.values(err.response.data);
            setAlertMessage(prevState => ( {...prevState, severity:"warning", title: "Error en alteración de solcitud", message: errorMsg }));
            setIsAlertOpen(true);
            return { valid: false, message:"Error en actualización de cliente" };
          }
    } catch (err) {
      // se houve algum erro na busca do cliente...
      if (err.request){
        setAlertMessage(prevState => ( {...prevState, severity:"warning", title: "Error en inclusión de la solicitud", message:"Problema en acceso al servidor" }));
        setIsAlertOpen(true);
        return { valid: false, message:"Sin respuesta de la base de datos" };
      }
      if (err.response.status == 404) {
        // se o cliente nao esta na base, inclui como novo registro
        try {
          const data = { customerId, customerName, customerBirthDate, customerMobilePrefix, customerMobile, customerEmail, customerCity, customerAddress, customerOccupation,customerSalary, customerHiringType, customerLaborSeniority } ;
          const response = await api.post('/customers', data );
          return { valid: true, message:"Éxito en inclusión de cliente" };
        } catch (err) {
            // se nao conseguiu incluir, mostra msg de erro
            const errorMsg = Object.values(err.response.data);
            setAlertMessage(prevState => ( {...prevState, severity:"warning", title: "Error en inclusión de la solicitud", message: errorMsg }));
            setIsAlertOpen(true);
            return { valid: false, message:"Error en actualización de cliente" };
          }
      } else {
          // se for um erro diferente do 404 (cliente nao encontrado), mostra msg de erro 
          const errorMsg = Object.values(err.response.data);
          setAlertMessage(prevState => ( {...prevState, severity:"warning", title: "Error en inicio de sessión", message: errorMsg }));
          setIsAlertOpen(true);
          return { valid: false, message:"Error en actualización de cliente" }
        }
      }
  }

  async function handleCompany() {
    alert("handleCompany");
    // busca a empresa na base de dados 
    try {
    const response = await api.get ('/companies', { headers:{Authorization: companyId}})
      try {
        // alert("update company");
        // alert(companyId);
        const data = { companyId, companyPhone, companyMobilePrefix, companyMobile, companyAddress, companyCity} ;
        const response = await api.put ('/companies', data);
        return { valid: true, message:"Éxito en actualización de empresa" };
      } catch (err) {
          const errorMsg = Object.values(err.response.data);
          setAlertMessage(prevState => ( {...prevState, severity:"warning", title: "Error en alteración de solcitud", message: errorMsg }));
          setIsAlertOpen(true);
        }
      // se houve algum erro na busca da empresa...
    } catch (err) {
      if (err.request){
        return { valid: false, message:"Sin respuesta de la base de datos" };
      }
      if (err.response.status == 404) {
        // se a empresa nao esta na base, inclui como novo registro
        try {
          alert("incluir nova empresa");
          // se conseguiu,
          const data = { companyId, companyName,companyPhone, companyMobilePrefix, companyMobile, companyAddress, companyCity } ;
          const response = await api.post('/companies', data );
          return { valid: true, message:"Éxito en inclusión de la empresa" };
          // se nao conseguiu, ve a msg de erro
        } catch (err) {
            const errorMsg = Object.values(err.response.data);
            setAlertMessage(prevState => ( {...prevState, severity:"warning", title: "Error en inclusión de solcitud-Empresa", message: errorMsg }));
            setIsAlertOpen(true);
            return { valid: false, message:"Error en actualización de empresa" };
          }
      } else {
        // se...
          const errorMsg = Object.values(err.response.data);
          setAlertMessage(prevState => ( {...prevState, severity:"warning", title: "Error en inicio de sessión", message: errorMsg }));
          setIsAlertOpen(true);
          return { valid: false, message:"Error en actualización de empresa" };
        }
      }
  }

  async function handleLoan (){
    try {

      // alert (`sponsor: ${sponsorId} user:${userId} `);
      const data = { loanProduct, loanCapital, loanTerm, loanPayment, loanTotalAmount, loanExpireDate, loanRequestStatus,loanRequestDenialMsg, loanDocStatus, customerId, userId, sponsorId } ;
      const response = await api.post('/loans', data );
      return { valid: true, message:"Éxito en inclusión de la solicitud" };
    } catch (err) {
        const errorMsg = Object.values(err.response.data);
        setAlertMessage(prevState => ( {...prevState, severity:"warning", title: "Error en inclusión de solcitud-Prestamo", message: errorMsg }));
        setIsAlertOpen(true);
        return { valid: false, message:"Error en inclusión de la solicitud" };
      }
  }

    // else {
    //     const errorMsg = Object.values(err.response.data);
    //     setAlertMessage(prevState => ( {...prevState, severity:"warning", title: "Error en inicio de sessión", message: errorMsg }));
    //     setIsAlertOpen(true);
    //   }
    // }
    // try {
    //   const data = { customerId, customerName, customerBirthDate,customerMobile, customerEmail, customerCity, customerAddress, customerOccupation,customerSalary, customerLaborSeniority } ;
    //   const response = await api.post('/customers', data );
    // } catch (err) {
    //     const errorMsg = Object.values(err.response.data);
    //     setAlertMessage(prevState => ( {...prevState, severity:"warning", title: "Error en inclusion de solcitud", message: errorMsg }));
    //     setIsAlertOpen(true);
    //   }


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
      // localStorage.clear();
    } else if (value==="Seguir Cargando"){
        <Redirect to="/loanrequest" />
    } else {
      history.push('/sponsor');
    }; 
  };

  //testear aca grabacion de customer
  const handleExit = () => {
    alert ("passou em handleexit");
    // salida:
    // setIsPristine();
    // setValues(inicialValuesState);
    // setFormErrors(inicialFormErrorsState);
    // history.push('/sponsor');

    // testeando inclusion
    // if (chkBlankFormCustomer (setFormErrors, values)){
    //   setAlertMessage(prevState => ( {...prevState, severity:"warning", title: "Error en entrada de datos", message:"Favor completar los dados marcados como requeridos, gracias!"}));
    //   setIsAlertOpen(true);

    // } else if (chkFormErrors(formErrors)) {
    //     setAlertMessage(prevState => ( {...prevState, severity:"warning", title: "Error en entrada de datos", message:"Favor corregir los dados marcados como incorrectos, gracias!"}));
    //     setIsAlertOpen(true);

    //   }
    setIsPristine();

    const result = handleCustomer()
    // if (handleCustomer().valid) {
    if (result.valid) {
      if (handleCompany().valid);{
        if (handleLoan().valid){
          setDialogMessage( {title: "Solicitud cargada con exito !", message:"Desea cargar una nueva solicitud ?"});
          setIsDialogOpen(true);   
        };
      }
    } 
    // else {
    //   alert ("Problema en acceso a la base de datos del servidor");
    //   alert (result.message);

    // };
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
    {/* <Typography>{userId}</Typography> */}

    {/* <Hidden xsDown> */}
      {/* <Grid container direction="row" alignItems="center" justify="center" className={classes.stepperStyle}> */}
      <Grid container direction="row" className={classes.stepperStyle}>
    
        <Grid item xs={12} sm={1} md={2} /> 

        <Grid item xs={12} sm={10} md={8} >
          {/* -------------------------------------TEMP */}
        {/* <Typography>{`Usuario ${userId} Sponsor: ${sponsorId}`}</Typography> */}
          <CustomerStepper activeStep={activeStep} steps={steps} />
        </Grid>
        
        <Grid item xs={12} sm={1} md={2} />

      </Grid> 

    {/* </Hidden> */}
    <Typography>
      {getStepContent(activeStep)}
    </Typography>

    <Grid container direction="row" alignItems="center" justify="center" className={classes.paperStyleBtn}  > 

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
