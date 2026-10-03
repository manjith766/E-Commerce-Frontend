import React from "react";
import { Grid, TextField } from "@mui/material";

const inputStyles = {
  "& .MuiOutlinedInput-root": {
    color: "#F5F0E8",
    backgroundColor: "rgba(16, 17, 20, 0.6)",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.12)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(232, 117, 50, 0.5)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#E87532",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#A6A29B",
    "&.Mui-focused": {
      color: "#E87532",
    },
  },
  "& .MuiFormHelperText-root": {
    color: "#FF8A4C",
  },
};

interface BecomeSellerFormStep2Props {
  formik: any;
}

const BecomeSellerFormStep2: React.FC<BecomeSellerFormStep2Props> = ({ formik }) => {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-editorial text-cinema-text">Studio Logistics & Dispatch Hub</h3>
        <p className="text-xs text-cinema-muted mt-1">Specify where white-glove couriers will pick up fulfilled parcels.</p>
      </div>

      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="pickupAddress.name"
            label="Dispatch Manager Name"
            value={formik.values.pickupAddress.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.pickupAddress?.name && Boolean(formik.errors.pickupAddress?.name)}
            helperText={formik.touched.pickupAddress?.name && formik.errors.pickupAddress?.name}
            sx={inputStyles}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="pickupAddress.mobile"
            label="Warehouse Contact Phone"
            value={formik.values.pickupAddress.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.pickupAddress?.mobile && Boolean(formik.errors.pickupAddress?.mobile)}
            helperText={formik.touched.pickupAddress?.mobile && formik.errors.pickupAddress?.mobile}
            sx={inputStyles}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="pickupAddress.pincode"
            label="Postal Code / PIN"
            value={formik.values.pickupAddress.pincode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.pickupAddress?.pincode && Boolean(formik.errors.pickupAddress?.pincode)}
            helperText={formik.touched.pickupAddress?.pincode && formik.errors.pickupAddress?.pincode}
            sx={inputStyles}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="pickupAddress.address"
            label="Facility Address (Building, Suite, Street)"
            value={formik.values.pickupAddress.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.pickupAddress?.address && Boolean(formik.errors.pickupAddress?.address)}
            helperText={formik.touched.pickupAddress?.address && formik.errors.pickupAddress?.address}
            sx={inputStyles}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="pickupAddress.locality"
            label="Locality / Industrial District"
            value={formik.values.pickupAddress.locality}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.pickupAddress?.locality && Boolean(formik.errors.pickupAddress?.locality)}
            helperText={formik.touched.pickupAddress?.locality && formik.errors.pickupAddress?.locality}
            sx={inputStyles}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="pickupAddress.city"
            label="City"
            value={formik.values.pickupAddress.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.pickupAddress?.city && Boolean(formik.errors.pickupAddress?.city)}
            helperText={formik.touched.pickupAddress?.city && formik.errors.pickupAddress?.city}
            sx={inputStyles}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="pickupAddress.state"
            label="State / Province"
            value={formik.values.pickupAddress.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.pickupAddress?.state && Boolean(formik.errors.pickupAddress?.state)}
            helperText={formik.touched.pickupAddress?.state && formik.errors.pickupAddress?.state}
            sx={inputStyles}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default BecomeSellerFormStep2;
