import React, { useState } from 'react';
import CinematicHero from './CinematicHero';
import HomeCategory from './HomeCategory/HomeCategory';
import TopBrand from './TopBrands/Grid';
import ElectronicCategory from './Electronic Category/ElectronicCategory';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { Backdrop, Button, CircularProgress } from '@mui/material';
import ChatBot from '../ChatBot/ChatBot';
import { useNavigate } from 'react-router-dom';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAppSelector } from '../../../Redux Toolkit/Store';
import DealSlider from './Deals/Deals';

const Home = () => {
    const [showChatBot, setShowChatBot] = useState(false);
    const { homePage } = useAppSelector((store) => store);
    const navigate = useNavigate();

    const handleShowChatBot = () => {
        setShowChatBot(!showChatBot);
    };
    const handleCloseChatBot = () => {
        setShowChatBot(false);
    };
    const becomeSellerClick = () => {
        navigate("/become-seller");
    };

    return (
        <div className="bg-[#101114] text-[#F5F0E8] min-h-screen">
            {!homePage.loading ? (
                <div className="space-y-12 lg:space-y-20 relative">
                    {/* Cinematic Editorial Hero */}
                    <CinematicHero />

                    {/* Flagship Electronics Bar */}
                    <ElectronicCategory />

                    {/* Wedding & Festive Couture Spotlight */}
                    <TopBrand />

                    {/* Time-Sensitive Editorial Deals */}
                    <DealSlider />

                    {/* Shop by Category / Atelier Curations */}
                    <section className="py-16 px-6 lg:px-16 max-w-7xl mx-auto">
                        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
                            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#E87532]">
                                Departments
                            </span>
                            <h2 className="font-editorial text-3xl lg:text-4xl font-bold tracking-tight text-[#F5F0E8]">
                                EXPLORE BY ATELIER
                            </h2>
                            <p className="text-xs text-[#A6A29B] font-light">
                                From haute couture to contemporary living spaces, browse curated universes.
                            </p>
                        </div>
                        <HomeCategory />
                    </section>

                    {/* Full-width Editorial Merchant Showcase Section */}
                    <section className="px-6 lg:px-16 max-w-7xl mx-auto py-8">
                        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#191A1E] via-[#221C19] to-[#2B1B14] border border-white/10 p-8 sm:p-14 lg:p-16 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] flex flex-col lg:flex-row items-center justify-between gap-10">
                            {/* Ambient copper flare */}
                            <div className="absolute top-0 right-0 w-96 h-96 bg-[#E87532]/10 blur-[100px] pointer-events-none rounded-full"></div>

                            <div className="space-y-4 max-w-xl z-10 text-center lg:text-left">
                                <span className="inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-[#E87532] px-3.5 py-1 rounded-full bg-[#E87532]/10 border border-[#E87532]/25">
                                    Merchant Partner Programme
                                </span>
                                <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F0E8] leading-tight">
                                    Showcase Your Craft on <span className="italic font-serif-display text-[#E87532]">Ecommerce Bazar</span>
                                </h2>
                                <p className="text-xs sm:text-sm text-[#A6A29B] font-light leading-relaxed">
                                    Join a premier collective of artisanal creators, renowned brands, and verified suppliers. Enjoy 0% commission introductory tiers, automated payouts, and comprehensive fulfillment analytics.
                                </p>
                                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                    <button
                                        onClick={becomeSellerClick}
                                        className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#E87532] to-[#C95E24] hover:from-[#FF8C4A] hover:to-[#E87532] text-[#F5F0E8] font-semibold text-xs uppercase tracking-[0.14em] shadow-lg hover:shadow-[0_0_30px_rgba(232,117,50,0.5)] transition-all duration-300"
                                    >
                                        <StorefrontIcon sx={{ fontSize: 18 }} />
                                        <span>Launch Seller Hub</span>
                                        <ArrowForwardIcon sx={{ fontSize: 16 }} />
                                    </button>
                                </div>
                            </div>

                            {/* Stylized Metric Showcase Card */}
                            <div className="w-full lg:w-auto grid grid-cols-2 gap-4 z-10">
                                <div className="bg-[#101114]/80 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-center space-y-1">
                                    <p className="font-editorial text-3xl font-bold text-[#E87532]">1.2M+</p>
                                    <p className="text-[11px] uppercase tracking-wider text-[#A6A29B]">Active Patrons</p>
                                </div>
                                <div className="bg-[#101114]/80 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-center space-y-1">
                                    <p className="font-editorial text-3xl font-bold text-[#F5F0E8]">24 Hrs</p>
                                    <p className="text-[11px] uppercase tracking-wider text-[#A6A29B]">Rapid Onboarding</p>
                                </div>
                                <div className="bg-[#101114]/80 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-center space-y-1">
                                    <p className="font-editorial text-3xl font-bold text-[#F5F0E8]">0%</p>
                                    <p className="text-[11px] uppercase tracking-wider text-[#A6A29B]">Day-1 Commission</p>
                                </div>
                                <div className="bg-[#101114]/80 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-center space-y-1">
                                    <p className="font-editorial text-3xl font-bold text-[#E87532]">24/7</p>
                                    <p className="text-[11px] uppercase tracking-wider text-[#A6A29B]">Priority Support</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Floating AI ChatBot Concierge */}
                    <section className="fixed bottom-8 right-8 z-50">
                        {showChatBot ? (
                            <ChatBot handleClose={handleCloseChatBot} />
                        ) : (
                            <button
                                onClick={handleShowChatBot}
                                className="h-14 w-14 rounded-full bg-gradient-to-r from-[#E87532] to-[#C95E24] text-[#F5F0E8] flex justify-center items-center shadow-[0_10px_25px_rgba(232,117,50,0.5)] hover:scale-110 hover:shadow-[0_15px_35px_rgba(232,117,50,0.7)] transition-all duration-300 border border-white/20"
                                title="Open Concierge AI"
                            >
                                <ChatBubbleIcon sx={{ fontSize: "1.6rem" }} />
                            </button>
                        )}
                    </section>
                </div>
            ) : (
                <Backdrop open={true} sx={{ backgroundColor: "rgba(11, 12, 14, 0.9)" }}>
                    <div className="flex flex-col items-center gap-4">
                        <CircularProgress sx={{ color: "#E87532" }} />
                        <p className="font-editorial text-sm tracking-[0.2em] uppercase text-[#F5F0E8]">
                            Curating Experience...
                        </p>
                    </div>
                </Backdrop>
            )}
        </div>
    );
};

export default Home;