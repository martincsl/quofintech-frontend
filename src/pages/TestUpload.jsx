import React, { useState } from 'react';

import { Grid, Paper, Button, Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import Header from '../components/Header';
import Footer from '../components/Footer';

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
    backgroundColor:mainTheme.palette.primary.main,
    textTransform:"none",
    margin: "6px",
    "&:hover": {
    color:"mainTheme.palette.secondary.main",
    backgroundColor:"gray",
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
  const [ utilitiesInvoice, setUtilitiesInvoice ] = useState(null);
  let fileAndeSrc = null;
  
  function checkBtnColors (){
    if (utilitiesInvoice){
      return "green"
    }
  }

  function handleUtilitiesInvoice (e){
    let file = e.target.files
    console.log(file[0])
    if (file[0].name){
      setUtilitiesInvoice(file[0].name)
      let reader = new FileReader ();
      reader.readAsDataURL (file[0]);
      reader.onload = (e) => {
        fileAndeSrc = e.target.result
        console.warn("image data", e.target.result)
      }
    }
  }

  return (
    <>
    {/* <Header /> */}
    {console.count()}
    {/* { ! utilitiesInvoice ? <> */}
        <input
          accept="image/jpeg,image/gif,image/png,application/pdf"
          name="utilitiesInvoce"
          // value={utilitiesInvoice}
          onChange= { (e) => {handleUtilitiesInvoice (e)}}
          className={classes.input}
          id="contained-button-file-invoice"
          // multiple
          type="file"
        />

        <label htmlFor="contained-button-file-invoice">
          <Button variant="contained" size="small" className={classes.buttonStyle} component="span" disableRipple startIcon={<CloudUploadIcon />} style={{justifyContent: 'center',width:'150px', backgroundColor:checkBtnColors()}}>Factura Ande</Button>
          <Typography variant ="caption" align="left" style={{fontSize:9, paddingLeft: 5}}>{utilitiesInvoice}</Typography> 
        </label>
        {/* <embed src={utilitiesInvoice} width="200px" height="600px" /> */}

        {/* <img src={fileAndeSrc} alt="ande" /> */}
    <Footer />
  </>
  )  
}