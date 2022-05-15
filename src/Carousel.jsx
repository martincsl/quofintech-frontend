import React from 'react';

import { Typography } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

export default function Carousel () {

  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
  
  return (
  <AutoPlaySwipeableViews>
    <Typography align="center" variant="h3" gutterBottom>Aumenta sus ventas hoy!</Typography>
    <Typography align="center" variant="h3" gutterBottom>Vendé en cuotas, cobrá al contado !</Typography>
    <Typography align="center" variant="h3" gutterBottom>Menores cuotas, mayores ventas !</Typography>
    <Typography align="center" variant="h3" gutterBottom>Sin costos ni comisiones !</Typography>
    <Typography align="center" variant="h3" gutterBottom>Sin los riesgos de la financiación !</Typography>
  </AutoPlaySwipeableViews>
  )
}
