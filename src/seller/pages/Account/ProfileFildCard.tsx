import { Divider } from '@mui/material';
import React from 'react';

const ProfileFildCard = ({ value, keys }: any) => {
  return (
    <div className="p-4 sm:p-5 flex items-center bg-cinema-surface/70 text-cinema-cream rounded-xl my-2 border border-white/5">
      <p className="w-24 sm:w-36 text-xs uppercase tracking-wider text-cinema-orange font-semibold shrink-0">{keys}</p>
      <Divider orientation="vertical" flexItem sx={{ borderColor: "rgba(255,255,255,0.1)", mx: 2 }} />
      <p className="font-serif text-sm sm:text-base text-cinema-cream truncate">{value || "—"}</p>
    </div>
  );
};

export default ProfileFildCard;