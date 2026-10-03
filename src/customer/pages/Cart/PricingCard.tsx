import { Divider } from "@mui/material";
import React from "react";
import {
  sumCartItemMrpPrice,
  sumCartItemSellingPrice,
} from "../../../util/cartCalculator";
import { useAppSelector } from "../../../Redux Toolkit/Store";

const PricingCard = () => {
  const { cart } = useAppSelector((store) => store);
  const totalMrp = cart.cart?.totalMrpPrice || 0;
  const totalSelling = cart.cart?.totalSellingPrice || 0;
  const discountVal = (sumCartItemMrpPrice(cart.cart?.cartItems || [])) - (sumCartItemSellingPrice(cart.cart?.cartItems || []));

  return (
    <div className="bg-cinema-surface/90 border border-white/10 rounded-2xl overflow-hidden shadow-xl text-cinema-cream">
      <div className="p-5 pb-3 border-b border-white/10">
        <h3 className="font-serif text-base text-cinema-cream">Order Summary</h3>
      </div>
      
      <div className="space-y-3 p-5 text-xs font-light">
        <div className="flex justify-between items-center text-cinema-muted">
          <span>Subtotal MRP</span>
          <span className="font-medium text-cinema-cream">₹{totalMrp.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-cinema-muted">
          <span>Atelier Discount</span>
          <span className="font-medium text-cinema-orange">
            - ₹{Math.max(0, discountVal).toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center text-cinema-muted">
          <span>White-Glove Shipping</span>
          <span className="font-medium text-cinema-cream">
            {totalSelling >= 1500 ? (
              <span className="text-cinema-orange uppercase tracking-wider text-[11px] font-semibold">Complimentary</span>
            ) : (
              "₹79"
            )}
          </span>
        </div>
        <div className="flex justify-between items-center text-cinema-muted">
          <span>Authentication & Handling</span>
          <span className="text-cinema-orange uppercase tracking-wider text-[11px] font-semibold">Complimentary</span>
        </div>
      </div>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />

      <div className="p-5 bg-black/20 flex justify-between items-baseline">
        <span className="text-xs uppercase tracking-wider text-cinema-muted font-medium">Estimated Total</span>
        <span className="font-serif text-xl font-bold text-cinema-cream">
          ₹{totalSelling.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default PricingCard;

