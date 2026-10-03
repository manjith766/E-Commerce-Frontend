import React from 'react';
import { useNavigate } from 'react-router-dom';

const SimilarProductCard = ({ product }: any) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(
                `/product-details/${product.category?.categoryId}/${product.title}/${product.id}`
            )} 
            className="group cursor-pointer rounded-xl overflow-hidden bg-cinema-surface border border-white/10 hover:border-cinema-orange/50 transition-all duration-300 hover:shadow-xl hover:shadow-cinema-orange/10 flex flex-col"
        >
            <div className="relative h-[260px] overflow-hidden bg-cinema-deep">
                <img
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={product.images?.[0] || ""}
                    alt={product.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cinema-surface via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
                {product.discountPercent > 0 && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-cinema-orange/90 text-white text-[10px] font-bold uppercase rounded-full">
                        {product.discountPercent}% OFF
                    </span>
                )}
            </div>
            
            <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                    <p className="text-[10px] uppercase tracking-wider text-cinema-orange font-medium truncate">
                        {product.seller?.businessDetails?.businessName || "Exclusive Studio"}
                    </p>
                    <h4 className="font-serif text-sm text-cinema-cream truncate group-hover:text-cinema-orange transition-colors">
                        {product.title}
                    </h4>
                </div>
                <div className="flex items-baseline gap-2 pt-1 border-t border-white/5">
                    <span className="font-serif text-sm font-bold text-cinema-cream">
                        ₹{product.sellingPrice?.toLocaleString()}
                    </span>
                    {product.mrpPrice && product.mrpPrice > product.sellingPrice && (
                        <span className="text-[11px] text-cinema-muted line-through">
                            ₹{product.mrpPrice?.toLocaleString()}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SimilarProductCard;

