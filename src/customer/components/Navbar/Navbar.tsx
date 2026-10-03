import {
  Avatar,
  Badge,
  Box,
  Button,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import "./Navbar.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { mainCategory } from "../../../data/category/mainCategory";
import CategorySheet from "./CategorySheet";
import DrawerList from "./DrawerList";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { FavoriteBorder } from "@mui/icons-material";

const Navbar = () => {
  const [showSheet, setShowSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("men");
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const dispatch = useAppDispatch();
  const { user, cart, sellers } = useAppSelector((store) => store);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const becomeSellerClick = () => {
    if (sellers.profile?.id) {
      navigate("/seller");
    } else navigate("/become-seller");
  };

  return (
    <Box
      sx={{ zIndex: 1200 }}
      className="sticky top-0 left-0 right-0 bg-[#101114]/90 backdrop-blur-md border-b border-white/10 transition-all duration-300"
    >
      <div className="flex items-center justify-between px-5 lg:px-16 h-[74px]">
        {/* Brand & Left Categories */}
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
            {!isLarge && (
              <IconButton onClick={() => toggleDrawer(true)()} sx={{ color: "#F5F0E8" }}>
                <MenuIcon sx={{ fontSize: 26 }} />
              </IconButton>
            )}
            <div
              onClick={() => navigate("/")}
              className="cursor-pointer flex items-baseline gap-1 group"
            >
              <h1 className="logo text-xl md:text-2xl text-[#F5F0E8] font-bold tracking-[0.12em] group-hover:text-[#E87532] transition-colors">
                ECOMMERCE BAZAR
              </h1>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E87532] inline-block ml-0.5 animate-pulse"></span>
            </div>
          </div>

          {isLarge && (
            <ul className="flex items-center gap-1 text-sm font-medium tracking-[0.1em] text-[#F5F0E8]/75">
              {mainCategory.map((item) => (
                <li
                  key={item.categoryId}
                  onMouseLeave={() => setShowSheet(false)}
                  onMouseEnter={() => {
                    setSelectedCategory(item.categoryId);
                    setShowSheet(true);
                  }}
                  className={`relative cursor-pointer h-[74px] px-4 flex items-center transition-all duration-200 uppercase text-xs font-semibold hover:text-[#E87532] ${
                    selectedCategory === item.categoryId && showSheet ? "text-[#E87532]" : ""
                  }`}
                >
                  <span>{item.name}</span>
                  {selectedCategory === item.categoryId && showSheet && (
                    <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-[#E87532] to-[#C95E24]"></span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex gap-2 lg:gap-4 items-center">
          <IconButton
            onClick={() => navigate("/search-products")}
            sx={{
              color: "#F5F0E8",
              backgroundColor: "rgba(245, 240, 232, 0.04)",
              border: "1px solid rgba(245, 240, 232, 0.08)",
              "&:hover": { backgroundColor: "rgba(232, 117, 50, 0.15)", color: "#E87532" },
            }}
          >
            <SearchIcon sx={{ fontSize: 21 }} />
          </IconButton>

          <IconButton
            onClick={() => navigate("/wishlist")}
            sx={{
              color: "#F5F0E8",
              backgroundColor: "rgba(245, 240, 232, 0.04)",
              border: "1px solid rgba(245, 240, 232, 0.08)",
              "&:hover": { backgroundColor: "rgba(232, 117, 50, 0.15)", color: "#E87532" },
            }}
          >
            <FavoriteBorder sx={{ fontSize: 21 }} />
          </IconButton>

          <IconButton
            onClick={() => navigate("/cart")}
            sx={{
              color: "#F5F0E8",
              backgroundColor: "rgba(245, 240, 232, 0.04)",
              border: "1px solid rgba(245, 240, 232, 0.08)",
              "&:hover": { backgroundColor: "rgba(232, 117, 50, 0.15)", color: "#E87532" },
            }}
          >
            <Badge
              badgeContent={cart.cart?.cartItems?.length || 0}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#E87532",
                  color: "#F5F0E8",
                  fontWeight: 700,
                  fontSize: "11px",
                },
              }}
            >
              <AddShoppingCartIcon sx={{ fontSize: 21 }} />
            </Badge>
          </IconButton>

          {user.user ? (
            <Button
              onClick={() => navigate("/account/orders")}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                color: "#F5F0E8",
                backgroundColor: "rgba(245, 240, 232, 0.06)",
                border: "1px solid rgba(245, 240, 232, 0.1)",
                borderRadius: "30px",
                padding: "6px 14px",
                "&:hover": { borderColor: "#E87532", backgroundColor: "rgba(232, 117, 50, 0.1)" },
              }}
            >
              <Avatar
                sx={{
                  width: 26,
                  height: 26,
                  border: "1px solid #E87532",
                  bgcolor: "#E87532",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                {user.user?.fullName?.charAt(0) || "U"}
              </Avatar>
              <span className="font-medium text-xs tracking-wider hidden lg:block text-[#F5F0E8]">
                {user.user?.fullName?.split(" ")[0]}
              </span>
            </Button>
          ) : (
            <Button
              variant="contained"
              startIcon={<AccountCircleIcon sx={{ fontSize: "16px" }} />}
              onClick={() => navigate("/login")}
              sx={{
                background: "linear-gradient(135deg, #E87532 0%, #C95E24 100%)",
                borderRadius: "30px",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                padding: "7px 18px",
              }}
            >
              Sign In
            </Button>
          )}

          {isLarge && (
            <Button
              onClick={becomeSellerClick}
              startIcon={<StorefrontIcon sx={{ fontSize: "16px" }} />}
              variant="outlined"
              sx={{
                borderColor: "rgba(245, 240, 232, 0.2)",
                color: "#F5F0E8",
                borderRadius: "30px",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                padding: "7px 18px",
                "&:hover": {
                  borderColor: "#E87532",
                  color: "#E87532",
                  backgroundColor: "rgba(232, 117, 50, 0.08)",
                },
              }}
            >
              Seller Hub
            </Button>
          )}
        </div>
      </div>

      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#101114",
            color: "#F5F0E8",
            borderRight: "1px solid rgba(245, 240, 232, 0.1)",
          },
        }}
      >
        <DrawerList toggleDrawer={toggleDrawer} />
      </Drawer>

      {showSheet && selectedCategory && (
        <div
          onMouseLeave={() => setShowSheet(false)}
          onMouseEnter={() => setShowSheet(true)}
          className="categorySheet absolute top-[74px] left-0 right-0 shadow-2xl"
        >
          <CategorySheet
            setShowSheet={setShowSheet}
            selectedCategory={selectedCategory}
          />
        </div>
      )}
    </Box>
  );
};

export default Navbar;

