import React, {useEffect, useContext} from 'react';

import { Grid, Paper, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import useUnsavedWarning from '../hooks/useUnsavedWarning';
import useFormHandlers from '../hooks/useFormHandlers';
import { useLoanCalculations } from '../hooks/useLoanCalculations';
import useValidations from '../hooks/useValidations.js';

import TermSelect from './selects/TermSelect';
import NumberFormatAmount from './formats/NumberFormatAmount';
import NumberFormatDate from './formats/NumberFormatDate';

const useStyles = makeStyles( (mainTheme) => ({
  contentStyle: {
    position: 'absolute',
    // backgroundColor: 'green',
    top: '100px',
  },
  formStyle : {
    position:'absolute',
    top: '60px',
    width: '100%',
    // backgroundColor: 'blue',
    height: '60px',
 },
 paperStyle: {
  position:'absolute',
  padding:'10px',
  top: '60px',
  width: '100%',
  maxWidth: 550,
  height: 400,
  [mainTheme.breakpoints.down('sm')]: {
    top: '0px',
    minWidth: 350,
    height: 500,
    marginLeft:5,
    marginRight: 5,
  },
    backgroundColor:mainTheme.palette.secondary.main,  
    paddingLeft:10,
    paddingRight: 10,
    paddingTop: 10,
  },
}))

export default function CustLoanDetail ({ values, setValues, formErrors, setFormErrors }) {
  
  const classes = useStyles();  
  const [ Prompt, setIsDirty, setIsPristine ] = useUnsavedWarning();
  const { calcLoanExpireDate, calcLoanPayment } = useLoanCalculations({values, setValues});
  // const { handleBack, handleNext, handleReset } = useStepper (setActiveStep, submit);
  const { handleChange } = useFormHandlers ({values, setValues, formErrors, setFormErrors});
  const { isValidCustomerId, isValidName, isValidDay, isValidDate, isValidPhone, isValidAmount, isValidEmail, noBlanks} = useValidations ();


  useEffect(() => {
    setIsDirty()
  }, []);

  useEffect(() => {
    localStorage.setItem("stateData", JSON.stringify(values));
  });

  useEffect(() => {
  if (values.loanTerm >= 0) {
    calcLoanPayment();
    calcLoanExpireDate();
  }
  }, [values.loanTerm]);

  useEffect(() => {
    calcLoanPayment();
  }, [values.loanCapital]);

    return (
      <div>
      <Grid container direction="row" alignItems="center" justify="center" className={classes.contentStyle} style={{ minHeight:'70vh'}}>
        {/* <Grid className={classes.formStyle}> */}
       
          <Paper elevation={6} spacing={2} className={classes.paperStyle}>
            <form noValidate>
              <Typography align="center" variant="subtitle1" style={{color:'white'}} gutterBottom>Datos de la Financiación</Typography>
              
              <Grid item container direction="row" spacing={1}>

                <Grid item xs={12} md={12}> 
                  <TextField id="loanProduct" label="Producto/Servicio" 
                   variant ="filled"  fullWidth  
                  
                   name="loanProduct" value={values.loanProduct} 
                   onChange={(e) => { handleChange (e,[noBlanks])}}
                   error={formErrors.loanProduct} ></TextField>
                   {formErrors.loanProduct ? <div className="error-helper-text">{formErrors.loanProduct}</div> : null}
                </Grid>
              </Grid>  {/* Linea Producto   */}

              <Grid item container direction="row" spacing={1}>
                <Grid item xs={6} md={4}> 
                  <TextField
                    label="Monto solicitado *"
                    value={values.loanCapital}
                    onChange={(e) => { handleChange (e,[noBlanks])}}
                    variant="filled"
                    fullWidth
                    name="loanCapital"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatAmount,
                    }}
                  />
                  {formErrors.loanCapital ? <div className="error-helper-text">{formErrors.loanCapital}</div> : null}
                </Grid>

                <Grid item xs={6} md={4}> 
                  <TermSelect value={values.loanTerm} 
                    onChange={ (e) => {
                      handleChange (e,[noBlanks]);
                      setIsDirty ();
                    }}
                    name="loanTerm"/>
                </Grid>  
              </Grid>  

                <Grid item container direction="row" spacing={1}  >
                  <Grid item xs={6} md={4}> 
                    <TextField id="loanTotalAmount" label="Monto del pagaré"
                      variant ="filled" margin="none" type="loanTotalAmount" disabled fullWidth
                      name="loanTotalAmount" value={values.loanTotalAmount} 
                      onChange={(e) => handleChange (e,[isValidAmount])}
                      error={formErrors.loanTotalAmount}
                      InputProps={{
                        inputComponent: NumberFormatAmount,
                      }}></TextField>
                       {formErrors.loanTotalAmount ? <div className="error-helper-text">{formErrors.loanTotalAmount}</div> : null}
                  </Grid>  
                  <Grid item xs={6} md={4}> 
                    <TextField id="loanPayment" label="Monto de la cuota"
                     variant ="filled" margin="none"  type="loanPayment" disabled fullWidth
                     name="loanPayment" value={values.loanPayment} 
                     onChange={(e) => handleChange (e,[isValidAmount])}
                     error={formErrors.loanPayment}
                     InputProps={{
                      inputComponent: NumberFormatAmount,
                     }}>
                    </TextField>
                    {formErrors.loanPayment ? <div className="error-helper-text">{formErrors.loanPayment}</div> : null}
                  </Grid>
                </Grid>  
                <Grid item container direction="row" spacing={1}  >
                  <Grid item xs={6} md={4}> 
                    <TextField id="loanExpireDate" label="Fecha de Vencimiento"
                      variant ="filled" margin="none"  type="loanExpireDate" disabled fullWidth
                      name="loanExpireDate" value={values.loanExpireDate} 
                      onChange={(e) => handleChange (e,[noBlanks])}
                      error={formErrors.loanExpireDate}
                      InputProps={{
                        inputComponent: NumberFormatDate,
                      }}>
                    </TextField>
                    {formErrors.loanExpireDate ? <div className="error-helper-text">{formErrors.loanExpireDate}</div> : null}
                  </Grid>
                </Grid>
            </form>
          </Paper>
        {/* </Grid>  Grid formStyle    */}
      </Grid>    {/* Grid contentStyle    */}
      {Prompt}
      </div>
    )
}