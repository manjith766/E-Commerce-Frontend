import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StorefrontIcon from '@mui/icons-material/Storefront';

const Navbar = ({ DrawerList }: any) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: any) => () => {
    setOpen(newOpen);
  };

  return (
    <div className="h-[10vh] flex items-center justify-between px-6 border-b border-white/10 bg-cinema-surface/90 backdrop-blur-md text-cinema-cream sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <IconButton 
          onClick={toggleDrawer(true)} 
          sx={{ color: "#E87532", "&:hover": { backgroundColor: "rgba(232, 117, 50, 0.1)" } }}
        >
          <MenuIcon />
        </IconButton>

        <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer group">
          <span className="w-2.5 h-2.5 rounded-full bg-cinema-orange shadow-glow-orange animate-pulse" />
          <h1 className="logo text-xl tracking-wider text-cinema-cream group-hover:text-cinema-orange transition-colors">
            ECOMMERCE BAZAR
          </h1>
          <span className="text-[10px] tracking-widest uppercase text-cinema-muted ml-1 border-l border-white/10 pl-2">
            Console
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-cinema-muted hover:text-cinema-cream hover:border-cinema-orange text-xs uppercase tracking-wider font-medium transition-all"
        >
          <StorefrontIcon sx={{ fontSize: 16, color: "#E87532" }} />
          <span className="hidden sm:inline">View Storefront</span>
        </button>
      </div>

      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#191A1E",
            borderRight: "1px solid rgba(255, 255, 255, 0.1)"
          }
        }}
      >
        <DrawerList toggleDrawer={toggleDrawer} />
      </Drawer>
    </div>
  );
};

export default Navbar;