import React from "react";
import { Box, TextField } from "@mui/material";

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

const BecomeSellerFormStep1 = ({ formik }: any) => {
    return (
        <Box>
            <div className="mb-6">
              <h3 className="text-lg font-editorial text-cinema-text">Primary Verification & Tax Identification</h3>
              <p className="text-xs text-cinema-muted mt-1">Provide your primary merchant contact and official tax ID.</p>
            </div>

            <div className="space-y-6">
                <TextField
                    fullWidth
                    name="mobile"
                    label="Mobile Telephone Number"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                    helperText={formik.touched.mobile && (formik.errors.mobile as string)}
                    sx={inputStyles}
                />

                <TextField
                    fullWidth
                    name="gstin"
                    label="GSTIN / Corporate Tax Identification"
                    value={formik.values.gstin}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.gstin && Boolean(formik.errors.gstin)}
                    helperText={formik.touched.gstin && (formik.errors.gstin as string)}
                    sx={inputStyles}
                />
            </div>
        </Box>
    );
};

export default BecomeSellerFormStep1;
