import {createMuiTheme} from '@material-ui/core';

const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#1C1C49" //azul oscuro "#1C1C49"     "#344955" "#344955" 
    },
    secondary: {
      main: "#FF4500"    //orangered  "#FF4500"  "#F9AA33" "#F57F17"
    }
  },
  overrides: {
    MuiTextField: {
      root:{
        variant:'filled',
        margin:'dense',
        size:'small',
      }
    },
    MuiInputLabel: {   // Name of the component / style sheet
      root: {              // Name of the rule
        color: '#808080',
        "&$focused": {    // increase the specificity for the pseudo class
          color: "#1C1C49"
        },
        fontSize:'9px',
      },
    },   //MuiInputLabel
    MuiFilledInput:{
      root: { // Name of the rule
        color: "#1C1C49", //#1C1C49
        fontSize:'14px',
        backgroundColor: "white",
        "&:hover": {
          color:"#1C1C49",
          backgroundColor:"#D3D3D3",
        },
        "&$focused": { // increase the specificity for the pseudo class
          color:"blue",
          backgroundColor: "white"
        },
        "&$disabled": { // increase the specificity for the pseudo class
          color:"#1C1C49",
          backgroundColor: "white"
        },  
      }
      }, // MuiFilledInput
      MuiInput:{
        root: { // Name of the rule
          color: "#1C1C49", //#1C1C49
          backgroundColor: "white",
         
          "&:hover": {
            color:"#1C1C49",
            backgroundColor:"#D3D3D3",
          },
          "&$focused": { // increase the specificity for the pseudo class
            color:"blue",
            backgroundColor: "white"
          },
          "&$disabled": { // increase the specificity for the pseudo class
            color:"#1C1C49",
            backgroundColor: "white"
          },  
        },
      },
    MuiSelectOutlined:{
      color: "#1C1C49",
      backgroundColor: "white"
      
    },
    MuiStepLabel:{
      fontSize:9
    },
    },   //overrides
});

export default mainTheme;