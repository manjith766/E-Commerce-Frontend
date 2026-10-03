import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StorefrontIcon from '@mui/icons-material/Storefront';
import StarIcon from '@mui/icons-material/Star';

const CinematicHero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center bg-[#101114] overflow-hidden px-6 lg:px-16 pt-8 pb-16">
      {/* Cinematic Ambient Glow & Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-[#E87532]/20 via-[#A64F27]/10 to-transparent blur-[130px] pointer-events-none rounded-full"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#C95E24]/10 blur-[100px] pointer-events-none rounded-full"></div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(245, 240, 232, 0.8) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      ></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column: Editorial Headline & Actions */}
        <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#191A1E] border border-white/10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#E87532] animate-ping"></span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F5F0E8]/90">
              Autumn / Winter 2026 Collection
            </span>
          </div>

          {/* Major Editorial Headline */}
          <div className="space-y-2">
            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5F0E8] leading-[1.08]">
              TIMELESS <span className="italic font-serif-display text-[#E87532]">form</span>.
              <br />
              MODERN <span className="italic font-serif-display text-[#F5F0E8]/90">essence</span>.
            </h1>
            <p className="text-sm sm:text-base text-[#A6A29B] max-w-xl mx-auto lg:mx-0 font-light leading-relaxed pt-3">
              Explore an impeccably art-directed marketplace where timeless craftsmanship meets contemporary luxury. Curated apparel, flagship tech, and bespoke interiors.
            </p>
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={() => navigate('/products/men_topwear')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#E87532] via-[#C95E24] to-[#A64F27] text-[#F5F0E8] font-semibold text-xs uppercase tracking-[0.14em] shadow-[0_10px_25px_-5px_rgba(232,117,50,0.4)] hover:shadow-[0_15px_35px_-5px_rgba(232,117,50,0.6)] hover:scale-[1.02] transition-all duration-300"
            >
              <span>Explore Collection</span>
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </button>

            <button
              onClick={() => navigate('/become-seller')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#191A1E] text-[#F5F0E8] border border-white/15 hover:border-[#E87532] hover:bg-[#E87532]/10 font-semibold text-xs uppercase tracking-[0.14em] transition-all duration-300"
            >
              <StorefrontIcon sx={{ fontSize: 16, color: '#E87532' }} />
              <span>Merchant Studio</span>
            </button>
          </div>

          {/* Quick Metrics / Highlights */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-md mx-auto lg:mx-0 text-left">
            <div>
              <p className="text-2xl font-bold font-editorial text-[#F5F0E8]">2,400+</p>
              <p className="text-[11px] uppercase tracking-wider text-[#A6A29B] mt-0.5">Artisanal Pieces</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-editorial text-[#E87532]">100%</p>
              <p className="text-[11px] uppercase tracking-wider text-[#A6A29B] mt-0.5">Verified Origin</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-editorial text-[#F5F0E8]">4.9★</p>
              <p className="text-[11px] uppercase tracking-wider text-[#A6A29B] mt-0.5">Client Rating</p>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Composition */}
        <div className="lg:col-span-5 relative flex justify-center">
          {/* Main Visual Frame */}
          <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] group">
            <img 
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80" 
              alt="Cinematic Fashion Showcase"
              className="w-full h-full object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-700 ease-out" 
            />
            {/* Vignette & Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-transparent to-transparent opacity-80"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0E]/30 via-transparent to-transparent"></div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#E87532]">Signature Feature</span>
              <h3 className="font-editorial text-xl font-bold text-[#F5F0E8] mt-1">Haute Couture Atelier</h3>
              <p className="text-xs text-[#A6A29B] mt-1 line-clamp-1">Tailored silk silhouettes with hand-embellished details.</p>
            </div>
          </div>

          {/* Floating Glassmorphism Product Card */}
          <div 
            onClick={() => navigate('/products/women_western_wear')}
            className="absolute -bottom-6 -left-4 sm:-left-8 bg-[#191A1E]/90 backdrop-blur-xl border border-white/15 p-4 rounded-xl shadow-2xl max-w-[230px] cursor-pointer hover:border-[#E87532] transition-all group"
          >
            <div className="flex items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=300&q=80" 
                alt="Mini Preview" 
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 text-[#E87532]">
                  <StarIcon sx={{ fontSize: 13 }} />
                  <span className="text-[11px] font-bold">4.9</span>
                </div>
                <p className="text-xs font-semibold text-[#F5F0E8] truncate group-hover:text-[#E87532] transition-colors">
                  Silk Wrap Dress
                </p>
                <p className="text-xs font-bold text-[#E87532] mt-0.5">$189</p>
              </div>
            </div>
          </div>

          {/* Floating Top Badge */}
          <div className="absolute -top-4 -right-4 sm:-right-6 bg-gradient-to-br from-[#E87532] to-[#A64F27] text-[#F5F0E8] px-4 py-2 rounded-full shadow-lg border border-white/20 text-[11px] uppercase font-bold tracking-wider">
            Curated Edition
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicHero;
