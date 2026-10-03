import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomeCategoryCard = ({ item }: any) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/products/${item.categoryId}`)} 
      className='flex flex-col items-center gap-3 group cursor-pointer w-36 sm:w-44 lg:w-52 p-3 rounded-2xl transition-all duration-300 hover:bg-white/[0.03]'
    >
      <div className='w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-[#E87532] shadow-xl group-hover:shadow-[0_0_25px_rgba(232,117,50,0.3)] transition-all duration-500 bg-[#191A1E]'>
        <img 
          className='w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out' 
          src={item.image} 
          alt={item.name} 
        />
      </div>
      <h3 className='font-editorial text-xs sm:text-sm font-semibold tracking-wider text-[#F5F0E8] group-hover:text-[#E87532] text-center transition-colors uppercase'>
        {item.name}
      </h3>
    </div>
  )
}

export default HomeCategoryCard