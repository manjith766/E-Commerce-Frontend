import { Divider, IconButton } from '@mui/material';
import React from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { CartItem } from '../../../types/cartTypes';
import { useAppDispatch } from '../../../Redux Toolkit/Store';
import { deleteCartItem, updateCartItem } from '../../../Redux Toolkit/Customer/CartSlice';

interface CartItemProps {
    item: CartItem;
}

const CartItemCard: React.FC<CartItemProps> = ({ item }) => {
    const dispatch = useAppDispatch();
    
    const handleUpdateQuantity = (value: number) => {
        dispatch(updateCartItem({
            jwt: localStorage.getItem("jwt"),
            cartItemId: item.id,
            cartItem: { quantity: item.quantity + value }
        }));
    };

    const handleRemoveCartItem = () => {
        dispatch(deleteCartItem({
            jwt: localStorage.getItem("jwt") || "", 
            cartItemId: item.id
        }));
    };

    return (
        <div className="bg-cinema-surface border border-white/10 rounded-2xl relative overflow-hidden transition-all hover:border-white/20">
            <div className="p-5 flex gap-4 items-center">
                <div className="w-24 h-28 rounded-xl overflow-hidden bg-cinema-deep shrink-0 border border-white/10">
                    <img
                        className="w-full h-full object-cover" 
                        src={item.product?.images?.[0] || ""}
                        alt={item.product?.title || "Item"}
                    />
                </div>
                <div className="space-y-1.5 flex-1 pr-8">
                    <span className="text-[10px] uppercase tracking-widest text-cinema-orange font-semibold">
                        {item.product?.seller?.businessDetails?.businessName || "Exclusive Studio"}
                    </span>
                    <h3 className="font-serif text-base text-cinema-cream font-medium line-clamp-1">
                        {item.product?.title}
                    </h3>
                    <p className="text-xs text-cinema-muted">
                        Complimentary 7-day atelier exchange
                    </p>
                    <div className="flex items-baseline gap-2 pt-1">
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
            </div>

            <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />

            <div className="px-5 py-3 flex justify-between items-center bg-black/20">
                <div className="flex items-center gap-3 bg-cinema-deep border border-white/10 rounded-xl p-1">
                    <button
                        disabled={item.quantity <= 1}
                        onClick={() => handleUpdateQuantity(-1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-cinema-cream hover:bg-white/10 disabled:opacity-30 transition-colors"
                    >
                        <RemoveIcon sx={{ fontSize: 14 }} />
                    </button>
                    <span className="px-2 text-xs font-semibold text-cinema-cream">
                        {item.quantity}
                    </span>
                    <button
                        onClick={() => handleUpdateQuantity(1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-cinema-cream hover:bg-white/10 transition-colors"
                    >
                        <AddIcon sx={{ fontSize: 14 }} />
                    </button>
                </div>

                <div className="text-right">
                    <span className="text-xs text-cinema-muted font-light mr-2">Item Total:</span>
                    <span className="font-serif text-sm font-bold text-cinema-cream">
                        ₹{(item.sellingPrice * item.quantity)?.toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Remove Action */}
            <div className="absolute top-3 right-3">
                <IconButton
                    onClick={handleRemoveCartItem}
                    size="small"
                    sx={{
                        color: "rgba(255, 255, 255, 0.4)",
                        "&:hover": { color: "#E87532", backgroundColor: "rgba(232, 117, 50, 0.1)" }
                    }}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            </div>
        </div>
    );
};

export default CartItemCard;