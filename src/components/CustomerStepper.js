import React from 'react';

import { Stepper, Step, StepLabel } from '@material-ui/core';

export default function CustomerStepper ({activeStep, steps}) {

  return (
    <>
    <Stepper activeStep={activeStep} style={{height:100}}>
      {steps.map((label) => (
        <Step key={label}>
        <StepLabel style={{fontSize:12}} >{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
    </>
  )
}