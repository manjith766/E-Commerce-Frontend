import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Menu, MenuItem, styled } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { fetchSellerOrders, updateOrderStatus } from '../../../Redux Toolkit/Seller/sellerOrderSlice';
import { Order, OrderItem } from '../../../types/orderTypes';

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

const orderStatus = [
  { color: '#E87532', label: 'PENDING' }, 
  { color: '#F5BCBA', label: 'PLACED' }, 
  { color: '#FFB066', label: 'CONFIRMED' },
  { color: '#38BDF8', label: 'SHIPPED' }, 
  { color: '#34D399', label: 'DELIVERED' }, 
  { color: '#F87171', label: 'CANCELLED' },
];

const orderStatusColor: Record<string, { color: string, bg: string, label: string }> = {
  PENDING: { color: '#E87532', bg: 'rgba(232, 117, 50, 0.15)', label: 'PENDING' },
  CONFIRMED: { color: '#FFB066', bg: 'rgba(255, 176, 102, 0.15)', label: 'CONFIRMED' },
  PLACED: { color: '#FAF4EB', bg: 'rgba(250, 244, 235, 0.15)', label: 'PLACED' }, 
  SHIPPED: { color: '#38BDF8', bg: 'rgba(56, 189, 248, 0.15)', label: 'SHIPPED' },
  DELIVERED: { color: '#34D399', bg: 'rgba(52, 211, 153, 0.15)', label: 'DELIVERED' },
  CANCELLED: { color: '#F87171', bg: 'rgba(248, 113, 113, 0.15)', label: 'CANCELLED' }
};

export default function OrderTable() {
  const { sellerOrder } = useAppSelector(store => store);
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = React.useState<{ [key: number]: HTMLElement | null }>({});

  const handleClick = (event: React.MouseEvent<HTMLElement>, orderId: number) => {
    setAnchorEl((prev) => ({ ...prev, [orderId]: event.currentTarget }));
  };

  const handleClose = (orderId: number) => {
    setAnchorEl((prev) => ({ ...prev, [orderId]: null }));
  };

  React.useEffect(() => {
    dispatch(fetchSellerOrders(localStorage.getItem("jwt") || ""));
  }, [dispatch]);

  const handleUpdateOrder = (orderId: number, status: string) => {
    dispatch(updateOrderStatus({
      jwt: localStorage.getItem("jwt") || "",
      orderId,
      orderStatus: status as any,
    }));
    handleClose(orderId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-cinema-orange font-semibold block mb-1">
            Fulfillment Manifest
          </span>
          <h1 className="font-editorial text-2xl sm:text-3xl text-cinema-text">Dispatched & Active Orders</h1>
        </div>
        <span className="text-xs px-3 py-1.5 rounded-full bg-cinema-card border border-cinema-border/40 text-cinema-muted">
          Total: {sellerOrder.orders?.length || 0} orders
        </span>
      </div>

      <TableContainer component={Paper} sx={{ bgcolor: 'transparent', boxShadow: 'none', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', overflow: 'hidden' }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Manifest #</StyledTableCell>
              <StyledTableCell>Line Items</StyledTableCell>
              <StyledTableCell>Consignee & Address</StyledTableCell>
              <StyledTableCell align="center">Logistics Status</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellerOrder.orders?.map((item: Order) => {
              const statusCfg = orderStatusColor[item.orderStatus] || orderStatusColor.PENDING;
              return (
                <StyledTableRow key={item.id}>
                  <StyledTableCell align="left">
                    <span className="font-mono text-cinema-orange font-bold">#{item.id}</span>
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    <div className="flex gap-4 flex-col">
                      {item.orderItems?.map((orderItem: OrderItem) => (
                        <div key={orderItem.id} className="flex gap-4 items-center">
                          <img
                            className="w-14 h-14 object-cover rounded-lg border border-cinema-border/30 bg-cinema-dark"
                            src={orderItem.product?.images?.[0] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80"}
                            alt={orderItem.product?.title || "Product"}
                          />
                          <div className="flex flex-col text-xs space-y-1">
                            <span className="font-semibold text-cinema-text line-clamp-1">{orderItem.product?.title}</span>
                            <span className="text-cinema-orange font-medium">${orderItem.product?.sellingPrice?.toLocaleString()}</span>
                            <span className="text-cinema-muted">Color: {orderItem.product?.color} | Size: {orderItem.size}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </StyledTableCell>
                  <StyledTableCell>
                    <div className="flex flex-col gap-y-1 text-xs text-cinema-muted">
                      <span className="font-semibold text-cinema-text text-sm">{item.shippingAddress?.name}</span>
                      <span>{item.shippingAddress?.address}, {item.shippingAddress?.city}</span>
                      <span>{item.shippingAddress?.state} - {item.shippingAddress?.pinCode}</span>
                      <span><strong className="text-cinema-text">Phone:</strong> {item.shippingAddress?.mobile}</span>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Box
                      sx={{
                        color: statusCfg.color,
                        bgcolor: statusCfg.bg,
                        borderColor: statusCfg.color,
                      }}
                      className="border inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase"
                    >
                      {item.orderStatus}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                      size="small"
                      onClick={(e) => handleClick(e, item.id)}
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
                      Update
                    </Button>
                    <Menu
                      id={`status-menu-${item.id}`}
                      anchorEl={anchorEl[item.id]}
                      open={Boolean(anchorEl[item.id])}
                      onClose={() => handleClose(item.id)}
                      PaperProps={{
                        sx: {
                          bgcolor: '#191A1E',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#F5F0E8',
                        }
                      }}
                    >
                      {orderStatus.map((status) => (
                        <MenuItem
                          key={status.label}
                          onClick={() => handleUpdateOrder(item.id, status.label)}
                          sx={{
                            fontSize: '0.8rem',
                            letterSpacing: '0.05em',
                            '&:hover': {
                              bgcolor: 'rgba(232, 117, 50, 0.15)',
                              color: '#E87532',
                            }
                          }}
                        >
                          {status.label}
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
