import React, { useState, useContext, useEffect } from 'react';

import { Grid, Paper, Box, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import { LoginContext } from '../helper/Context';
import api from '../services/api';

import HeaderStore from '../components/HeaderStore';
import Footer from '../components/Footer';
import AlertDialog from '../components/modals/AlertDialog';
import AlertMessage from '../components/modals/AlertMessage';
import PdfDialog from '../components/modals/PdfDialog';
// import Modal from '../components/modals/Modal';

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
    backgroundColor: "#4caf50",
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
    color: "#4caf50",
    backgroundColor:"white",
    fontSize: "11px",
    textTransform:"none",
    margin: "2px",
    "&:hover": {
      color:"white",
      backgroundColor:"#4caf50",
    },
  },
  paperStyle:{
    width: "100%",   
    height:"100%",
    paddingLeft: "0px",
    marginLeft:"auto",
    marginRight:"auto",
  },
})  

export default function LoansApproved () {
  const classes = useStyles ();  
  const { userId, setUserId, userName, setUserName, sponsorId, setSponsorId, sponsorName, setSponsorName } = useContext (LoginContext);
  const [ loansList, setLoansList] = useState ([]);
  const [ isDialogPdfOpen,setIsDialogPdfOpen ] = useState(false);
  const [ dialogPdfProps, setDialogPdfProps ] = useState({amount:"", name:"", id:""});
  const [ isDialogOpen,setIsDialogOpen ] = useState(false);
  const [ dialogMessage,setDialogMessage ] = useState({severity:"", title:"",messageLine1:"",messageLine2:"",messageLine3:"",buttons:""});
  const [ isAlertOpen, setIsAlertOpen ] = useState(false);
  const [ alertMessage, setAlertMessage ] = useState({severity:"", title:"", message:""});
  const [ modalOpen, setModalOpen] = useState(false);
 
  // const [ dialogMessage,setDialogMessage ] = useState({severity:"", title:"",messageLine1:"",messageLine2:"",messageLine3:""});
  
  // const [ loansList, setLoansList] = useState ({customerId:"", customerName:"",loanProduct:"", loanCapital:"", loanTerm:"",loanPayment:"",loanTotalAmount:"",loanExpireDate:"",loanRequestStatus:"", loanRequestDenialMsg:""});
  const dialogButtonsConfirm = {button1:"Volver",button2:"Confirmar"};
  const dialogButtonsOk = {button1:"Ok"};
  const [ idDeleteSt, setIdDeleteSt] = useState(0);

  setSponsorId (localStorage.getItem('sponsorId'));
  setSponsorName (localStorage.getItem('sponsorName'));
  setUserId (localStorage.getItem('userId'));
  setUserName (localStorage.getItem('userName'));

  useEffect ( ()=> {
    setSponsorId (localStorage.getItem ('sponsorId'));
    const data = { sponsorId }
    api.get('profile', { headers :{
      Authorization: sponsorId,
    }
    }).then (response => {
      setLoansList (response.data);
    }).catch (function (err){
      if (err.response) {
        const errorMsg = Object.values(err.response.data);
        showErrorMessage("warning","Error en acceso a base de datos",errorMsg)
      } else if(err.request) {
          showErrorMessage("warning","Error en acceso a servidor","servidor no disponible")
        } else {
            showErrorMessage("warning","Error en acceso a servidor","servidor no disponible")
          }
    });
  },[sponsorId])

  function showErrorMessage(severityParam, titleParam, messageParam ){
    setDialogMessage ( prevState => ( {...prevState,
      severity: severityParam, 
      title: titleParam, 
      messageLine1:messageParam, 
      buttons:dialogButtonsOk,
    }));
    setIsDialogOpen(true); 
  }

  function handleDeleteLoan ( id, name, amount ){
    setIdDeleteSt(id);
    setDialogMessage ( prevState => ( {...prevState,
                       severity:"warning", 
                       title: "Solicitud de Anulación", 
                       messageLine1:`${name}`, 
                       messageLine2:`Monto Solicitado: ${Intl.NumberFormat('es-PY',{style:'currency',currency:'PYG'}).format(amount)}`,
                       messageLine3:"Confirma la anulación de la solicitud ?",
                       buttons: {button1:"Volver",button2:"Confirmar"},
                      }));
    setIsDialogOpen(true);   
  }

  function handlePdfDialog(loansList){
    setDialogPdfProps ({amount:loansList.loanTotalAmount, name:loansList.customerName, id:loansList.customerId})
    setIsDialogPdfOpen (true);
    // setModalOpen(true);
  }

  const handleDialogClose = (value) => {
    setIsDialogOpen (false);
    setDialogMessage( {title: "", message1:"",message2:"",message3:""});
    if (value === "Confirmar"){
      DeleteLoan (idDeleteSt); 
    } 
  }

  const handleAlertClose = () => {
    setIsAlertOpen(false);
    // setDialogMessage( {title: "", message1:"",message2:"",message3:""});

  }
  const handleDialogPdfClose = () => {
    setIsDialogPdfOpen(false);
  }
 
  async function DeleteLoan ( id ) {
    try {
      const response = await api.delete (`profile/${id}`,{   // elimina registro no banco de dados
        headers : {
          Authorization: sponsorId,
        }
      })
      if (response.status === 204){
        setLoansList(loansList.filter(loan => loan.id !== id)); // elimina no state
        alert("Solicitud eliminada con exito");

      } else if (response.dtatus === 401){
        alert("Exlusion no fue autorizada");
      }
    
    } catch (err) {
      if (err.response) {
        const errorMsg = Object.values(err.response.data);
        showErrorMessage("warning","Error en exclusión de solicitud",errorMsg)
      } else if(err.request) {
          showErrorMessage("warning","Error en exclusión de solicitud","servidor no disponible")
        } else {
            showErrorMessage("warning","Error en exclusión de solicitud","servidor no disponible")
          }
      }
  }

  return (
  <>
  <HeaderStore />  

  <Grid container direction="column" alignItems="center" style= {{ minHeight: '90vh'}} > 

    <Grid item xs={12} style= {{ minHeight: '0vh'}} /> 
    <Grid item xs={12} style= {{ width: '100%'}} >
      <Box className={classes.titleStyle}>      
        <Typography align="center" variant="h6" ><b>Solicitudes Aprobadas - {sponsorName}</b></Typography>
      </Box>
    </Grid>

    <Grid item container direction="row" spacing={2} xs={12} >

      {loansList.map (loan => (
        
        <Grid item direction="row" spacing={1} xs={12} sm={6} md={3} >
  
          <Paper elevation={9} className={classes.paperStyle} style={{minHeight:'30vh'}}>
            <Typography align="center" variant="subtitle2" className={classes.boxStyle}>{loan.customerName}</Typography>              
            <Typography align="center" variant="subtitle2" className={classes.boxStyle}>Cedula: {Intl.NumberFormat('es-PY',{style:'decimal'}).format(loan.customerId)}</Typography>
 
            <Box className={classes.innerBoxStyle} > 
              <Typography variant="subtitle2" gutterBottom><b>Compra: </b>{loan.loanProduct}</Typography>
              <Typography variant="subtitle2" gutterBottom><b>Monto: </b>{Intl.NumberFormat('es-PY',{style:'currency',currency:'PYG'}).format(loan.loanCapital)}<b>  Cuotas: </b>{loan.loanTerm}</Typography>
              <Typography variant="subtitle2" gutterBottom><b>Fecha de Aprobación:</b> 31/05/21</Typography>
              <Typography variant="subtitle2" gutterBottom><b>Monto Pagaré: </b>{Intl.NumberFormat('es-PY',{style:'currency',currency:'PYG'}).format(loan.loanTotalAmount)}</Typography>
            </Box>
            <Grid container spacing={0} >

              <Grid item xs={6} style={{textAlign:'center'}} >
                {/* <Button variant="outlined" size="small" component="span" disableRipple startIcon={<FileCopyIcon />} onClick={() => handlePdfDialog(loan)} className={classes.buttonStyle} style={{justifyContent: 'center'},{width:'150px'}}>Generar Pagaré</Button> */}
                <Button variant="outlined" size="small" component="span" disableRipple startIcon={<FileCopyIcon />} onClick={() => handlePdfDialog(loan)} className={classes.buttonStyle} style={{justifyContent: 'center'},{width:'150px'}}>Generar Pagaré</Button>

              </Grid>
              <Grid item xs={6} style={{textAlign:'center'}} >
                <Button variant="outlined" size="small" disableRipple startIcon={<DeleteForeverIcon />} className={classes.buttonStyle} style={{justifyContent: 'center'},{width:'150px'}} onClick={() => handleDeleteLoan(loan.id, loan.customerName, loan.loanCapital)}>Anular Solicitud</Button>
              </Grid>

            </Grid>
          </Paper>  
        </Grid> 
        ))}
    </Grid>   
      <Grid style={{height:'8vh'}} />
  </Grid> 

  <AlertDialog open={isDialogOpen} onClose={handleDialogClose} severity={dialogMessage.severity} title={dialogMessage.title} buttons={dialogMessage.buttons} >
  {/* <AlertDialog open={isDialogOpen} onClose={handleDialogClose} severity={dialogMessage.severity} title={dialogMessage.title} buttons={dialogButtonsConfirm} > */}
    {dialogMessage.messageLine1}
    <br />
    {dialogMessage.messageLine2}
    <br />
    {dialogMessage.messageLine3}
  </AlertDialog> 

  <AlertMessage open={isAlertOpen} onClose={handleAlertClose} severity={alertMessage.severity} title={alertMessage.title}>
    {alertMessage.message}
  </AlertMessage>

  {/* {isDialogPdfOpen && <PdfDialog onClose={handleDialogPdfClose} amount={dialogPdfProps.amount} name={dialogPdfProps.name} id={dialogPdfProps.id}/>} */}
  {/* {modalOpen && <Modal setOpenModal={setModalOpen} />} */}
  <PdfDialog open={isDialogPdfOpen} onClose={handleDialogPdfClose} amount={dialogPdfProps.amount} name={dialogPdfProps.name} id={dialogPdfProps.id} />
  <Footer />
  </>
  )
  // const incidents = [
  //   { loanId:1,
  //     customerId:"456289",
  //     customerName: "Thiago Nigro",
  //     loanProduct: "Heladera 360lts",
  //     loanTerm: 12,
  //     loanRequestStatus: "ap",
  //     loanRequestDenialMsg:"",
  //     loanTotalAmount: 2546248,
  //     loanCapital: 1599000},
  //   { loanId:2,
  //     customerId:"1786345",
  //     customerName: "Luis Stulbergher",
  //     loanProduct: "Celular Iphone",
  //     loanTerm: 18,
  //     loanRequestStatus: "ap",
  //     loanRequestDenialMsg:"",
  //     loanTotalAmount: 9601079,
  //     loanCapital: 4999000 },
  //   { loanId:3,
  //     customerId:"2789432",
  //     customerName: "Luis Alvez",
  //     loanProduct: "Viaje Cancun",
  //     loanTerm: 36,
  //     loanRequestStatus: "ap",
  //     loanRequestDenialMsg:"",
  //     loanTotalAmount: 40770000,
  //     loanCapital: 15000000 },
  //   { loanId:4,
  //     customerId:"6065699",
  //     customerName: "Renoir Vieira",
  //     loanProduct: "Heladera 460lts",
  //     loanTerm: 12,
  //     loanRequestStatus: "ap",
  //     loanRequestDenialMsg:"",
  //     loanTotalAmount: 2705488,
  //     loanCapital: 1699000 },
  //   { loanId:5,
  //     customerId:"7075699",
  //     customerName: "Heloisa Cruz",
  //     loanProduct:" Ipad Pro",
  //     loanTerm: 18,
  //     loanRequestStatus: "ap",
  //     loanRequestDenialMsg:"",
  //     loanTotalAmount:  11523600,
  //     loanCapital: 6000000 },
  //   { loanId:6,
  //     customerId:"6065699",
  //     customerName: "Juliana Santos",
  //     loanProduct: "Heladera 360lts",
  //     loanRequestStatus: "ap",
  //     loanTerm: 6,
  //     loanRequestDenialMsg:"",
  //     loanTotalAmount: 1945402,
  //     loanCapital: 1499000 },
  //   { loanId:7,
  //     customerId:"6065699",
  //     customerName: "Luciana Gallardo",
  //     loanProduct: "Heladera 360lts",
  //     loanRequestStatus: "ap",
  //     loanTerm: 24,
  //     loanRequestDenialMsg:"",
  //     loanTotalAmount:  3417720,
  //     loanCapital:  1499000 },
  //   { loanId:8,
  //     customerId:"6065699",
  //     customerName: "Marilia Fontes",
  //     loanProduct: "Horno Microondas",
  //     loanTerm: 12,
  //     loanRequestStatus: "ap",
  //     loanRequestDenialMsg:"",
  //     loanTotalAmount: 953848,
  //     loanCapital:  599000 },
  //   { loanId:9,
  //     customerId:"6065699",
  //     customerName: "Ricardo Szveiter",
  //     loanProduct: "Equpio de Sonido",
  //     loanTerm: 24,
  //     loanRequestStatus: "ap",
  //     loanRequestDenialMsg:"",
  //     loanTotalAmount: 2049720,
  //     loanCapital:  899000 },
  //   { loanId:10,
  //     customerId:"989699",
  //     customerName: "Enrique Bredda",
  //     loanProduct: "Viaje Miami",
  //     loanTerm: 18,
  //     loanRequestStatus: "ap",
  //     loanRequestDenialMsg:"",
  //     loanTotalAmount: 34570800,
  //     loanCapital: 12000000 },
  // ];
}