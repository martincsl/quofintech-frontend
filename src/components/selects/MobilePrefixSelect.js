import React from 'react';

import {FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( (mainTheme) => ({
    // root: {
    //   flexGrow: 1,
    // },
    formControl: {
      marginTop: mainTheme.spacing(0),
      
      maxHeight: 48,
    },
}))

const prefix = [ 
  "0961",
  "0962",
  "0963",
  "0971",
  "0972",
  "0973",
  "0975",
  "0975",
  "0976",
  "0981",
  "0982",
  "0983",
  "0984",
  "0985",
  "0986",
  "0987",
  "0991",
  "0992",
  "0993",
  "0994",
  "0995",
]

export default function MobilePrefixSelect ({value, onChange, name}){
  const classes = useStyles();  
  return (
    <>
      <FormControl variant="filled" inputProps={{style: {fontSize: 9}}} className={classes.formControl} fullWidth>
        <InputLabel id="demo-simple-select-outlined-label">Prefijo celular *</InputLabel>
          <Select
            inputProps={{style: {fontSize: 9}}}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={value}
            onChange={onChange}
            label="Age"
            name={name}
          >
            {prefix.map(( name, index) => (
              <MenuItem key={index} value={index}>
                {name}
              </MenuItem>
            ))}
         </Select>
      </FormControl>
    </> 
  )
}
