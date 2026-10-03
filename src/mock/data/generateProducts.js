// src/mock/data/generateProducts.js
const fs = require('fs');
const path = require('path');

const { menLevelTwo } = require('../../data/category/level two/menLevelTwo.ts');
const { womenLevelTwo } = require('../../data/category/level two/womenLevelTwo.ts');
const { electronicsLevelTwo } = require('../../data/category/level two/electronicsLavelTwo.ts');
const { furnitureLevelTwo } = require('../../data/category/level two/furnitureLevleTwo.ts');

const { menLevelThree } = require('../../data/category/level three/menLevelThree.ts');
const { womenLevelThree } = require('../../data/category/level three/womenLevelThree.ts');
const { electronicsLevelThree } = require('../../data/category/level three/electronicsLevelThree.ts');
const { furnitureLevelThree } = require('../../data/category/level three/furnitureLevelThree.ts');

// Curated high quality Unsplash images by theme
const imagePool = {
  // Men
  men_t_shirts: [
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80'
  ],
  men_shirts: [
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=800&q=80'
  ],
  men_winter: [
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80'
  ],
  men_ethnic: [
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?auto=format&fit=crop&w=800&q=80'
  ],
  men_bottoms: [
    'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=800&q=80'
  ],
  men_footwear: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80'
  ],
  men_accessories: [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
  ],

  // Women
  women_ethnic: [
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
  ],
  women_western: [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80'
  ],
  women_bottoms: [
    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=800&q=80'
  ],
  women_footwear: [
    'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'
  ],
  women_bags: [
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80'
  ],
  women_jewellery: [
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80'
  ],
  women_beauty: [
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80'
  ],

  // Electronics
  mobiles: [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1567581935884-3349723552ca?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80'
  ],
  laptops: [
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80'
  ],
  smart_wearable: [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80'
  ],
  headphones_audio: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80'
  ],
  tablets: [
    'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&w=800&q=80'
  ],
  cameras: [
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'
  ],
  televisions: [
    'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=800&q=80'
  ],
  accessories: [
    'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80'
  ],

  // Furniture & Home
  sofas: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80'
  ],
  beds_linen: [
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80'
  ],
  decor: [
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80'
  ],
  lighting: [
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=800&q=80'
  ],
  kitchen: [
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
  ],
  bath_flooring: [
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80'
  ]
};

function getImageGroup(main, parent, catId) {
  const id = (catId + '_' + parent).toLowerCase();
  if (main === 'men') {
    if (id.includes('t_shirt') || id.includes('polo')) return imagePool.men_t_shirts;
    if (id.includes('shirt')) return imagePool.men_shirts;
    if (id.includes('jacket') || id.includes('sweater') || id.includes('sweatshirt') || id.includes('coat') || id.includes('blazer')) return imagePool.men_winter;
    if (id.includes('kurta') || id.includes('sherwani') || id.includes('ethnic') || id.includes('dhoti') || id.includes('nehru')) return imagePool.men_ethnic;
    if (id.includes('shoe') || id.includes('footwear') || id.includes('sneaker') || id.includes('sandal') || id.includes('boot')) return imagePool.men_footwear;
    if (id.includes('jean') || id.includes('trouser') || id.includes('pant') || id.includes('short') || id.includes('bottom')) return imagePool.men_bottoms;
    return imagePool.men_accessories;
  }
  if (main === 'women') {
    if (id.includes('saree') || id.includes('lehenga') || id.includes('kurti') || id.includes('ethnic') || id.includes('suit') || id.includes('dupatta')) return imagePool.women_ethnic;
    if (id.includes('dress') || id.includes('top') || id.includes('western') || id.includes('jumpsuit') || id.includes('t_shirt')) return imagePool.women_western;
    if (id.includes('shoe') || id.includes('heel') || id.includes('flat') || id.includes('footwear') || id.includes('sandal')) return imagePool.women_footwear;
    if (id.includes('bag') || id.includes('wallet') || id.includes('clutch') || id.includes('handbag')) return imagePool.women_bags;
    if (id.includes('jewel') || id.includes('necklace') || id.includes('earring') || id.includes('bangle') || id.includes('ring')) return imagePool.women_jewellery;
    if (id.includes('beauty') || id.includes('makeup') || id.includes('care') || id.includes('perfume')) return imagePool.women_beauty;
    if (id.includes('jean') || id.includes('trouser') || id.includes('skirt') || id.includes('legging')) return imagePool.women_bottoms;
    return imagePool.women_western;
  }
  if (main === 'electronics') {
    if (id.includes('mobile') || id.includes('phone')) return imagePool.mobiles;
    if (id.includes('laptop') || id.includes('macbook') || id.includes('computer')) return imagePool.laptops;
    if (id.includes('watch') || id.includes('wearable') || id.includes('band')) return imagePool.smart_wearable;
    if (id.includes('headphone') || id.includes('earphone') || id.includes('speaker') || id.includes('audio') || id.includes('theatre')) return imagePool.headphones_audio;
    if (id.includes('tablet') || id.includes('ipad')) return imagePool.tablets;
    if (id.includes('camera') || id.includes('dslr') || id.includes('drone') || id.includes('lens')) return imagePool.cameras;
    if (id.includes('television') || id.includes('tv')) return imagePool.televisions;
    return imagePool.accessories;
  }
  if (main === 'home_furniture' || main === 'furniture') {
    if (id.includes('sofa') || id.includes('chair') || id.includes('living') || id.includes('table')) return imagePool.sofas;
    if (id.includes('bed') || id.includes('linen') || id.includes('mattress') || id.includes('pillow') || id.includes('blanket')) return imagePool.beds_linen;
    if (id.includes('lamp') || id.includes('light') || id.includes('chandelier')) return imagePool.lighting;
    if (id.includes('kitchen') || id.includes('cookware') || id.includes('dining') || id.includes('crockery')) return imagePool.kitchen;
    if (id.includes('bath') || id.includes('floor') || id.includes('carpet') || id.includes('mat')) return imagePool.bath_flooring;
    return imagePool.decor;
  }
  return imagePool.men_t_shirts;
}

