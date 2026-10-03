import {
  Alert,
  IconButton,
  Snackbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CartItemCard from "./CartItemCard";
import { useNavigate } from "react-router-dom";
import PricingCard from "./PricingCard";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { fetchUserCart } from "../../../Redux Toolkit/Customer/CartSlice";
import { CartItem } from "../../../types/cartTypes";
import { applyCoupon } from "../../../Redux Toolkit/Customer/CouponSlice";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cart, auth, coupone } = useAppSelector((store) => store);
  const [couponCode, setCouponCode] = useState("");
  const [snackbarOpen, setOpenSnackbar] = useState(false);

  useEffect(() => {
    dispatch(fetchUserCart(localStorage.getItem("jwt") || ""));
  }, [auth.jwt, dispatch]);

  const handleChange = (e: any) => {
    setCouponCode(e.target.value);
  };

  const handleApplyCoupon = (apply: string) => {
    let code = couponCode;
    if (apply === "false") {
      code = cart.cart?.couponCode || "";
    }

    dispatch(
      applyCoupon({
        apply,
        code,
        orderValue: cart.cart?.totalSellingPrice || 100,
        jwt: localStorage.getItem("jwt") || "",
      })
    );
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (coupone.couponApplied || coupone.error) {
      setOpenSnackbar(true);
      setCouponCode("");
    }
  }, [coupone.couponApplied, coupone.error]);

  const hasItems = cart.cart && cart.cart.cartItems && cart.cart.cartItems.length > 0;

  return (
    <div className="min-h-screen bg-cinema-bg text-cinema-cream pb-24">
      {/* Top Header */}
      <div className="relative py-12 px-6 border-b border-white/10 bg-gradient-to-b from-cinema-deep to-cinema-bg text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-cinema-orange font-semibold">
          Your Atelier Selection
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-cinema-cream mt-1">
          Shopping Bag
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {hasItems ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items List (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex justify-between items-center px-1">
                <span className="text-xs uppercase tracking-wider text-cinema-muted font-medium">
                  {cart.cart?.cartItems.length} Distinct Artifacts
                </span>
              </div>
              {cart.cart?.cartItems.map((item: CartItem) => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>

            {/* Sidebar Summary & Promo (5 cols) */}
            <div className="lg:col-span-5 space-y-5 sticky top-24">
              {/* Promo Coupon Box */}
              <div className="bg-cinema-surface/90 border border-white/10 rounded-2xl p-5 shadow-xl space-y-4">
                <div className="flex gap-2.5 items-center">
                  <LocalOfferIcon sx={{ color: "#E87532", fontSize: 18 }} />
                  <span className="font-serif text-sm text-cinema-cream">Exclusive Atelier Privileges</span>
                </div>

                {!cart.cart?.couponCode ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={handleChange}
                      placeholder="ENTER PROMO CODE"
                      className="flex-1 bg-cinema-deep border border-white/10 rounded-xl px-4 py-2.5 text-xs text-cinema-cream placeholder-cinema-muted uppercase tracking-wider focus:outline-none focus:border-cinema-orange transition-colors"
                    />
                    <button
                      onClick={() => handleApplyCoupon("true")}
                      disabled={!couponCode}
                      className="px-5 py-2.5 rounded-xl bg-cinema-orange/20 border border-cinema-orange/40 text-cinema-orange text-xs font-semibold uppercase tracking-wider hover:bg-cinema-orange hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-cinema-orange transition-all"
                    >
                      Apply
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-cinema-orange/10 border border-cinema-orange/30 rounded-xl">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cinema-orange animate-pulse" />
                      <span className="text-xs uppercase tracking-wider text-cinema-cream font-medium">
                        {cart.cart.couponCode} Applied
                      </span>
                    </div>
                    <IconButton
                      onClick={() => handleApplyCoupon("false")}
                      size="small"
                      sx={{ color: "rgba(255,255,255,0.6)", "&:hover": { color: "#E87532" } }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </div>
                )}
              </div>

              {/* Order Calculation */}
              <PricingCard />

              {/* Checkout CTA */}
              <button
                onClick={() => navigate("/checkout/address")}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cinema-orange to-cinema-orangeDark text-white text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-3 shadow-lg shadow-cinema-orange/25 hover:shadow-cinema-orange/40 hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <span>Proceed To Secure Checkout</span>
                <ArrowForwardIcon sx={{ fontSize: 16 }} />
              </button>

              {/* Wishlist Link */}
              <div
                onClick={() => navigate("/wishlist")}
                className="p-4 rounded-xl bg-cinema-surface/50 border border-white/5 hover:border-white/20 flex justify-between items-center cursor-pointer transition-colors"
              >
                <span className="text-xs text-cinema-muted">Looking for saved pieces?</span>
                <div className="flex items-center gap-1.5 text-xs text-cinema-orange uppercase tracking-wider font-semibold">
                  <FavoriteIcon sx={{ fontSize: 16 }} />
                  <span>View Wishlist</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Bag State */
          <div className="py-24 flex flex-col items-center justify-center text-center space-y-4 max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-cinema-orange/10 border border-cinema-orange/30 flex items-center justify-center text-cinema-orange shadow-glow-orange/20">
              <ShoppingBagOutlinedIcon sx={{ fontSize: 40 }} />
            </div>
            <h2 className="font-serif text-2xl text-cinema-cream font-normal">
              Your Atelier Bag is Empty
            </h2>
            <p className="text-sm text-cinema-muted font-light leading-relaxed">
              Explore our curated collections of artisanal couture and timeless essentials.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate("/")}
                className="px-8 py-3 rounded-full bg-cinema-orange text-white text-xs uppercase tracking-widest font-semibold hover:bg-cinema-orangeDark transition-colors shadow-lg shadow-cinema-orange/25"
              >
                Explore Curations
              </button>
            </div>
          </div>
        )}
      </div>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={coupone.error ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%", backgroundColor: coupone.error ? "#842029" : "#191A1E", color: "#F5F0E8", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          {coupone.error ? coupone.error : "Privilege applied successfully"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Cart;

