import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useState } from "react";
import { colors } from "../../../data/Filter/color";
import { price } from "../../../data/Filter/price";
import { discount } from "../../../data/Filter/discount";
import { useSearchParams } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const FilterSection = () => {
  const [expendColor, setExpendColor] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleExpendColor = () => {
    setExpendColor(!expendColor);
  };

  const updateFilterParams = (e: any) => {
    const { value, name } = e.target;
    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }
    setSearchParams(searchParams);
  };

  const clearAllFilters = () => {
    searchParams.forEach((_: any, key: any) => {
      searchParams.delete(key);
    });
    setSearchParams(searchParams);
  };

  return (
    <div className="space-y-6 bg-cinema-surface/90 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl text-cinema-cream">
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <FilterListIcon sx={{ color: "#E87532", fontSize: 20 }} />
          <h2 className="font-serif text-lg tracking-wide text-cinema-cream">Filters</h2>
        </div>
        <button
          onClick={clearAllFilters}
          className="text-xs font-medium uppercase tracking-wider text-cinema-orange hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
        >
          <RestartAltIcon sx={{ fontSize: 16 }} />
          Clear All
        </button>
      </div>

      {/* Color Filter */}
      <div className="space-y-3">
        <FormControl component="fieldset" className="w-full">
          <FormLabel
            sx={{
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#E87532 !important",
              mb: 1.5,
            }}
          >
            Color Palette
          </FormLabel>
          <RadioGroup
            onChange={updateFilterParams}
            name="color"
            value={searchParams.get("color") || ""}
          >
            {colors
              .slice(0, expendColor ? colors.length : 6)
              .map((item) => (
                <FormControlLabel
                  key={item.name}
                  value={item.name}
                  control={
                    <Radio
                      size="small"
                      sx={{
                        color: "rgba(245, 240, 232, 0.3)",
                        "&.Mui-checked": { color: "#E87532" },
                      }}
                    />
                  }
                  label={
                    <div className="flex items-center gap-3">
                      <span
                        style={{ backgroundColor: item.hex }}
                        className="h-4 w-4 rounded-full border border-white/30 shadow-inner"
                      />
                      <span className="text-sm text-cinema-cream font-light">
                        {item.name}
                      </span>
                    </div>
                  }
                />
              ))}
          </RadioGroup>
        </FormControl>
        <div>
          <button
            onClick={handleExpendColor}
            className="text-xs uppercase tracking-wider text-cinema-orange hover:text-white transition-colors cursor-pointer pt-1"
          >
            {expendColor ? "− Show Less" : `+ ${colors.length - 6} More`}
          </button>
        </div>
      </div>

      <div className="border-t border-white/5 pt-4">
        {/* Price Filter */}
        <FormControl component="fieldset" className="w-full">
          <FormLabel
            sx={{
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#E87532 !important",
              mb: 1.5,
            }}
          >
            Price Range
          </FormLabel>
          <RadioGroup
            name="price"
            onChange={updateFilterParams}
            value={searchParams.get("price") || ""}
          >
            {price.map((item) => (
              <FormControlLabel
                key={item.name}
                value={item.value}
                control={
                  <Radio
                    size="small"
                    sx={{
                      color: "rgba(245, 240, 232, 0.3)",
                      "&.Mui-checked": { color: "#E87532" },
                    }}
                  />
                }
                label={
                  <span className="text-sm text-cinema-cream font-light">
                    {item.name}
                  </span>
                }
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>

      <div className="border-t border-white/5 pt-4">
        {/* Discount Filter */}
        <FormControl component="fieldset" className="w-full">
          <FormLabel
            sx={{
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#E87532 !important",
              mb: 1.5,
            }}
          >
            Minimum Discount
          </FormLabel>
          <RadioGroup
            name="discount"
            onChange={updateFilterParams}
            value={searchParams.get("discount") || ""}
          >
            {discount.map((item) => (
              <FormControlLabel
                key={item.name}
                value={item.value}
                control={
                  <Radio
                    size="small"
                    sx={{
                      color: "rgba(245, 240, 232, 0.3)",
                      "&.Mui-checked": { color: "#E87532" },
                    }}
                  />
                }
                label={
                  <span className="text-sm text-cinema-cream font-light">
                    {item.name}
                  </span>
                }
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default FilterSection;

