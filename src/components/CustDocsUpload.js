import React from 'react';

import { Grid, Paper, Button, Box, Typography, Grow, Slide } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles( (mainTheme) => ({
  contentStyle: {
    position: 'absolute',
    top: '100px',
  },
  formStyle : {
    position:'absolute',
    top: '60px',
    width: '100%',
    height: '60px',
 },
  buttonStyle:{
    color: "white",
    backgroundColor:"gray",
    textTransform:"none",
    margin: "6px",
    "&:hover": {
    color:"mainTheme.palette.secondary.main",
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

export default function CustDocsUpload ({handleChange, values, setValues, formErrors, setFormErrors,isValidName, isValidPhone, isValidAmount, isValidEmail, noBlanks }) {

  const classes = useStyles();  

  return (
      <div>
      <Grid container direction="row" alignItems="center" justify="center" className={classes.contentStyle} style={{ minHeight:'70vh'}}>
        <Grid className={classes.formStyle}>
       
          <Paper elevation={6} spacing={2} className={classes.paperStyle}>
          <Typography align="center" variant="subtitle1" style={{color:'white'}} gutterBottom>Documentación de Respaldo</Typography>
            <form noValidate>
            
            <Typography align="left" variant="subtitle1" style={{color:'white'}} gutterBottom>Cargar Cedula de Identidad</Typography>
              <Grid item container direction="row" spacing={1}>
                
                <Grid item xs={12} md={4} alignItems="center" justify="center" > 
                  <input
                    accept="image/jpeg,image/gif,image/png,application/pdf"
                    name="customerIdFile1"
                    value={values.customerIdFile1}
                    className={classes.input}
                    id="contained-button-file-id1"
                    multiple
                 
                    type="file"
                  />
                  <label htmlFor="contained-button-file-id1">
                    <Button variant="contained" size="small" className={classes.buttonStyle} component="span" disableRipple startIcon={<CloudUploadIcon />} className={classes.buttonStyle} style={{justifyContent: 'center'},{width:'150px'}}>CI Frente</Button> 
                    <Typography align="center" style={{fontSize:9}}>{values.customerIdFile1.slice(12)}</Typography>
                  </label> 
                </Grid>
                <Grid item xs={12} md={4} > 
                  <input
                    accept="image/jpeg,image/gif,image/png,application/pdf"
                    name="customerIdFile2"
                    value={values.customerIdFile2}
                    className={classes.input}
                    id="contained-button-file-id2"
                    multiple
           
                    type="file"
                  />
                  <label htmlFor="contained-button-file-id2">
                    <Button variant="contained" size="small" className={classes.buttonStyle} component="span" disableRipple startIcon={<CloudUploadIcon />} className={classes.buttonStyle} style={{justifyContent: 'center'},{width:'150px'}}>CI Fondo</Button> 
                    <Typography align="center" style={{fontSize:9}}>{values.customerIdFile2.slice(12)}</Typography> 
                  </label>  
                </Grid>
              </Grid>
      
              <Typography align="left" variant="subtitle1" style={{display: 'inline-block'},{color:'white'}} >Cargar comprobante de residencia</Typography>
              <Grid item container direction="row" spacing={1}>
                <Grid item xs={12} md={4}> 
                <input
                  accept="image/jpeg,image/gif,image/png,application/pdf"
                  name="customerInvoiceFile"
                  value={values.customerInvoiceFile}
                  className={classes.input}
                  id="contained-button-file-invoice"
                  multiple
              
                  type="file"
                />
                <label htmlFor="contained-button-file-invoice">
                  <Button variant="contained" size="small" className={classes.buttonStyle} component="span" disableRipple startIcon={<CloudUploadIcon />} className={classes.buttonStyle} style={{justifyContent: 'center'},{width:'150px'}}>Factura Ande</Button> 
                  <Typography align="center" style={{fontSize:9}}>{values.customerInvoiceFile.slice(12)}</Typography> 
                </label>  
                </Grid>
              </Grid>
              
              <Typography align="left" variant="subtitle1" style={{color:'white'}} >Cargar comprobantes de ingreso</Typography>
              <Grid item container direction="row" spacing={1}>
                <Grid item xs={12} md={4}> 
                  <input
                    accept="image/jpeg,image/gif,image/png,application/pdf"
                    name="customerTaxFile1"
                    value={values.customerTaxFile1}
                    className={classes.input}
                    id="contained-button-file-tax1"
                    multiple

                    type="file"
                  />
                  <label htmlFor="contained-button-file-tax1">
                    <Button variant="contained" size="small" className={classes.buttonStyle} component="span" disableRipple startIcon={<CloudUploadIcon />} className={classes.buttonStyle} style={{justifyContent: 'center'},{width:'150px'}}>IVA Abr/2021</Button> 
                    <Typography align="center" style={{fontSize:9}}>{values.customerTaxFile1.slice(12)}</Typography> 
                  </label>  
                </Grid>
                <Grid item xs={12} md={4}> 
                  <input
                    accept="image/jpeg,image/gif,image/png,application/pdf"
                    name="customerTaxFile2"
                    value={values.customerTaxFile2}
                    className={classes.input}
                    id="contained-button-file-tax2"
                    multiple
                       
                    type="file"
                  />
                  <label htmlFor="contained-button-file-tax2">
                    <Button variant="contained" size="small" className={classes.buttonStyle} component="span" disableRipple startIcon={<CloudUploadIcon />} className={classes.buttonStyle} style={{justifyContent: 'center'},{width:'150px'}}>IVA Mar/2021</Button> 
                    <Typography align="center" style={{fontSize:9}}>{values.customerTaxFile2.slice(12)}</Typography> 
                  </label>  
                </Grid>
                <Grid item xs={12} md={4}> 
                  <input
                    accept="image/jpeg,image/gif,image/png,application/pdf"
                    name="customerTaxFile3"
                    value={values.customerTaxFile3}
                    className={classes.input}
                    id="contained-button-file-tax3"
                    multiple
                   
                    type="file"
                  />
                  <label htmlFor="contained-button-file-tax3">
                    <Button variant="contained" size="small" className={classes.buttonStyle} component="span" disableRipple startIcon={<CloudUploadIcon />} className={classes.buttonStyle} style={{justifyContent: 'center'},{width:'150px'}}>IVA Feb/2021</Button> 
                    <Typography align="center" style={{fontSize:9}}>{values.customerTaxFile3.slice(12)}</Typography> 
                  </label>  
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
      </div>
    )
}