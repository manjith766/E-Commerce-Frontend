import { CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import OTPInput from '../../components/OtpFild/OTPInput';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { useNavigate } from 'react-router-dom';
import { sendLoginSignupOtp, signin } from '../../../Redux Toolkit/Customer/AuthSlice';

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

const LoginForm = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState<number>(30);
    const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { auth } = useAppSelector(store => store);

    const formik = useFormik({
        initialValues: {
            email: '',
            otp: ''
        },
        onSubmit: (values: any) => {
            dispatch(signin({ email: values.email, otp, navigate }));
        }
    });

    const handleOtpChange = (newOtp: any) => {
        setOtp(newOtp);
    };

    const handleResendOTP = () => {
        dispatch(sendLoginSignupOtp({ email: "signing_" + formik.values.email }));
        setTimer(30);
        setIsTimerActive(true);
    };

    const handleSentOtp = () => {
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
        <form onSubmit={formik.handleSubmit} className="space-y-4">
            <TextField
                fullWidth
                size="small"
                name="email"
                label="Registered Email Address"
                sx={inputStyles}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email ? formik.errors.email as string : undefined}
            />

            {auth.otpSent && (
                <div className="space-y-3 pt-2">
                    <p className="text-xs text-cinema-muted">
                        Enter 6-digit verification token sent to your email:
                    </p>
                    <div className="flex justify-center py-1">
                        <OTPInput
                            length={6}
                            onChange={handleOtpChange}
                            error={false}
                        />
                    </div>
                    <div className="text-xs text-center text-cinema-muted">
                        {isTimerActive ? (
                            <span>Resend verification in {timer}s</span>
                        ) : (
                            <button
                                type="button"
                                onClick={handleResendOTP}
                                className="text-cinema-orange hover:text-white font-medium transition-colors"
                            >
                                Request New Code
                            </button>
                        )}
                    </div>
                </div>
            )}

            <div className="pt-2">
                {auth.otpSent ? (
                    <button
                        type="button"
                        disabled={auth.loading || !otp || otp.length < 6}
                        onClick={handleLogin}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cinema-orange to-cinema-orangeDark text-white text-xs uppercase tracking-widest font-bold shadow-lg shadow-cinema-orange/25 hover:shadow-cinema-orange/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-40 transition-all flex items-center justify-center gap-2"
                    >
                        {auth.loading ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : "Authenticate & Enter"}
                    </button>
                ) : (
                    <button
                        type="button"
                        disabled={auth.loading || !formik.values.email}
                        onClick={handleSentOtp}
                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cinema-orange to-cinema-orangeDark text-white text-xs uppercase tracking-widest font-bold shadow-lg shadow-cinema-orange/25 hover:shadow-cinema-orange/40 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-40 transition-all flex items-center justify-center gap-2"
                    >
                        {auth.loading ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : "Dispatch Verification Code"}
                    </button>
                )}
            </div>
        </form>
    );
};

export default LoginForm;