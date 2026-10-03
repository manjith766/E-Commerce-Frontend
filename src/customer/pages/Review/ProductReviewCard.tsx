import React from "react";
import { Avatar, IconButton, Rating, Box } from "@mui/material";
import { Review } from "../../../types/reviewTypes";
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from "@mui/material/colors";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { deleteReview } from "../../../Redux Toolkit/Customer/ReviewSlice";

interface ProductReviewCardProps {
  item: Review;
}

const ProductReviewCard = ({ item }: ProductReviewCardProps) => {
  const { user } = useAppSelector(store => store);
  const dispatch = useAppDispatch();
  const handleDeleteReview = () => {
    dispatch(deleteReview({ reviewId: item.id, jwt: localStorage.getItem("jwt") || "" }));
  };

  return (
    <div className="flex justify-between items-start py-3 text-cinema-cream">
      <div className="flex gap-4">
        <Avatar
          sx={{
            width: 48,
            height: 48,
            bgcolor: "#E87532",
            color: "#fff",
            fontFamily: "serif",
            fontWeight: "bold",
            border: "1px solid rgba(255,255,255,0.2)"
          }}
          alt={item.user.fullName}
        >
          {item.user.fullName?.[0]?.toUpperCase() || "P"}
        </Avatar>

        <div className="space-y-2">
          <div>
            <h4 className="font-serif text-base text-cinema-cream font-medium">
              {item.user.fullName}
            </h4>
            <p className="text-xs text-cinema-muted font-light">{item.createdAt}</p>
          </div>

          <Rating
            readOnly
            value={item.rating}
            precision={0.5}
            sx={{
              fontSize: 16,
              "& .MuiRating-iconFilled": { color: "#E87532" },
              "& .MuiRating-iconEmpty": { color: "rgba(255,255,255,0.2)" },
            }}
          />

          <p className="text-sm text-cinema-cream/90 font-light leading-relaxed max-w-2xl">
            {item.reviewText}
          </p>

          {item.productImages?.length > 0 && (
            <div className="flex gap-2 pt-2">
              {item.productImages.map((image, idx) => (
                <img
                  key={idx}
                  className="w-20 h-20 object-cover rounded-xl border border-white/10"
                  src={image}
                  alt={`review-attachment-${idx}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {item.user.id === user.user?.id && (
        <IconButton onClick={handleDeleteReview} sx={{ color: red[400] }}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      )}
    </div>
  );
};

export default ProductReviewCard;

