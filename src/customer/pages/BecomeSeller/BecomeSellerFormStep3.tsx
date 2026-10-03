import React from "react";
import { TextField } from "@mui/material";

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

interface BecomeSellerFormStep3Props {
  formik: any;
}

const BecomeSellerFormStep3: React.FC<BecomeSellerFormStep3Props> = ({ formik }) => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-editorial text-cinema-text">Banking Settlement Vault</h3>
        <p className="text-xs text-cinema-muted mt-1">Direct account configuration for weekly automated merchant payouts.</p>
      </div>

      <TextField
        fullWidth
        name="bankDetails.accountNumber"
        label="Bank Account Number"
        value={formik.values.bankDetails.accountNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.bankDetails?.accountNumber && Boolean(formik.errors.bankDetails?.accountNumber)}
        helperText={formik.touched.bankDetails?.accountNumber && formik.errors.bankDetails?.accountNumber}
        sx={inputStyles}
      />
      <TextField
        fullWidth
        name="bankDetails.ifscCode"
        label="IFSC Code / Routing Identifier"
        value={formik.values.bankDetails.ifscCode}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.bankDetails?.ifscCode && Boolean(formik.errors.bankDetails?.ifscCode)}
        helperText={formik.touched.bankDetails?.ifscCode && formik.errors.bankDetails?.ifscCode}
        sx={inputStyles}
      />
      <TextField
        fullWidth
        name="bankDetails.accountHolderName"
        label="Beneficiary / Account Holder Full Legal Name"
        value={formik.values.bankDetails.accountHolderName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.bankDetails?.accountHolderName && Boolean(formik.errors.bankDetails?.accountHolderName)}
        helperText={formik.touched.bankDetails?.accountHolderName && formik.errors.bankDetails?.accountHolderName}
        sx={inputStyles}
      />
    </div>
  );
};

export default BecomeSellerFormStep3;
