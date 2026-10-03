import React, { useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';
import { fetchRevenueChart } from '../../../Redux Toolkit/Seller/revenueChartSlice';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-cinema-card border border-cinema-orange/50 p-3 rounded-lg shadow-xl backdrop-blur-md">
        <p className="text-xs uppercase tracking-wider text-cinema-muted font-medium">{label}</p>
        <p className="text-lg font-editorial font-bold text-cinema-orange mt-0.5">
          ${payload[0].value?.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const SellingChart = ({ chartType }: { chartType: string }) => {
  const dispatch = useAppDispatch();
  const { revenueChart } = useAppSelector(store => store);

  useEffect(() => {
    if (chartType) {
      dispatch(fetchRevenueChart({ type: chartType }));
    }
  }, [chartType, dispatch]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={revenueChart.chart}
        margin={{
          top: 15,
          right: 20,
          left: 0,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#E87532" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#E87532" stopOpacity={0.0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.07)" vertical={false} />
        <XAxis
          dataKey="date"
          stroke="#A6A29B"
          fontSize={11}
          tickLine={false}
          axisLine={{ stroke: "rgba(255, 255, 255, 0.1)" }}
        />
        <YAxis
          dataKey="revenue"
          stroke="#A6A29B"
          fontSize={11}
          tickLine={false}
          axisLine={{ stroke: "rgba(255, 255, 255, 0.1)" }}
          tickFormatter={(v) => `$${v}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#E87532"
          strokeWidth={2.5}
          fill="url(#revenueGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SellingChart;