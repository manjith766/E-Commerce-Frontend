import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, FormControl, MenuItem, Select, styled, Menu } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { fetchSellers, updateSellerAccountStatus } from '../../../Redux Toolkit/Seller/sellerSlice';

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
  { status: 'ACTIVE', title: 'Active Ateliers' },
  { status: 'PENDING_VERIFICATION', title: 'Pending Approval' },
  { status: 'SUSPENDED', title: 'Suspended' },
  { status: 'DEACTIVATED', title: 'Deactivated' },
  { status: 'BANNED', title: 'Banned' },
  { status: 'CLOSED', title: 'Closed' }
];

const statusBadgeStyles: Record<string, { color: string, bg: string }> = {
  ACTIVE: { color: '#34D399', bg: 'rgba(52, 211, 153, 0.1)' },
  PENDING_VERIFICATION: { color: '#FFB066', bg: 'rgba(255, 176, 102, 0.1)' },
  SUSPENDED: { color: '#F87171', bg: 'rgba(248, 113, 113, 0.1)' },
  DEACTIVATED: { color: '#A6A29B', bg: 'rgba(166, 162, 155, 0.1)' },
  BANNED: { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.15)' },
  CLOSED: { color: '#71717A', bg: 'rgba(113, 113, 122, 0.1)' }
};

export default function SellersTable() {
  const [accountStatus, setAccountStatus] = React.useState("ACTIVE");
  const { sellers } = useAppSelector(store => store);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchSellers(accountStatus));
  }, [accountStatus, dispatch]);

  const handleAccountStatusChange = (event: any) => {
    setAccountStatus(event.target.value as string);
  };

  const handleUpdateSellerAccountStatus = (id: number, status: string) => {
    dispatch(updateSellerAccountStatus({ id, status }));
    handleClose(id);
  };

  const [anchorEl, setAnchorEl] = React.useState<{ [key: number]: HTMLElement | null }>({});
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, sellerId: any) => {
    setAnchorEl((prev) => ({ ...prev, [sellerId]: event.currentTarget }));
  };
  const handleClose = (sellerId: number) => {
    setAnchorEl((prev) => ({ ...prev, [sellerId]: null }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-cinema-orange font-semibold block mb-1">
            Merchant Directory
          </span>
          <h1 className="font-editorial text-2xl sm:text-3xl text-cinema-text">Verified Partner Studios</h1>
        </div>

        <div className="w-56">
          <FormControl fullWidth size="small">
            <Select
              id="seller-status-select"
              value={accountStatus}
              onChange={handleAccountStatusChange}
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
              {accountStatuses.map((status) => (
                <MenuItem key={status.status} value={status.status} sx={{ bgcolor: '#191A1E', color: '#F5F0E8', '&:hover': { bgcolor: '#26282E' } }}>
                  {status.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <TableContainer component={Paper} sx={{ bgcolor: 'transparent', boxShadow: 'none', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', overflow: 'hidden' }}>
        <Table sx={{ minWidth: 700 }} aria-label="sellers table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Principal / Partner</StyledTableCell>
              <StyledTableCell>Business Studio</StyledTableCell>
              <StyledTableCell>Contact Channels</StyledTableCell>
              <StyledTableCell>Tax Identification</StyledTableCell>
              <StyledTableCell align="center">Account State</StyledTableCell>
              <StyledTableCell align="right">Manage</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellers.sellers?.map((seller) => {
              const badge = (seller.accountStatus && statusBadgeStyles[seller.accountStatus]) || statusBadgeStyles.ACTIVE;
              return (
                <StyledTableRow key={seller.id || seller.sellerName}>
                  <StyledTableCell component="th" scope="row">
                    <span className="font-semibold text-cinema-text block">{seller.sellerName}</span>
                    <span className="text-xs text-cinema-muted font-mono">ID: #{seller.id}</span>
                  </StyledTableCell>
                  <StyledTableCell>
                    <span className="font-medium text-cinema-orange">{seller.businessDetails?.businessName || "Exclusive Studio"}</span>
                  </StyledTableCell>
                  <StyledTableCell>
                    <div className="text-xs text-cinema-muted space-y-0.5">
                      <p className="text-cinema-text">{seller.email}</p>
                      <p>{seller.mobile}</p>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell>
                    <span className="font-mono text-xs text-cinema-muted uppercase">{seller.gstin || "—"}</span>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Box
                      sx={{
                        color: badge.color,
                        bgcolor: badge.bg,
                        borderColor: badge.color,
                      }}
                      className="border inline-block px-3 py-0.5 rounded-full text-xs font-semibold tracking-wider uppercase"
                    >
                      {seller.accountStatus}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                      id={"basic-button" + seller.id}
                      onClick={(e) => handleClick(e, seller.id)}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: 'rgba(232, 117, 50, 0.4)',
                        color: '#F5F0E8',
                        textTransform: 'uppercase',
                        fontSize: '0.75rem',
                        letterSpacing: '0.05em',
                        '&:hover': {
                          borderColor: '#E87532',
                          bgcolor: 'rgba(232, 117, 50, 0.1)',
                        }
                      }}
                    >
                      Audit
                    </Button>
                    <Menu
                      id={"basic-menus" + seller.id}
                      anchorEl={anchorEl[seller.id || 1]}
                      open={Boolean(anchorEl[seller.id || 1])}
                      onClose={() => handleClose(seller.id || 1)}
                      PaperProps={{
                        sx: {
                          bgcolor: '#191A1E',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#F5F0E8',
                        }
                      }}
                    >
                      {accountStatuses.map((status) => (
                        <MenuItem
                          key={status.status}
                          onClick={() => handleUpdateSellerAccountStatus(seller.id || 1, status.status)}
                          sx={{
                            fontSize: '0.8rem',
                            letterSpacing: '0.05em',
                            '&:hover': {
                              bgcolor: 'rgba(232, 117, 50, 0.15)',
                              color: '#E87532',
                            }
                          }}
                        >
                          {status.title}
                        </MenuItem>
                      ))}
                    </Menu>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
