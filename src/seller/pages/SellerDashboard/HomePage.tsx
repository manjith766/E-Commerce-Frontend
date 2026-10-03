import React, { useEffect } from "react";
import SellingChart from "./SellingChart";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { fetchSellerReport } from "../../../Redux Toolkit/Seller/sellerSlice";
import ReportCard from "./Report/ReportCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AssignmentReturnOutlinedIcon from '@mui/icons-material/AssignmentReturnOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const Chart = [
  { name: "Today", value: "today" },
  { name: "Last 7 days", value: "daily" },
  { name: "Last 12 Months", value: "monthly" },
];

const HomePage = () => {
  const { sellers } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();
  const [chartType, setChartType] = React.useState(Chart[0].value);

  useEffect(() => {
    dispatch(fetchSellerReport(localStorage.getItem("jwt") || ""));
  }, [dispatch]);

  const handleChange = (event: SelectChangeEvent) => {
    setChartType(event.target.value as string);
  };

  return (
    <div className="space-y-8">
      {/* Metric Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <ReportCard
          icon={<AccountBalanceIcon sx={{ fontSize: 24 }} />}
          value={"$" + (sellers.report?.totalEarnings?.toLocaleString() || "0")}
          title={"Total Gross Earnings"}
        />
        <ReportCard
          icon={<ShoppingBagOutlinedIcon sx={{ fontSize: 24 }} />}
          value={sellers.report?.totalSales?.toLocaleString() || "0"}
          title={"Orders Dispatched"}
        />
        <ReportCard
          icon={<AssignmentReturnOutlinedIcon sx={{ fontSize: 24 }} />}
          value={sellers.report?.totalRefunds?.toLocaleString() || "0"}
          title={"Total Returns"}
        />
        <ReportCard
          icon={<CancelOutlinedIcon sx={{ fontSize: 24 }} />}
          value={sellers.report?.canceledOrders?.toLocaleString() || "0"}
          title={"Void / Cancelled"}
        />
      </section>

      {/* Analytics Chart Container */}
      <div className="bg-cinema-card border border-cinema-border/40 rounded-2xl p-6 lg:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 gap-4 border-b border-cinema-border/30">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-cinema-orange font-semibold block mb-1">
              Performance Intelligence
            </span>
            <h2 className="font-editorial text-2xl text-cinema-text">Revenue Trajectory</h2>
          </div>
          
          <div className="w-48">
            <FormControl fullWidth size="small">
              <InputLabel id="chart-type-label" sx={{ color: '#A6A29B', '&.Mui-focused': { color: '#E87532' } }}>
                Timespan
              </InputLabel>
              <Select
                sx={{
                  color: '#F5F0E8',
                  bgcolor: 'rgba(16, 17, 20, 0.6)',
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#E87532',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(232, 117, 50, 0.5)',
                  },
                  '.MuiSvgIcon-root': {
                    color: '#E87532',
                  },
                }}
                labelId="chart-type-label"
                id="chart-type-select"
                value={chartType}
                label="Timespan"
                onChange={handleChange}
              >
                {Chart.map((item) => (
                  <MenuItem key={item.value} value={item.value} sx={{ bgcolor: '#191A1E', color: '#F5F0E8', '&:hover': { bgcolor: '#26282E' } }}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="h-[380px] pt-6">
          <SellingChart chartType={chartType} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
