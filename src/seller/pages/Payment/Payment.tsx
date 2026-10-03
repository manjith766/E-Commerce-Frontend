import { Button } from '@mui/material';
import React, { useState } from 'react';
import TransactionTable from './TransactionTable';
import Payouts from './PayoutsTable';
import { useAppSelector } from '../../../Redux Toolkit/Store';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const tab = [
  { name: "Transaction History" },
];

const Payment = () => {
  const [activeTab, setActiveTab] = useState(tab[0].name);
  const { sellers } = useAppSelector((store) => store);

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-cinema-orange font-semibold block mb-1">
          Settlement Treasury
        </span>
        <h1 className="font-editorial text-2xl sm:text-3xl text-cinema-text">Financial Overview & Transactions</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="bg-cinema-card border border-cinema-border/40 p-6 rounded-2xl shadow-xl flex items-center gap-5">
          <div className="p-3.5 rounded-xl bg-cinema-orange/10 border border-cinema-orange/20 text-cinema-orange flex items-center justify-center">
            <CurrencyRupeeIcon sx={{ fontSize: 28 }} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-cinema-muted font-medium">Accumulated Gross Revenue</p>
            <p className="font-editorial text-3xl font-bold text-cinema-text mt-1">
              ₹{(sellers.report?.totalEarnings?.toLocaleString()) || "0"}
            </p>
          </div>
        </div>

        <div className="bg-cinema-card border border-cinema-border/40 p-6 rounded-2xl shadow-xl flex items-center gap-5">
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <AccountBalanceWalletOutlinedIcon sx={{ fontSize: 28 }} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-cinema-muted font-medium">Next Automated Settlement</p>
            <p className="font-editorial text-3xl font-bold text-emerald-400 mt-1">
              Active Cycle
            </p>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <div className="flex gap-3 mb-6">
          {tab.map((item) => (
            <Button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              variant={activeTab === item.name ? "contained" : "outlined"}
              sx={{
                bgcolor: activeTab === item.name ? '#E87532' : 'transparent',
                color: activeTab === item.name ? '#FFFFFF' : '#A6A29B',
                borderColor: activeTab === item.name ? '#E87532' : 'rgba(255, 255, 255, 0.15)',
                fontWeight: 600,
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                px: 3,
                py: '8px',
                '&:hover': {
                  bgcolor: activeTab === item.name ? '#C95E24' : 'rgba(232, 117, 50, 0.1)',
                  borderColor: '#E87532',
                }
              }}
            >
              {item.name}
            </Button>
          ))}
        </div>

        <div>
          {activeTab === "Transaction History" ? <TransactionTable /> : <Payouts />}
        </div>
      </div>
    </div>
  );
};

export default Payment;