import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DealCard from "./DealCard";
import { useAppSelector } from "../../../../Redux Toolkit/Store";
import { Deal } from "../../../../types/dealTypes";
import { demoDeals } from "../../../../mock/data/deals";

export default function DealSlider() {
    const { homePage } = useAppSelector((store) => store);
    const dealsList = homePage.homePageData?.deals?.length 
        ? homePage.homePageData.deals 
        : demoDeals;

    const settings = {
        dots: true,
        infinite: dealsList.length > 5,
        slidesToShow: Math.min(5, dealsList.length),
        slidesToScroll: 1,
        autoplay: true,
        speed: 800,
        autoplaySpeed: 3500,
        cssEase: "cubic-bezier(0.16, 1, 0.3, 1)",
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <section className="py-16 px-6 lg:px-16 bg-gradient-to-b from-[#141518] via-[#101114] to-[#0B0C0E] border-y border-white/5 relative overflow-hidden">
            {/* Ambient Warm Rust Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-gradient-to-r from-[#A64F27]/15 to-[#E87532]/15 blur-[120px] pointer-events-none rounded-full"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div className="space-y-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#E87532]">
                            Time-Sensitive Releases
                        </span>
                        <h2 className="font-editorial text-3xl lg:text-4xl font-bold tracking-tight text-[#F5F0E8]">
                            TODAY'S EDITORIAL DEALS
                        </h2>
                    </div>
                    <p className="text-xs text-[#A6A29B] max-w-sm font-light">
                        Exceptional acquisitions up to 70% off. Limited availability per registered piece.
                    </p>
                </div>

                <div className="slide-container -mx-2">
                    <Slider {...settings}>
                        {dealsList.map((item: Deal, idx: number) => (
                            <div key={item.id || idx} className="outline-none">
                                <DealCard deal={item} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
}