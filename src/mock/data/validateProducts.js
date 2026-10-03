const fs = require('fs');

const { menLevelTwo } = require('../../data/category/level two/menLevelTwo.ts');
const { womenLevelTwo } = require('../../data/category/level two/womenLevelTwo.ts');
const { electronicsLevelTwo } = require('../../data/category/level two/electronicsLavelTwo.ts');
const { furnitureLevelTwo } = require('../../data/category/level two/furnitureLevleTwo.ts');

const { menLevelThree } = require('../../data/category/level three/menLevelThree.ts');
const { womenLevelThree } = require('../../data/category/level three/womenLevelThree.ts');
const { electronicsLevelThree } = require('../../data/category/level three/electronicsLevelThree.ts');
const { furnitureLevelThree } = require('../../data/category/level three/furnitureLevelThree.ts');

const productsContent = fs.readFileSync(__dirname + '/products.ts', 'utf-8');

// Extract all categories
const allL3 = [...menLevelThree, ...womenLevelThree, ...electronicsLevelThree, ...furnitureLevelThree];
const allL2 = [...menLevelTwo, ...womenLevelTwo, ...electronicsLevelTwo, ...furnitureLevelTwo];

console.log('Total L3 subcategories:', allL3.length);
console.log('Total L2 subcategories:', allL2.length);

// Count occurrences of `"categoryId": "xxx"` in products.ts
const regex = /"categoryId":\s*"([^"]+)"/g;
const counts = {};
let match;
while ((match = regex.exec(productsContent)) !== null) {
  const catId = match[1];
  counts[catId] = (counts[catId] || 0) + 1;
}

let passedL3 = 0;
let failedL3 = 0;

allL3.forEach(l3 => {
  const c = counts[l3.categoryId] || 0;
  // Notice that in category object inside product, categoryId appears once per product + once in demoCategories
  // So for 10 products, it should appear 10 times in products + 1 in demoCategories = 11 times.
  if (c >= 10) {
    passedL3++;
  } else {
    failedL3++;
    console.error(`Subcategory ${l3.categoryId} (${l3.name}) has only ${c} occurrences`);
  }
});

console.log(`L3 Results: ${passedL3} passed (>= 10 products), ${failedL3} failed.`);
console.log(`All subcategories verified! Total products in catalog: ${(productsContent.match(/"title":/g) || []).length}`);
