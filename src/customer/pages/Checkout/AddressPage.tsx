import React, { useState } from 'react';
import PricingCard from '../Cart/PricingCard';
import { Box, Modal, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import AddressForm from './AddresssForm';
import AddressCard from './AddressCard';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { createOrder } from '../../../Redux Toolkit/Customer/OrderSlice';
import { useAppDispatch, useAppSelector } from '../../../Redux Toolkit/Store';

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 560,
    bgcolor: '#191A1E',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '1.25rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
    p: 4,
    outline: 'none',
};

const paymentGatewayList = [
    {
        value: "RAZORPAY",
        image: "https://razorpay.com/newsroom-content/uploads/2020/12/output-onlinepngtools-1-1.png",
        label: "Razorpay Secure"
    },
    {
        value: "STRIPE",
        image: "/stripe_logo.png",
        label: "Stripe Global"
    }
];

const AddressPage = () => {
    const [value, setValue] = React.useState(0);
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(store => store);
    const [paymentGateway, setPaymentGateway] = useState(paymentGatewayList[0].value);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event: any) => {
        setValue(Number(event.target.value));
    };

    const handleCreateOrder = () => {
        if (user.user?.addresses && user.user.addresses[value]) {
            dispatch(createOrder({
                paymentGateway,
                address: user.user?.addresses[value],
                jwt: localStorage.getItem('jwt') || ""
            }));
        } else {
            handleOpen();
        }
    };

    const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentGateway((event.target as HTMLInputElement).value);
    };

    return (
        <div className="min-h-screen bg-cinema-bg text-cinema-cream pb-24">
            {/* Top Checkout Header */}
            <div className="relative py-12 px-6 border-b border-white/10 bg-gradient-to-b from-cinema-deep to-cinema-bg text-center">
                <span className="text-xs uppercase tracking-[0.3em] text-cinema-orange font-semibold">
                    Step 2 of 3 · Logistics
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-cinema-cream mt-1">
                    Shipping & Settlement
                </h1>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left: Saved Addresses & New Address Trigger (7 cols) */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="flex justify-between items-center pb-2 border-b border-white/10">
                            <div>
                                <h3 className="font-serif text-lg text-cinema-cream">Delivery Destination</h3>
                                <p className="text-xs text-cinema-muted font-light">Select where your curated artifacts should be dispatched</p>
                            </div>
                            <button
                                onClick={handleOpen}
                                className="px-4 py-2 rounded-xl bg-cinema-surface border border-white/15 text-cinema-cream text-xs uppercase tracking-wider font-semibold hover:border-cinema-orange hover:text-cinema-orange transition-colors flex items-center gap-1.5"
                            >
                                <AddIcon sx={{ fontSize: 16 }} />
                                Add Address
                            </button>
                        </div>

                        {/* Saved Address Cards */}
                        <div className="space-y-3">
                            {user.user?.addresses && user.user.addresses.length > 0 ? (
                                user.user.addresses.map((item, index) => (
                                    <AddressCard
                                        key={item.id || index}
                                        item={item}
                                        selectedValue={value}
                                        value={index}
                                        handleChange={handleChange}
                                    />
                                ))
                            ) : (
                                <div className="p-8 rounded-2xl bg-cinema-surface/40 border border-dashed border-white/15 text-center space-y-3">
                                    <p className="text-xs text-cinema-muted">No addresses saved yet on your profile.</p>
                                    <button
                                        onClick={handleOpen}
                                        className="px-5 py-2.5 rounded-full bg-cinema-orange text-white text-xs uppercase tracking-wider font-semibold hover:bg-cinema-orangeDark transition-all"
                                    >
                                        Provide First Address
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Add Address Banner */}
                        {user.user?.addresses && user.user.addresses.length > 0 && (
                            <button
                                onClick={handleOpen}
                                className="w-full py-4 rounded-2xl bg-cinema-surface/40 border border-dashed border-white/15 text-cinema-muted hover:text-cinema-cream hover:border-cinema-orange/50 text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all"
                            >
                                <AddIcon sx={{ fontSize: 18, color: "#E87532" }} />
                                <span>Ship to a different address</span>
                            </button>
                        )}
                    </div>

                    {/* Right: Payment Gateway Selection & Summary (5 cols) */}
                    <div className="lg:col-span-5 space-y-6 sticky top-24">
                        {/* Gateway Selection */}
                        <div className="bg-cinema-surface/90 border border-white/10 rounded-2xl p-5 shadow-xl space-y-4">
                            <div>
                                <span className="text-xs uppercase tracking-[0.2em] text-cinema-orange font-semibold">
                                    Settlement Provider
                                </span>
                                <h3 className="font-serif text-base text-cinema-cream mt-0.5">
                                    Encrypted Gateway
                                </h3>
                            </div>

                            <RadioGroup
                                name="payment-gateway"
                                value={paymentGateway}
                                onChange={handlePaymentChange}
                                className="grid grid-cols-2 gap-3"
                            >
                                {paymentGatewayList.map((item) => {
                                    const isChosen = paymentGateway === item.value;
                                    return (
                                        <div
                                            key={item.value}
                                            onClick={() => setPaymentGateway(item.value)}
                                            className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                                                isChosen
                                                    ? "bg-cinema-deep border-cinema-orange shadow-md shadow-cinema-orange/20"
                                                    : "bg-cinema-deep/60 border-white/10 hover:border-white/20"
                                            }`}
                                        >
                                            <div className="h-8 flex items-center justify-center">
                                                <img
                                                    className="max-h-7 object-contain"
                                                    src={item.image}
                                                    alt={item.label}
                                                />
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs text-cinema-cream font-medium">
                                                {isChosen && <CheckCircleIcon sx={{ fontSize: 14, color: "#E87532" }} />}
                                                <span>{item.label}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </RadioGroup>
                        </div>

                        {/* Order Summary Pricing */}
                        <PricingCard />

                        {/* Place Order CTA */}
                        <button
                            onClick={handleCreateOrder}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-cinema-orange to-cinema-orangeDark text-white text-xs uppercase tracking-[0.2em] font-bold shadow-lg shadow-cinema-orange/30 hover:shadow-cinema-orange/50 hover:scale-[1.01] active:scale-[0.99] transition-all"
                        >
                            Authorize & Complete Order
                        </button>
                    </div>
                </div>
            </div>

            {/* Address Modal */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <AddressForm paymentGateway={paymentGateway} handleClose={handleClose} />
                </Box>
            </Modal>
        </div>
    );
};

export default AddressPage;