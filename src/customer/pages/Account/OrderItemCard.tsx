import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Order, OrderItem } from '../../../types/orderTypes';
import { formatDate } from '../../util/fomateDate';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

interface OrderItemCardProps {
    item: OrderItem;
    order: Order;
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({ item, order }) => {
    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate(`/account/orders/${order.id}/${item.id}`)}
            className="text-sm bg-cinema-surface border border-white/10 hover:border-cinema-orange/40 rounded-2xl p-5 space-y-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-cinema-orange/5"
        >
            {/* Status Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-cinema-orange/15 border border-cinema-orange/30 flex items-center justify-center text-cinema-orange">
                        <LocalShippingOutlinedIcon sx={{ fontSize: 18 }} />
                    </div>
                    <div>
                        <h4 className="font-semibold text-cinema-orange uppercase tracking-wider text-xs">
                            {order.orderStatus}
                        </h4>
                        <p className="text-xs text-cinema-muted font-light">
                            Estimated delivery: {formatDate(order.deliverDate)}
                        </p>
                    </div>
                </div>
                <span className="text-[11px] text-cinema-muted uppercase tracking-wider font-medium">
                    Order #{order.id}
                </span>
            </div>

            {/* Product Details Box */}
            <div className="p-4 bg-cinema-deep rounded-xl border border-white/5 flex gap-4 items-center">
                <div className="w-16 h-20 rounded-lg overflow-hidden shrink-0 border border-white/10 bg-cinema-surface">
                    <img
                        className="w-full h-full object-cover"
                        src={item.product?.images?.[0] || ""}
                        alt={item.product?.title || "Product"}
                    />
                </div>
                <div className="w-full space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-cinema-orange font-semibold">
                        {item.product?.seller?.businessDetails?.businessName || "Exclusive Studio"}
                    </span>
                    <h3 className="font-serif text-sm text-cinema-cream line-clamp-1 font-medium">
                        {item.product?.title}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-cinema-muted font-light pt-1">
                        <span>Qty: <strong className="text-cinema-cream font-medium">{item.quantity}</strong></span>
                        <span>Size: <strong className="text-cinema-cream font-medium">Standard</strong></span>
                        <span>Price: <strong className="text-cinema-cream font-medium">₹{item.sellingPrice?.toLocaleString()}</strong></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderItemCard;