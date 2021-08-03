import React, {useEffect} from 'react';

import { Grid, Paper, TextField, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useUnsavedWarning from '../hooks/useUnsavedWarning';
import useFormHandlers from '../hooks/useFormHandlers';
import useValidations from '../hooks/useValidations.js';

import MobilePrefixSelect from './selects/MobilePrefixSelect';
import NumberFormatRUC from './formats/NumberFormatRUC.js';
import NumberFormatPhone from './formats/NumberFormatPhone.js';

const useStyles = makeStyles((mainTheme) => ({
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

export default function CustComReferences ({ values, setValues, formErrors, setFormErrors }){
  
  const classes = useStyles();  
  const [ Prompt, setIsDirty, setIsPristine ] = useUnsavedWarning();
  const { handleChange } = useFormHandlers ({values, setValues, formErrors, setFormErrors});
  const {isValidCustomerId, isValidName, isValidDay, isValidDate, isValidPhone, isValidAmount, isValidEmail, noBlanks} = useValidations ();

  useEffect(() => {
    setIsDirty()
  }, []);

  return (
    <>
    <Grid container direction="row" alignItems="center" justify="center" className={classes.contentStyle} style={{ minHeight:'70vh'}}>
      <Grid item className={classes.formStyle}>
       
        <Paper elevation={6} spacing={2} className={classes.paperStyle}> 
          <Typography align="center" variant="subtitle1" style={{color:'white'}} gutterBottom>Datos de Referencias Comerciales</Typography>
 
          <Grid item container direction="row" spacing={1} >

            <Grid item xs={4} md={3} > 
              <TextField
                label="RUC Referencia 1 *"
                value={values.comReference1Id}
                onChange={(e) => handleChange (e,[noBlanks])}
                variant="filled"
                fullWidth
                name="comReference1Id"
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumberFormatRUC,
                }}
              />
              {formErrors.comReference1Id ? <div className="error-helper-text">{formErrors.comReference1Id}</div> : null} 
            </Grid>

            <Grid item xs={8} md={9} > 
              <TextField id="comReference1Name" label="Nombre de la Referencia Comercial 1 *" 
                variant ="filled" margin="none"  fullWidth
                name="comReference1Name" value={values.comReference1Name} onChange={ (e) => handleChange (e,[isValidName])}
                error={formErrors.comReference1Name} >
              </TextField>
              {formErrors.comReference1Name ? <div className="error-helper-text">{formErrors.comReference1Name}</div> : null} 
            </Grid>
          </Grid>

          <Grid item container xs={12} md={6} spacing={1} > 

            <Grid item xs={4} >
              <MobilePrefixSelect value={values.comReference1MobilePrefix} onChange={(e) => handleChange (e,[noBlanks])} name="comReference1MobilePrefix"/> 
            </Grid>

            <Grid item xs={8} >
              <TextField
                label="Celular *"
                value={values.comReference1Mobile}
                onChange={(e) => handleChange (e,[noBlanks])}
                variant="filled"
                fullWidth
                name="comReference1Mobile"
                id="formatted-numberformat-input"
                InputProps={{
                inputComponent: NumberFormatPhone,
                }}
              />
              {formErrors.comReference1Mobile ? <div className="error-helper-text">{formErrors.comReference1Mobile}</div> : null}    
            </Grid>
          </Grid>

            <Box style={{height:15}}/>

          <Grid item container direction="row" spacing={1} >

            <Grid item xs={12} md={3} > 
              <TextField
                label="RUC Referencia 2 *"
                value={values.comReference2Id}
                onChange={(e) => handleChange (e,[noBlanks])}
                variant="filled"
                fullWidth
                name="comReference2Id"
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumberFormatRUC,
                }}
              />
              {formErrors.comReference2Id ? <div className="error-helper-text">{formErrors.comReference2Id}</div> : null} 
            </Grid>

            <Grid item xs={12} md={9} > 
              <TextField id="comReference2Name" label="Nombre de la Referencia Comercial 2 *" 
                variant ="filled" margin="none"  fullWidth
                name="comReference2Name" value={values.comReference2Name} onChange={ (e) => handleChange (e,[isValidName])}
                error={formErrors.comReference2Name} >
              </TextField>
              {formErrors.comReference2Name ? <div className="error-helper-text">{formErrors.comReference2Name}</div> : null} 
            </Grid>
          </Grid>

          <Grid item container xs={12} md={6} spacing={1} > 

            <Grid item xs={6} >
              <MobilePrefixSelect value={values.comReference2MobilePrefix} onChange={(e) => handleChange (e,[noBlanks])} name="comReference2MobilePrefix"/> 
            </Grid>

            <Grid item xs={6} >
              <TextField
              label="Celular *"
              value={values.comReference2Mobile}
              onChange={(e) => handleChange (e,[noBlanks])}
              variant="filled"
              fullWidth
              name="comReference2Mobile"
              id="formatted-numberformat-input"
              InputProps={{
              inputComponent: NumberFormatPhone,
              }}
              />
              {formErrors.comReference2Mobile ? <div className="error-helper-text">{formErrors.comReference2Mobile}</div> : null}    
            </Grid>
          </Grid> 
        </Paper>   
      </Grid>   
    </Grid>   
    </>
  )
}