const colorPalette = [
  'Navy Blue', 'Classic Black', 'Pure White', 'Slate Grey', 'Olive Green',
  'Crimson Red', 'Royal Blue', 'Emerald Green', 'Charcoal', 'Burgundy',
  'Beige', 'Mustard Yellow', 'Teal', 'Silver Metallic', 'Rose Gold'
];

const brandPrefixes = [
  'Signature', 'Premium', 'Elite', 'Urban', 'Classic',
  'Royal', 'Pro Series', 'Studio Edition', 'Luxury', 'Essential'
];

const featureAdjectives = [
  'High-Performance', 'Ultra-Comfort', 'Handcrafted Designer', 'Smart Ergonomic',
  'Modern Minimalist', 'Eco-Friendly Breathable', 'All-Day Wear', 'Next-Gen Ultra'
];

function getSizes(main, catId) {
  const id = catId.toLowerCase();
  if (main === 'electronics') {
    if (id.includes('mobile') || id.includes('tablet')) return '128GB,256GB,512GB';
    if (id.includes('laptop')) return '8GB/512GB SSD,16GB/1TB SSD,32GB/2TB SSD';
    if (id.includes('watch')) return '40mm,44mm,46mm';
    if (id.includes('tv') || id.includes('television')) return '43 Inch,55 Inch,65 Inch';
    return 'Standard';
  }
  if (main === 'home_furniture' || main === 'furniture') {
    if (id.includes('bed') || id.includes('mattress') || id.includes('linen')) return 'Single,Queen,King';
    if (id.includes('sofa') || id.includes('chair')) return '1-Seater,2-Seater,3-Seater';
    if (id.includes('curtain') || id.includes('carpet') || id.includes('mat')) return 'Standard,Large,XL';
    return 'Free Size';
  }
  if (id.includes('shoe') || id.includes('footwear') || id.includes('sneaker') || id.includes('heel') || id.includes('sandal')) {
    return 'UK 6,UK 7,UK 8,UK 9,UK 10,UK 11';
  }
  if (id.includes('jean') || id.includes('trouser') || id.includes('pant')) {
    return '28,30,32,34,36,38';
  }
  if (id.includes('saree') || id.includes('dupatta') || id.includes('shawl') || id.includes('bag') || id.includes('jewel')) {
    return 'Free Size';
  }
  return 'S,M,L,XL,XXL';
}

