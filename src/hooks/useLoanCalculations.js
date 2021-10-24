export function useLoanCalculations ({values, setValues}) {

    function calcLoanExpireDate () {
        if (values.loanTerm !== ""){  
        let today = new Date();
        let currentYear=today.getFullYear();
        let currentMonth=today.getMonth();
        let dayChar=today.getDate();;
        let monthsToGo= currentMonth + values.loanTerm + 2;
        let monthsLeftCurrYear= 12 - currentMonth;
        let monthChar="";
        let yearChar ="";
        let expireDate="";

        if (monthsToGo > 36) {
            monthChar = monthsToGo-36
        } else if (monthsToGo > 24) {
            monthChar = monthsToGo-24
        } else if (monthsToGo > 12) {
            monthChar = monthsToGo-12
        } else {
            monthChar = monthsToGo
        }
        
        if (values.loanTerm > 36 - monthsLeftCurrYear) {
            yearChar = currentYear + 3
        } else if( values.loanTerm > 24- monthsLeftCurrYear){
            yearChar = currentYear + 2
        } else if( values.loanTerm > 12- monthsLeftCurrYear){
            yearChar = currentYear + 1
        } else {
            yearChar = currentYear 
        }

        if (dayChar < 10){
            dayChar="0"+dayChar;
        }
        if (monthChar < 10) {
            monthChar="0"+ monthChar;
        }
        expireDate=dayChar.toString() + monthChar.toString() + yearChar.toString();
        setValues (prevState => ({...prevState,loanExpireDate: expireDate }));
    } else {
        setValues (prevState => ({...prevState,loanExpireDate: "" }));
    }  
    }
    
    function calcLoanPayment(){
    let factor = 0 ;
    let payment = 0 ;
    let total = 0 ;
    const multiplier = [1.0800, 0.5608, 0.3880, 0.3019, 0.2505, 0.2163, 0.1921, 0.1740, 0.1601, 0.1490, 0.1401, 0.1327,
                        0.1265, 0.1213, 0.1168, 0.1130, 0.1096, 0.1067, 0.1041, 0.1019, 0.0998, 0.0980, 0.0964, 0.0950,
                        0.0933, 0.0917, 0.0900, 0.0884, 0.0868, 0.0852, 0.0836, 0.0820, 0.0803, 0.0787, 0.0771, 0.0755 
                       ]  
    factor = multiplier [values.loanTerm];
    payment = factor * values.loanCapital;
    total = payment* (values.loanTerm + 1 );
    // setValues (prevState => ({...prevState,loanTerm:values.loanTerm +1}));
    setValues (prevState => ({...prevState,loanPayment:Math.round(payment) }));
    setValues (prevState => ({...prevState,loanTotalAmount:Math.round(total) }));
    }

    return {calcLoanExpireDate, calcLoanPayment}
}