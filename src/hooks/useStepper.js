
export default function useStepper (activeStep, setActiveStep, submit) {

  const handleNext = (activeStep) => {
    if (activeStep < 6) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1); 

    } else if (activeStep===6) {
       submit();
    }
  };

  const handleBack = (activeStep) => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return {handleNext, handleBack, handleReset}
}