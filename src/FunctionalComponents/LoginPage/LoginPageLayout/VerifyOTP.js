import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Lock } from "@mui/icons-material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import axios from "../../../api/apiUrl";

const OTPInput = ({
  otp,
  setOtp,
  borderColor,
  setBorderColor,
  onEnterPressed,
}) => {
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input field if available
    if (element.value !== "" && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
      setBorderColor("#0060B5");
    } else if (e.key === "Enter" && index === 3) {
      onEnterPressed();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("").slice(0, 4);
    setOtp(pasteArray);
    pasteArray.forEach((value, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = value;
      }
    });
  };

  return (
    <div className="flex justify-center space-x-2">
      {otp.map((data, index) => {
        return (
          <input
            key={index}
            type="text"
            maxLength="1"
            style={{
              border: `2px solid ${borderColor}`,
              borderRadius: "0px",
              outlineColor: borderColor,
            }}
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
            className="w-10 h-10 text-center text-lg border border-gray-300 rounded"
            onPaste={handlePaste}
          />
        );
      })}
    </div>
  );
};

function VerifyOTP({ nextStep, mobNo }) {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [borderColor, setBorderColor] = useState("#0060B5");

  const maskMobile = mobNo.slice(0, -4).replace(/\d/g, "*") + mobNo.slice(-4);

  console.log(otp, mobNo);
  const handleClick = () => {
    const otpNo = parseInt(otp.join(""));
    const data = {
      OTP: otpNo,
      MobileNumber: mobNo,
    };
    console.log(data);

    axios.post("Recruiters/ValidateOTP", data).then((res) => {
      if (res.data.IsOTPVerified) {
        toast.success("OTP Verified Successfully");
        nextStep();
      } else {
        toast.error("Invalid OTP");
      }
    });

    // const otpNumber = parseInt(otp.join(''));
    // if(otpNumber === 1234){
    //   toast.success('OTP Verified Successfully');
    //   nextStep();
    // } else {
    //   toast.error('Invalid OTP');
    //   setBorderColor('#FF0000');
    // }
  };

  const handleEnterPressed = () => {
    handleClick();
  };
  const [resendDisabled, setResendDisabled] = useState(true);
  const [resendCooldown, setResendCooldown] = useState(30);
  useEffect(() => {
    const interval = setInterval(() => {
      if (resendCooldown > 0) {
        setResendCooldown((prev) => prev - 1);
      } else {
        setResendDisabled(false);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);
  const handleResendClick = () => {
    if (!resendDisabled) {
      // sendOtp(otpData);
      setResendDisabled(true);
      setResendCooldown(30);
      window.alert("OTP sent successfully !");
    }
  };

  return (
    <div className="w-72">
      <h1 className="font-bold text-center mb-5">
        User Verification
        <PersonSearchIcon className="mb-2 text-2xl text-green-700" />
      </h1>
      <h2 className="text-sm text-center font-semibold">
        Please enter the OTP{" "}
      </h2>
      <h6 className="my-2 text-center" style={{ fontSize: "11px" }}>
        ( A OTP has been sent to {maskMobile} )
      </h6>
      <OTPInput
        otp={otp}
        setOtp={setOtp}
        borderColor={borderColor}
        setBorderColor={setBorderColor}
        onEnterPressed={handleEnterPressed}
      />
      <div className="flex justify-center mt-5">
        <Button
          onClick={handleClick}
          variant="contained"
          sx={{
            backgroundColor: "green",
            "&:hover": { backgroundColor: "darkgreen" },
          }}
          type="submit"
        >
          VERIFY{" "}
          {/* <VerifiedIcon
            size={"small"}
            className="mb-1 ml-2"
            style={{ color: "", fontSize: "16px" }}
          /> */}
        </Button>
      </div>
      <div className="mt-5 text-sm flex">
        <h6>
          <Link
            href="#"
            underline="none"
            onClick={handleResendClick}
            disabled={resendDisabled}
          >
            {resendDisabled ? (
              <>
                Resend in {resendCooldown} seconds
                <Lock fontSize="small" />
              </>
            ) : (
              <>
                Resend Verification Code
                <LockOpenIcon fontSize="small" />
              </>
            )}
          </Link>
        </h6>
        <h1 className="tetx-xl bold mx-2"> | </h1>
        <h6
          className="text-sm items-center cursor-pointer font-bold underline "
          // onClick={handleClick}
          align="center"
        >
          Back To Login
        </h6>
      </div>
    </div>
  );
}

export default VerifyOTP;
