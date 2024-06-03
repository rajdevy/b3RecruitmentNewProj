import { Button } from "@mui/material";
import axios from "../../api/apiUrl";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import FormInput, { FormPassword } from "../../components/FormInput";
// import "./Login.css";
import image from "../../Assets/images/3293465.jpg";
import { Lock} from "@mui/icons-material";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import OTP from "./LoginPageLayout/otp";

function Login(props) {
  const [values, setValues] = useState({
    userId: "",
    password: "",
    showPassword: false,
  });
  const { setStep } = props;
  const handleClick = () => {
    setStep(1);
  };
  const inputs = [
    {
      id: 1,
      name: "userId",
      type: "text",
      placeholder: "UserId",
      // label: "Username :",
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      // label: "Password : ",
    },
  ];
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      UserId: values.userId,
      Password: values.password,
    };

    axios.post("Recruiters/Login", data).then((res) => {
      if (data.UserId === " " || data.Password === "") {
        toast.error("Fill all the fields first");
      } else {
        if (res.data.UserType != null) {
          sessionStorage.setItem("recruiter-details", JSON.stringify(res.data));
          window.location.href = "/dashboard";
        } else {
          toast.error("invalid credentials!");
        }
      }
    });
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // const onChange = (e) => {
  //   setValues({ ...values, [e.target.name]: e.target.value });
  // };
  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="flex">
      {/* <form onSubmit={handleSubmit} className="flex bg-white border pt-10 border-gray-300 rounded-lg px-12 pb-8 font-sans" style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)' }}> */}
  
        <div>
      
      <h1 className='font-bold text-center'>LOGIN <Lock className="mb-2"/></h1>
      
        {/* <h1 className="login-text">Login</h1> */}

        {inputs.map((input) =>
          input.name === "password" ? (
            <FormPassword
              name={input.name}
              values={values}
              setValues={setValues}
              password={values.password}
              showPassword={values.showPassword}
              key={input.id}
              {...input}
              value={input.password}
              onChange={onChange}
              handleClickShowPassword={handleClickShowPassword}
              handleMouseDownPassword={handleMouseDownPassword}
            />
          ) : (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
              values={values}
            />
          )
        )}
        <div className="flex justify-center mt-5" >
        <Button  variant="outlined" style={{ backgroundColor: '#2F68C4',color: 'white' }} type="submit">
          Login   <VpnKeyIcon size={"small"} className="mb-1 ml-2" style={{ color: '',fontSize: '16px' }}/>
        </Button>
        </div>

        <h3 className="mt-12 text-red-700 text-base items-center cursor-pointer font-bold underline"  onClick={handleClick} align="center">
          Forgot Password ?
          </h3>
        </div>
        {/* <div>
        <img alt="logo" width={270} className="mt-10" src={image} />
        </div> */}
      </form>
    </div>
  );
}

export default Login;
