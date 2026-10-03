import React, { useState, useEffect, MouseEvent } from "react";
import "./ProductCard.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box, Button, IconButton, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../../types/productTypes";
import {
    useAppDispatch,
    useAppSelector,
} from "../../../../Redux Toolkit/Store";
import { addProductToWishlist } from "../../../../Redux Toolkit/Customer/WishlistSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { isWishlisted } from "../../../../util/isWishlisted";
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import ChatBot from "../../ChatBot/ChatBot";

interface ProductCardProps {
    item: Product;
}
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "auto",
    borderRadius: "1rem",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    background: "#191A1E",
    outline: "none"
};

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const { wishlist } = useAppSelector((store) => store);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [showChatBot, setShowChatBot] = useState(false);

    const handleAddWishlist = (event: MouseEvent) => {
        event.stopPropagation();
        setIsFavorite((prev) => !prev);
        if (item.id) dispatch(addProductToWishlist({ productId: item.id }));
    };

    useEffect(() => {
        let interval: any;
        if (isHovered && item.images?.length > 1) {
            interval = setInterval(() => {
                setCurrentImage((prevImage) => (prevImage + 1) % item.images.length);
            }, 1200);
        } else if (interval) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isHovered, item.images?.length]);

    const handleShowChatBot = (event: MouseEvent) => {
        event.stopPropagation();
        setShowChatBot(true);
    };

    const handleCloseChatBot = (e: MouseEvent) => {
        e.stopPropagation();
        setShowChatBot(false);
    };

    const isItemInWishlist = wishlist?.wishlist ? isWishlisted(wishlist.wishlist, item) : isFavorite;

    return (
        <>
            <div
                onClick={() =>
                    navigate(
                        `/product-details/${item.category?.categoryId}/${item.title}/${item.id}`
                    )
                }
                className="group relative cursor-pointer rounded-2xl overflow-hidden bg-cinema-surface border border-white/10 hover:border-cinema-orange/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cinema-orange/10 flex flex-col"
            >
                {/* Media Container */}
                <div
                    className="card"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {item.images && item.images.length > 0 ? (
                        item.images.map((image: any, index: number) => (
                            <img
                                key={index}
                                className="card-media object-top"
                                src={image}
                                alt={`${item.title}-${index}`}
                                style={{
                                    transform: `translateX(${(index - currentImage) * 100}%)`,
                                }}
                            />
                        ))
                    ) : (
                        <div className="w-full h-full bg-cinema-deep flex items-center justify-center text-cinema-muted text-xs">
                            No Image Available
                        </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-cinema-surface via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity pointer-events-none" />

                    {/* Floating Badges */}
                    {(item.discountPercent ?? 0) > 0 && (
                        <div className="absolute top-3 left-3 z-10">
                            <span className="px-2.5 py-1 bg-cinema-orange/90 backdrop-blur-md text-white text-[11px] font-bold tracking-wider uppercase rounded-full shadow-md">
                                {item.discountPercent}% OFF
                            </span>
                        </div>
                    )}

                    {/* Image Carousel Dots */}
                    {item.images && item.images.length > 1 && (
                        <div className="indicator flex flex-col items-center space-y-2">
                            <div className="flex gap-1.5 p-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                                {item.images.map((_: any, index: number) => (
                                    <button
                                        key={index}
                                        className={`indicator-button ${index === currentImage ? "active" : ""}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentImage(index);
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Floating Quick Action Buttons */}
                    <div className="absolute top-3 right-3 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <button
                            onClick={handleAddWishlist}
                            className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-cinema-cream hover:bg-cinema-orange hover:text-white hover:border-cinema-orange transition-all duration-300 shadow-lg"
                            title={isItemInWishlist ? "In Wishlist" : "Add to Wishlist"}
                        >
                            {isItemInWishlist ? (
                                <FavoriteIcon sx={{ fontSize: 18, color: "#E87532" }} />
                            ) : (
                                <FavoriteBorderIcon sx={{ fontSize: 18 }} />
                            )}
                        </button>
                        <button
                            onClick={handleShowChatBot}
                            className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-cinema-cream hover:bg-cinema-orange hover:text-white hover:border-cinema-orange transition-all duration-300 shadow-lg"
                            title="Chat about this item"
                        >
                            <ModeCommentIcon sx={{ fontSize: 16 }} />
                        </button>
                    </div>
                </div>

                {/* Details Section */}
                <div className="group-hover-effect flex-1 flex flex-col justify-between">
                    <div>
                        <p className="text-[11px] uppercase tracking-widest text-cinema-orange font-medium truncate mb-1">
                            {item.seller?.businessDetails?.businessName || "Exclusive Studio"}
                        </p>
                        <h3 className="font-serif text-cinema-cream text-base font-medium line-clamp-1 group-hover:text-cinema-orange transition-colors">
                            {item.title}
                        </h3>
                    </div>

                    <div className="pt-3 mt-3 border-t border-white/5 flex items-baseline justify-between">
                        <div className="flex items-baseline gap-2">
                            <span className="font-serif text-lg font-bold text-cinema-cream">
                                ₹{item.sellingPrice?.toLocaleString()}
                            </span>
                            {item.mrpPrice && item.mrpPrice > item.sellingPrice && (
                                <span className="text-xs text-cinema-muted line-through font-sans">
                                    ₹{item.mrpPrice?.toLocaleString()}
                                </span>
                            )}
                        </div>
                        <span className="text-[11px] text-cinema-muted tracking-wider uppercase font-medium">
                            Explore →
                        </span>
                    </div>
                </div>
            </div>

            {/* Chatbot modal */}
            {showChatBot && (
                <section className="absolute left-16 top-0 z-50">
                    <Modal
                        open={true}
                        onClose={handleCloseChatBot}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <ChatBot handleClose={handleCloseChatBot} productId={item.id} />
                        </Box>
                    </Modal>
                </section>
            )}
        </>
    );
};

export default ProductCard;

