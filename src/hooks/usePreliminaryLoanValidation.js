import React from 'react';
import useFormCustomer from '../components/useFormCustomer';

export default function usePreliminaryLoanValidation({values,setValues, formErrors, setFormErrors}) {
  //const [values]=useFormCustomer();  
  const {customerId, customerName, customerBirthDate,customerMobilePrefix,customerMobile, customerEmail, customerCity, customerAddress, customerOccupation,customerSalary,customerLaborSeniority,companyId,companyName,companyPhone, companyMobilePrefix, companyMobile, companyAddress, companyCity, customerHiringType, loanId, loanProduct, loanCapital, loanTerm, loanPayment, loanTotalAmount,loanExpireDate,loanRequestStatus,loanRequestDenialMsg, loanDocStatus} = values
  
  function isValidAge (customerBirthDate, customerLaborSeniority) {
     let yearBorn=customerBirthDate.slice(customerBirthDate.length - 4);
     let today = new Date();
     let currentYear=today.getFullYear()
     let age = currentYear - yearBorn
     console.log(age);
     console.log(customerLaborSeniority)
     //condiciones de rechazo:
     //menor que 21 
     //entre 21 y 23 pero con menos de 18 meses de antiguedad
     //mayor que 65
     if (age < 21) {
      return {valid:false, message:"solicitante tiene que tener mas de 21 anos"}  
    } else if ( age> 20 && age < 23 && customerLaborSeniority < 19){
        return {valid:false, message:"Entre 21 y 23 anos, antiguedad debe ser al menos de 18 meses"}
    } else if(age > 65){
      return {valid:false, message:"solicitante tiene que tener hasta 65 anos"}
    } else
    return {valid: true}
  }  

  function isValidOccupationCapitalRatio (customerOccupation, loanCapital) {
    
  } 
  function isValidLaborSeniority (customerLaborSeniority, customerHiringType) {

    // 1=contratado con ips, 2=contratado c/ factura 3=funacionario publico, 4=profesional independiente
    if (customerHiringType < 4) {
      if (customerLaborSeniority <12) {
        return {valid:false, message:"Antiguedad tiene que ser de al menos 12 meses"}
      }  
    }
    return {valid:true}
  }  
  
  function isValidSalaryPaymentRatio (customerSalary, loanPayment) {

    if (customerSalary < 2500001) {
      if ((customerSalary * 0.2) < loanPayment){
        return {valid: false, message:"Cuota no puede ser mayor a 20% del salario"}
      }
    } else if (customerSalary > 2500000 && customerSalary < 3500001){
        if ((customerSalary * 0.22) < loanPayment){  
          return {valid: false, message:"Cuota no puede ser mayor a 22% del salario"}
        }
    } else if (customerSalary > 3500000 && customerSalary < 4500001){
        if ((customerSalary * 0.23) < loanPayment){
          return {valid: false, message:"Cuota no puede ser mayor a 23% del salario"}
        }
    } if (customerSalary > 4500000) {
      if ((customerSalary * 0.25) < loanPayment){
        return {valid: false, message:"Cuota no puede ser mayor a 25% del salario"}
      }
    }
    return {valid: true}
  }
  return {isValidAge, isValidOccupationCapitalRatio,isValidLaborSeniority,isValidSalaryPaymentRatio}
}


