import React from 'react'
import { menLevelThree } from '../../../data/category/level three/menLevelThree'
import { menLevelTwo } from '../../../data/category/level two/menLevelTwo'
import { womenLevelThree } from '../../../data/category/level three/womenLevelThree'
import { womenLevelTwo } from '../../../data/category/level two/womenLevelTwo'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { electronicsLevelTwo } from '../../../data/category/level two/electronicsLavelTwo'
import { furnitureLevelTwo } from '../../../data/category/level two/furnitureLevleTwo'
import { furnitureLevelThree } from '../../../data/category/level three/furnitureLevelThree'
import { electronicsLevelThree } from '../../../data/category/level three/electronicsLevelThree'

const categoryTwo: { [key: string]: any[] } = {
    men: menLevelTwo,
    women: womenLevelTwo,
    electronics: electronicsLevelTwo,
    home_furniture: furnitureLevelTwo,
}

const categoryThree: { [key: string]: any[] } = {
    men: menLevelThree,
    women: womenLevelThree,
    electronics: electronicsLevelThree,
    home_furniture: furnitureLevelThree,
}

const CategorySheet = ({ selectedCategory, toggleDrawer, setShowSheet }: any) => {
    const navigate = useNavigate()

    const childCategory = (category: any, parentCategoryId: any) => {
        return category?.filter((child: any) => {
            return child.parentCategoryId === parentCategoryId
        }) || []
    }

    const handleCategoryClick = (category: string) => {
        if (toggleDrawer) {
            toggleDrawer(false)()
        }
        if (setShowSheet) {
            setShowSheet(false)
        }
        navigate("/products/" + category)
    }

    return (
        <Box className='bg-[#141518]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] max-h-[520px] overflow-y-auto'>
            <div className='max-w-7xl mx-auto flex text-sm flex-wrap p-6 lg:p-8 gap-y-6'>
                {categoryTwo[selectedCategory]?.map((item: any, index: number) => (
                    <div 
                        key={item.categoryId || item.name} 
                        className={`p-5 w-full sm:w-1/2 md:w-1/3 lg:w-[20%] rounded-lg transition-all ${
                            index % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"
                        }`}
                    >
                        <p className='text-[#E87532] mb-4 font-bold text-xs uppercase tracking-[0.14em] flex items-center gap-2'>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E87532]"></span>
                            {item.name}
                        </p>

                        <ul className='space-y-2.5'>
                            {childCategory(categoryThree[selectedCategory], item.categoryId)?.map((childItem: any) => (
                                <li 
                                    key={childItem.categoryId || childItem.name}
                                    onClick={() => handleCategoryClick(childItem.categoryId)}
                                    className='text-[#F5F0E8]/70 hover:text-[#F5F0E8] hover:translate-x-1 text-xs cursor-pointer transition-all duration-200 font-normal flex items-center gap-1.5'
                                >
                                    <span className="text-white/20 text-[10px]">›</span>
                                    <span>{childItem.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </Box>
    )
}

export default CategorySheet