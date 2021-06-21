import React, {useState} from 'react';
import { ThemeProvider } from '@material-ui/core';

import mainTheme from './mainTheme';
import Routes from './routes.js'
import { LoanContext } from './helper/Context';

import './global.css';

function App() {

  const [values, setValues] = useState({ customerId: "", customerName: "", customerBirthDate:"",customerMobilePrefix:"",customerMobile: "", customerEmail: "", customerCity:"", customerAddress:"", customerOccupation:"",customerSalary:"",customerLaborSeniority:"",companyId:"",companyName:"",companyPhone:"", companyMobilePrefix:"",companyMobile:"", companyAddress:"", companyCity:"",customerHiringType:"", loanId:"",loanProduct:"", loanCapital:"", loanTerm:"", loanPayment:"", loanTotalAmount:"",loanExpireDate:"",loanRequestStatus:"",loanRequestDenialMsg:"",loanDocStatus:"",customerIdFile1:"",customerIdFile2:"",customerInvoiceFile:"",customerTaxFile1:"",customerTaxFile2:"",customerTaxFile3:"" });
  
  return (

    <ThemeProvider theme={mainTheme}>
       <LoanContext.Provider value={{values, setValues}}>
         <Routes />
      </LoanContext.Provider>
    </ThemeProvider>
  )
}

export default App;