function getPriceRange(main, catId) {
  const id = catId.toLowerCase();
  if (main === 'electronics') {
    if (id.includes('laptop')) return { mrpMin: 55000, mrpMax: 149999, discount: [15, 35] };
    if (id.includes('mobile') || id.includes('phone')) return { mrpMin: 18000, mrpMax: 99999, discount: [10, 30] };
    if (id.includes('tv') || id.includes('television')) return { mrpMin: 29999, mrpMax: 119999, discount: [20, 45] };
    if (id.includes('camera')) return { mrpMin: 35000, mrpMax: 125000, discount: [15, 30] };
    if (id.includes('tablet')) return { mrpMin: 22000, mrpMax: 65000, discount: [15, 30] };
    if (id.includes('watch')) return { mrpMin: 4999, mrpMax: 24999, discount: [25, 55] };
    if (id.includes('headphone') || id.includes('speaker') || id.includes('audio')) return { mrpMin: 2999, mrpMax: 18999, discount: [30, 60] };
    return { mrpMin: 999, mrpMax: 3999, discount: [30, 65] };
  }
  if (main === 'home_furniture' || main === 'furniture') {
    if (id.includes('sofa') || id.includes('bed') || id.includes('dining')) return { mrpMin: 24999, mrpMax: 69999, discount: [25, 50] };
    if (id.includes('table') || id.includes('wardrobe') || id.includes('shelf')) return { mrpMin: 9999, mrpMax: 29999, discount: [30, 55] };
    if (id.includes('lamp') || id.includes('light') || id.includes('decor') || id.includes('linen') || id.includes('carpet')) return { mrpMin: 1999, mrpMax: 7999, discount: [35, 65] };
    return { mrpMin: 1299, mrpMax: 4999, discount: [30, 60] };
  }
  // Fashion
  if (id.includes('sherwani') || id.includes('lehenga') || id.includes('suit') || id.includes('blazer')) {
    return { mrpMin: 6999, mrpMax: 24999, discount: [30, 55] };
  }
  if (id.includes('saree') || id.includes('kurta') || id.includes('dress') || id.includes('jacket') || id.includes('jewellery')) {
    return { mrpMin: 2499, mrpMax: 8999, discount: [35, 65] };
  }
  if (id.includes('shoe') || id.includes('footwear') || id.includes('bag') || id.includes('watch') || id.includes('jean')) {
    return { mrpMin: 1999, mrpMax: 5999, discount: [35, 60] };
  }
  return { mrpMin: 999, mrpMax: 2999, discount: [40, 70] };
}

// Map level 2 parent categories
const l2Lookup = {};
const allL2Raw = [
  ...menLevelTwo.map(x => ({ ...x, main: 'men', mainName: 'Men' })),
  ...womenLevelTwo.map(x => ({ ...x, main: 'women', mainName: 'Women' })),
  ...electronicsLevelTwo.map(x => ({ ...x, main: 'electronics', mainName: 'Electronics' })),
  ...furnitureLevelTwo.map(x => ({ ...x, main: 'home_furniture', mainName: 'Home & Furniture' }))
];

allL2Raw.forEach(l2 => {
  l2Lookup[l2.categoryId] = l2;
});

// Fallback L2 for unmapped L3 parents
const fallbackL2 = {
  men_gadgets: { categoryId: 'men_gadgets', name: 'Gadgets', main: 'men', mainName: 'Men', level: 2 },
  men_bags_and_backpacks: { categoryId: 'men_bags_and_backpacks', name: 'Bags & Backpacks', main: 'men', mainName: 'Men', level: 2 },
  women_backpacks_bags_wallets: { categoryId: 'women_handbags_bags_wallets', name: 'Handbags, Bags & Wallets', main: 'women', mainName: 'Women', level: 2 },
  women_handbags_bags_wallets: { categoryId: 'women_handbags_bags_wallets', name: 'Handbags, Bags & Wallets', main: 'women', mainName: 'Women', level: 2 },
  health_care_appliances: { categoryId: 'health_care_appliances', name: 'Health Care Appliances', main: 'electronics', mainName: 'Electronics', level: 2 },
  smart_home_automation: { categoryId: 'smart_home_automation', name: 'Smart Home Automation', main: 'electronics', mainName: 'Electronics', level: 2 },
  network_components: { categoryId: 'network_components', name: 'Network Components', main: 'electronics', mainName: 'Electronics', level: 2 },
  featured: { categoryId: 'featured', name: 'Featured Electronics', main: 'electronics', mainName: 'Electronics', level: 2 },
  storage: { categoryId: 'storage', name: 'Storage & Organisation', main: 'home_furniture', mainName: 'Home & Furniture', level: 2 }
};

Object.keys(fallbackL2).forEach(k => {
  if (!l2Lookup[k]) l2Lookup[k] = fallbackL2[k];
});

// Level 3 list
const allL3 = [
  ...menLevelThree.map(x => ({ ...x, main: 'men', mainName: 'Men' })),
  ...womenLevelThree.map(x => ({ ...x, main: 'women', mainName: 'Women' })),
  ...electronicsLevelThree.map(x => ({ ...x, main: 'electronics', mainName: 'Electronics' })),
  ...furnitureLevelThree.map(x => ({ ...x, main: 'home_furniture', mainName: 'Home & Furniture' }))
];

console.log(`Generating products for ${allL3.length} subcategories...`);

let productIdCounter = 1;
const generatedProducts = [];
const generatedCategories = [
  { id: 1, name: 'Men', categoryId: 'men', level: 1 },
  { id: 2, name: 'Women', categoryId: 'women', level: 1 },
  { id: 3, name: 'Electronics', categoryId: 'electronics', level: 1 },
  { id: 4, name: 'Home & Furniture', categoryId: 'home_furniture', level: 1 },
];

let catIdCounter = 10;
const categoryObjMap = {};

