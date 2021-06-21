
export default function useValidations (value) {

    function noBlanks (value) {
     alert("entrou em NoBlanks");
      if (value === "") {
        return {
          valid: false,
          message: "Información es requerida"
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

  return { isValidName, isValidPhone, isValidEmail, isValidAmount, noBlanks }  
}