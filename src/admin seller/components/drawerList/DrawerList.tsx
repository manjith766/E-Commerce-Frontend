import * as React from "react";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../Redux Toolkit/Store";
import { performLogout } from "../../../Redux Toolkit/Customer/AuthSlice";

export interface Menu {
    name: string;
    path: string;
    icon: React.ReactElement<any>;
    activeIcon: React.ReactElement<any>;
}

interface DrawerListProps {
    toggleDrawer?: any;
    menu: Menu[];
    menu2: Menu[];
}

const DrawerList = ({ toggleDrawer, menu, menu2 }: DrawerListProps) => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(performLogout());
    };

    const handleClick = (item: any) => () => {
        if (item.name === "Logout") {
            handleLogout();
        }
        navigate(item.path);
        if (toggleDrawer) toggleDrawer(false)();
    };

    return (
        <div className="h-full bg-cinema-surface text-cinema-cream">
            <div className="flex flex-col justify-between h-full w-[280px] border-r border-white/10 py-6">
                <div>
                    {/* Brand Pill in Sidebar */}
                    <div className="px-6 pb-6 mb-4 border-b border-white/10">
                        <span className="text-[10px] uppercase tracking-[0.25em] text-cinema-orange font-semibold">
                            Operational Hub
                        </span>
                        <h3 className="font-serif text-lg text-cinema-cream font-medium">
                            Atelier Console
                        </h3>
                    </div>

                    <div className="space-y-1.5 px-3">
                        {menu.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <div
                                    key={item.name}
                                    onClick={handleClick(item)}
                                    className="cursor-pointer"
                                >
                                    <div
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
                                            isActive
                                                ? "bg-cinema-orange text-white shadow-lg shadow-cinema-orange/25 font-bold"
                                                : "text-cinema-muted hover:text-cinema-cream hover:bg-white/5"
                                        }`}
                                    >
                                        <div className={isActive ? "text-white" : "text-cinema-orange"}>
                                            {isActive ? item.activeIcon : item.icon}
                                        </div>
                                        <span>{item.name}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="space-y-4 px-3">
                    <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />
                    <div className="space-y-1.5">
                        {menu2.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <div
                                    onClick={handleClick(item)}
                                    className="cursor-pointer"
                                    key={item.name}
                                >
                                    <div
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
                                            isActive
                                                ? "bg-cinema-orange text-white shadow-lg shadow-cinema-orange/25 font-bold"
                                                : "text-cinema-muted hover:text-cinema-cream hover:bg-white/5"
                                        }`}
                                    >
                                        <div className={isActive ? "text-white" : "text-cinema-orange"}>
                                            {isActive ? item.activeIcon : item.icon}
                                        </div>
                                        <span>{item.name}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DrawerList;

