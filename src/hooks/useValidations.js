export default function useValidations (value) {

  function noBlanks (value) {
    
    if (value === "") {
      return {
        valid: false,
        message: "Información requerida"
      }
    } 
    return {valid: true}
  }

  function isValidCustomerId (value){
    if (value === "" ) {
        return { valid: false, message: "Información requerida" }
      }
    if (value==="0"){
      return { valid: false, message: "Numero no incluido" }
    }  
    if (value.length > 7){
      return { valid: false, message: "Numero de CI inválido" }
    } 
    return {valid: true}
    // return {
    //   valid: new RegExp(/^\d*$/).test(value), 
    //   message: "Solamente numeros son permitidos"
    // }
  }

  function isValidName (value) {
    if (value === "") {
      return { valid: false, message: "Esta información es requerida" }
    }
    return {
      valid: new RegExp(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u).test(value),
      message: "Solamente letras son permitidas"
    }
  }

  function isValidPhone (value) {
{/*    if (value === "") {
        return {
          valid: false, message: "Esta información es requerida"
        }
    }
*/}
    return {
      //valid: new RegExp(/^((\+595|0)9([6-9][1-6])\d{6})$/).test(value), message: "Numero de celular no valido"
      valid: new RegExp(/^\d*$/).test(value),
      message: "Solamente numeros son permitidos"
    }
  }

  function isValidEmail (value) {
   
    if (value === "") {
      return { valid: false, message: "Esta información es requerida" }
    }
    return {
      valid: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value), 
      message: "No es un e-mail válido"
    }
  }

  function isValidAddress (value) {
    if (value === "") {
      return { valid: false, message: "Esta información es requerida" }
    }
    return {
//      valid: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value), 
//      message: "No es un e-mail valido"
    }
  }

  function isValidCompanyId (value) {
    if (value === "") {
      return { valid: false, message: "Esta información es requerida" }
    }
    return {
//      valid: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value), 
//      message: "No es un e-mail valido"
    }
  }

  function isValidCompanyName (value) {
    if (value === "") {
      return { valid: false, message: "Esta información es requerida" }
    }
    return {
//      valid: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value), 
//      message: "No es un e-mail valido"
    }
  }

  function lastDayOfMonth (month, year) {

  if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
    { return 31; }
  else if (month == 4 || month == 6 || month == 9 || month == 11)
    { return 30; }
    else if (year === undefined) {
      return 29;
    }
      else {
        if ((year % 4 == 0) || (year % 400 == 0 && year % 100 != 0)) {
          return 29;
        }
        else {
          return 28;
        }
      }
  }

  function isValidDate(value) {
    const dateLength = value.length ;
    if (dateLength < 8) {
      return { valid: false, message: "Fecha incompleta" }
    }
    return {valid: true}; 
  }

  function isValidDay (value) {
    const dayLength = value.length;
    const day = parseInt(value.slice(0,2),10);
    const month = parseInt(value.slice(2,4),10);
    const year = parseInt(value.slice(4,8),10);
    if (day > 31) {
      return { valid: false, message: "Dia inválido" }
    } 
    if (month > 12) {
      return { valid: false, message: "Mes inválido" } 
    }
    if (dayLength >= 4 && day > lastDayOfMonth (month)) {
      return { valid: false, message: "Dia inválido" }
    } 
    if (dayLength === 6 && (year > 20)) {
      return { valid: false, message: "Año inválido" }
    }   
    if (dayLength >= 8 && day > lastDayOfMonth (month, year)) {
      return { valid: false, message: "Dia inválido" }
    } 
    if (dayLength === 8 && (year > 2021)) {
      return { valid: false, message: "Año inválido" }
    }
    return {valid: true};
  }

  // function isValidBirthDate (value) {
    
  //   alert (value);
  //   const year = parseInt(value.slice(4,8),10);
  //   const month = parseInt(value.slice(2,4),10);
  //   const day = parseInt(value.slice(0,2),10);

  //   switch (value.length) {
  //     case 2:
  //       if (day > 31) {
  //         return {
  //           valid: false, 
  //           message: "Dia inválido"
  //         }
  //       } else return {valid: true};
  //     case 4:
  //       if (month > 12) {
  //         return {
  //           valid: false, 
  //           message: "Mes inválido"
  //         } 
  //       } else return {valid: true};
  //     case 8:
  //       if ( year < 1941 ) {
  //         return {
  //           valid: false, 
  //           message: "Edad máxima es 65"
  //         }
  //       } else if (year > 2003){
  //         return {
  //           valid: false, 
  //           message: "Edad mínima es 18"
  //         }
  //         } else return {valid:true};
  //         // else if (day > lastDayOfMonth(month, year)) {
  //         //   return {
  //         //     valid: false, 
  //         //     message: "Dia inválido"
  //         //   }
  //         // } else return {valid: true};

  //     default:
  //       return {valid: true};
  //     }
  // }

  function isValidAmount (value) {
    if (value === "") {
      return { valid: false, message: "Esta información es requerida" }
    }
    if (value < 0){
      return { valid: false, message: "Numero debe ser mayor a 0" }
    }
    return { valid: new RegExp(/^\d*$/).test(value), message: "Solamente numeros son permitidos" }
  }

  function chkFormErrors (formErrors) {
    let isError = false;
    Object.keys(formErrors).forEach( (key) => {   // key es el nombre del key
      if (formErrors[key] != ""){                //errors[key] es el contenido del key
        isError=true;
      }
    })
    return isError;
  }

  function chkBlankFormCustomer (setFormErrors, values) {
    const {customerId, customerName, customerBirthDate,customerMobile, customerEmail, customerCity, customerAddress, customerOccupation,customerSalary,customerLaborSeniority,companyId,companyName,companyPhone, companyMobile, companyAddress, customerHiringType, loanProduct, loanCapital, loanTerm, loanPayment, loanTotalAmount,loanExpireDate,loanRequestStatus,loanDocStatus,persReference1Id,persReference1Name,persReference1MobilePrefix,persReference1Mobile,persReference2Id,persReference2Name,persReference2MobilePrefix,persReference2Mobile,comReference1Id,comReference1Name,comReference1MobilePrefix,comReference1Mobile,comReference2Id,comReference2Name,comReference2MobilePrefix,comReference2Mobile } = values;
    let isError = false;
    const valuesToCheck={customerId, customerName, customerBirthDate,customerMobile, customerEmail, customerCity, customerAddress, customerOccupation,customerSalary,customerLaborSeniority,companyId,companyName, companyMobile, customerHiringType, loanCapital, loanTerm, loanPayment, loanTotalAmount,loanExpireDate,persReference1Id,persReference1Name,persReference1MobilePrefix,persReference1Mobile,persReference2Id,persReference2Name,persReference2MobilePrefix,persReference2Mobile,comReference1Id,comReference1Name,comReference1MobilePrefix,comReference1Mobile,comReference2Id,comReference2Name,comReference2MobilePrefix,comReference2Mobile}
    Object.keys(valuesToCheck).forEach( (key) => {   // key es el nombre del key
      if (values [key] === ""){                //values[key] es el contenido del key
        setFormErrors(prevState => ( {...prevState, [key]:  "Esta informacion es requerida"}));
        isError=true;
      }
    })
    return isError;
  }
  return { isValidCustomerId, isValidName, isValidDay, isValidDate, isValidPhone, isValidEmail, isValidAmount, noBlanks, chkFormErrors, chkBlankFormCustomer }  
}