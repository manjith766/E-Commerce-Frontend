import React, { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import { Alert, Snackbar } from '@mui/material';
import SignupForm from './SignupForm';
import { useAppSelector } from '../../../Redux Toolkit/Store';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const Auth = () => {
    const [isLoginPage, setIsLoginPage] = useState(true);
    const handleCloseSnackbar = () => setSnackbarOpen(false);
    const { auth } = useAppSelector(store => store);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        if (auth.otpSent || auth.error) {
            setSnackbarOpen(true);
        }
    }, [auth.otpSent, auth.error]);

    return (
        <div className="min-h-screen bg-cinema-bg text-cinema-cream flex items-center justify-center px-4 py-16 relative overflow-hidden">
            {/* Ambient Background Light Flares */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cinema-orange/10 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-cinema-orangeDark/10 blur-[100px] rounded-full pointer-events-none" />

            {/* Auth Glass Card */}
            <div className="relative z-10 w-full max-w-md bg-cinema-surface/90 border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl space-y-6">
                
                {/* Brand Badge */}
                <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-cinema-deep border border-cinema-orange/30 flex items-center justify-center text-cinema-orange shadow-glow-orange/20 mb-1">
                        <AutoAwesomeIcon sx={{ fontSize: 24 }} />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-cinema-orange font-semibold">
                        Exclusive Access
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl text-cinema-cream font-normal">
                        {isLoginPage ? "Atelier Sign In" : "Create Patron Account"}
                    </h2>
                    <p className="text-xs text-cinema-muted font-light">
                        {isLoginPage 
                            ? "Authenticate with your registered email credentials" 
                            : "Join our exclusive patronage to unlock bespoke curations"}
                    </p>
                </div>

                {/* Form Container */}
                <div>
                    {isLoginPage ? <LoginForm /> : <SignupForm />}

                    {/* Toggle Button */}
                    <div className="flex items-center justify-center gap-2 pt-6 border-t border-white/5 text-xs text-cinema-muted">
                        <span>{isLoginPage ? "New to the atelier?" : "Already hold an account?"}</span>
                        <button
                            onClick={() => setIsLoginPage(!isLoginPage)}
                            className="text-cinema-orange hover:text-white font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                            {isLoginPage ? "Register" : "Sign In"}
                        </button>
                    </div>
                </div>
            </div>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={auth.error ? "error" : "success"}
                    variant="filled"
                    sx={{ width: '100%', bgcolor: auth.error ? "#842029" : "#191A1E", color: "#F5F0E8", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                    {auth.error ? auth.error : "Authentication code dispatched to your email"}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Auth;