import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, FormControl, IconButton, MenuItem, Select, styled } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { Coupon } from '../../../types/couponTypes';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { deleteCoupon } from '../../../Redux Toolkit/Admin/AdminCouponSlice';

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

const accountStatuses = [
  { status: 'ACTIVE', title: 'Active Campaign' },
  { status: 'PENDING_VERIFICATION', title: 'Pending Approval' },
  { status: 'SUSPENDED', title: 'Suspended' },
  { status: 'DEACTIVATED', title: 'Archived / Deactivated' },
];

export default function CouponTable() {
  const [status, setStatus] = React.useState(accountStatuses[0].status);
  const { adminCoupon } = useAppSelector(store => store);
  const dispatch = useAppDispatch();

  const handleDeleteCoupon = (id: number) => {
    dispatch(deleteCoupon({ id, jwt: localStorage.getItem("jwt") || "" }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-cinema-orange font-semibold block mb-1">
            Privilege & Loyalty
          </span>
          <h1 className="font-editorial text-2xl sm:text-3xl text-cinema-text">Promotional Vouchers & Codes</h1>
        </div>
        
        <div className="w-56">
          <FormControl fullWidth size="small">
            <Select
              id="coupon-status-select"
              value={status}
              onChange={(e) => setStatus(e.target.value as string)}
              sx={{
                color: '#F5F0E8',
                bgcolor: 'rgba(16, 17, 20, 0.6)',
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 255, 255, 0.15)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#E87532',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(232, 117, 50, 0.5)',
                },
                '.MuiSvgIcon-root': {
                  color: '#E87532',
                },
              }}
            >
              {accountStatuses.map((item) => (
                <MenuItem key={item.status} value={item.status} sx={{ bgcolor: '#191A1E', color: '#F5F0E8', '&:hover': { bgcolor: '#26282E' } }}>
                  {item.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <TableContainer component={Paper} sx={{ bgcolor: 'transparent', boxShadow: 'none', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', overflow: 'hidden' }}>
        <Table sx={{ minWidth: 700 }} aria-label="coupon table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Passcode</StyledTableCell>
              <StyledTableCell>Active From</StyledTableCell>
              <StyledTableCell>Expires</StyledTableCell>
              <StyledTableCell align="right">Threshold</StyledTableCell>
              <StyledTableCell align="right">Privilege Benefit</StyledTableCell>
              <StyledTableCell align="center">Campaign State</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminCoupon.coupons?.map((coupon: Coupon) => (
              <StyledTableRow key={coupon.id}>
                <StyledTableCell component="th" scope="row">
                  <span className="font-mono text-cinema-orange font-bold tracking-wider px-2 py-1 bg-cinema-orange/10 border border-cinema-orange/30 rounded">
                    {coupon.code}
                  </span>
                </StyledTableCell>
                <StyledTableCell>{coupon.validityStartDate}</StyledTableCell>
                <StyledTableCell>{coupon.validityEndDate}</StyledTableCell>
                <StyledTableCell align="right">₹{coupon.minimumOrderValue?.toLocaleString()}</StyledTableCell>
                <StyledTableCell align="right">
                  <span className="font-editorial text-cinema-orange font-bold text-base">
                    {coupon.discountPercentage}% OFF
                  </span>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Box
                    sx={{
                      color: coupon.active ? '#34D399' : '#A6A29B',
                      bgcolor: coupon.active ? 'rgba(52, 211, 153, 0.1)' : 'rgba(166, 162, 155, 0.1)',
                      borderColor: coupon.active ? 'rgba(52, 211, 153, 0.3)' : 'rgba(166, 162, 155, 0.2)',
                    }}
                    className="border inline-block px-3 py-0.5 rounded-full text-xs font-semibold tracking-wider uppercase"
                  >
                    {coupon.active ? "Active" : "Dormant"}
                  </Box>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton
                    onClick={() => handleDeleteCoupon(coupon.id)}
                    size="small"
                    sx={{
                      color: '#F87171',
                      '&:hover': {
                        bgcolor: 'rgba(248, 113, 113, 0.1)',
                      }
                    }}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
