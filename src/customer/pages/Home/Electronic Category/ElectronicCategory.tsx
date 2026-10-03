import React from "react";
import ElectronicCategoryCard from "./ElectronicCategoryCard";
import { useAppSelector } from "../../../../Redux Toolkit/Store";

const defaultElectronics = [
  { section: "ELECTRIC_CATEGORIES", name: "Laptops", image: "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/x/9/j/-original-imahyjzh7m2zsqdg.jpeg?q=70", categoryId: "laptops" },
  { section: "ELECTRIC_CATEGORIES", name: "Smartphones", image: "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/5/t/j/edge-50-fusion-pb300002in-motorola-original-imahywzrfagkuyxx.jpeg?q=70&crop=false", categoryId: "mobiles" },
  { section: "ELECTRIC_CATEGORIES", name: "Smartwatch", image: "https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/f/g/g/-original-imagywnz46fngcks.jpeg?q=70", categoryId: "smart_watches" },
  { section: "ELECTRIC_CATEGORIES", name: "Audio", image: "https://rukminim2.flixcart.com/image/612/612/kz4gh3k0/headphone/c/v/r/-original-imagb7bmhdgghzxq.jpeg?q=70", categoryId: "headphones_headsets" },
  { section: "ELECTRIC_CATEGORIES", name: "Speakers", image: "https://rukminim2.flixcart.com/image/612/612/xif0q/speaker/6/z/2/-original-imahfgfkr5gkk9aq.jpeg?q=70", categoryId: "speakers" },
  { section: "ELECTRIC_CATEGORIES", name: "Smart TVs", image: "https://rukminim2.flixcart.com/image/312/312/xif0q/television/9/p/9/-original-imah2v29z86u7b79.jpeg?q=70", categoryId: "televisions" },
  { section: "ELECTRIC_CATEGORIES", name: "Cameras", image: "https://rukminim2.flixcart.com/image/312/312/jfbfde80/camera/n/r/n/canon-eos-eos-3000d-dslr-original-imaf3t5h9yuyc5zu.jpeg?q=70", categoryId: "camera" },
];

const ElectronicCategory = () => {
  const { homePage } = useAppSelector((store) => store);
  const items = homePage.homePageData?.electricCategories?.length 
    ? homePage.homePageData.electricCategories 
    : defaultElectronics;

  return (
    <section className="py-8 px-6 lg:px-16 border-y border-white/5 bg-[#0B0C0E]/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#E87532]"></span>
            <h2 className="text-xs uppercase font-bold tracking-[0.2em] text-[#F5F0E8]">
              Flagship Technology & Audio
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-[#E87532] uppercase tracking-wider cursor-pointer hover:underline">
            View All Electronics →
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4 justify-items-center">
          {items.map((item) => (
            <ElectronicCategoryCard key={item.categoryId || item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ElectronicCategory;

