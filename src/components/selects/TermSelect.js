import React from 'react';

import {FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
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

const term = [ 
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36
]

export default function TermSelect ({value, onChange, name}){
  const classes = useStyles();  
  return (
    <>
      <FormControl variant="filled" margin="none" inputProps={{style: {fontSize: 9}}} className={classes.formControl} fullWidth>
        <InputLabel id="demo-simple-select-outlined-label" fullwidth>Plazo en meses *</InputLabel>
          <Select
            inputProps={{style: {fontSize: 9}}}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={value}
            onChange={onChange}
            label="Age"
            name={name}
          >
            {term.map(( name, index) => (
              <MenuItem key={index} value={index}>
                {name}
              </MenuItem>
            ))}
         </Select>
      </FormControl>
    </> 
  )
}