import React, {useEffect, useContext} from 'react';

import { Grid, Paper, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

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
    backgroundColor:mainTheme.palette.secondary.main,  
  },
}))

export default function CustLoanDetail ({handleChange, values, setValues, formErrors, setFormErrors,isValidName, isValidPhone, isValidAmount, isValidEmail, noBlanks }) {

 useEffect(() => {
    localStorage.setItem("stateData", JSON.stringify(values));
  });

  useEffect(() => {
//  if (values.loanCapital > 0 && values.loanTerm > 0) {
  if (values.loanTerm > 0) {
    calcLoanPayment();
    calcLoanExpireDate();
  }
  }, [values.loanTerm]);

  useEffect(() => {
  // if (values.loanCapital > 0 && values.loanTerm > 0) {
       calcLoanPayment();
  //   calcLoanExpireDate();
  // }
  }, [values.loanCapital]);

    const classes = useStyles();  
       
    function calcLoanExpireDate () {
      let today = new Date();
      let currentYear=today.getFullYear();
      let currentMonth=today.getMonth();
      let dayChar=today.getDate();;
      let monthsToGo= currentMonth + values.loanTerm + 2;
      let monthsLeftCurrYear= 12 - currentMonth;
      let monthChar="";
      let yearChar ="";
      let expireDate="";

      if (monthsToGo > 36) {
        monthChar = monthsToGo-36
      } else if (monthsToGo > 24) {
          monthChar = monthsToGo-24
      } else if (monthsToGo > 12) {
          monthChar = monthsToGo-12
      } else {
          monthChar = monthsToGo
      }
      
      if (values.loanTerm > 36 - monthsLeftCurrYear) {
        yearChar = currentYear + 3
      } else if( values.loanTerm > 24- monthsLeftCurrYear){
        yearChar = currentYear + 2
      } else if( values.loanTerm > 12- monthsLeftCurrYear){
        yearChar = currentYear + 1
      } else {
        yearChar = currentYear 
      }

      if (dayChar < 10){
        dayChar="0"+dayChar;
      }
      if (monthChar < 10) {
        monthChar="0"+ monthChar;
      }
      expireDate=dayChar.toString() + monthChar.toString() + yearChar.toString();
      setValues (prevState => ({...prevState,loanExpireDate: expireDate }));
    }

    function calcLoanPayment(){
      let factor = 0 ;
      let payment = 0 ;
      let total=0 ;
      const multiplier = [1.0800, 0.5608, 0.3880, 0.3019, 0.2505, 0.2163, 0.1921, 0.1740, 0.1601, 0.1490, 0.1401, 0.1327,
                          0.1265, 0.1213, 0.1168, 0.1130, 0.1096, 0.1067, 0.1041, 0.1019, 0.0998, 0.0980, 0.0964, 0.0950,
                          0.0933, 0.0917, 0.0900, 0.0884, 0.0868, 0.0852, 0.0836, 0.0820, 0.0803, 0.0787, 0.0771, 0.0755 
                         ]  
      factor = multiplier [values.loanTerm];
      payment = factor * values.loanCapital;
      total = payment* (values.loanTerm+1);
      setValues (prevState => ({...prevState,loanPayment:Math.round(payment) }));
      setValues (prevState => ({...prevState,loanTotalAmount:Math.round(total) }));
      return 
    }

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
                  
                   name="loanProduct" value={values.loanProduct} onChange={(e) => handleChange (e,[noBlanks])}
                   error={formErrors.loanProduct} ></TextField>
                   {formErrors.loanProduct ? <div className="error-helper-text">{formErrors.loanProduct}</div> : null}
                </Grid>
              </Grid>  {/* Linea Producto   */}

              <Grid item container direction="row" spacing={1}>
                <Grid item xs={6} md={4}> 
                  <TextField
                    label="Monto solicitado *"
                    value={values.loanCapital}
                    onChange={(e) => handleChange (e,[noBlanks])}
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
                  <TermSelect value={values.loanTerm} onChange={(e) => handleChange (e,[noBlanks])} name="loanTerm"/>
                </Grid>  
              </Grid>  

                <Grid item container direction="row" spacing={1}  >
                  <Grid item xs={6} md={4}> 
                    <TextField id="loanTotalAmount" label="Monto del pagaré"
                      variant ="filled" margin="none" type="loanTotalAmount" disabled fullWidth
                      name="loanTotalAmount" value={values.loanTotalAmount} onChange={(e) => handleChange (e,[isValidAmount])}
                      error={formErrors.loanTotalAmount}
                      InputProps={{
                        inputComponent: NumberFormatAmount,
                      }}></TextField>
                       {formErrors.loanTotalAmount ? <div className="error-helper-text">{formErrors.loanTotalAmount}</div> : null}
                  </Grid>  
                  <Grid item xs={6} md={4}> 
                    <TextField id="loanPayment" label="Monto de la cuota"
                     variant ="filled" margin="none"  type="loanPayment" disabled fullWidth
                     name="loanPayment" value={values.loanPayment} onChange={(e) => handleChange (e,[isValidAmount])}
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
                      name="loanExpireDate" value={values.loanExpireDate} onChange={(e) => handleChange (e,[noBlanks])}
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
      </div>
    )
}