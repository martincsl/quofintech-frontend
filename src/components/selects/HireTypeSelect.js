import React from 'react';

import {FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( (mainTheme) => ({
    root: {
      flexGrow: 1,
    },
    formControl: {
      marginTop: mainTheme.spacing(0),
      maxHeight: 48,
    },
}))

const hiringTypeOptions = [ 
  "Contrato IPS",
  "Contrato con Factura",
  "Funcionario Publico",
  "Profesional Independiente",
]

export default function HireTypeSelect ({value, onChange, name}){
  const classes = useStyles();  
  return (
    <>
      <FormControl variant="filled" className={classes.formControl} fullWidth>
        <InputLabel id="demo-simple-select-outlined-label">Tipo de Contrato *</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={value}
            onChange={onChange}
            label="Age"
            name={name}
          >
            {hiringTypeOptions.map(( name, index) => (
              <MenuItem key={index} value={index}>
                {name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </> 
  )
}