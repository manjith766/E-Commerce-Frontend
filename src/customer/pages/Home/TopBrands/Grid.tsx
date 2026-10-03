import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../Redux Toolkit/Store";

const defaultGrid = [
  {
    categoryId: "women_lehenga_cholis",
    section: "GRID",
    name: "Royal Lehenga Choli",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
  },
  {
    categoryId: "men_formal_shoes",
    section: "GRID",
    name: "Handcrafted Footwear",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
  },
  {
    categoryId: "women_sarees",
    section: "GRID",
    name: "Banarasi Heritage Silk",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=80",
  },
  {
    categoryId: "men_sherwanis",
    section: "GRID",
    name: "Imperial Sherwanis",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
  },
  {
    categoryId: "women_jewellery",
    section: "GRID",
    name: "High Jewellery & Zari",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
  },
  {
    categoryId: "women_footwear",
    section: "GRID",
    name: "Embellished Wedges",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
  },
];

const TopBrand = () => {
  const { homePage } = useAppSelector((store) => store);
  const navigate = useNavigate();

  const items = homePage.homePageData?.grid && homePage.homePageData.grid.length >= 6
    ? homePage.homePageData.grid
    : defaultGrid;

  return (
    <div className="py-16 px-6 lg:px-16 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#E87532]">
          Curated Spotlight
        </span>
        <h2 className="font-editorial text-3xl lg:text-4xl font-bold tracking-tight text-[#F5F0E8]">
          THE WEDDING & FESTIVE COUTURE
        </h2>
        <p className="text-xs text-[#A6A29B] font-light">
          An opulent celebration of artisanal silks, hand-embroidered silhouettes, and heirloom treasures.
        </p>
      </div>

      {/* Asymmetric Gallery */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 lg:h-[580px]">
        {/* Item 0 */}
        <div 
          onClick={() => navigate(`/products/${items[0]?.categoryId}`)}
          className="col-span-1 sm:col-span-1 lg:col-span-3 lg:row-span-12 relative rounded-2xl overflow-hidden border border-white/10 group cursor-pointer shadow-xl min-h-[300px]"
        >
          <img
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            src={items[0]?.image}
            alt={items[0]?.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
          <div className="absolute bottom-5 left-5 right-5">
            <span className="text-[10px] uppercase tracking-widest text-[#E87532] font-semibold">Bridal</span>
            <p className="text-sm font-editorial font-bold text-[#F5F0E8] mt-0.5">{items[0]?.name}</p>
          </div>
        </div>

        {/* Item 1 */}
        <div 
          onClick={() => navigate(`/products/${items[1]?.categoryId}`)}
          className="col-span-1 sm:col-span-1 lg:col-span-2 lg:row-span-6 relative rounded-2xl overflow-hidden border border-white/10 group cursor-pointer shadow-xl min-h-[200px]"
        >
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            src={items[1]?.image}
            alt={items[1]?.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-transparent to-transparent opacity-80"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-xs font-editorial font-bold text-[#F5F0E8]">{items[1]?.name}</p>
          </div>
        </div>

        {/* Item 2 */}
        <div 
          onClick={() => navigate(`/products/${items[2]?.categoryId}`)}
          className="col-span-1 sm:col-span-1 lg:col-span-4 lg:row-span-6 relative rounded-2xl overflow-hidden border border-white/10 group cursor-pointer shadow-xl min-h-[200px]"
        >
          <img
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            src={items[2]?.image}
            alt={items[2]?.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-transparent to-transparent opacity-80"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-sm font-editorial font-bold text-[#F5F0E8]">{items[2]?.name}</p>
          </div>
        </div>

        {/* Item 3 */}
        <div 
          onClick={() => navigate(`/products/${items[3]?.categoryId}`)}
          className="col-span-1 sm:col-span-1 lg:col-span-3 lg:row-span-12 relative rounded-2xl overflow-hidden border border-white/10 group cursor-pointer shadow-xl min-h-[300px]"
        >
          <img
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            src={items[3]?.image}
            alt={items[3]?.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-transparent to-transparent opacity-80"></div>
          <div className="absolute bottom-5 left-5 right-5">
            <span className="text-[10px] uppercase tracking-widest text-[#E87532] font-semibold">Grooms</span>
            <p className="text-sm font-editorial font-bold text-[#F5F0E8] mt-0.5">{items[3]?.name}</p>
          </div>
        </div>

        {/* Item 4 */}
        <div 
          onClick={() => navigate(`/products/${items[4]?.categoryId}`)}
          className="col-span-1 sm:col-span-1 lg:col-span-4 lg:row-span-6 relative rounded-2xl overflow-hidden border border-white/10 group cursor-pointer shadow-xl min-h-[200px]"
        >
          <img
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
            src={items[4]?.image}
            alt={items[4]?.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-transparent to-transparent opacity-80"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-sm font-editorial font-bold text-[#F5F0E8]">{items[4]?.name}</p>
          </div>
        </div>

        {/* Item 5 */}
        <div 
          onClick={() => navigate(`/products/${items[5]?.categoryId}`)}
          className="col-span-1 sm:col-span-1 lg:col-span-2 lg:row-span-6 relative rounded-2xl overflow-hidden border border-white/10 group cursor-pointer shadow-xl min-h-[200px]"
        >
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            src={items[5]?.image}
            alt={items[5]?.name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-transparent to-transparent opacity-80"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-xs font-editorial font-bold text-[#F5F0E8]">{items[5]?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBrand;

