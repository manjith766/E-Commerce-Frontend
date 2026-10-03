import React from 'react';
import { useNavigate } from 'react-router-dom';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="mt-28 bg-[#0B0C0E] text-[#F5F0E8] border-t border-white/10 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[#E87532]/10 to-transparent pointer-events-none blur-3xl"></div>

      {/* Trust Badges Bar */}
      <div className="border-b border-white/5 py-10 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex items-center gap-4 group">
            <div className="p-3 rounded-full bg-[#191A1E] text-[#E87532] border border-white/5 group-hover:border-[#E87532]/40 transition-colors">
              <LocalShippingOutlinedIcon />
            </div>
            <div>
              <h4 className="text-xs uppercase font-bold tracking-wider text-[#F5F0E8]">Free Global Delivery</h4>
              <p className="text-[11px] text-[#A6A29B] mt-0.5">On all curated orders over $150</p>
            </div>
          </div>

          <div className="flex items-center gap-4 group">
            <div className="p-3 rounded-full bg-[#191A1E] text-[#E87532] border border-white/5 group-hover:border-[#E87532]/40 transition-colors">
              <VerifiedUserOutlinedIcon />
            </div>
            <div>
              <h4 className="text-xs uppercase font-bold tracking-wider text-[#F5F0E8]">100% Certified Genuine</h4>
              <p className="text-[11px] text-[#A6A29B] mt-0.5">Handpicked premium catalogue</p>
            </div>
          </div>

          <div className="flex items-center gap-4 group">
            <div className="p-3 rounded-full bg-[#191A1E] text-[#E87532] border border-white/5 group-hover:border-[#E87532]/40 transition-colors">
              <ReplayOutlinedIcon />
            </div>
            <div>
              <h4 className="text-xs uppercase font-bold tracking-wider text-[#F5F0E8]">Complimentary Returns</h4>
              <p className="text-[11px] text-[#A6A29B] mt-0.5">30-day effortless return policy</p>
            </div>
          </div>

          <div className="flex items-center gap-4 group">
            <div className="p-3 rounded-full bg-[#191A1E] text-[#E87532] border border-white/5 group-hover:border-[#E87532]/40 transition-colors">
              <SupportAgentOutlinedIcon />
            </div>
            <div>
              <h4 className="text-xs uppercase font-bold tracking-wider text-[#F5F0E8]">Concierge Assistance</h4>
              <p className="text-[11px] text-[#A6A29B] mt-0.5">Dedicated 24/7 client care</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Editorial Statement */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-baseline gap-1">
              <h2 className="logo text-2xl font-bold tracking-[0.16em] text-[#F5F0E8]">
                ECOMMERCE BAZAR
              </h2>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E87532] inline-block ml-0.5"></span>
            </div>
            <p className="text-xs text-[#A6A29B] leading-relaxed max-w-sm">
              Artfully curated collections for the discerning modern lifestyle. Blending timeless craftsmanship with effortless contemporary design.
            </p>
            <div className="pt-2">
              <button 
                onClick={() => navigate('/become-seller')}
                className="text-xs font-semibold uppercase tracking-wider text-[#E87532] hover:text-[#FF8C4A] flex items-center gap-1 transition-colors"
              >
                Become a Partnered Merchant <span className="text-sm">→</span>
              </button>
            </div>
          </div>

          {/* Department 1 */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs uppercase font-bold tracking-[0.18em] text-[#E87532]">Collections</h3>
            <ul className="space-y-2 text-xs text-[#A6A29B]">
              <li onClick={() => navigate('/products/men')} className="hover:text-[#F5F0E8] cursor-pointer transition-colors">Men's Wardrobe</li>
              <li onClick={() => navigate('/products/women')} className="hover:text-[#F5F0E8] cursor-pointer transition-colors">Women's Atelier</li>
              <li onClick={() => navigate('/products/electronics')} className="hover:text-[#F5F0E8] cursor-pointer transition-colors">Modern Electronics</li>
              <li onClick={() => navigate('/products/home_furniture')} className="hover:text-[#F5F0E8] cursor-pointer transition-colors">Home & Living</li>
            </ul>
          </div>

          {/* Department 2 */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs uppercase font-bold tracking-[0.18em] text-[#E87532]">Customer Care</h3>
            <ul className="space-y-2 text-xs text-[#A6A29B]">
              <li onClick={() => navigate('/account/orders')} className="hover:text-[#F5F0E8] cursor-pointer transition-colors">Order Tracking</li>
              <li onClick={() => navigate('/wishlist')} className="hover:text-[#F5F0E8] cursor-pointer transition-colors">Saved Wishlist</li>
              <li onClick={() => navigate('/cart')} className="hover:text-[#F5F0E8] cursor-pointer transition-colors">Shopping Bag</li>
              <li onClick={() => navigate('/account/addresses')} className="hover:text-[#F5F0E8] cursor-pointer transition-colors">Shipping Addresses</li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs uppercase font-bold tracking-[0.18em] text-[#E87532]">The Journal & Newsletter</h3>
            <p className="text-xs text-[#A6A29B]">Receive private invitations to seasonal releases, editorial previews, and exclusive offers.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-[#191A1E] border border-white/10 rounded-lg px-4 py-2.5 text-xs text-[#F5F0E8] placeholder-[#A6A29B]/50 focus:outline-none focus:border-[#E87532] flex-1"
              />
              <button 
                type="button" 
                className="bg-gradient-to-r from-[#E87532] to-[#C95E24] hover:from-[#FF8C4A] hover:to-[#E87532] text-[#F5F0E8] font-semibold text-xs tracking-wider uppercase px-4 py-2.5 rounded-lg transition-all"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-white/5 py-6 px-6 lg:px-16 text-center text-[11px] text-[#A6A29B]/70 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-4">
        <p>© {new Date().getFullYear()} Ecommerce Bazar. All rights reserved. Designed with cinematic elegance.</p>
        <div className="flex gap-6 text-[11px]">
          <span className="hover:text-[#F5F0E8] cursor-pointer">Privacy Policy</span>
          <span className="hover:text-[#F5F0E8] cursor-pointer">Terms of Service</span>
          <span className="hover:text-[#F5F0E8] cursor-pointer">Security Standards</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;