import React from 'react';

import {FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( (mainTheme) => ({
    root: {
      flexGrow: 1,
    },
    formControl: {
      marginTop: mainTheme.spacing(0),
      minWidth: 230,
 
      maxHeight: 48,
    },
}))

const occupations = [ 

    "Abogado",
    "Administrador",
    "Analista",
    "Arquitecto",
    "Audiologo-Terapeuta del Lenguaje",
    "Barman",
    "Cajero",
    "Capitan y Oficial de Cubierta",
    "Carpintero",
    "Cerrajero y Otros Oficios",
    "Chef-Cocinero",
    "Comerciante",
    "Consultor",
    "Contador-Auditor",
    "Contratista",
    "Dietista-Nutricionista",
    "Diseñador",
    "Docente",
    "Albañil",
    "Chapista-Calderero",
    "Electricista",
    "Electricista-Residencial",
    "Empleada Domestica",
    "Empleado de Empresa",
    "Enchapador",
    "Enfermero",
    "Entrenador-Preparador Fisico",
    "Estilista-Esteticista",
    "Farmaceutico",
    "Fisioterapeuta",
    "Fotografo",
    "Ganadero",
    "Gerente",
    "Guia de Viajes y Turismo",
    "Herrero",
    "Hojalatero",
    "Ingeniero",
    "Inspector",
    "Instrumentador Quirurgico",
    "Jardinero",
    "Joyero-Relojero",
    "Jubilado",
    "Marinero",
    "Mecanico",
    "Mecanico Industrial",
    "Medico",
    "Mesero y Capitan de Meseros",
    "Musico",
    "Obrero y Ayudante",
    "Odontologo",
    "Oficial",
    "Organizador de Eventos",
    "Panadero-Pastelero",
    "Pastor Religioso",
    "Periodista",
    "Piloto",
    "Pintor",
    "Pisero",
    "Plomero",
    "Policia",
    "Programador",
    "Psicologo",
    "Quimico",
    "Soldador",
    "Tapicero",
    "Taxista",
    "Tecnico",
    "Traductor-Interprete",
    "Vendedor",
    "Veterinario",
    "Vidriero",
    "Otras Profesiones",
]

export default function OccupationSelect ({value, onChange, name}){
  const classes = useStyles();  
  return(
    <>
      <FormControl variant="filled" margin="none" inputProps={{style: {fontSize: 9}}} className={classes.formControl} fullWidth>
        <InputLabel id="demo-simple-select-outlined-label">Profesión *</InputLabel>
          <Select
            inputProps={{style: {fontSize: 9}}}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={value}
            onChange={onChange}
            label="Age"
            name={name}
          >
            {occupations.map(( name, index) => (
              <MenuItem key={index} value={index}>
                {name}
              </MenuItem>
            ))}
         </Select>
      </FormControl>
    </> 
  )
}
