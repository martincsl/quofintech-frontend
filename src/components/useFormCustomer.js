import {useState} from 'react';


export default function useFormCustomer (callback) {
  const [values, setValues] = useState({ customerId: "", customerName: "", customerBirthDate:"",customerMobilePrefix:"",customerMobile: "", customerEmail: "", customerCity:"", customerAddress:"", customerOccupation:"",customerSalary:"",customerLaborSeniority:"",companyId:"",companyName:"",companyPhone:"", companyMobilePrefix:"",companyMobile:"", companyAddress:"", companyCity:"",customerHiringType:"", loanId:"",loanProduct:"", loanCapital:"", loanTerm:"", loanPayment:"", loanTotalAmount:"",loanExpireDate:"",loanRequestStatus:"",loanRequestDenialMsg:"",loanDocStatus:"",customerIdFile1:"",customerIdFile2:"",customerInvoiceFile:"",customerTaxFile1:"",customerTaxFile2:"",customerTaxFile3:"" });
  const [formErrors, setFormErrors] = useState({ customerId: "", customerName: "", customerBirthDate:"",customerMobilePrefix:"",customerMobile: "", customerEmail: "", customerCity:"", customerAddress:"", customerOccupation:"",customerSalary:"",customerLaborSeniority:"",companyId:"",companyName:"",companyPhone:"", companyMobilePrefix:"",companyMobile:"", companyAddress:"", companyCity:"",customerHiringType:"", loanId:"", loanProduct:"", loanCapital:"", loanTerm:"", loanPayment:"", loanTotalAmount:"",loanExpireDate:"",loanRequestStatus:"",loanRequestDenialMsg:"",loanDocStatus:"",customerIdFile1:"",customerIdFile2:"",customerInvoiceFile:"",customerTaxFile1:"",customerTaxFile2:"",customerTaxFile3:"" });
  const {customerId, customerName, customerBirthDate,customerMobilePrefix,customerMobile, customerEmail, customerCity, customerAddress, customerOccupation,customerSalary,customerLaborSeniority,companyId,companyName,companyPhone, companyMobilePrefix, companyMobile, companyAddress, companyCity, customerHiringType, loanId, loanProduct, loanCapital, loanTerm, loanPayment, loanTotalAmount,loanExpireDate,loanRequestStatus,loanRequestDenialMsg, loanDocStatus, customerIdFile1, customerIdFile2, customerInvoiceFile, customerTaxFile1, customerTaxFile2, customerTaxFile3} = values
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  function noBlanks (value) {
    if (value === "") {
        return {
          valid: false,
          message: "Esta información es requerida"
        }
    } 
    return {valid: true}
  }

  function isValidCustomerId (value){
    if (value === "") {
        return {
          valid: false,
          message: "Esta información es requerida"
        }
      }
      return {
        valid: new RegExp(/^\d*$/).test(value), 
        message: "Solamente numeros son permitidos"
      }
    }     
  
  function isValidName (value) {
    if (value === "") {
      return {
        valid: false,
        message: "Esta información es requerida"
      }
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
      return {
        valid: false, 
        message: "Esta información es requerida"
      }
    }
    return {
      valid: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value), 
      message: "No es un e-mail valido"
    }
  }

  function isValidAddress (value) {
    if (value === "") {
      return {
        valid: false, 
        message: "Esta información es requerida"
      }
    }
    return {
//      valid: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value), 
//      message: "No es un e-mail valido"
    }
  }

  function isValidCompanyId (value) {
    if (value === "") {
      return {
        valid: false, 
        message: "Esta información es requerida"
      }
    }
    return {
//      valid: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value), 
//      message: "No es un e-mail valido"
    }
  }

  function isValidCompanyName (value) {
    if (value === "") {
      return {
        valid: false, 
        message: "Esta información es requerida"
      }
    }
    return {
//      valid: new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value), 
//      message: "No es un e-mail valido"
    }
  }

  function isValidAmount (value) {
    if (value === "") {
      return {
        valid: false, 
        message: "Esta información es requerida"
      }
    }
    if (value < 0){
      return {
        valid: false, 
        message: "Numero debe ser mayor a 0"
      }
    }
    return {
      
      valid: new RegExp(/^\d*$/).test(value),
      message: "Solamente numeros son permitidos"
    }
  }

  function handleChangeSalary (e){
    const target=e.target;
    setValues (prevState => ({...prevState, customerSalary:target.value }));
  }

  function chkFormErrors () {
    let isError = false;
    Object.keys(formErrors).forEach( (key) => {   // key es el nombre del key
      if (formErrors[key] != ""){                //errors[key] es el contenido del key
        isError=true;
      }
    })
    return isError;
  }

  function chkBlankFormCustomer () {
    let isError = false;
    const valuesToCheck={customerId,customerName,customerMobile}
    Object.keys(valuesToCheck).forEach( (key) => {   // key es el nombre del key
      if (values [key] === ""){                //values[key] es el contenido del key
        setFormErrors(prevState => ( {...prevState, [key]:  "Esta informacion es requerida"}));
        isError=true;
      }
    })
    return isError;
  }

  function handleSubmit (event) {
    event.preventDefault();
    callback(); // executa a funcao que recebe do formulario
  }

  const handleChange = (e, validators) =>{
    const target=e.target;
    //alert(target.value)
    setValues (prevState => ({...prevState, [target.name]:target.value }))
   // alert(values.customerIdFile1);
   if (validators) {
     //alert("entrou no if validators")
    handleValidators(target, validators);
   } else {
     //alert("nao entrou no if validators")
   }
  }

  const handleChangeStorage = (name,value) => {
    //alert("entrou em handleChangeStorage");
    setValues (prevState => ({...prevState, [name]:value }))
  }

  const bulkHandleChange = (props) => {
     setValues(props.data);
  }

  function handleChangeIdFile1 (value) {
   // alert("entrou em handleChangeIdFile1");
    setValues (prevState => ({...prevState, customerIdFile1:value }));
  }

  const handleValidators = (target, validators) => {
    validators.forEach(validation => {         // array 
    const result= validation (target.value)    // value="martin" ou "0985 290979"...
    const errors= formErrors [target.name]     // le os erros do "vetor"
      if (result.valid) {                      // se o retorno da funcao eh true, ou seja se o input eh valido.....
 //       if (errors.includes (result.message)){   //"limpa" as mesgs de erro
          setFormErrors (prevState => ( {...prevState, [target.name]: ""}))
 //       }
      } else { 
          if (!errors.includes(result.message)) {   // se ja existe a mensagem, nao inclui novamente
            setFormErrors (prevState => ( {...prevState, [target.name]: result.message}))
          }
        }
    })
  }
  return { handleChange, handleChangeStorage, bulkHandleChange, handleChangeIdFile1, handleChangeSalary, handleSubmit, chkBlankFormCustomer, chkFormErrors, isValidName, isValidPhone, isValidEmail, isValidAmount, noBlanks,  values, setValues, formErrors }
}


