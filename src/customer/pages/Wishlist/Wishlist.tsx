import React from 'react';
import { useAppSelector } from '../../../Redux Toolkit/Store';
import WishlistProductCard from './WishlistProductCard';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
    const { wishlist } = useAppSelector(store => store);
    const navigate = useNavigate();
    const hasItems = wishlist.wishlist?.products && wishlist.wishlist.products.length > 0;

    return (
        <div className="min-h-screen bg-cinema-bg text-cinema-cream pb-24">
            {/* Wishlist Editorial Header */}
            <div className="relative py-12 px-6 border-b border-white/10 bg-gradient-to-b from-cinema-deep to-cinema-bg text-center">
                <span className="text-xs uppercase tracking-[0.3em] text-cinema-orange font-semibold">
                    Saved Curations
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-cinema-cream mt-1 font-normal">
                    Private Wishlist
                </h1>
                <p className="text-xs text-cinema-muted mt-2 font-light">
                    {wishlist.wishlist?.products?.length || 0} saved artifacts reserved for your future acquisition
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                {hasItems ? (
                    <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
                        {wishlist.wishlist?.products?.map((item) => (
                            <WishlistProductCard key={item.id} item={item} />
                        ))}
                    </div>
                ) : (
                    /* Empty Wishlist State */
                    <div className="py-24 flex flex-col items-center justify-center text-center space-y-4 max-w-md mx-auto">
                        <div className="w-20 h-20 rounded-full bg-cinema-orange/10 border border-cinema-orange/30 flex items-center justify-center text-cinema-orange shadow-glow-orange/20">
                            <FavoriteBorderIcon sx={{ fontSize: 36 }} />
                        </div>
                        <h2 className="font-serif text-2xl text-cinema-cream font-normal">
                            No Curations Saved Yet
                        </h2>
                        <p className="text-sm text-cinema-muted font-light leading-relaxed">
                            Discover exquisite bespoke artifacts across our atelier and save your favorite selections here.
                        </p>
                        <div className="pt-2">
                            <button
                                onClick={() => navigate("/")}
                                className="px-8 py-3 rounded-full bg-cinema-orange text-white text-xs uppercase tracking-widest font-semibold hover:bg-cinema-orangeDark transition-colors shadow-lg shadow-cinema-orange/25"
                            >
                                Browse Catalogue
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;