import React from 'react'
import { Deal } from '../../../../types/dealTypes'
import { useNavigate } from 'react-router-dom'

const DealCard = ({ deal }: { deal: Deal }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/products/${deal.category.categoryId}`)} 
      className='w-full cursor-pointer group p-2 text-left'
    >
      <div className="bg-[#191A1E] rounded-2xl overflow-hidden border border-white/10 group-hover:border-[#E87532] shadow-xl group-hover:shadow-[0_15px_30px_rgba(232,117,50,0.25)] transition-all duration-300">
        <div className="relative aspect-[3/4] overflow-hidden bg-[#101114]">
          <img 
            className='w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700' 
            src={deal.category.image} 
            alt={deal.category.name} 
          />
          {/* Badge */}
          <div className="absolute top-3 left-3 bg-gradient-to-r from-[#E87532] to-[#C95E24] text-[#F5F0E8] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
            {deal.discount}% OFF
          </div>
        </div>

        <div className='p-4 space-y-1.5 bg-[#191A1E]'>
          <p className='text-[11px] font-bold uppercase tracking-[0.16em] text-[#E87532] truncate'>
            {deal.category.categoryId.split("_").join(" ")}
          </p>
          <h4 className='text-sm font-editorial font-bold text-[#F5F0E8] group-hover:text-[#E87532] transition-colors truncate'>
            Curated Flash Deal
          </h4>
          <div className="pt-2 flex items-center justify-between border-t border-white/5 text-xs">
            <span className="text-[#A6A29B] text-[11px]">Limited Release</span>
            <span className="text-[#E87532] font-semibold text-xs group-hover:translate-x-1 transition-transform">
              Shop Now →
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DealCard