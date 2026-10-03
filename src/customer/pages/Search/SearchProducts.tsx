import React, { ChangeEvent, useState } from 'react';
import { searchProduct } from '../../../Redux Toolkit/Customer/ProductSlice';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import ProductCard from '../Products/ProductCard/ProductCard';
import SearchIcon from '@mui/icons-material/Search';

const SearchProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(store => store);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleProductSearch = () => {
    if (searchQuery.trim()) {
      dispatch(searchProduct(searchQuery));
    }
  };

  return (
    <div className="min-h-screen bg-cinema-bg text-cinema-cream pb-24">
      {/* Search Header Hero */}
      <div className="relative py-14 px-6 border-b border-white/10 bg-gradient-to-b from-cinema-deep to-cinema-bg text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-cinema-orange font-semibold">
          Discovery Engine
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-cinema-cream mt-1 font-normal">
          Explore The Atelier Archive
        </h1>
        
        {/* Cinematic Search Input */}
        <div className="max-w-2xl mx-auto mt-8 relative">
          <div className="flex items-center bg-cinema-surface/90 border border-white/15 focus-within:border-cinema-orange rounded-2xl px-5 py-3 shadow-2xl backdrop-blur-md transition-all">
            <SearchIcon sx={{ color: "#E87532", fontSize: 24, mr: 1.5 }} />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleProductSearch();
                }
              }}
              placeholder="Search by silhouette, artisan, fabric, or collection..."
              className="w-full bg-transparent text-cinema-cream placeholder-cinema-muted text-sm outline-none font-light"
            />
            <button
              onClick={handleProductSearch}
              className="px-5 py-2 rounded-xl bg-cinema-orange text-white text-xs uppercase tracking-wider font-semibold hover:bg-cinema-orangeDark transition-all shrink-0 shadow-md shadow-cinema-orange/20"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {products.searchProduct && products.searchProduct.length > 0 ? (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <span className="text-xs uppercase tracking-wider text-cinema-muted">
                {products.searchProduct.length} Results for "{searchQuery}"
              </span>
            </div>
            <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.searchProduct.map((item: any, index: number) => (
                <div key={item.id || index} className="w-full">
                  <ProductCard item={item} />
                </div>
              ))}
            </section>
          </div>
        ) : (
          <div className="py-24 flex flex-col justify-center items-center text-center space-y-3 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-cinema-surface border border-white/10 flex items-center justify-center text-cinema-muted">
              <SearchIcon sx={{ fontSize: 32 }} />
            </div>
            <h3 className="font-serif text-xl text-cinema-cream font-normal">
              {searchQuery ? `No artifacts found for "${searchQuery}"` : "Begin Your Inquiry"}
            </h3>
            <p className="text-xs text-cinema-muted font-light leading-relaxed">
              Enter keywords above to query our extensive catalog across couture, jewelry, electronics, and home decor.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchProducts;