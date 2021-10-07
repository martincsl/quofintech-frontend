import React, { useState, useContext, useEffect } from 'react';

import { Grid, Paper, Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { LoginContext } from '../helper/Context.js';
import api from '../services/api';

import HeaderStore from '../components/HeaderStore.js';
import Footer from '../components/Footer.js';
import AlertDialog from '../components/modals/AlertDialog.js';

const useStyles = makeStyles({
  titleStyle:{
    width: "100%",
    padding: "15px",
    color: "#1C1C49",
    backgroundColor: "white",
    marginBottom: "10px",
  },
  boxStyle:{
    width: "100%",
    padding: "2px",
    color: "white",
    backgroundColor: "#f44336",
    marginBottom: "1px",
  },
  innerBoxStyle:{
    width: "100%",
    paddingLeft: "10px",
    color: "black",
    backgroundColor: "white",
    marginBottom: "1px",
  },
  buttonStyle:{
    color: "red",
    backgroundColor:"white",
    fontSize:'11px',
    textTransform:"none",
    margin: "2px",
    "&:hover": {
      color:"white",
      backgroundColor:"#f44336",
    },
  },
  paperStyle:{
    width: "100%",
    height:"100%",
    paddingLeft: "0px",
    marginLeft:"auto",
    marginRight:"auto",
  },
  iconStyle:{
    textAlign: "center",
    display: "block",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    marginTop: "10px",
  }
})

export default function LoansRejected () {
  const classes = useStyles();  
  const { sponsorId, setSponsorId, sponsorName } = useContext (LoginContext);
  const [ loansList, setLoansList] = useState ([]);
  const [ isDialogOpen,setIsDialogOpen ] = useState (false);
  const [ dialogMessage,setDialogMessage ] = useState ({severity:"", title:"",messageLine1:"",messageLine2:"",messageLine3:""});
  const dialogButtons = {button1:"Volver",button2:"Confirmar"}

  const handleDeleteLoan = (incident) => {
    setDialogMessage ({ 
      severity: "warning",
      title: "Solicitud de Exclusión", 
      messageLine1: `${incident.customerName}`, 
      messageLine2: `Monto Solicitado: ${Intl.NumberFormat('es-PY',{style:'currency',currency:'PYG'}).format(incident.loanCapital)}`, 
      messageLine3: "Confirma la exclusón de la solicitud ?"});
    setIsDialogOpen(true);   
  }

  const handleDialogClose = (value) => {
    setIsDialogOpen(false);
    setDialogMessage( {title: "", message1:"",message2:"",message3:""});
    if (value==="Confirmar"){
      handleDeleteIncident(); 
    } 
  }

  function handleDeleteIncident(id) {
    alert ("handleDeleteIncident");
  }

  // const loans = [
  //   { loanId:1,
  //     customerId:"456289",
  //     customerName: "Joao Ubaldo Ribeiro",
  //     loanProduct: "Heladera 360lts",
  //     loanTerm: 12,
  //     loanRequestStatus: "de",
  //     loanRequestDenialMsg:"Faja de Informconf fuera de rango",
  //     loanCapital: 1000000 },
  //   { loanId:2,
  //     customerId:"1786345",
  //     customerName: "Clarice Lispector",
  //     loanProduct: "Celular Iphone",
  //     loanTerm: 24,
  //     loanRequestStatus: "de",
  //     loanRequestDenialMsg:"Ingreso insuficiente para monto del préstamo",
  //     loanCapital: 5000000 },
  //   { loanId:3,
  //     customerId:"2789432",
  //     customerName: "Joao Cabral de Melo",
  //     loanProduct: "Viaje Cancun",
  //     loanTerm: 36,
  //     loanRequestStatus: "de",
  //     loanRequestDenialMsg:"Faja de Informconf fuera de rango",
  //     loanCapital: 7000000 },
  //   { loanId:4,
  //     customerId:"6065699",
  //     customerName: "Luis Fernando Verissimo",
  //     loanProduct: "Heladera 360lts",
  //     loanTerm: 12,
  //     loanRequestStatus: "de",
  //     loanRequestDenialMsg:"Operaciones morosas",
  //     loanCapital: 1000000 },
  //   { loanId:5,
  //     customerId:"7075699",
  //     customerName: "Euclides da Cunha",
  //     loanProduct:" Ipad Pro",
  //     loanTerm: 18,
  //     loanRequestStatus: "de",
  //     loanRequestDenialMsg:"Faja de Informconf fuera de rango",
  //     loanCapital: 1000000 },
  //   { loanId:6,
  //     customerId:"6065699",
  //     customerName: "Raquel de Queiroz",
  //     loanProduct: "Heladera 360lts",
  //     loanRequestStatus: "de",
  //     loanTerm: 6,
  //     loanRequestDenialMsg:"Operaciones morosas",
  //     loanCapital: 1000000 },
  //   { loanId:7,
  //     customerId:"6065699",
  //     customerName: "Tatiana Feltrin",
  //     loanProduct: "Heladera 360lts",
  //     loanRequestStatus: "de",
  //     loanTerm: 24,
  //     loanRequestDenialMsg:"Ingreso insuficiente para monto del préstamo",
  //     loanCapital: 1000000 },
  //   { loanId:8,
  //     customerId:"6065699",
  //     customerName: "Andre Trigueiro",
  //     loanProduct: "Heladera 360lts",
  //     loanTerm: 12,
  //     loanRequestStatus: "de",
  //     loanRequestDenialMsg:"Faja de Informconf fuera de rango",
  //     loanCapital: 1000000 },
  //   { loanId:9,
  //     customerId:"6065699",
  //     customerName: "Cecilia Meirelles",
  //     loanProduct: "Heladera 360lts",
  //     loanTerm: 24,
  //     loanRequestStatus: "de",
  //     loanRequestDenialMsg:"Faja de Informconf fuera de rango",
  //     loanCapital: 1000000 },
  //   { loanId:10,
  //     customerId:"989699",
  //     customerName: "Maria Clara Machado",
  //     loanProduct: "Heladera 360lts",
  //     loanTerm: 18,
  //     loanRequestStatus: "de",
  //     loanRequestDenialMsg:"Ingreso insuficiente para monto del préstamo",
  //     loanCapital: 1000000 },
  // ];



  return (
    <>
    <HeaderStore />

    <Grid container direction="column" alignItems="center" style= {{ minHeight: '90vh'}} >
      <Grid item xs={12} style= {{ minHeight: '0vh'}} /> 
      <Grid item xs={12} style= {{ width: '100%'}} >
        <Box className={classes.titleStyle} >
          <Typography align="center" variant="h6" ><b>Solicitudes Rechazadas - {sponsorName}</b></Typography>
        </Box>
      </Grid>

      <Grid item container direction="row" spacing={2} xs={12} >
            
        {loansList.map(loan => (
          <Grid item direction="row" spacing={1} xs={12} sm={6} md={3} >
            <Paper elevation={9} className={classes.paperStyle} style={{minHeight:'30vh'}} >
              <Typography align="center" variant="subtitle2" className={classes.boxStyle}>{loan.customerName}</Typography>              
              <Typography align="center" variant="subtitle2" className={classes.boxStyle} gutterBottom>Cedula: {Intl.NumberFormat('es-PY',{style:'decimal'}).format(loan.customerId)}</Typography>
              <Box className={classes.innerBoxStyle}> 
                <Typography variant="subtitle2" gutterBottom><b>Compra: </b>{loan.loanProduct}</Typography>
                <Typography variant="subtitle2" gutterBottom><b>Monto: </b>{Intl.NumberFormat('es-PY',{style:'currency',currency:'PYG'}).format(loan.loanCapital)}<b>  Cuotas: </b>{loan.loanTerm}</Typography>
                <Typography variant="subtitle2" ><b>Motivo de Rechazo: </b></Typography>
                <Typography variant="caption" gutterBottom style={{color:"red"}}>{loan.loanRequestDenialMsg}</Typography>
              </Box>
              <Grid container direction="rows" alignItems="center" justify="center"> 
                <Button variant="outlined" size="small" disableRipple startIcon={<DeleteForeverIcon />} className={classes.buttonStyle} style={{justifyContent: 'center', width:'150px'}} onClick={() => handleDeleteLoan(loan)}>Excluir Solicitud</Button>
              </Grid>
            </Paper>
          </Grid>
          ))}
      </Grid>
      <Grid style={{height:'8vh'}} />
    </Grid>
    <AlertDialog 
      open={isDialogOpen} 
      onClose={handleDialogClose} 
      severity={dialogMessage.severity} 
      title={dialogMessage.title} 
      buttons={dialogButtons}
      >
      {dialogMessage.messageLine1}
      <br />
      {dialogMessage.messageLine2}
      <br />
      {dialogMessage.messageLine3}
    </AlertDialog> 
    <Footer />
    </>
  )
}