import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import CreateIcon from "@mui/icons-material/Create";
import PasswordIcon from "@mui/icons-material/Password";
import axios from "../../../api/apiUrl";

const CreatePassword = ({ setStep, userid }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userid);

    const data = {
      UserId: userid,
      Password: confirmPassword,
    };

    axios.post("Recruiters/UpdatePassword", data).then((res) => {
      console.log(res.data.StatusMessage);
      const mobno = res.data.MobileNumber;
      toast.success("New Password Created Succesfully");
      setStep(0);
      if (res.data.StatusMessage === "UserId not found") {
        toast.error("UserId is Invalid");
      } else {
      }
    });
    // if (password === confirmPassword) {
    //   toast.success('Password Created Successfully')
    //   setStep(0)
    //   // Additional logic such as form submission can be added here
    // } else {
    //   setErrorMessage('Passwords do not match.');
    //   toast.error('Password Do not Match')
    // }
  };

  return (
    // <div className="p-4 max-w-md mx-auto">
    //   <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <form onSubmit={handleSubmit}>
      <h1 className="font-bold text-center mb-11">
        Create New Password <PasswordIcon className="mb-2 ms-2 text-blue-500" />
      </h1>
      <div className="mb-4">
        {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            sx={{ width: '250px' }}
            required
          /> */}

        <TextField
          id="password"
          type="password"
          value={password}
          label="Enter New Passsword"
          variant="standard"
          onChange={handlePasswordChange}
          sx={{ width: "250px" }}
        />
      </div>
      <div className="mb-6">
        {/* <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            varient="standard"
            placeholder=''
            sx={{ width: '250px' }}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          /> */}
        <TextField
          id="confirmPassword"
          type="password"
          label="Confirm Passsword"
          variant="standard"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          sx={{ width: "250px" }}
        />
      </div>
      {errorMessage && (
        <p className="text-red-500 text-xs  mb-4">{errorMessage}</p>
      )}
      <div className="flex justify-center mt-5">
        <Button
          variant="outlined"
          style={{ backgroundColor: "#2F68C4", color: "white" }}
          type="submit"
        >
          Create{" "}
          <CreateIcon
            size={"small"}
            className="mb-1 ml-2"
            style={{ color: "", fontSize: "16px" }}
          />
        </Button>
      </div>
    </form>
    // </div>
  );
};

export default CreatePassword;