// Register all L2 in category list
Object.values(l2Lookup).forEach(l2 => {
  const mainObj = generatedCategories.find(c => c.categoryId === l2.main);
  const catObj = {
    id: catIdCounter++,
    name: l2.name,
    categoryId: l2.categoryId,
    parentCategory: mainObj,
    level: 2
  };
  categoryObjMap[l2.categoryId] = catObj;
  generatedCategories.push(catObj);
});

// Generate 10 products per subcategory
allL3.forEach((l3, l3Index) => {
  const l2 = l2Lookup[l3.parentCategoryId] || {
    categoryId: l3.parentCategoryId,
    name: l3.parentCategoryName || l3.parentCategoryId,
    main: l3.main,
    mainName: l3.mainName,
    level: 2
  };

  const l2CatObj = categoryObjMap[l2.categoryId] || {
    id: catIdCounter++,
    name: l2.name,
    categoryId: l2.categoryId,
    parentCategory: generatedCategories.find(c => c.categoryId === l3.main),
    level: 2
  };
  if (!categoryObjMap[l2.categoryId]) {
    categoryObjMap[l2.categoryId] = l2CatObj;
    generatedCategories.push(l2CatObj);
  }

  const l3CatObj = {
    id: catIdCounter++,
    name: l3.name,
    categoryId: l3.categoryId,
    parentCategory: l2CatObj,
    level: 3
  };
  categoryObjMap[l3.categoryId] = l3CatObj;
  generatedCategories.push(l3CatObj);

  const imgPool = getImageGroup(l3.main, l3.parentCategoryId, l3.categoryId);
  const priceConfig = getPriceRange(l3.main, l3.categoryId);
  const sizes = getSizes(l3.main, l3.categoryId);

  // Generate exactly 10 products for this subcategory
  for (let i = 0; i < 10; i++) {
    const brand = brandPrefixes[(l3Index * 3 + i) % brandPrefixes.length];
    const adj = featureAdjectives[(l3Index * 2 + i) % featureAdjectives.length];
    const color = colorPalette[(l3Index + i * 2) % colorPalette.length];
    
    // Calculate realistic prices
    const step = (priceConfig.mrpMax - priceConfig.mrpMin) / 10;
    const rawMrp = Math.round(priceConfig.mrpMin + step * i);
    const mrpPrice = Math.round(rawMrp / 50) * 50 - 1; // e.g. 1999, 2499, etc.
    const discPercent = Math.min(75, Math.max(15, Math.round(priceConfig.discount[0] + ((priceConfig.discount[1] - priceConfig.discount[0]) * ((i % 5) / 5)))));
    const sellingPrice = Math.round((mrpPrice * (1 - discPercent / 100)) / 10) * 10 - 1; // e.g. 1299, 1499
    const actualDiscount = Math.round(((mrpPrice - sellingPrice) / mrpPrice) * 100);

    // Multi-image selection from pool
    const img1 = imgPool[i % imgPool.length];
    const img2 = imgPool[(i + 1) % imgPool.length];
    const img3 = imgPool[(i + 2) % imgPool.length];
    const images = Array.from(new Set([img1, img2, img3]));

    const title = `${brand} ${l3.name} - ${adj} (${color})`;
    const description = `Experience top-tier quality with the ${brand} ${l3.name}. Designed with ${adj.toLowerCase()} specifications in stunning ${color}, crafted to deliver premium durability and style.`;

    const product = {
      id: productIdCounter++,
      title,
      description,
      mrpPrice,
      sellingPrice,
      discountPercent: actualDiscount,
      quantity: 20 + ((i * 7) % 35),
      color,
      images,
      numRatings: 3 + (i % 3),
      category: l3CatObj,
      sizes,
      in_stock: true,
      createdAt: `2024-0${1 + (i % 9)}-${10 + (i % 18)}T10:00:00.000Z`
    };

    generatedProducts.push(product);
  }
});

console.log(`Generated ${generatedProducts.length} total products across ${allL3.length} subcategories!`);

// Write to products.ts
const outputFilePath = path.join(__dirname, 'products.ts');

const fileContent = `// src/mock/data/products.ts
// Generated comprehensive catalog with 10 products in every category & subcategory.

import { Product, Category } from '../../types/productTypes';
import { demoSellers } from './users';

const seller1 = demoSellers[0];
const seller2 = demoSellers[1];

export const demoCategories: Category[] = ${JSON.stringify(generatedCategories, null, 2)};

export const demoProducts: Product[] = ${JSON.stringify(generatedProducts, null, 2)}
  .map((p, idx) => ({
    ...p,
    createdAt: new Date(p.createdAt),
    seller: idx % 2 === 0 ? seller1 : seller2
  }));
`;

fs.writeFileSync(outputFilePath, fileContent, 'utf-8');
console.log(`Successfully written to ${outputFilePath} (${(fs.statSync(outputFilePath).size / 1024 / 1024).toFixed(2)} MB)`);
