import React from 'react';

import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//      minWidth: 260,
const useStyles = makeStyles( (mainTheme) => ({
    root: {
      flexGrow: 1,
    },
    formControl: {
      marginTop: mainTheme.spacing(0),
     
      maxHeight: 48,
    },
}))

const cities = [ 
    "Asunción",
    "Areguá",
    "Capiatá",
    "Fernando De La Mora",
    "Guarambaré",
    "Itá",
    "Itauguá",
    "Saldívar",
    "Lambaré",
    "Limpio",
    "Luque",
    "Mariano Roque Alonso",
    "Nueva Italia",
    "Ñemby",
    "San Antonio",
    "San Lorenzo",
    "Villa Elisa",
    "Villeta",
    "Ypacaraí",
    "Ypané",
]

export default function CitiesSelect ({value, onChange, name}){
  const classes = useStyles();  
  return(
    <>
      <FormControl variant="filled" margin="none" inputProps={{style: {fontSize: 9}}} className={classes.formControl} fullWidth>
        <InputLabel id="demo-simple-select-outlined-label" fullwidth>Ciudad *</InputLabel>
          <Select
            inputProps={{style: {fontSize: 9}}}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={value}
            onChange={onChange}
            label="Age"
            name={name}
         
          >
            {cities.map(( name, index) => (
              <MenuItem key={index} value={index}>
                {name}
              </MenuItem>
            ))}
         </Select>
      </FormControl>
    </> 
  )
}

