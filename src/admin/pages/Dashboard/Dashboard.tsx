import React, { useEffect, useState } from 'react';
import AdminRoutes from '../../../routes/AdminRoutes';
import Navbar from '../../../admin seller/components/navbar/Navbar';
import AdminDrawerList from '../../components/DrawerList';
import { Alert, Snackbar } from '@mui/material';
import { useAppSelector } from '../../../Redux Toolkit/Store';

const AdminDashboard = () => {
  const { deal, admin } = useAppSelector(store => store);
  const [snackbarOpen, setOpenSnackbar] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (deal.dealCreated || deal.dealUpdated || deal.error || admin.categoryUpdated) {
      setOpenSnackbar(true);
    }
  }, [deal.dealCreated, deal.dealUpdated, deal.error, admin.categoryUpdated]);

  return (
    <>
      <div className="min-h-screen bg-cinema-bg text-cinema-cream">
        <Navbar DrawerList={AdminDrawerList} />
        <section className="lg:flex lg:h-[90vh]">
          <div className="hidden lg:block h-full shrink-0">
            <AdminDrawerList />
          </div>
          <div className="p-6 sm:p-10 w-full lg:w-[calc(100%-280px)] overflow-y-auto">
            <AdminRoutes />
          </div>
        </section>
      </div>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={deal.error ? "error" : "success"}
          variant="filled"
          sx={{ width: '100%', bgcolor: deal.error ? "#842029" : "#191A1E", color: "#F5F0E8", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          {deal.error ? deal.error : deal.dealCreated ? "Deal created successfully" : deal.dealUpdated ? "Deal updated successfully" : admin.categoryUpdated ? "Category Updated successfully" : ""}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AdminDashboard;