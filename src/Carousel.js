import React from 'react';

import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Typography } from '@material-ui/core';

export default function Carousel () {

  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
  
  return(
  <AutoPlaySwipeableViews>
    <Typography align="center" variant="h3" gutterBottom>Aumente sus ventas Hoy!</Typography>
    <Typography align="center" variant="h3" gutterBottom>Vendé en cuotas, cobrá al contado !</Typography>
    <Typography align="center" variant="h3" gutterBottom>Menores cuotas, mayores ventas !</Typography>
    <Typography align="center" variant="h3" gutterBottom>Sin costos ni comisiones !</Typography>
    <Typography align="center" variant="h3" gutterBottom>Sin los riesgos de la financiación !</Typography>
  </AutoPlaySwipeableViews>
)
}
