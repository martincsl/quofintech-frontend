import React, {useEffect} from 'react';

import { Grid, Paper, Button, Box, TextField, Typography, Grow, Slide, InputAdornment } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import MobilePrefixSelect from './selects/MobilePrefixSelect';
import CitiesSelect from './selects/CitiesSelect';
import HireTypeSelect from './selects/HireTypeSelect';
import NumberFormatAmount from './formats/NumberFormatAmount';
import NumberFormatRUC from './formats/NumberFormatRUC';
import NumberFormatPhone from './formats/NumberFormatPhone';

const useStyles = makeStyles( (mainTheme) => ({
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
    minHeight: 400,
    backgroundColor:mainTheme.palette.secondary.main,  
  },

}))

export default function CustWorkDetail ({handleChange, values, setValues, formErrors, setFormErrors,isValidName, isValidPhone, isValidAmount, isValidEmail, noBlanks }) {

  const classes = useStyles();

  useEffect(() => {
    localStorage.setItem("stateData", JSON.stringify(values));
  });

    return (
      <div>
      <Grid container direction="row" alignItems="center" justify="center" className={classes.contentStyle} style={{ minHeight:'70vh'}}>
        <Grid className={classes.formStyle}>
       
          <Paper elevation={6} spacing={2} className={classes.paperStyle}>
            <form noValidate>
              <Typography align="center" variant="subtitle1" style={{color:'white'}} gutterBottom>Datos Laborales</Typography>
              
              <Grid item container direction="row" spacing={1}>

                <Grid item xs={12} md={6} >
                  <HireTypeSelect value={values.customerHiringType} onChange={(e) => handleChange (e,[noBlanks])} name="customerHiringType"/>
                </Grid>

                <Grid item xs={9} md={4} >
                  <TextField
                    label="Salario mensual *"
                    value={values.customerSalary}
                    onChange={(e) => handleChange (e,[noBlanks])}
                    variant="filled"
                    fullWidth
                    name="customerSalary"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatAmount,
                    }}
                  />
                  {formErrors.customerSalary ? <div className="error-helper-text">{formErrors.customerSalary}</div> : null}
                </Grid>

                <Grid item xs={3} md={2} > 
                  <TextField id="customerLaborSeniority" label="Antiguedad (meses) *"
                    variant ="filled" type="customerLaborSeniority" type="number" fullWidth
                    name="customerLaborSeniority" value={values.customerLaborSeniority} onChange={(e) => handleChange (e,[isValidAmount])}
                    inputProps={{ maxLength: 3 }}
                    error={formErrors.customerLaborSeniority}></TextField>
                    {formErrors.customerLaborSeniority ? <div className="error-helper-text">{formErrors.customerLaborSeniority}</div> : null}
                </Grid>
              </Grid> 

              <Grid item container direction="row" spacing={1}>

                <Grid item xs={9} md={3} > 
                  <TextField
                    label="RUC *"
                    value={values.companyId}
                    onChange={(e) => handleChange (e,[noBlanks])}
                    variant="filled"
                    fullWidth
                    name="companyId"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatRUC,
                    }}
                  />
                  {formErrors.companyId ? <div className="error-helper-text">{formErrors.companyId}</div> : null} 
                </Grid>

                <Grid item xs={12} md={9} > 
                  <TextField id="companyName" label="Nombre de la Empresa *" 
                  variant ="filled"  fullWidth  
                  name="companyName" value={values.companyName} onChange={ (e) => handleChange (e,[noBlanks])}
                  error={formErrors.companyName} ></TextField>
                  {formErrors.companyName ? <div className="error-helper-text">{formErrors.companyName}</div> : null}
                </Grid>
              </Grid>

              <Grid item container direction="row" spacing={1}>

                <Grid item xs={4} md={3}> 
                  <TextField
                    label="Linea Baja *"
                    value={values.companyPhone}
                    onChange={(e) => handleChange (e,[noBlanks])}
                    variant="filled"
                    fullWidth
                    name="companyPhone"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatPhone,
                    }}
                  />
                  {formErrors.companyPhone ? <div className="error-helper-text">{formErrors.companyPhone}</div> : null}
                </Grid>  

                {/* <Grid item container xs={12} md={6} spacing={1} >  */}
                <Grid item xs={4} md={3} >
                  <MobilePrefixSelect value={values.companyMobilePrefix} onChange={(e) => handleChange (e,[noBlanks])} name="companyMobilePrefix"/> 
                  {formErrors.companyMobilePrefix ? <div className="error-helper-text">{formErrors.companyMobilePrefix}</div> : null}
                </Grid>

                <Grid item xs={4} md={3} >
                  <TextField
                    label="Celular *"
                    value={values.companyMobile}
                    onChange={(e) => handleChange (e,[noBlanks])}
                    variant="filled"
                    fullWidth
                    name="companyMobile"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatPhone,
                    }}
                  />
                  {formErrors.companyMobile ? <div className="error-helper-text">{formErrors.companyMobile}</div> : null}    
                </Grid>
              </Grid>  

              <Grid item container direction="row" spacing={1}>
                <Grid item xs={12} md={9}> 
                  <TextField id="companyAddress" label="Direccion *"
                  variant ="filled" type="companyAddress" fullWidth
                  name="companyAddress" value={values.companyAddress} onChange={(e) => handleChange (e,[noBlanks])}
                  error={formErrors.companyAddress}></TextField>
                  {formErrors.companyAddress ? <div className="error-helper-text">{formErrors.companyAddress}</div> : null}
                </Grid>  
                <Grid item xs={12} md={3} > 
                  <CitiesSelect value={values.companyCity} onChange={(e) => handleChange (e,[noBlanks])} name="companyCity"/> 
                </Grid>  
              </Grid>

            </form>
          </Paper>
        </Grid>
      </Grid>
      </div>
    )
}