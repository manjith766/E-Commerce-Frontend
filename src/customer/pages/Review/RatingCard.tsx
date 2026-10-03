import { Avatar, Box, Grid, LinearProgress, Rating } from '@mui/material';
import React from 'react';
import { Review } from '../../../types/reviewTypes';

const RatingCard = ({ totalReview }: any) => {
    return (
        <div className="bg-cinema-surface/80 border border-white/10 p-6 rounded-2xl text-cinema-cream">
            <div className="flex items-center space-x-3 pb-8">
                <Rating
                    name="read-only"
                    value={4.6}
                    precision={0.5}
                    readOnly
                    sx={{
                        "& .MuiRating-iconFilled": { color: "#E87532" },
                        "& .MuiRating-iconEmpty": { color: "rgba(255,255,255,0.2)" },
                    }}
                />
                <span className="text-sm text-cinema-muted uppercase tracking-wider font-medium">
                    {totalReview} Verified Impressions
                </span>
            </div>
            
            <div className="space-y-3">
                {[
                    { label: "Excellent", value: 75, count: 240 },
                    { label: "Very Good", value: 50, count: 85 },
                    { label: "Good", value: 30, count: 20 },
                    { label: "Average", value: 15, count: 9 },
                    { label: "Poor", value: 5, count: 4 },
                ].map((tier, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-xs">
                        <span className="w-20 text-cinema-muted font-light">{tier.label}</span>
                        <div className="flex-1">
                            <LinearProgress
                                sx={{
                                    bgcolor: "rgba(255, 255, 255, 0.08)",
                                    borderRadius: 4,
                                    height: 6,
                                    "& .MuiLinearProgress-bar": {
                                        backgroundColor: idx < 2 ? "#E87532" : idx < 3 ? "#C95E24" : "rgba(255,255,255,0.3)",
                                    }
                                }}
                                variant="determinate"
                                value={tier.value}
                            />
                        </div>
                        <span className="w-12 text-right text-cinema-muted">{tier.count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RatingCard;