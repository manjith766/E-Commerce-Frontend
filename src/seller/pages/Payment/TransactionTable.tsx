import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { fetchTransactionsBySeller } from '../../../Redux Toolkit/Seller/transactionSlice';
import { Transaction } from '../../../types/Transaction';
import { redableDateTime } from '../../../util/redableDateTime';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#101114',
    color: '#F5F0E8',
    borderColor: 'rgba(255, 255, 255, 0.08)',
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontWeight: 600,
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  [`&.${tableCellClasses.body}`]: {
    color: '#F5F0E8',
    borderColor: 'rgba(255, 255, 255, 0.06)',
    fontSize: '0.85rem',
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  backgroundColor: '#191A1E',
  '&:nth-of-type(odd)': {
    backgroundColor: 'rgba(25, 26, 30, 0.7)',
  },
  '&:hover': {
    backgroundColor: 'rgba(232, 117, 50, 0.05)',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function TransactionTable() {
  const { transaction } = useAppSelector(store => store);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchTransactionsBySeller(localStorage.getItem("jwt") || ""));
  }, [dispatch]);

  return (
    <TableContainer component={Paper} sx={{ bgcolor: 'transparent', boxShadow: 'none', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', overflow: 'hidden' }}>
      <Table sx={{ minWidth: 700 }} aria-label="transaction table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Timestamp</StyledTableCell>
            <StyledTableCell>Patron Details</StyledTableCell>
            <StyledTableCell>Order Reference</StyledTableCell>
            <StyledTableCell align="right">Remittance Amount</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transaction.transactions?.map((item: Transaction) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell align="left">
                <div className="space-y-0.5">
                  <span className="font-medium text-cinema-text block">{redableDateTime(item.date).split("at")[0]}</span>
                  <span className="text-xs text-cinema-muted font-mono">{redableDateTime(item.date).split("at")[1]}</span>
                </div>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <div className="space-y-0.5 text-xs text-cinema-muted">
                  <span className="font-semibold text-cinema-text text-sm block">{item.customer?.fullName || "Guest Patron"}</span>
                  <p>{item.customer?.email}</p>
                  <p>{item.customer?.mobile}</p>
                </div>
              </StyledTableCell>
              <StyledTableCell>
                <span className="font-mono text-xs px-2.5 py-1 rounded bg-cinema-dark border border-cinema-border/40 text-cinema-orange font-bold">
                  Order #{item.order?.id}
                </span>
              </StyledTableCell>
              <StyledTableCell align="right">
                <span className="font-editorial text-lg font-bold text-cinema-text">
                  ₹{item.order?.totalSellingPrice?.toLocaleString() || "0"}
                </span>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
