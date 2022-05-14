import React, { useState } from 'react';

import { Grid, Paper, Button, Box, Typography } from '@material-ui/core'
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

export default function TestUpload (){
  const classes = useStyles();
  const [ utilitiesInvoice, setUtilitiesInvoice ] = useState("");

  function handleUtilitiesInvoice( file){
    console.log(file[0].name)

    setUtilitiesInvoice(file[0].name)
  }

  return (
    <>
    
      <input
        accept="image/jpeg,image/gif,image/png,application/pdf"
        name="utilitiesInvoce"
        value={utilitiesInvoice}
        onChange= { (event) => {handleUtilitiesInvoice (event.target.files)}}
        className={classes.input}
        id="contained-button-file-invoice"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file-invoice">
        <Button variant="contained" size="small" className={classes.buttonStyle} component="span" disableRipple startIcon={<CloudUploadIcon />} style={{justifyContent: 'center',width:'150px'}}>Factura Ande</Button> 
        <Typography align="center" style={{fontSize:9}}>{utilitiesInvoice}</Typography> 
      </label>  

  </>
  )  
}