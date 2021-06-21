import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((mainTheme) => ({
  head: {
    backgroundColor: mainTheme.palette.secondary.main,
    color: mainTheme.palette.common.white,
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

const StyledTableRow = withStyles((mainTheme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: mainTheme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(customerName, customerId, loanAmount, loanExpDate, loanDocStatus) {
  return { customerName, customerId, loanAmount, loanExpDate, loanDocStatus };
}

const rows = [
  createData('Martin Calcena', '6.065.699', '12.000.000', "25/11/21", "Negociado c/ Oima"),
  createData('Julio Martinez', '5.065.699', '10.000.000', "05/01/22", "En Cartera"),
  createData('Jose Cabrera', '5.199.699', '5.000.000', "07/02/22", "Negociado c/ Banco"),
  createData('Monica Arguello', '4.065.699', '6.000.000', "25/03/21", "Negociado c/ Oima"),
  createData('Ezequiel Lopez', '3.065.699', '8.000.000', "25/03/21", "Negociado c/ Oima"),
  createData('Carlos Samaniego', '3.065.699', '15.000.000', "05/04/22", "En Cartera"),
  createData('Alberto Dominguez', '3.065.699', '12.000.000', "15/04/22", "En Cartera"),
  createData('Fabiola Burbano', '2.065.699', '7.500.000', "25/04/22", "Negociado c/ Oima"),
  createData('Pedro Ferrari', '6.088.699', '7.500.000', "26/04/22", "Negociado c/ Oima"),
  createData('Miguel Samaiego', '5.986.980', '7.500.000', "26/04/22", "Negociado c/ Oima"),
  createData('Raquel Amarilla', '3.984.980', '10.500.000', "26/04/22", "Negociado c/ Oima"),
  createData('Cristina Gonzalez', '2.674.699', '10.500.000', "26/04/22", "Negociado c/ Oima"),,
];

const useStyles = makeStyles({
  table: {
    width: 670,
  },
});

export default function TableCollatDocs() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell align="right">CI</StyledTableCell>
            <StyledTableCell align="right">Monto Pagaré</StyledTableCell>
            <StyledTableCell align="right">Fecha Venc.</StyledTableCell>
            <StyledTableCell align="right">Situación</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.customerName}
              </StyledTableCell>
              <StyledTableCell align="right">{row.customerId}</StyledTableCell>
              <StyledTableCell align="right">{row.loanAmount}</StyledTableCell>
              <StyledTableCell align="right">{row.loanExpDate}</StyledTableCell>
              <StyledTableCell align="right">{row.loanDocStatus}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
}