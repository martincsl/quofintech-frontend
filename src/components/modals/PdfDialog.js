import React from 'react';

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, Button, Typography, Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Pdf from "react-to-pdf";

import useConvertionToText from '../../hooks/useConvertionToText';

const useStyles = makeStyles((mainTheme) => ({
  iconBox:{
    width:'100%',
    textAlign: 'center',
    AlignItems: 'center',
  },
  buttonStyle:{
    color:"white",
    backgroundColor:mainTheme.palette.primary.main,
    textTransform:"none",
    margin: "10px",
    minWidth:"140px",
    "&:hover": {
      color:"orangered",
      backgroundColor:mainTheme.palette.primary.main,
    },
  }, 
  paperStyle: {
    width: 650,   
    height:"100%",
    marginLeft:"50px",
    marginRight:"50px",
    padding: "10px",
    backgroundColor:"white",
  },   
}))

const ref = React.createRef();

const PdfDialog = ({open, onClose, amount, name, id}) => {

  const classes = useStyles();  
  const {dateToText, ruinzinha, numberToText} = useConvertionToText();

  return (
    <>
    <Box style={{width: 700}}> 
      <Dialog 
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
      >

      <DialogTitle id="alert-dialog-title" ><Typography align="center" variant="h6" style={{color:'white'}}>Generar Pagare</Typography></DialogTitle>
      <DialogContent style={{color:'white'}}>
        <DialogContentText id="alert-dialog-description">
        <div className="Post" ref={ref}>
          <Box style={{height: 30}}/>
          <Paper className={classes.paperStyle}> 
            <Box style={{height: 30}}/>
            <Typography align="center" variant="h6"><b>PAGARÉ A LA VISTA</b></Typography>
            <Typography align="left" variant="subtitle1">{Intl.NumberFormat('es-PY',{style:'currency',currency:'PYG'}).format(amount)} --</Typography>
            <Typography align="right" variant="subtitle2" style={{paddingRight:20}}>{dateToText()}</Typography>
            <Box style={{height: 20}}/>
            <Typography align="justify" variant="subtitle2">Pagare (mos) solidariamente libre de gastos y sin protesto a la orden de Crediclave S.A.E.C.A o a</Typography>
            <Typography align="justify" variant="subtitle2">su orden, la suma de <b>guaraníes {numberToText(amount).trim()}</b>.</Typography>
           
            <Box style={{height: 10}}/>
            <Typography align="left" variant="subtitle2">La falta de pago de este documento a su presentación, y desde la constitución en mora del deudor</Typography>
            <Typography align="justify" variant="subtitle2">originará  automáticamente  un  interés  del ______ por  ciento  mensual,  y además de un interés</Typography>
            <Typography align="justify" variant="subtitle2">punitorio del ______ por ciento mensual, sin que ello implique novación.</Typography>
            <Box style={{height: 10}}/>
            <Typography align="justify" variant="subtitle2">El  simple  vencimiento  establecerá  la  mora,  autorizando  la  inclusión de mi(s) nombre(s) </Typography>
            <Typography align="justify" variant="subtitle2">personal(es) a la base de datos de Informconf conforme a lo establecido en la Ley 1682/01 y </Typography>
            <Typography align="justify" variant="subtitle2">su modificatoria Ley 1969, como también para que se pueda proveer la información a terceros </Typography>
            <Typography align="justify" variant="subtitle2">interesados.</Typography>
            <Box style={{height: 10}}/>
            <Typography align="justify" variant="subtitle2">Todas las partes intervinientes en este documento se someten a la jurisdicción y competencia </Typography>
            <Typography align="justify" variant="subtitle2">de los jueces y tribunales de la ciudad de Asunción, y declaran prorrogada desde ya cualquier </Typography>
            <Typography align="justify" variant="subtitle2">otra que pudiera corresponder. El o los libradores de este documento fijan domicilio especial </Typography>
            <Typography align="justify" variant="subtitle2" >(art. 62 C.C.) a los efectos del cumplimiento del mismo el o los que aparecen más abajo.</Typography>
            <Box style={{height: 10}}/>
            <Typography align="justify" variant="subtitle2">Se deja constancia que los firmantes suscriben el presente pagaré a nombre de la sociedad </Typography>
            <Typography align="justify" variant="subtitle2">conyugal y así mismo a nombre propio, comprometiéndose los bienes propios y gananciales, </Typography>
            <Typography align="justify" variant="subtitle2">ya se trate de administración o disposición.</Typography>
            <Box style={{height: 20}}/>
            <Grid container direction="row" spacing={1}>
              <Grid item xs={6}>
                <Typography align="left" variant="subtitle2">Firma:_____________________________</Typography>     
              </Grid>
              <Grid item xs={6}>
                <Typography align="left" variant="subtitle2">Firma:_____________________________</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="left" variant="subtitle2">Deudor: {name}</Typography>     
              </Grid>
              <Grid item xs={6}>
                <Typography align="left" variant="subtitle2">Co-deudor: </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="left" variant="subtitle2">CI: {id}</Typography>     
              </Grid>
              <Grid item xs={6}>
                <Typography align="left" variant="subtitle2">CI: </Typography>
              </Grid>         
            </Grid>
            <Box style={{height: 20}}/>
            <Typography align="center" variant="subtitle2">NOTIFICACIÓN DE CESIÓN DE CRÉDITO</Typography>
            <Box style={{height: 20}}/>
            <Typography align="justify" variant="caption">Nos dirigimos a fin de poner en su conocimiento que hemos procedido a colocar en el sistema financiero</Typography>
            <Typography align="justify" variant="caption">la obligación contraída por usted a favor de Crediclave S.A.E.C.A., quedando dicho crédito y la gestión de </Typography>
            <Typography align="justify" variant="caption">cobro, a partir de la fecha, por cuenta de y orden de la cesionaria, a través de las redes de cobranza </Typography>
            <Typography align="justify" variant="caption">habilitadas a los efectos. La presente notificación queda perfeccionada en virtud a lo establecido por el Art. </Typography>
            <Typography align="justify" variant="caption">528 del CCP. </Typography>
            <Box style={{height: 20}}/>
            <Grid container direction="row" spacing={1}>
              <Grid item xs={6}>
                <Typography align="left" variant="subtitle2">Firma:_____________________________</Typography>     
              </Grid>
              <Grid item xs={6}>
                <Typography align="left" variant="subtitle2">Firma:_____________________________</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="left" variant="subtitle2">Deudor: {name}</Typography>     
              </Grid>
              <Grid item xs={6}>
                <Typography align="left" variant="subtitle2">Co-deudor: </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="left" variant="subtitle2">CI: {id}</Typography>     
              </Grid>
              <Grid item xs={6}>
                <Typography align="left" variant="subtitle2">CI: </Typography>
              </Grid>
            </Grid>
          </Paper> 
        </div>
      <Box style={{height: 0}}/>
      </DialogContentText>
    </DialogContent>
    <DialogActions >
      <Grid container direction="row" xs={6} style={{textAlign:'center'}}>
        <Button disableRipple className={classes.buttonStyle} onClick={onClose}>Volver</Button>
        <Pdf targetRef={ref} filename="post.pdf">
          {({ toPdf }) => <Button disableRipple className={classes.buttonStyle} onClick={toPdf}>Generar Archivo Pdf</Button>}
        </Pdf>
        <Box style={{height: 20}}/>
      </Grid> 
    </DialogActions>
    </Dialog>
    </Box>
    </>
  )
}
export default PdfDialog