import React from 'react';

import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles ((mainTheme) => ({

  buttonStyle:{
    color: "white",
    backgroundColor:mainTheme.palette.primary.main,
    // margin: 'auto',
    textTransform:"none",
    fontSize: 12,
    marginTop: "5px",
    margin: "10px",
    minWidth:"110px",
    borderRadius:'15px',
    //marginTop: "15px",
    "&:disabled": {
      color:"gray",
      backgroundColor:mainTheme.palette.primary.main,
    },
    "&:hover": {
      color:mainTheme.palette.secondary.main,
      backgroundColor:mainTheme.palette.primary.main,
    },
  },
  }))

export default function StepperButton ({ handleExit, handleBack, handleNext, activeStep, stepsLength, isLoanPreApproved }) {

  const classes = useStyles(); 

  function getIsButtonDisabled () {
      if (! isLoanPreApproved && activeStep === 3) {
        return true;
      } 
  }

   return (
    <>
    <Grid item xs={4} md={4}  >
      <Button onClick={handleExit} className={classes.buttonStyle} style={{margin: '0 auto', display: "flex"}} disableRipple >
        Salir
      </Button>
    </Grid>

    <Grid item xs={4} md={4}  >
      <Button disabled={activeStep === 0} onClick={() => handleBack(activeStep)} className={classes.buttonStyle} style={{margin: '0 auto', display: "flex"}} disableRipple>
        Anterior
      </Button>
    </Grid>

    <Grid item xs={4} md={4}  >
      <Button className={classes.buttonStyle}  style={{margin: '0 auto', display: "flex"}} disabled={getIsButtonDisabled()} variant="contained" onClick={() => handleNext(activeStep)} disableRipple >
        {activeStep === stepsLength - 1 ? 'Enviar Solicitud' : 'Próximo'}
      </Button>
    </Grid>
    </>
   )

}