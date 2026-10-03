import { Button, CircularProgress, Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";
import BecomeSellerFormStep1 from "./BecomeSellerFormStep1";
import BecomeSellerFormStep3 from "./BecomeSellerFormStep3";
import BecomeSellerFormStep2 from "./BecomeSellerFormStep2";
import { useFormik } from "formik";
import BecomeSellerFormStep4 from "./BecomeSellerFormStep4";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { createSeller } from "../../../Redux Toolkit/Seller/sellerAuthenticationSlice";

const steps = [
    "Tax & Contact",
    "Studio Logistics",
    "Banking Vault",
    "Merchant Profile",
];

const SellerAccountForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useAppDispatch();
  const { sellerAuth } = useAppSelector(store => store);

  const handleStep = (value: number) => {
    setActiveStep(activeStep + value);
  };

  const [otp, setOpt] = useState<any>();
 
  const formik = useFormik({
    initialValues: {
      mobile: "",
      otp: "",
      gstin: "",
      pickupAddress: {
        name: "",
        mobile: "",
        pincode: "",
        address: "",
        locality: "",
        city: "",
        state: "",
      },
      bankDetails: {
        accountNumber: "",
        ifscCode: "",
        accountHolderName: "",
      },
      sellerName: "",
      email: "",
      businessDetails: {
        businessName: "",
        businessEmail:"",
        businessMobile:"",
        logo:"",
        banner:"",
        businessAddress:""
      },
      password: ""
    },
    onSubmit: (values) => {
      dispatch(createSeller(formik.values));
    },
  });

  const handleOtpChange = (otpValue: string) => {
    setOpt(otpValue);
  };

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  return (
    <div>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          "& .MuiStepLabel-label": {
            color: "#A6A29B",
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            "&.Mui-active": {
              color: "#E87532",
              fontWeight: 700,
            },
            "&.Mui-completed": {
              color: "#F5F0E8",
            }
          },
          "& .MuiStepIcon-root": {
            color: "#26282E",
            "&.Mui-active": {
              color: "#E87532",
            },
            "&.Mui-completed": {
              color: "#E87532",
            }
          },
          "& .MuiStepConnector-line": {
            borderColor: "rgba(255, 255, 255, 0.1)",
          }
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className="mt-8 space-y-8">
        <div className="bg-cinema-dark/50 p-6 rounded-xl border border-cinema-border/30">
          {activeStep === 0 ? (
            <BecomeSellerFormStep1
              formik={formik}
              handleOtpChange={handleOtpChange}
            />
          ) : activeStep === 1 ? (
            <BecomeSellerFormStep2 formik={formik} />
          ) : activeStep === 2 ? (
            <BecomeSellerFormStep3 formik={formik} />
          ) : (
            <BecomeSellerFormStep4 formik={formik} />
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button
            disabled={activeStep === 0}
            onClick={() => handleStep(-1)}
            variant="outlined"
            sx={{
              px: 4,
              py: "10px",
              borderColor: "rgba(255,255,255,0.2)",
              color: "#A6A29B",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontSize: "0.8rem",
              "&:hover": {
                borderColor: "#F5F0E8",
                color: "#F5F0E8",
                bgcolor: "rgba(255,255,255,0.05)"
              },
              "&.Mui-disabled": {
                borderColor: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.2)"
              }
            }}
          >
            Previous
          </Button>

          <Button
            disabled={sellerAuth.loading}
            onClick={
              activeStep === steps.length - 1
                ? handleSubmit
                : () => handleStep(1)
            }
            variant="contained"
            sx={{
              px: 5,
              py: "10px",
              bgcolor: "#E87532",
              color: "#FFFFFF",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              fontSize: "0.8rem",
              "&:hover": {
                bgcolor: "#C95E24",
              }
            }}
          >
            {activeStep === steps.length - 1 ? (
              sellerAuth.loading ? (
                <CircularProgress size={22} sx={{ color: "white" }} />
              ) : (
                "Complete Registration"
              )
            ) : (
              "Next Step"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SellerAccountForm;