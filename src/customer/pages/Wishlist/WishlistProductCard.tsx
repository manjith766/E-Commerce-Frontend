import React, { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../../types/productTypes';
import { useAppDispatch } from '../../../Redux Toolkit/Store';
import CloseIcon from '@mui/icons-material/Close';
import { addProductToWishlist } from '../../../Redux Toolkit/Customer/WishlistSlice';

interface ProductCardProps {
    item: Product;
}

const WishlistProductCard: React.FC<ProductCardProps> = ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleRemoveWishlist = (e: MouseEvent) => {
        e.stopPropagation();
        if (item.id) {
            dispatch(addProductToWishlist({ productId: item.id }));
        }
    };

    return (
        <div 
            onClick={() => navigate(`/product-details/${item.category?.categoryId}/${item.title}/${item.id}`)}
            className="group cursor-pointer rounded-2xl overflow-hidden bg-cinema-surface border border-white/10 hover:border-cinema-orange/50 transition-all duration-300 hover:shadow-xl hover:shadow-cinema-orange/10 flex flex-col relative w-64"
        >
            <div className="relative h-72 overflow-hidden bg-cinema-deep">
                <img
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src={item.images?.[0] || ""}
                    alt={item.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cinema-surface via-transparent to-transparent opacity-50" />
                {(item.discountPercent ?? 0) > 0 && (
                    <span className="absolute bottom-3 left-3 px-2 py-0.5 bg-cinema-orange/90 text-white text-[10px] font-bold uppercase rounded-full">
                        {item.discountPercent}% OFF
                    </span>
                )}
            </div>

            <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                    <p className="text-[10px] uppercase tracking-wider text-cinema-orange font-semibold truncate">
                        {item.seller?.businessDetails?.businessName || "Exclusive Studio"}
                    </p>
                    <h4 className="font-serif text-sm text-cinema-cream truncate group-hover:text-cinema-orange transition-colors">
                        {item.title}
                    </h4>
                </div>

                <div className="flex items-baseline gap-2 pt-2 border-t border-white/5">
                    <span className="font-serif text-base font-bold text-cinema-cream">
                        ₹{item.sellingPrice?.toLocaleString()}
                    </span>
                    {item.mrpPrice && item.mrpPrice > item.sellingPrice && (
                        <span className="text-xs text-cinema-muted line-through">
                            ₹{item.mrpPrice?.toLocaleString()}
                        </span>
                    )}
                </div>
            </div>

            {/* Remove button */}
            <button
                onClick={handleRemoveWishlist}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-cinema-orange hover:border-cinema-orange transition-all shadow-lg"
                title="Remove from wishlist"
            >
                <CloseIcon sx={{ fontSize: 16 }} />
            </button>
        </div>
    );
};

export default WishlistProductCard;