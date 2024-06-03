import React, { useState } from "react";
import { Button } from "antd";
import ErrorIcon from "@mui/icons-material/Error";
import LoginIcon from "@mui/icons-material/Login";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import axios from "../../../api/apiUrl";

export default function SendOTP({ nextStep, setMobNo, setUserIdd }) {
  const [UserId, setUserId] = useState("");
  // const handleForm = (e) => {
  //   e.preventDefault();
  //   if (userId == 1234) {
  //     // fetchData();
  //     toast.info('OTP sent to your registered mobile number')
  //     nextStep();
  //   }
  //   else {
  //     toast.error('Invalid UserId')
  //   }
  // }
  const onChange = (e) => {
    setUserId(e.target.value);
    setUserIdd(e.target.value);
  };

  // const fetchData = async () => {
  //   // setLoading(true);
  //   try {
  //     const response = await axios.get('https://api.example.com/data');

  //     if (!response.data) {
  //       throw new Error('No data found');
  //     }

  //     setData(response.data);
  //     // setLoading(false);
  //   } catch (error) {
  //     setError(error.message);
  //     // setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const handleSubmit = async (event) => {
    console.log(UserId);

    debugger;
    event.preventDefault();
    // setLoading(true);
    // try {
    //    axios.post("Recruiters/GetUserMobileNumber", UserId)
    //   // const response = await axios.post(
    //   //   "Recruiters/GetUserMobileNumber",
    //   //   UserId
    //   // );

    //   if (!response.data) {
    //     throw new Error("No data received");
    //   }

    //   // setResponseData(response.data);
    //   // setLoading(false);
    // } catch (error) {
    //   // setError(error.message);
    //   // setLoading(false);
    // }

    axios.post("Recruiters/GetUserMobileNumber", { UserId }).then((res) => {
      console.log(res.data.StatusMessage);
      const mobno = res.data.MobileNumber;
      if (res.data.StatusMessage === "UserId not found") {
        toast.error("UserId is Invalid");
      } else {
        sendotp(mobno);
        setMobNo(mobno);
      }
    });
  };

  const sendotp = (MobileNumber) => {
    axios.post("Recruiters/SaveandSendOTP", { MobileNumber }).then((res) => {
      nextStep();
      console.log(res.data.StatusMessage);
      const mobno = res.data.MobileNumber;
      if (res.data.StatusMessage === "UserId not found") {
        toast.error("UserId is Invalid");
      } else {
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="font-bold text-center mb-11">
        Forgot Password <ErrorIcon className="mb-2 text-red-500" />
      </h1>
      <h2 className="text-sm mb-10 text-center">
        Enter your username and we'll send you <br />a link to reset your
        password.
      </h2>
      <TextField
        id="standard-basic"
        label="UserID"
        variant="standard"
        value={UserId}
        onChange={onChange}
        name="userId"
        sx={{ width: "250px" }}
      />

      <div className="flex justify-center mt-5">
        <Button
          onClick={handleSubmit}
          variant="outlined"
          style={{ backgroundColor: "#2F68C4", color: "white" }}
          type="submit"
        >
          SUBMIT{" "}
          <LoginIcon
            size={"small"}
            className="mb-1 ml-2"
            style={{ color: "", fontSize: "16px" }}
          />
        </Button>
      </div>
    </form>
  );
}
