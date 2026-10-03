import React from "react";
import SellerRoutes from "../../../routes/SellerRoutes";
import Navbar from "../../../admin seller/components/navbar/Navbar";
import SellerDrawerList from "../../components/SideBar/DrawerList";

const SellerDashboard = () => {
  return (
    <div className="min-h-screen bg-cinema-bg text-cinema-cream">
      <Navbar DrawerList={SellerDrawerList} />
      <section className="lg:flex lg:h-[90vh]">
        <div className="hidden lg:block h-full shrink-0">
          <SellerDrawerList />
        </div>
        <div className="p-6 sm:p-10 w-full lg:w-[calc(100%-280px)] overflow-y-auto">
          <SellerRoutes />
        </div>
      </section>
    </div>
  );
};

export default SellerDashboard;

