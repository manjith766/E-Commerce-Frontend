import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton, styled } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { fetchSellerProducts, updateProductStock } from '../../../Redux Toolkit/Seller/sellerProductSlice';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

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

export default function ProductTable() {
  const { sellerProduct } = useAppSelector(store => store);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(fetchSellerProducts(localStorage.getItem("jwt")));
  }, [dispatch]);

  const handleUpdateStack = (id: number | undefined) => () => {
    dispatch(updateProductStock(id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-cinema-orange font-semibold block mb-1">
            Studio Inventory
          </span>
          <h1 className="font-editorial text-2xl sm:text-3xl text-cinema-text">Catalog & Product Portfolio</h1>
        </div>
        <Button
          onClick={() => navigate("/seller/add-product")}
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            bgcolor: '#E87532',
            color: '#FFFFFF',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontSize: '0.8rem',
            px: 3,
            py: '10px',
            '&:hover': { bgcolor: '#C95E24' }
          }}
        >
          Add New Creation
        </Button>
      </div>

      <TableContainer component={Paper} sx={{ bgcolor: 'transparent', boxShadow: 'none', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', overflow: 'hidden' }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Preview</StyledTableCell>
              <StyledTableCell>Product Title</StyledTableCell>
              <StyledTableCell align="right">Original MSRP</StyledTableCell>
              <StyledTableCell align="right">Atelier Price</StyledTableCell>
              <StyledTableCell align="right">Palette</StyledTableCell>
              <StyledTableCell align="center">Stock Status</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellerProduct.products?.map((item) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell component="th" scope="row">
                  <div className="flex gap-2">
                    {item.images?.slice(0, 1).map((image, idx) => (
                      <img
                        key={idx}
                        className="w-14 h-14 object-cover rounded-lg border border-cinema-border/30 bg-cinema-dark"
                        src={image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80"}
                        alt={item.title}
                      />
                    ))}
                  </div>
                </StyledTableCell>
                <StyledTableCell>
                  <span className="font-semibold text-cinema-text line-clamp-2 max-w-xs">{item.title}</span>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <span className="text-cinema-muted line-through">₹{item.mrpPrice}</span>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <span className="text-cinema-orange font-bold font-editorial text-base">₹{item.sellingPrice}</span>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <span className="text-xs uppercase tracking-wider text-cinema-muted font-medium">{item.color}</span>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    onClick={handleUpdateStack(item.id)}
                    size="small"
                    sx={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      px: 2,
                      py: '4px',
                      borderRadius: '9999px',
                      border: '1px solid',
                      borderColor: item.in_stock ? 'rgba(52, 211, 153, 0.4)' : 'rgba(248, 113, 113, 0.4)',
                      color: item.in_stock ? '#34D399' : '#F87171',
                      bgcolor: item.in_stock ? 'rgba(52, 211, 153, 0.1)' : 'rgba(248, 113, 113, 0.1)',
                      '&:hover': {
                        borderColor: item.in_stock ? '#34D399' : '#F87171',
                        bgcolor: item.in_stock ? 'rgba(52, 211, 153, 0.2)' : 'rgba(248, 113, 113, 0.2)',
                      }
                    }}
                  >
                    {item.in_stock ? "Available" : "Sold Out"}
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton
                    onClick={() => navigate("/seller/update-product/" + item.id)}
                    sx={{
                      color: '#E87532',
                      bgcolor: 'rgba(232, 117, 50, 0.1)',
                      border: '1px solid rgba(232, 117, 50, 0.25)',
                      '&:hover': {
                        bgcolor: '#E87532',
                        color: '#FFFFFF',
                      }
                    }}
                    size="small"
                  >
                    <EditIcon fontSize="small" />
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
