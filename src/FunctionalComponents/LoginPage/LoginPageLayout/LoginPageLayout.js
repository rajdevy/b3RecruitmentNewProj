import React, { useState } from "react";
import OtpVerification from "./VerifyOTP";
import SendOTP from "./SendOTP";
import VerifyOTP from "./VerifyOTP";
import CreatePassword from "./CreatePassword";
import Login from "../Login";
// import Img from '../../../Assets/images/newspaper-jobs-icon.svg'

export default function LoginPageLayout() {
  const [step, setStep] = useState(0);
  const [mobNo, setMobNo] = useState("");
  const [userid, setUserIdd] = useState("");

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleClick = () => {
    setStep(0);
  };
  return (
    <div className="flex justify-center">
      {/* <form onSubmit={handleSubmit} className="flex"> */}
      <div
        className="flex flex-col bg-white border pt-10 border-gray-300 rounded-lg px-12  pb-8 font-sans relative z-10"
        style={{
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)",
        }}
      >
        {step === 0 && <Login setStep={setStep} />}
        {step === 1 && (
          <SendOTP
            nextStep={nextStep}
            setStep={setStep}
            setMobNo={setMobNo}
            setUserIdd={setUserIdd}
          />
        )}
        {step === 2 && <VerifyOTP nextStep={nextStep} mobNo={mobNo} />}
        {step === 3 && <CreatePassword setStep={setStep} userid={userid} />}
        {step === 0 || step === 2 ? null : (
          <h3
            className="mt-12 text-base items-center cursor-pointer font-bold underline "
            onClick={handleClick}
            align="center"
          >
            Back To Login
            {/* <div>
            <img src={Img} alt="img" className="w-6 h-6 "/>
            </div> */}
          </h3>
        )}
      </div>
    </div>
  );
}
