
export default function usePreliminaryLoanValidation({values, setValues, formErrors, setFormErrors}) {
 
  const {customerId, customerName, customerBirthDate,customerMobilePrefix,customerMobile, customerEmail, customerCity, customerAddress, customerOccupation,customerSalary,customerLaborSeniority,companyId,companyName,companyPhone, companyMobilePrefix, companyMobile, companyAddress, companyCity, customerHiringType, loanId, loanProduct, loanCapital, loanTerm, loanPayment, loanTotalAmount,loanExpireDate,loanRequestStatus,loanRequestDenialMsg, loanDocStatus} = values

  function isValidAge () {
    let yearBorn=values.customerBirthDate.slice(values.customerBirthDate.length - 4);
    let today = new Date();
    let currentYear=today.getFullYear()
    let age = currentYear - yearBorn
    //condiciones de rechazo:
    //menor que 21 
    //entre 21 y 23 pero con menos de 18 meses de antiguedad
    //mayor que 65
    if (yearBorn==="") {
      return {valid:false, message:"Fecha de Nacimiento no fue informada"}  
    }
    else if (age < 21) {
      return {valid:false, message:"Solicitante tiene que tener mas de 21 anos"}  

    } else if ( age> 20 && age < 23 && values.customerLaborSeniority < 19){
        return {valid:false, message:"Entre 21 y 23 anos, antiguedad debe ser al menos de 18 meses"}

    } else if(age > 65) {
        return {valid:false, message:"Solicitante tiene que tener hasta 65 anos"}

    } else
        return {valid: true, message:"Edad de acuerdo a la política de créditos"}
  }  
 
  function isValidLaborSeniority () {

    // 1=contratado con ips, 2=contratado c/ factura 3=funacionario publico, 4=profesional independiente
    if (values.customerLaborSeniority==="") {
      return {valid:false, message:"Antiguedad no fue informada"}
    }
    else if (values.customerHiringType < 4) {
      if (values.customerLaborSeniority < 12) {
        return {valid:false, message:"Antiguedad tiene que ser de al menos 12 meses"}
      }  
    } else if (values.customerLaborSeniority < 18) {
        return {valid:false, message:"Antiguedad de profesional independiente tiene que ser de al menos 18 meses"}
    }
    return {valid:true, message:"Antiguedad de acuerdo a la política de créditos"}
  }

  function isValidSalaryPaymentRatio () {
    if (values.customerSalary===""){
      return {valid: false, message:"Salario no fue informado"}
    }
    else if (values.customerSalary < 2500001) {
      if ((values.customerSalary * 0.2) < values.loanPayment){
        return {valid: false, message:"Cuota no puede ser mayor a 20% del salario"}
      }
    } else if (values.customerSalary > 2500000 && values.customerSalary < 3500001){
        if ((values.customerSalary * 0.22) < values.loanPayment){  
          return {valid: false, message:"Cuota no puede ser mayor a 22% del salario"}
        }
    } else if (values.customerSalary > 3500000 && values.customerSalary < 4500001){
        if ((values.customerSalary * 0.23) < values.loanPayment){
          return {valid: false, message:"Cuota no puede ser mayor a 23% del salario"}
        }
    } if (values.customerSalary > 4500000) {
      if ((values.customerSalary * 0.25) < values.loanPayment){
        return {valid: false, message:"Cuota no puede ser mayor a 25% del salario"}
      }
    }
    return {valid:true, message:"Relación salario/cuota de acuerdo a política de créditos"}
  }
 
  return {isValidAge, isValidLaborSeniority, isValidSalaryPaymentRatio}
}


