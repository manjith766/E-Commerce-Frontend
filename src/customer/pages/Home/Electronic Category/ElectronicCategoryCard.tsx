import React from 'react'
import { useNavigate } from 'react-router-dom'

const ElectronicCategoryCard = ({ item }: any) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/products/${item.categoryId}`)} 
      className='flex flex-col items-center gap-3 cursor-pointer group p-3 rounded-xl hover:bg-white/[0.03] transition-all duration-300'
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#191A1E] border border-white/10 group-hover:border-[#E87532] group-hover:shadow-[0_0_20px_rgba(232,117,50,0.25)] flex items-center justify-center p-3 transition-all duration-300 overflow-hidden">
        <img 
          className='object-contain w-full h-full group-hover:scale-110 transition-transform duration-500' 
          src={item.image} 
          alt={item.name} 
        />
      </div>
      <h3 className='font-semibold text-xs tracking-wider uppercase text-[#F5F0E8]/80 group-hover:text-[#E87532] text-center transition-colors'>
        {item.name}
      </h3>
    </div>
  )
}

export default ElectronicCategoryCard