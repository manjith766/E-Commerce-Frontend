import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  TextField,
  Grid,
} from '@mui/material';
import { useAppDispatch } from '../../../Redux Toolkit/Store';
import { createOrder } from '../../../Redux Toolkit/Customer/OrderSlice';
import { Address } from '../../../types/userTypes';

// Validation schema
const ContactSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  mobile: Yup.string()
    .matches(/^[6-9]\d{9}$/, 'Invalid mobile number')
    .required('Required'),
  pinCode: Yup.string()
    .matches(/^\d{6}$/, 'Invalid pincode')
    .required('Required'),
  address: Yup.string().required('Required'),
  locality: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
});

interface AddressFormProp {
  handleClose: () => void;
  paymentGateway: string;
}

const inputStyles = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(16, 17, 20, 0.8)",
    borderRadius: "0.75rem",
    color: "#F5F0E8",
    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.15)" },
    "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
    "&.Mui-focused fieldset": { borderColor: "#E87532" },
  },
  "& .MuiInputLabel-root": {
    color: "#A6A29B",
    "&.Mui-focused": { color: "#E87532" },
  },
};

const AddressForm: React.FC<AddressFormProp> = ({ handleClose, paymentGateway }) => {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      name: '',
      mobile: '',
      pinCode: '',
      address: '',
      locality: '',
      city: '',
      state: '',
    },
    validationSchema: ContactSchema,
    onSubmit: (values) => {
      handleCreateOrder(values as Address);
      handleClose();
    },
  });

  const handleCreateOrder = (address: Address) => {
    dispatch(createOrder({ address, jwt: localStorage.getItem('jwt') || "", paymentGateway }));
  };

  return (
    <Box sx={{ maxWidth: 550, mx: 'auto', color: '#F5F0E8' }}>
      <div className="text-center pb-6">
        <span className="text-xs uppercase tracking-[0.25em] text-cinema-orange font-semibold">
          Destination Coordinates
        </span>
        <h2 className="font-serif text-2xl text-cinema-cream mt-1 font-normal">
          Add Delivery Address
        </h2>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              name="name"
              label="Recipient Full Name"
              sx={inputStyles}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              size="small"
              name="mobile"
              label="10-Digit Mobile"
              sx={inputStyles}
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.mobile && Boolean(formik.errors.mobile)}
              helperText={formik.touched.mobile && formik.errors.mobile}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              size="small"
              name="pinCode"
              label="Postal Code (PIN)"
              sx={inputStyles}
              value={formik.values.pinCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
              helperText={formik.touched.pinCode && formik.errors.pinCode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              name="address"
              label="Street Address, House/Villa No."
              sx={inputStyles}
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              name="locality"
              label="Locality / Landmark"
              sx={inputStyles}
              value={formik.values.locality}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.locality && Boolean(formik.errors.locality)}
              helperText={formik.touched.locality && formik.errors.locality}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              size="small"
              name="city"
              label="City"
              sx={inputStyles}
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              size="small"
              name="state"
              label="State / Province"
              sx={inputStyles}
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.state && Boolean(formik.errors.state)}
              helperText={formik.touched.state && formik.errors.state}
            />
          </Grid>
          <Grid item xs={12}>
            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="w-1/2 py-3 rounded-xl border border-white/15 text-cinema-cream text-xs uppercase tracking-wider font-semibold hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-1/2 py-3 rounded-xl bg-gradient-to-r from-cinema-orange to-cinema-orangeDark text-white text-xs uppercase tracking-wider font-bold shadow-lg shadow-cinema-orange/20 hover:shadow-cinema-orange/30 transition-all"
              >
                Save & Proceed
              </button>
            </div>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddressForm;

