import { TextField } from '@mui/material';
import React from 'react';

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

interface BecomeSellerFormStep4Props {
  formik: any;
}

const BecomeSellerFormStep4 = ({ formik }: BecomeSellerFormStep4Props) => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-editorial text-cinema-text">Brand Atelier & Credentials</h3>
        <p className="text-xs text-cinema-muted mt-1">Finalize your brand identity and establish master credentials.</p>
      </div>

      <TextField
        fullWidth
        name="businessDetails.businessName"
        label="Commercial Studio / Brand Name"
        value={formik.values.businessDetails.businessName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched?.businessDetails?.businessName && Boolean(formik.errors?.businessDetails?.businessName)}
        helperText={formik.touched?.businessDetails?.businessName && (formik.errors?.businessDetails?.businessName as string)}
        sx={inputStyles}
      />

      <TextField
        fullWidth
        name="sellerName"
        label="Owner / Managing Director Name"
        value={formik.values.sellerName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.sellerName && Boolean(formik.errors.sellerName)}
        helperText={formik.touched.sellerName && (formik.errors.sellerName as string)}
        sx={inputStyles}
      />

      <TextField
        fullWidth
        name="email"
        label="Master Account Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && (formik.errors.email as string)}
        sx={inputStyles}
      />

      <TextField
        fullWidth
        type="password"
        name="password"
        label="Console Security Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched?.password && Boolean(formik.errors?.password)}
        helperText={formik.touched?.password && (formik.errors?.password as string)}
        sx={inputStyles}
      />
    </div>
  );
};

export default BecomeSellerFormStep4;