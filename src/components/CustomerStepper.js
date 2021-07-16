import React from 'react';

import { Stepper, Step, StepLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((mainTheme) => ({
  stepperFontSize: {
    fontSize: 12,
    [mainTheme.breakpoints.down('md')]: {
      fontSize: 9,
    },
    [mainTheme.breakpoints.down('sm')]: {
      fontSize: 8,
    },
  },
}))

export default function CustomerStepper ({activeStep, steps}) {

  const classes = useStyles();  

  return (

    <Stepper activeStep = {activeStep} style = {{height:100}}>
      {steps.map((label) => (
        <Step key = {label}>
          <StepLabel classes={{label: classes.stepperFontSize}} >{label}</StepLabel>
        </Step>
      ))}
    </Stepper>

  )
}