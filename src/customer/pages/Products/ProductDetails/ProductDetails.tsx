import React, { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { Box, Button, Divider, Modal } from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SmilarProduct from '../SimilarProduct/SmilarProduct';
import ZoomableImage from './ZoomableImage';
import { useAppDispatch, useAppSelector } from '../../../../Redux Toolkit/Store';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductById, getAllProducts } from '../../../../Redux Toolkit/Customer/ProductSlice';
import { addItemToCart } from '../../../../Redux Toolkit/Customer/CartSlice';
import { addProductToWishlist } from '../../../../Redux Toolkit/Customer/WishlistSlice';
import { isWishlisted } from '../../../../util/isWishlisted';
import ProductReviewCard from '../../Review/ProductReviewCard';
import RatingCard from '../../Review/RatingCard';
import { fetchReviewsByProductId } from '../../../../Redux Toolkit/Customer/ReviewSlice';

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "auto",
    maxHeight: "90vh",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
    outline: "none",
    borderRadius: "1rem",
    overflow: "hidden",
    background: "#191A1E",
    border: "1px solid rgba(255, 255, 255, 0.1)",
};

const ProductDetails = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useAppDispatch();
    const { products, review, wishlist } = useAppSelector(store => store);
    const navigate = useNavigate();
    const { productId, categoryId } = useParams();
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (productId) {
            dispatch(fetchProductById(Number(productId)));
            dispatch(fetchReviewsByProductId({ productId: Number(productId) }));
        }
        dispatch(getAllProducts({ category: categoryId }));
    }, [productId, categoryId, dispatch]);

    const handleAddCart = () => {
        dispatch(addItemToCart({
            jwt: localStorage.getItem('jwt'),
            request: { productId: Number(productId), size: "FREE", quantity }
        }));
    };

    const handleWishlist = () => {
        if (productId) {
            dispatch(addProductToWishlist({ productId: Number(productId) }));
        }
    };

    const product = products.product;
    const isItemInWishlist = wishlist?.wishlist && product ? isWishlisted(wishlist.wishlist, product) : false;

    return (
        <div className="min-h-screen bg-cinema-bg text-cinema-cream pb-24">
            {/* Ambient Background Glow */}
            <div className="absolute top-20 right-10 w-96 h-96 bg-cinema-orange/5 blur-[120px] pointer-events-none rounded-full" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                {/* Main Product Showcase Split */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Left: Gallery & Zoomable Frame (7 cols) */}
                    <section className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
                        {/* Thumbnails */}
                        <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0 sm:w-20">
                            {product?.images?.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`relative rounded-xl overflow-hidden aspect-square border transition-all duration-300 w-16 sm:w-20 ${
                                        selectedImage === index
                                            ? "border-cinema-orange shadow-glow-orange/40 scale-105"
                                            : "border-white/10 opacity-70 hover:opacity-100 hover:border-white/30"
                                    }`}
                                >
                                    <img className="w-full h-full object-cover" src={item} alt={`thumbnail-${index}`} />
                                </button>
                            ))}
                        </div>

                        {/* Main Featured Image */}
                        <div className="relative flex-1 rounded-2xl overflow-hidden bg-cinema-surface border border-white/10 shadow-2xl group">
                            <img
                                onClick={handleOpen}
                                className="w-full h-[450px] sm:h-[600px] object-cover cursor-zoom-in transition-transform duration-700 group-hover:scale-105"
                                src={product?.images?.[selectedImage] || ""}
                                alt={product?.title || "Product"}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-cinema-surface/60 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs text-cinema-muted uppercase tracking-wider flex items-center gap-1.5">
                                <span>🔍 Click to expand</span>
                            </div>
                        </div>

                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={modalStyle}>
                                <ZoomableImage src={product?.images?.[selectedImage] || ""} alt={product?.title || ""} />
                            </Box>
                        </Modal>
                    </section>

                    {/* Right: Product Details & Actions (5 cols) */}
                    <section className="lg:col-span-5 space-y-6">
                        {/* Seller / Brand */}
                        <div className="space-y-2">
                            <span className="text-xs uppercase tracking-[0.25em] text-cinema-orange font-semibold">
                                {product?.seller?.businessDetails?.businessName || "Exclusive Studio"}
                            </span>
                            <h1 className="font-serif text-3xl sm:text-4xl text-cinema-cream font-normal leading-tight">
                                {product?.title}
                            </h1>
                        </div>

                        {/* Rating Summary Pill */}
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cinema-surface border border-white/10 text-sm">
                            <div className="flex items-center gap-1 text-cinema-orange font-semibold">
                                <span>4.5</span>
                                <StarIcon sx={{ color: "#E87532", fontSize: 16 }} />
                            </div>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <span className="text-cinema-muted text-xs uppercase tracking-wider">
                                {review.reviews.length || 358} Verified Reviews
                            </span>
                        </div>

                        {/* Price Display */}
                        <div className="space-y-1.5 p-5 rounded-2xl bg-cinema-surface/80 border border-white/10">
                            <div className="flex items-baseline gap-3">
                                <span className="font-serif text-3xl font-bold text-cinema-cream">
                                    ₹{product?.sellingPrice?.toLocaleString()}
                                </span>
                                {product?.mrpPrice && product.mrpPrice > (product?.sellingPrice || 0) && (
                                    <span className="text-sm text-cinema-muted line-through font-sans">
                                        ₹{product?.mrpPrice?.toLocaleString()}
                                    </span>
                                )}
                                {product?.discountPercent && product.discountPercent > 0 && (
                                    <span className="px-2.5 py-0.5 rounded-full bg-cinema-orange/20 border border-cinema-orange/40 text-cinema-orange text-xs font-bold uppercase tracking-wider">
                                        {product.discountPercent}% OFF
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-cinema-muted font-light">
                                Inclusive of all customs & duties. Complimentary white-glove shipping on orders over ₹1,500.
                            </p>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-cinema-muted font-semibold">
                                Select Quantity
                            </label>
                            <div className="flex items-center gap-3 w-40 bg-cinema-surface border border-white/10 rounded-xl p-1">
                                <button
                                    disabled={quantity <= 1}
                                    onClick={() => setQuantity(quantity - 1)}
                                    className="w-9 h-9 rounded-lg flex items-center justify-center text-cinema-cream hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                                >
                                    <RemoveIcon sx={{ fontSize: 16 }} />
                                </button>
                                <span className="flex-1 text-center font-serif text-base font-bold text-cinema-cream">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-9 h-9 rounded-lg flex items-center justify-center text-cinema-cream hover:bg-white/10 transition-colors"
                                >
                                    <AddIcon sx={{ fontSize: 16 }} />
                                </button>
                            </div>
                        </div>

                        {/* Primary CTAs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                            <button
                                onClick={handleAddCart}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-cinema-orange to-cinema-orangeDark text-white text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cinema-orange/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                <AddShoppingCartIcon sx={{ fontSize: 18 }} />
                                Add To Bag
                            </button>
                            <button
                                onClick={handleWishlist}
                                className="w-full py-4 rounded-xl bg-cinema-surface border border-white/15 text-cinema-cream text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:border-cinema-orange hover:text-cinema-orange transition-all"
                            >
                                {isItemInWishlist ? (
                                    <>
                                        <FavoriteIcon sx={{ fontSize: 18, color: "#E87532" }} />
                                        In Wishlist
                                    </>
                                ) : (
                                    <>
                                        <FavoriteBorderIcon sx={{ fontSize: 18 }} />
                                        Save To Wishlist
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Trust & Guarantee Badges */}
                        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-cinema-surface/50 border border-white/5">
                                <ShieldIcon sx={{ color: "#E87532", fontSize: 20 }} />
                                <span className="text-xs text-cinema-cream font-light">Authenticity Guaranteed</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-cinema-surface/50 border border-white/5">
                                <WorkspacePremiumIcon sx={{ color: "#E87532", fontSize: 20 }} />
                                <span className="text-xs text-cinema-cream font-light">100% Secure Returns</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-cinema-surface/50 border border-white/5">
                                <LocalShippingIcon sx={{ color: "#E87532", fontSize: 20 }} />
                                <span className="text-xs text-cinema-cream font-light">Express Insured Delivery</span>
                            </div>
                            <div className="flex items-center gap-3 p-3 rounded-xl bg-cinema-surface/50 border border-white/5">
                                <AccountBalanceWalletIcon sx={{ color: "#E87532", fontSize: 20 }} />
                                <span className="text-xs text-cinema-cream font-light">Flexible Payment Options</span>
                            </div>
                        </div>

                        {/* Product Narrative Description */}
                        {product?.description && (
                            <div className="pt-4 border-t border-white/10 space-y-2">
                                <h3 className="text-xs uppercase tracking-wider text-cinema-orange font-semibold">
                                    The Narrative
                                </h3>
                                <p className="text-sm text-cinema-cream/80 font-light leading-relaxed">
                                    {product.description}
                                </p>
                            </div>
                        )}
                    </section>
                </div>

                {/* Reviews & Ratings Section */}
                <section className="mt-20 pt-16 border-t border-white/10">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <span className="text-xs uppercase tracking-[0.25em] text-cinema-orange font-semibold">
                                Patron Feedback
                            </span>
                            <h2 className="font-serif text-2xl sm:text-3xl text-cinema-cream">
                                Reviews & Experience
                            </h2>
                        </div>
                    </div>

                    <div className="bg-cinema-surface/60 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
                        <RatingCard totalReview={review.reviews.length} />
                        
                        <div className="mt-8 space-y-6">
                            {review.reviews.map((item) => (
                                <div key={item.id} className="space-y-4">
                                    <ProductReviewCard item={item} />
                                    <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />
                                </div>
                            ))}
                            {review.reviews.length > 0 && (
                                <div className="pt-4 flex justify-center">
                                    <button
                                        onClick={() => navigate(`/reviews/${productId}`)}
                                        className="px-6 py-2.5 rounded-full border border-cinema-orange text-cinema-orange text-xs uppercase tracking-wider font-semibold hover:bg-cinema-orange hover:text-white transition-all"
                                    >
                                        View All {review.reviews.length} Reviews
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Similar Products Carousel / Grid */}
                <section className="mt-24 pt-16 border-t border-white/10">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <span className="text-xs uppercase tracking-[0.25em] text-cinema-orange font-semibold">
                                Complete The Look
                            </span>
                            <h2 className="font-serif text-2xl sm:text-3xl text-cinema-cream">
                                Complementary Artifacts
                            </h2>
                        </div>
                    </div>
                    <SmilarProduct />
                </section>
            </div>
        </div>
    );
};

export default ProductDetails;