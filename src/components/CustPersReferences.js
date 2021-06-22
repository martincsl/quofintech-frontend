import React, {useEffect} from 'react';

import { Grid, Paper, TextField, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MobilePrefixSelect from './selects/MobilePrefixSelect';
import NumberFormatCI from './formats/NumberFormatCI.js';
import NumberFormatPhone from './formats/NumberFormatPhone.js';

const useStyles = makeStyles( (mainTheme) => ({
    root: {
      flexGrow: 1,
    },
    formControl: {
      marginTop: mainTheme.spacing(1),
      minWidth: 260,
      maxHeight: 36,
    },
    contentStyle: {
      position: 'absolute',
      top: '100px',
      /*    backgroundColor:'blue',*/
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
      margin: "10px",
      //marginTop: "15px",
      "&:hover": {
      color:mainTheme.palette.secondary.main,
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

export default function CustPersReferences ({handleChange, values, setValues, formErrors, setFormErrors,isValidName, isValidPhone, isValidAmount, isValidEmail, noBlanks }){

  const classes = useStyles();  

  useEffect(() => {
    localStorage.setItem("stateData", JSON.stringify(values));
  });

  return(
    <>
    <Grid container direction="row" alignItems="center" justify="center" className={classes.contentStyle} style={{ minHeight:'70vh'}}>
        <Grid item className={classes.formStyle}>
       
         <Paper elevation={6} spacing={2} className={classes.paperStyle}> 
            <Typography align="center" variant="subtitle1" style={{color:'white'}} gutterBottom>Datos de Referencias Personales</Typography>
 
            <Grid item container direction="row" spacing={1} >
              <Grid item xs={12} md={3} > 
                <TextField
                  label="CI Ref. Personal 1 *"
                  value={values.persReference1Id}
                  onChange={(e) => handleChange (e,[noBlanks])}
                  variant="filled"
                  fullWidth
                  name="persReference1Id"
                  id="formatted-numberformat-input"
                  InputProps={{
                    inputComponent: NumberFormatCI,
                  }}
                />
                {formErrors.persReference1Id ? <div className="error-helper-text">{formErrors.persReference1Id}</div> : null} 
              </Grid>
              <Grid item xs={12} md={9} > 
                <TextField id="persReference1Name" label="Nombre de la Referencia Personal 1 *" 
                  variant ="filled" margin="none"  fullWidth
                  name="persReference1Name" value={values.persReference1Name} onChange={ (e) => handleChange (e,[isValidName])}
                  error={formErrors.persReference1Name} >
                </TextField>
                {formErrors.persReference1Name ? <div className="error-helper-text">{formErrors.persReference1Name}</div> : null} 
              </Grid>
            </Grid>

            <Grid item container xs={12} md={12} spacing={1} > 
               <Grid item xs={6}  >
                  <MobilePrefixSelect value={values.persReference1MobilePrefix} onChange={(e) => handleChange (e,[noBlanks])} name="persReference1MobilePrefix"/> 
                </Grid>
                <Grid item xs={6}  >
                  <TextField
                  label="Celular *"
                  value={values.persReference1Mobile}
                  onChange={(e) => handleChange (e,[noBlanks])}
                  variant="filled"
                  fullWidth
                  name="persReference1Mobile"
                  id="formatted-numberformat-input"
                  InputProps={{
                  inputComponent: NumberFormatPhone,
                  }}
                  />
                  {formErrors.persReference1Mobile ? <div className="error-helper-text">{formErrors.persReference1Mobile}</div> : null}    
                </Grid>
              </Grid> 
            {/* </Grid>  */}
            <Box style={{height:15}}/>
            <Grid item container direction="row" spacing={1} >
              <Grid item xs={12} md={3} > 
                <TextField
                  label="CI Ref. Personal 2 *"
                  value={values.persReference2Id}
                  onChange={(e) => handleChange (e,[noBlanks])}
                  variant="filled"
                  fullWidth
                  name="persReference2Id"
                  id="formatted-numberformat-input"
                  InputProps={{
                    inputComponent: NumberFormatCI,
                  }}
                />
                {formErrors.persReference2Id ? <div className="error-helper-text">{formErrors.persReference2Id}</div> : null} 
              </Grid>
              <Grid item xs={12} md={9} > 
                <TextField id="persReference2Name" label="Nombre de la Referencia Personal 2 *" 
                  variant ="filled" margin="none"  fullWidth
                  name="persReference2Name" value={values.persReference2Name} onChange={ (e) => handleChange (e,[isValidName])}
                  error={formErrors.persReference2Name} >
                </TextField>
                {formErrors.persReference2Name ? <div className="error-helper-text">{formErrors.persReference2Name}</div> : null} 
              </Grid>
            </Grid>

            <Grid item container xs={12} md={6} spacing={1} > 
               <Grid item xs={6} >
                  <MobilePrefixSelect value={values.persReference2MobilePrefix} onChange={(e) => handleChange (e,[noBlanks])} name="persReference2MobilePrefix"/> 
                </Grid>
                <Grid item xs={6} >
                  <TextField
                  label="Celular *"
                  value={values.persReference2Mobile}
                  onChange={(e) => handleChange (e,[noBlanks])}
                  variant="filled"
                  fullWidth
                  name="persReference2Mobile"
                  id="formatted-numberformat-input"
                  InputProps={{
                  inputComponent: NumberFormatPhone,
                  }}
                  />
                  {formErrors.persReference2Mobile ? <div className="error-helper-text">{formErrors.persReference2Mobile}</div> : null}    
                </Grid>
              </Grid> 
            {/* </Grid>  */}
         </Paper>   
        </Grid>   
    </Grid>   
    </>
  )
}