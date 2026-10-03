import { Button, CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import OTPInput from '../../components/OtpFild/OTPInput';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { sendLoginOtp, verifyLoginOtp } from '../../../Redux Toolkit/Seller/sellerAuthenticationSlice';
import { useNavigate } from 'react-router-dom';

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

const SellerLoginForm = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [timer, setTimer] = useState<number>(30);
    const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { sellerAuth } = useAppSelector(store => store);

    const formik = useFormik({
        initialValues: {
            email: '',
            otp: ''
        },
        onSubmit: (values: any) => {
            dispatch(verifyLoginOtp({ email: values.email, otp, navigate }));
        }
    });

    const handleOtpChange = (otp: any) => {
        setOtp(otp);
    };

    const handleResendOTP = () => {
        dispatch(sendLoginOtp(formik.values.email));
        setTimer(30);
        setIsTimerActive(true);
    };

    const handleSentOtp = () => {
        setIsOtpSent(true);
        handleResendOTP();
    };

    const handleLogin = () => {
        formik.handleSubmit();
    };

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;

        if (isTimerActive) {
            interval = setInterval(() => {
                setTimer(prev => {
                    if (prev === 1) {
                        clearInterval(interval);
                        setIsTimerActive(false);
                        return 30;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isTimerActive]);

    return (
        <div className="space-y-6">
            <form className="space-y-5">
                <TextField
                    fullWidth
                    name="email"
                    label="Merchant Registered Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email ? (formik.errors.email as string) : undefined}
                    sx={inputStyles}
                />

                {sellerAuth.otpSent && (
                    <div className="space-y-3 bg-cinema-dark/60 p-4 rounded-xl border border-cinema-border/30">
                        <p className="font-medium text-xs text-cinema-muted uppercase tracking-wider">
                          One-Time Security Passcode
                        </p>
                        <div className="flex justify-center py-2">
                          <OTPInput
                              length={6}
                              onChange={handleOtpChange}
                              error={false}
                          />
                        </div>
                        <div className="text-xs text-center text-cinema-muted">
                            {isTimerActive ? (
                                <span>Resend passcode in <strong className="text-cinema-orange">{timer}s</strong></span>
                            ) : (
                                <button 
                                    type="button"
                                    onClick={handleResendOTP} 
                                    className="text-cinema-orange cursor-pointer hover:underline font-semibold"
                                >
                                    Resend Passcode
                                </button>
                            )}
                        </div>
                        {formik.touched.otp && formik.errors.otp && (
                          <p className="text-red-400 text-xs text-center">{formik.errors.otp as string}</p>
                        )}
                    </div>
                )}

                {sellerAuth.otpSent && (
                    <div>
                        <Button 
                            onClick={handleLogin} 
                            fullWidth 
                            variant="contained" 
                            sx={{ 
                              py: "12px",
                              bgcolor: "#E87532",
                              color: "#FFFFFF",
                              fontWeight: 700,
                              textTransform: "uppercase",
                              letterSpacing: "0.15em",
                              fontSize: "0.85rem",
                              "&:hover": { bgcolor: "#C95E24" }
                            }}
                        >
                            Authorize & Enter Console
                        </Button>
                    </div>
                )}

                {!sellerAuth.otpSent && (
                    <Button
                        disabled={sellerAuth.loading || !formik.values.email} 
                        fullWidth 
                        variant="contained" 
                        onClick={handleSentOtp}
                        sx={{ 
                          py: "12px",
                          bgcolor: "#E87532",
                          color: "#FFFFFF",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.15em",
                          fontSize: "0.85rem",
                          "&:hover": { bgcolor: "#C95E24" },
                          "&.Mui-disabled": {
                            bgcolor: "rgba(255, 255, 255, 0.05)",
                            color: "rgba(255, 255, 255, 0.3)"
                          }
                        }}
                    >
                        {sellerAuth.loading ? <CircularProgress size={22} sx={{ color: "white" }} /> : "Request Verification Code"}
                    </Button>
                )}
            </form>
        </div>
    );
};

export default SellerLoginForm;