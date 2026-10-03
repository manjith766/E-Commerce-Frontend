import React from 'react';

const ReportCard = ({ value, title, icon }: any) => {
  return (
    <div className="flex gap-4 items-center p-5 w-full bg-cinema-card border border-cinema-border/40 rounded-xl hover:border-cinema-orange/40 transition-all duration-300 shadow-lg">
      <div className="rounded-xl p-3 bg-cinema-orange/10 border border-cinema-orange/20 text-cinema-orange flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="font-editorial text-2xl font-bold text-cinema-text tracking-wide">{value || "$0"}</p>
        <p className="text-xs uppercase tracking-wider text-cinema-muted font-medium mt-0.5">{title}</p>
      </div>
    </div>
  );
};

export default ReportCard;