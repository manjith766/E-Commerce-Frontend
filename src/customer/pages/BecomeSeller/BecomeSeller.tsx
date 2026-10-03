import { Alert, Button, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import SellerLoginForm from "./SellerLoginForm";
import SellerAccountForm from "./SellerAccountForm";
import StorefrontIcon from '@mui/icons-material/Storefront';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';

const BecomeSeller = () => {
  const dispatch = useAppDispatch();
  const [isLoginPage, setIsLoginPage] = useState(false);
  const { sellerAuth } = useAppSelector(store => store);

  const handleCloseSnackbar = () => setSnackbarOpen(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (sellerAuth.sellerCreated || sellerAuth.error || sellerAuth.otpSent) {
      setSnackbarOpen(true);
    }
  }, [sellerAuth.sellerCreated, sellerAuth.error, sellerAuth.otpSent]);

  return (
    <div className="min-h-screen bg-cinema-dark text-cinema-text">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cinema-orange/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Form Section */}
          <section className="lg:col-span-6 bg-cinema-card border border-cinema-border/40 rounded-2xl p-6 sm:p-10 shadow-2xl relative backdrop-blur-xl">
            <div className="mb-8">
              <span className="text-xs uppercase tracking-[0.25em] text-cinema-orange font-semibold block mb-2">
                Merchant Partnership
              </span>
              <h1 className="font-editorial text-3xl sm:text-4xl text-cinema-text tracking-wide">
                {isLoginPage ? "Access Merchant Console" : "Launch Your Exclusive Studio"}
              </h1>
              <p className="text-cinema-muted text-sm mt-2">
                {isLoginPage
                  ? "Enter your registered merchant credentials to oversee catalog operations."
                  : "Onboard your brand onto our curated luxury marketplace with zero onboarding friction."}
              </p>
            </div>

            {!isLoginPage ? (
              <SellerAccountForm />
            ) : (
              <SellerLoginForm />
            )}

            <div className="mt-8 pt-6 border-t border-cinema-border/30 text-center">
              <p className="text-sm text-cinema-muted mb-3">
                {isLoginPage ? "New to the marketplace?" : "Already registered as an atelier partner?"}
              </p>
              <Button
                onClick={() => setIsLoginPage(!isLoginPage)}
                fullWidth
                variant="outlined"
                sx={{
                  py: "10px",
                  borderColor: "rgba(232, 117, 50, 0.4)",
                  color: "#F5F0E8",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  "&:hover": {
                    borderColor: "#E87532",
                    bgcolor: "rgba(232, 117, 50, 0.1)",
                  }
                }}
              >
                {isLoginPage ? "Register New Studio" : "Sign In to Existing Console"}
              </Button>
            </div>
          </section>

          {/* Editorial Banner & Value Propositions */}
          <section className="hidden lg:flex lg:col-span-6 flex-col justify-between space-y-8 sticky top-28">
            <div className="relative rounded-2xl overflow-hidden border border-cinema-border/30 bg-cinema-card p-8 group">
              <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark via-cinema-dark/40 to-transparent z-10" />
              <img
                src="/seller.jpg"
                alt="Merchant Studio"
                className="w-full h-80 object-cover object-center rounded-xl filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                onError={(e: any) => {
                  e.target.src = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80";
                }}
              />
              <div className="relative z-20 mt-6">
                <span className="px-3 py-1 bg-cinema-orange/20 border border-cinema-orange/30 text-cinema-orange text-xs font-semibold uppercase tracking-widest rounded-full">
                  Verified Atelier Network
                </span>
                <h3 className="font-editorial text-2xl text-cinema-text mt-3">
                  Reach discerning global clientele who value precision craftsmanship.
                </h3>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-cinema-card border border-cinema-border/30 rounded-xl hover:border-cinema-orange/40 transition-colors">
                <StorefrontIcon className="text-cinema-orange mb-3" sx={{ fontSize: 28 }} />
                <h4 className="font-editorial text-lg text-cinema-text">Direct Brand Presence</h4>
                <p className="text-xs text-cinema-muted mt-1">Full control over your boutique narrative, custom pricing, and seasonal catalogues.</p>
              </div>

              <div className="p-5 bg-cinema-card border border-cinema-border/30 rounded-xl hover:border-cinema-orange/40 transition-colors">
                <PaymentsOutlinedIcon className="text-cinema-orange mb-3" sx={{ fontSize: 28 }} />
                <h4 className="font-editorial text-lg text-cinema-text">Seamless Settlements</h4>
                <p className="text-xs text-cinema-muted mt-1">Automated 7-day cyclical payouts directly linked to your verified corporate accounts.</p>
              </div>

              <div className="p-5 bg-cinema-card border border-cinema-border/30 rounded-xl hover:border-cinema-orange/40 transition-colors">
                <TrendingUpOutlinedIcon className="text-cinema-orange mb-3" sx={{ fontSize: 28 }} />
                <h4 className="font-editorial text-lg text-cinema-text">Predictive Analytics</h4>
                <p className="text-xs text-cinema-muted mt-1">Real-time inventory intelligence, heatmaps, and customer demand forecasting.</p>
              </div>

              <div className="p-5 bg-cinema-card border border-cinema-border/30 rounded-xl hover:border-cinema-orange/40 transition-colors">
                <VerifiedUserOutlinedIcon className="text-cinema-orange mb-3" sx={{ fontSize: 28 }} />
                <h4 className="font-editorial text-lg text-cinema-text">Concierge Protection</h4>
                <p className="text-xs text-cinema-muted mt-1">End-to-end transit insurance and dedicated 24/7 partner support agents.</p>
              </div>
            </div>
          </section>

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
          severity={sellerAuth.error ? "error" : "success"}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {sellerAuth.error ? sellerAuth.error : sellerAuth.sellerCreated ? sellerAuth.sellerCreated : "OTP sent to your email!"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default BecomeSeller;
