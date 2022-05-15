import React, {useState, useEffect} from 'react';

import { Grid, Paper, Button, Box, Typography, Grow, Slide } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import useUnsavedWarning from '../../../hooks/useUnsavedWarning';

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
    [mainTheme.breakpoints.down('sm')]: {
      top: '0px',
      marginLeft:5,
      marginRight: 5,
      height: 500,
    },
    backgroundColor:mainTheme.palette.secondary.main,  
  },
  input: {
    display: 'none',
  },
}))

export function FormDocsUpload ({handleChange, values, setValues, formErrors, setFormErrors,isValidName, isValidPhone, isValidAmount, isValidEmail, noBlanks }) {

  const classes = useStyles();  
  const [ Prompt, setIsDirty, setIsPristine ] = useUnsavedWarning();
  // const [ documents, setDocuments] = useState ({idFrontPic:null, idBackPic:null, utilitiesInvoce:null, vatForm1:null, vatForm2:null, vatForm3:null})
  const [ idFrontPic, setIdFrontPic] = useState(null);
  const [ idBackPic, setIdBackPic] = useState(null);
  const [ utilitiesInvoce, setUtilitiesInvoce] = useState(null);
  const [ vatForm1, setVatForm1] = useState(null);
  const [ vatForm2, setVatForm2] = useState(null);
  const [ vatForm3, setVatForm3] = useState(null);

  useEffect(() => {
    setIsDirty()
  }, []);

  useEffect(() => {
    localStorage.setItem("stateData", JSON.stringify(values));
  });

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
                    name="idFrontPic"
                    value={idFrontPic}
                    className={classes.input}
                    id="contained-button-file-id1"
                    multiple
                    onChange= { (event) => {setIdFrontPic (event.target.files)}}
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
                    name="idBackPic"
                    value={idBackPic}
                    onChange= { (event) => {setIdBackPic (event.target.files)}}
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
      
              <Typography align="left" variant="subtitle1" style={{display: 'inline-block',color:'white'}} >Cargar comprobante de residencia</Typography>
              <Grid item container direction="row" spacing={1}>
                <Grid item xs={12} md={4}> 
                <input
                  accept="image/jpeg,image/gif,image/png,application/pdf"
                  name="utilitiesInvoce"
                  value={utilitiesInvoce}
                  onChange= { (event) => {setUtilitiesInvoce (event.target.files)}}
                  className={classes.input}
                  id="contained-button-file-invoice"
                  multiple
              
                  type="file"
                />
                <label htmlFor="contained-button-file-invoice">
                  <Button variant="contained" size="small" className={classes.buttonStyle} component="span" disableRipple startIcon={<CloudUploadIcon />} style={{justifyContent: 'center',width:'150px'}}>Factura Ande</Button> 
                  <Typography align="center" style={{fontSize:9}}>{values.customerInvoiceFile.slice(12)}</Typography> 
                </label>  
                </Grid>
              </Grid>
              
              <Typography align="left" variant="subtitle1" style={{color:'white'}} >Cargar comprobantes de ingreso</Typography>
              <Grid item container direction="row" spacing={1}>
                <Grid item xs={12} md={4}> 
                  <input
                    accept="image/jpeg,image/gif,image/png,application/pdf"
                    name="vatForm1"
                    value={vatForm1}
                    onChange= { (event) => {setVatForm1 (event.target.files)}}
                    className={classes.input}
                    id="contained-button-file-tax1"
                    multiple

                    type="file"
                  />
                  <label htmlFor="contained-button-file-tax1">
                    <Button variant="contained" size="small" className={classes.buttonStyle} component="span" disableRipple startIcon={<CloudUploadIcon />} style={{justifyContent: 'center',width:'150px'}}>IVA Abr/2021</Button> 
                    <Typography align="center" style={{fontSize:9}}>{values.customerTaxFile1.slice(12)}</Typography> 
                  </label>  
                </Grid>
                <Grid item xs={12} md={4}> 
                  <input
                    accept="image/jpeg,image/gif,image/png,application/pdf"
                    name="vatForm2"
                    value={vatForm2}
                    onChange= { (event) => {setVatForm2 (event.target.files)}}

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
                    name="vatForm3"
                    value={vatForm3}
                    onChange= { (event) => {setVatForm3 (event.target.files)}}
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