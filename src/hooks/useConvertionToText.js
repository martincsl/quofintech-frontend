export default function ConvertionToText () {

  function getMonthText ( value ) {
    switch (value) {
      case 0:
        return "enero"
      case 1:
        return "febrero"
      case 2:
        return "marzo"
      case 3:
        return "abril"  
      case 4:
        return "mayo"
      case 5:
        return "junio"  
      case 6:
        return "julio"
      case 7:
        return "agosto"  
      case 8:
        return "setiembre"
      case 9:
        return "octubre"  
      case 10:
        return "noviembre"
      case 11:
        return "diciembre"
    }
  } 

  function dateToText () {
    const today = new Date();
    const text = `Asunción, ${today.getDate()} de ${getMonthText(today.getMonth())} de ${today.getFullYear()}`;
    return text; 
  }

  function centena ( numberParam ) {
   const number=parseInt(numberParam,10);
    // const number = parseInt(numberChunk.slice(0,1),10);
    console.log("centena");
    switch (number) {
      
      case 0:
        return ""
      case 1:
        return "cien"
      case 2:
        return "doscientos"
      case 3:
        return "trescientos"
      case 4:
        return "cuatrocientos"
      case 5:
        return "quinientos"
      case 6:
        return "seiscientos"
      case 7:
        return "setecientos"
      case 8:
        return "ochocientos"
      case 9:
        return "novecientos"
    }
  } 

  function unidad (unityParam) {

  const unity = parseInt(unityParam, 10);  
  console.log("unidad");
    switch (unity) {
      case 0:
        return ""
      case 1:
        return "un"
      case 2:
        return "dos"
      case 3:
        return "tres"
      case 4:
        return "cuatro"
      case 5:
        return "cinco"
      case 6:
        return "seis"
      case 7:
        return "siete"
      case 8:
        return "ocho"
      case 9:
        return "nueve"
    }
  }

  function decena (numberParam, unityParam ) {

  const number=parseInt(numberParam,10);
  const unity=parseInt(unityParam,10);
    // const number = parseInt(value.slice(1,2),10);
    // const unity = parseInt(value.slice(2,3),10);
    console.log("decena");
  switch (number) {
    case 0:
      return "" +  unidad (unity)
    case 1:
      if ( unity === 0 ){
        return "diez"
      } else if ( unity === 1 ){
          return "once"
        } else if ( unity === 2 ){
          return "doce"
        } else if ( unity === 3 ){
          return "trece"
        } else if ( unity === 4 ){
          return "catorce"
        } else {
          return "dieci" + unidad (unity)
      }
    case 2:
      if ( unity === 0 ){
        return "veinte"
      } 
      return "veinti" + unidad (unity)
    case 3:
      if ( unity === 0 ){
        return "treinta"
      } 
      return "treinta y " + unidad (unity)
    case 4:
      if ( unity === 0 ){
        return "cuarenta"
      } 
      return "cuarenta y " + unidad (unity)
    case 5:
      if ( unity === 0 ){
        return "cincuenta"
      } 
      return "cincuenta y " + unidad (unity)
    case 6:
      if ( unity === 0 ){
        return "sesenta"
      } 
      return "sesenta y " + unidad (unity)
    case 7:
      if ( unity === 0 ){
        return "setenta "
      } 
      return "setenta y " + unidad (unity)
    case 8:
      if ( unity === 0 ){
        return "ochenta"
      } 
      return "ochenta y " + unidad (unity)
    case 9:
      if ( unity === 0 ){
        return "noventa"
      } 
      return "noventa y " + unidad (unity)
  }
  } 
 
  function numberToText (number) {

  const value = number.toString();
  const numberLength = value.length;
  let text="";
    
  if (numberLength > 9 || numberLength ===0) {return ""};

  switch (numberLength) {
    case 1:
      text = `${unidad(parseInt(value.slice(0,1),10))}`;
      break;
    case 2:
      text= `${decena(parseInt(value.slice(0,1),10),parseInt(value.slice(1,2),10))}`;
      break;
    case 3:
      text = `${centena(parseInt(value.slice(0,1),10))} ${decena(parseInt(value.slice(1,2),10),parseInt(value.slice(2,3),10))}`;
      break;
    case 4:
      text = `${unidad(parseInt(value.slice(0,1),10))} mil ${centena(parseInt(value.slice(1,2),10))} ${decena(parseInt(value.slice(2,3),10),parseInt(value.slice(3,4),10))}`;
      break;
    case 5:
      text = `${decena(parseInt(value.slice(0,1),10),parseInt(value.slice(1,2),10))} mil ${centena(parseInt(value.slice(2,3),10))} ${decena(parseInt(value.slice(3,4),10),parseInt(value.slice(4,5),10))}`;
      break;
    case 6:
      if (( parseInt(value.slice(1,2),10) + parseInt(value.slice(2,3),10) === 0 )) {
        text = `${centena(parseInt(value.slice(0,1),10))} ${decena(parseInt(value.slice(1,2),10),parseInt(value.slice(2,3),10))} ${centena(parseInt(value.slice(3,4),10))} ${decena(parseInt(value.slice(4,5),10),parseInt(value.slice(5,6),10))}`;
      } else {
          text = `${centena(parseInt(value.slice(0,1),10))} ${decena(parseInt(value.slice(1,2),10),parseInt(value.slice(2,3),10))} mil ${centena(parseInt(value.slice(3,4),10))} ${decena(parseInt(value.slice(4,5),10),parseInt(value.slice(5,6),10))}`;
        }
      break;
    case 7:
      if ( parseInt(value.slice(0,1),10)===1) {
        text = `${unidad(parseInt(value.slice(0,1),10))} millón ${centena(parseInt(value.slice(1,2),10))} ${decena(parseInt(value.slice(2,3),10),parseInt(value.slice(3,4),10))} mil ${centena(parseInt(value.slice(4,5),10))} ${decena(parseInt(value.slice(5,6),10),parseInt(value.slice(6,7),10))}`;  

      } else if (( parseInt(value.slice(1,2),10) + parseInt(value.slice(2,3),10) + parseInt(value.slice(3,4),10)) === 0 ) {
         text = `${unidad(parseInt(value.slice(0,1),10))} millones ${centena(parseInt(value.slice(1,2),10))} ${decena(parseInt(value.slice(2,3),10),parseInt(value.slice(3,4),10))} ${centena(parseInt(value.slice(4,5),10))} ${decena(parseInt(value.slice(5,6),10),parseInt(value.slice(6,7),10))}`;
        }
        else {
          text = `${unidad(parseInt(value.slice(0,1),10))} millones ${centena(parseInt(value.slice(1,2),10))} ${decena(parseInt(value.slice(2,3),10),parseInt(value.slice(3,4),10)) } mil ${centena(parseInt(value.slice(4,5),10))} ${decena(parseInt(value.slice(5,6),10),parseInt(value.slice(6,7),10))}`;
        }
      break;
    case 8:
      if (( parseInt(value.slice(2,3),10) + parseInt(value.slice(3,4),10) + parseInt(value.slice(4,5),10)) === 0 ) {
        text = `${decena(parseInt(value.slice(0,1),10),parseInt(value.slice(1,2),10))} millones ${centena(parseInt(value.slice(2,3),10))} ${decena(parseInt(value.slice(3,4),10),parseInt(value.slice(4,5),10))} ${centena(parseInt(value.slice(5,6),10))} ${decena(parseInt(value.slice(6,7),10),parseInt(value.slice(7,8),10))}`;
      } 
      else {  
         text = `${decena(parseInt(value.slice(0,1),10),parseInt(value.slice(1,2),10))} millones ${centena(parseInt(value.slice(2,3),10))} ${decena(parseInt(value.slice(3,4),10),parseInt(value.slice(4,5),10))} mil ${centena(parseInt(value.slice(5,6),10))} ${decena(parseInt(value.slice(6,7),10),parseInt(value.slice(7,8),10))}`;
       }
      break;
    case 9: 
      if(( parseInt(value.slice(3,4),10)) + (parseInt(value.slice(4,5),10) + parseInt(value.slice(5,6),10)) === 0 ) {
        text = `${centena(parseInt(value.slice(0,1),10))} ${decena(parseInt(value.slice(1,2),10),parseInt(value.slice(2,3),10))} millones ${centena(parseInt(value.slice(3,4),10))} ${decena(parseInt(value.slice(4,5),10),parseInt(value.slice(5,6),10)) } ${centena(parseInt(value.slice(6,7),10))} ${decena(parseInt(value.slice(7,8),10),parseInt(value.slice(8,9),10))}`;
      } else {
          text = `${centena(parseInt(value.slice(0,1),10))} ${decena(parseInt(value.slice(1,2),10),parseInt(value.slice(2,3),10))} millones ${centena(parseInt(value.slice(3,4),10))} ${decena(parseInt(value.slice(4,5),10),parseInt(value.slice(5,6),10)) } mil ${centena(parseInt(value.slice(6,7),10))} ${decena(parseInt(value.slice(7,8),10),parseInt(value.slice(8,9),10))}`;
        }
      break;
    }
    return text;
  } 

  // function numberToText (value){
       
  //   const stringValue = value.toString();
  //   const myArray = Array.from(stringValue);
  //   var newarray = myArray.slice().reverse();


  //   console.log(myArray);

  //   let text="";

  //   //  for (var index = myArray.length-1; index >= 0; --index) {
  //     for (var index = 0; index < myArray.length; ++index) {

  //     var item = myArray[index];
  //     console.log(item);

  //     // text = text + myArray[index];
  //     if (index==0){
  //       text = unidad (item.toString());
  //     }

  //     if ( index == 3 || index == 6) {  // unidad
        
  //       text = unidad(item) + " " + text

  //       // if (index > 2 && index < 6 ) {
  //       //   text = text + "mil";

  //       // } else if (index > 5 ) {

  //       //     text = text + "millones"
  //       //   }
          
  //     } else if (index == 1 || index == 4 || index == 7 ){  //decena
  //         text = decena (item, myArray[index+1]) + " " + text
        
  //     } else {  // centena
        
  //       text = centena(item) + " " + text
  //     }
  //  }
  //  return text;
  // }



  // function ruinzinha ( value ) {

  // if (value===null || value===0) { return }
  // const stringValue = value.toString();
  // const numberLength = stringValue.length;
  // console.log(value);
  // // console.log(numberLength);  
  // let chunkNumber1 = 0;
  // let chunkNumber2 = 0;
  // let chunkNumber3 = 0;
  // let chunkText1="";
  // let chunkText2="";
  // let chunkText3="";

  // let text = "";
  
  // switch (numberLength) {
  //   case 1:
  //     chunkNumber1=parseInt(stringValue.slice(0,1),10);
     
  //     break;
  //   case 2:
  //     chunkNumber1=parseInt(stringValue.slice(0,2),10);
  //     break;
  //   case 3:
  //     chunkNumber1=parseInt(stringValue.slice(0,3),10);
  //     break;
  //   case 4:
  //     chunkNumber1=parseInt(stringValue.slice(1,4),10);
  //     chunkNumber2=parseInt(stringValue.slice(0,1),10);
  //     break;
  //   case 5:
  //     chunkNumber1=parseInt(stringValue.slice(2,5),10);
  //     chunkNumber2=parseInt(stringValue.slice(0,2),10);
  //     break;
  //   case 6:
  //     chunkNumber1=parseInt(stringValue.slice(3,6),10);
  //     chunkNumber2=parseInt(stringValue.slice(0,3),10);
  //     break;
  //   case 7:
  //     chunkNumber1=parseInt(stringValue.slice(4,7),10);
  //     chunkNumber2=parseInt(stringValue.slice(1,4),10);
  //     chunkNumber3=parseInt(stringValue.slice(0,1),10);
  //     break;
  //   case 8:
  //     chunkNumber1=parseInt(stringValue.slice(5,8),10);
  //     chunkNumber2=parseInt(stringValue.slice(2,5),10);
  //     chunkNumber3=parseInt(stringValue.slice(0,2),10);
  //     break;
  //   case 9:
  //     chunkNumber1=parseInt(stringValue.slice(6,9),10);
  //     chunkNumber2=parseInt(stringValue.slice(3,6),10);
  //     chunkNumber3=parseInt(stringValue.slice(0,3),10);
  //     break;
  // }

  // switch (numberLength) {
  //   case 1:
  //     text=`${unidad(chunkNumber1)}`;
  //   case 2:
  //     text=`${decena(chunkNumber1)}`  
  // }

  //   // console.log(chunkNumber1.toString());
  //   // console.log(chunkNumber2.toString());
  //   // console.log(chunkNumber3.toString());
  //   return `${chunkNumber3.toString()} millones ${chunkNumber2.toString()} mil ${chunkNumber1.toString()}.`
  // }

  return {dateToText, numberToText}
}