import { Radio } from '@mui/material';
import React from 'react';
import { Address } from '../../../types/userTypes';

interface AddressCardProps {
    value: number;
    selectedValue: number;
    handleChange: (e: any) => void;
    item: Address;
}

const AddressCard: React.FC<AddressCardProps> = ({ value, selectedValue, handleChange, item }) => {
    const isSelected = value === selectedValue;

    return (
        <div 
            onClick={() => handleChange({ target: { value } })}
            className={`p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer ${
                isSelected 
                    ? "bg-cinema-surface border-cinema-orange shadow-lg shadow-cinema-orange/15" 
                    : "bg-cinema-surface/60 border-white/10 hover:border-white/20"
            }`}
        >
            <div className="pt-0.5">
                <Radio
                    checked={isSelected}
                    onChange={handleChange}
                    value={value}
                    name="address-selection"
                    sx={{
                        color: "rgba(255, 255, 255, 0.3)",
                        "&.Mui-checked": { color: "#E87532" },
                        p: 0
                    }}
                />
            </div>

            <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between">
                    <h4 className="font-serif text-base font-medium text-cinema-cream">
                        {item.name}
                    </h4>
                    {isSelected && (
                        <span className="text-[10px] uppercase tracking-widest text-cinema-orange font-bold px-2 py-0.5 rounded-full bg-cinema-orange/15 border border-cinema-orange/30">
                            Deliver Here
                        </span>
                    )}
                </div>
                <p className="text-xs text-cinema-muted leading-relaxed font-light">
                    {item.address}, {item.locality}, {item.city}, {item.state} - {item.pinCode}
                </p>
                <p className="text-xs text-cinema-cream/90 pt-1">
                    <span className="text-cinema-muted">Contact: </span>
                    <span className="font-medium">{item.mobile}</span>
                </p>
            </div>
        </div>
    );
};

export default AddressCard;