
export default function useCheckFormValues ({values, formErrors, setFormErrors}) {
    //const {customerId, customerName, customerBirthDate, customerOccupation, customerAddress, customerCity, customerMobilePrefix, customerMobile, customerEmail}=values;
    function isFormErrors () {
        let isError = false;
        Object.keys(formErrors).forEach( (key) => {   // key es el nombre del key
          if (formErrors[key] != ""){                //errors[key] es el contenido del key
            isError=true;
          }
        })
        return isError;
      }
 {/*}   
      function isBlankFormCustomer () {
        //let valuesToCheck={};
        //if (formName="customer"){
       // const  valuesToCheck={customerId, customerName, customerBirthDate, customerOccupation, customerAddress, customerCity, customerMobilePrefix, customerMobile, customerEmail} 
        //} else if (formName="work") {
        //   valuesToCheck={customerHiringType, customerSalary, CustomerLaborSeniority, companyId, companyName,companyPhone, companyMobilePrefix, companyMobile, companyAddress,companyCity} 
        //} else if (formName="loan") {
        // valuesToCheck={loanProduct, loanCapital, loanTerm}
        //}  
        let isError = false;
        Object.keys(valuesToCheck).forEach( (key) => {   // key es el nombre del key
          if (values [key] === ""){                //values[key] es el contenido del key
            setFormErrors(prevState => ( {...prevState, [key]:  "Esta informaciooooon es requerida"}));
            isError=true;
          }
        })
        return isError;
      }
    */}
  return { isFormErrors }  
}