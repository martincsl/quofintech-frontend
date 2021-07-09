import React, {useEffect, useContext} from 'react';

import { Grid, Paper, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import useUnsavedWarning from '../hooks/useUnsavedWarning';
import { useLoanCalculations } from '../hooks/useLoanCalculations';

import TermSelect from './selects/TermSelect';
import NumberFormatAmount from './formats/NumberFormatAmount';
import NumberFormatDate from './formats/NumberFormatDate';

const useStyles = makeStyles( (mainTheme) => ({
  contentStyle: {
    position: 'absolute',
    top: '100px',
  },
  formStyle : {
    position:'absolute',
    top: '60px',
    width: '100%',
    height: '80px',
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
      marginLeft:5,
      marginRight: 5,
    },
    backgroundColor:mainTheme.palette.secondary.main,  
  },
}))

export default function CustLoanDetail ({handleChange, values, setValues, formErrors, setFormErrors,isValidName, isValidPhone, isValidAmount, isValidEmail, noBlanks }) {
  
  const classes = useStyles();  
  const [ Prompt, setIsDirty, setIsPristine ] = useUnsavedWarning();
  const { calcLoanExpireDate, calcLoanPayment } = useLoanCalculations({values, setValues});
  // const { handleBack, handleNext, handleReset } = useStepper (setActiveStep, submit);

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
        <Grid className={classes.formStyle}>
       
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
        </Grid>  {/* Grid formStyle    */}
      </Grid>    {/* Grid contentStyle    */}
      {Prompt}
      </div>
    )
}