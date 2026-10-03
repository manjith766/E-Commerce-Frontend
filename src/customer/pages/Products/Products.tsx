import React, { ChangeEvent, useEffect, useState } from "react";
import ProductCard from "./ProductCard/ProductCard";
import FilterSection from "./FilterSection";
import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  useMediaQuery,
  useTheme,
  Drawer,
} from "@mui/material";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { getAllProducts } from "../../../Redux Toolkit/Customer/ProductSlice";

const Products = () => {
  const [sort, setSort] = React.useState("");
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [showFilter, setShowFilter] = useState(false);
  const { categoryId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { products } = useAppSelector((store) => store);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const handleSortProduct = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };

  const handleShowFilter = () => {
    setShowFilter((prev) => !prev);
  };

  const handlePageChange = (value: any) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const [minPrice, maxPrice] = searchParams.get("price")?.split("-") || [];
    const newFilters = {
      brand: searchParams.get("brand") || "",
      color: searchParams.get("color") || "",
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      pageNumber: page - 1,
      minDiscount: searchParams.get("discount")
        ? Number(searchParams.get("discount"))
        : undefined,
    };

    dispatch(getAllProducts({ category: categoryId, sort, ...newFilters }));
  }, [searchParams, categoryId, sort, page]);

  const categoryTitle = categoryId
    ? categoryId
        .split("_")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "All Collections";

  return (
    <div className="min-h-screen bg-cinema-bg text-cinema-cream pb-20">
      {/* Category Editorial Hero Banner */}
      <div className="relative py-14 px-6 sm:px-12 border-b border-white/10 bg-gradient-to-b from-cinema-deep via-cinema-surface/60 to-cinema-bg overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-cinema-orange/10 blur-[100px] pointer-events-none rounded-full" />
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10 space-y-3">
          <span className="text-xs uppercase tracking-[0.3em] text-cinema-orange font-medium">
            Curated Catalog
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-cinema-cream">
            {categoryTitle}
          </h1>
          <p className="text-sm text-cinema-muted max-w-xl font-light">
            Meticulously crafted essentials designed for timeless distinction and effortless elegance.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="lg:flex gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-[280px] shrink-0 sticky top-24">
            <FilterSection />
          </aside>

          {/* Main Content Area */}
          <main className="w-full flex-1 space-y-6">
            {/* Top Toolbar: Mobile Filter + Count + Sort */}
            <div className="flex justify-between items-center bg-cinema-surface/70 border border-white/10 rounded-2xl px-5 py-3 backdrop-blur-md">
              <div className="flex items-center gap-3">
                {!isLarge && (
                  <button
                    onClick={handleShowFilter}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cinema-orange/15 border border-cinema-orange/30 text-cinema-orange text-xs font-semibold uppercase tracking-wider hover:bg-cinema-orange hover:text-white transition-all"
                  >
                    <FilterAltIcon sx={{ fontSize: 16 }} />
                    Filter
                  </button>
                )}
                <span className="text-xs text-cinema-muted tracking-wider uppercase font-medium">
                  {products.products?.length || 0} Artifacts Found
                </span>
              </div>

              {/* Sort Control */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-cinema-muted hidden sm:inline-block uppercase tracking-wider font-medium">
                  Sort By:
                </span>
                <FormControl size="small" sx={{ minWidth: 160 }}>
                  <Select
                    value={sort}
                    displayEmpty
                    onChange={handleSortProduct}
                    sx={{
                      backgroundColor: "rgba(16, 17, 20, 0.8)",
                      color: "#F5F0E8",
                      fontSize: "13px",
                      borderRadius: "0.75rem",
                      border: "1px solid rgba(255, 255, 255, 0.12)",
                      "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                      "& .MuiSvgIcon-root": { color: "#E87532" },
                    }}
                  >
                    <MenuItem value="">Featured</MenuItem>
                    <MenuItem value="price_low">Price: Low to High</MenuItem>
                    <MenuItem value="price_high">Price: High to Low</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            {/* Products Grid */}
            {products.products?.length > 0 ? (
              <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
                {products.products.map((item: any, index: number) => (
                  <div key={item.id || index} className="w-full">
                    <ProductCard item={item} />
                  </div>
                ))}
              </section>
            ) : (
              /* Editorial Empty State */
              <section className="flex flex-col items-center justify-center py-24 px-4 bg-cinema-surface/40 border border-white/10 rounded-3xl text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-cinema-orange/10 border border-cinema-orange/30 flex items-center justify-center text-cinema-orange shadow-glow-orange/20">
                  <Inventory2OutlinedIcon sx={{ fontSize: 40 }} />
                </div>
                <h3 className="font-serif text-2xl text-cinema-cream font-medium">
                  No Artifacts Found
                </h3>
                <p className="text-sm text-cinema-muted max-w-md font-light">
                  We could not find any products matching your selected criteria in this collection.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => navigate("/")}
                    className="px-6 py-2.5 rounded-full bg-cinema-orange text-white text-xs uppercase tracking-widest font-semibold hover:bg-cinema-orangeDark transition-colors shadow-lg shadow-cinema-orange/20"
                  >
                    Return to Collections
                  </button>
                </div>
              </section>
            )}

            {/* Pagination */}
            {products?.totalPages > 1 && (
              <div className="flex justify-center pt-10">
                <Pagination
                  page={page}
                  onChange={(_, value) => handlePageChange(value)}
                  count={products.totalPages}
                  shape="rounded"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color: "#F5F0E8",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      backgroundColor: "rgba(25, 26, 30, 0.8)",
                      fontSize: "13px",
                      "&:hover": {
                        backgroundColor: "#E87532",
                        color: "#fff",
                      },
                    },
                    "& .Mui-selected": {
                      backgroundColor: "#E87532 !important",
                      color: "#fff !important",
                      fontWeight: "bold",
                    },
                  }}
                />
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="left"
        open={showFilter && !isLarge}
        onClose={handleShowFilter}
        PaperProps={{
          sx: {
            backgroundColor: "#101114",
            width: "85%",
            maxWidth: "340px",
            p: 2,
            borderRight: "1px solid rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        <div className="flex justify-between items-center mb-4 px-2">
          <span className="font-serif text-lg text-cinema-cream">Filters</span>
          <IconButton onClick={handleShowFilter} sx={{ color: "#F5F0E8" }}>
            <CloseIcon />
          </IconButton>
        </div>
        <FilterSection />
      </Drawer>
    </div>
  );
};

export default Products;

