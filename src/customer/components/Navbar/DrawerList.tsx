import { Box, Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import React, { useState } from 'react'
import { mainCategory } from '../../../data/category/mainCategory'
import CategorySheet from './CategorySheet';

const DrawerList = ({ toggleDrawer }: any) => {
    const [selectedCategory, setSelectedCategory] = useState("");

    return (
        <Box sx={{ width: 280, backgroundColor: "#101114", height: "100%", color: "#F5F0E8" }} role="presentation">
            <div className='p-6 flex items-center gap-1 border-b border-white/10'>
                <h1 className='logo text-lg text-[#F5F0E8] font-bold tracking-[0.14em]'>
                    ECOMMERCE BAZAR
                </h1>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E87532] inline-block ml-0.5"></span>
            </div>

            <List className="py-2">
                {mainCategory.map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton
                            onClick={() => setSelectedCategory(selectedCategory === item.categoryId ? "" : item.categoryId)}
                            sx={{
                                padding: "14px 24px",
                                borderBottom: "1px solid rgba(245, 240, 232, 0.04)",
                                "&:hover": { backgroundColor: "rgba(232, 117, 50, 0.08)" },
                            }}
                        >
                            <ListItemText 
                                primary={
                                    <span className={`text-xs font-semibold tracking-[0.12em] uppercase ${
                                        selectedCategory === item.categoryId ? "text-[#E87532]" : "text-[#F5F0E8]/80"
                                    }`}>
                                        {item.name}
                                    </span>
                                } 
                            />
                            <span className="text-[#A6A29B] text-xs">
                                {selectedCategory === item.categoryId ? "−" : "+"}
                            </span>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            {selectedCategory && (
                <div className='border-t border-white/10 max-h-[350px] overflow-y-auto bg-[#141518]'>
                    <CategorySheet toggleDrawer={toggleDrawer} selectedCategory={selectedCategory} />
                </div>
            )}
        </Box>
    )
}

export default DrawerList