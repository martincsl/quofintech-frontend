export default function useFormHandlers ({values, setValues, formErrors, setFormErrors}) {

    const handleChange = (e, validators) => {

    const target = e.target;
    setValues (prevState => ({...prevState, [target.name]:target.value }))
    handleValidators(target, validators);
    }
    
    const handleValidators = (target, validators) => {
    
    validators.forEach (validation => {         // array 
    const result = validation (target.value)    // value="martin" ou "0985 290979"...
    const errors = formErrors [target.name]     // le os erros do "vetor"
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

 return {handleChange}
}