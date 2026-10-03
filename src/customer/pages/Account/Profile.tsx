import { Alert, Divider, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Order from './Order';
import UserDetails from './UserDetails';
import SavedCards from './SavedCards';
import OrderDetails from './OrderDetails';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { performLogout } from '../../../Redux Toolkit/Customer/AuthSlice';
import Addresses from './Adresses';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

const menu = [
    { name: "My Orders", path: "/account/orders", icon: <ShoppingBagOutlinedIcon sx={{ fontSize: 18 }} /> },
    { name: "Patron Profile", path: "/account/profile", icon: <PersonOutlineIcon sx={{ fontSize: 18 }} /> },
    { name: "Saved Cards", path: "/account/saved-card", icon: <CreditCardIcon sx={{ fontSize: 18 }} /> },
    { name: "Shipping Addresses", path: "/account/addresses", icon: <LocationOnOutlinedIcon sx={{ fontSize: 18 }} /> },
    { name: "Sign Out", path: "/", icon: <LogoutIcon sx={{ fontSize: 18 }} /> }
];

const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { user, orders } = useAppSelector(store => store);
    const [snackbarOpen, setOpenSnackbar] = useState(false);

    const handleLogout = () => {
        dispatch(performLogout());
        navigate("/");
    };

    const handleClick = (item: any) => {
        if (item.name === "Sign Out") {
            handleLogout();
        } else {
            navigate(`${item.path}`);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    useEffect(() => {
        if (user.profileUpdated || orders.orderCanceled || user.error) {
            setOpenSnackbar(true);
        }
    }, [user.profileUpdated, orders.orderCanceled, user.error]);

    return (
        <div className="min-h-screen bg-cinema-bg text-cinema-cream pb-24">
            {/* Header Banner */}
            <div className="relative py-12 px-6 border-b border-white/10 bg-gradient-to-b from-cinema-deep to-cinema-bg text-center">
                <span className="text-xs uppercase tracking-[0.3em] text-cinema-orange font-semibold">
                    Client Concierge
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-cinema-cream mt-1 font-normal">
                    {user.user?.fullName || "Patron Account"}
                </h1>
                <p className="text-xs text-cinema-muted mt-1 font-light">
                    {user.user?.email || "Manage your orders and personal credentials"}
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Navigation Sidebar (3 cols) */}
                    <div className="lg:col-span-3 space-y-2 bg-cinema-surface/70 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
                        {menu.map((item) => {
                            const isActive = location.pathname === item.path || 
                                (item.path === "/account/profile" && location.pathname === "/account");
                            return (
                                <button
                                    key={item.name}
                                    onClick={() => handleClick(item)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all text-left ${
                                        isActive
                                            ? "bg-cinema-orange text-white shadow-md shadow-cinema-orange/30 font-bold"
                                            : "text-cinema-muted hover:text-cinema-cream hover:bg-white/5"
                                    }`}
                                >
                                    <span className={isActive ? "text-white" : "text-cinema-orange"}>
                                        {item.icon}
                                    </span>
                                    <span>{item.name}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Content Panel (9 cols) */}
                    <div className="lg:col-span-9 bg-cinema-surface/50 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
                        <Routes>
                            <Route path="/" element={<UserDetails />} />
                            <Route path="/orders" element={<Order />} />
                            <Route path="/orders/:orderId/:orderItemId" element={<OrderDetails />} />
                            <Route path="/profile" element={<UserDetails />} />
                            <Route path="/saved-card" element={<SavedCards />} />
                            <Route path="/addresses" element={<Addresses />} />
                        </Routes>
                    </div>
                </div>
            </div>

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={user.error ? "error" : "success"}
                    variant="filled"
                    sx={{ width: "100%", bgcolor: user.error ? "#842029" : "#191A1E", color: "#F5F0E8", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                    {user.error ? user.error : orders.orderCanceled ? "Order cancelled successfully" : "Profile credentials updated"}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Profile;