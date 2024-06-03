// import React, { useState } from "react";
// import { Button } from "@mui/material";
// import "./Register.css";
// import { Link } from "react-router-dom";
// import FormInput from "../../components/FormInput";

// function Register() {
//   const [values, setValues] = useState({
//     username: "",
//     email: "",
//     DateOfBirth: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const inputs = [
//     {
//       id: 1,
//       name: "username",
//       type: "text",
//       placeholder: "Username",
//       errorMessage:
//         "Username should be 3-10 character and should not have any spacial character",
//       // label: "Username :",
//     },
//     {
//       id: 2,
//       name: "email",
//       type: "email",
//       placeholder: "Email Id",
//       errorMessage: "Email Id is Invalid",
//       // label: "Email Id : ",
//     },
//     // {
//     //   id: 3,
//     //   name: "DateOfBirth",
//     //   type: "date",
//     //   placeholder: "",
//     //   label: "Date Of Birth : ",
//     // },
//     {
//       id: 3,
//       name: "password",
//       type: "password",
//       placeholder: "Password",
//       errorMessage:
//         "Password should be 6 to 10 character and must have 1 letter, 1 number and 1 special character",
//       // label: "Password :",
//     },
//     {
//       id: 4,
//       name: "confirmPassword",
//       type: "password",
//       placeholder: "Confirm Password",
//       errorMessage: "Password does not match",
//       // label: "Confirm Password : ",
//     },
//   ];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     window.location.href = "/login";
//   };

//   // useEffect(() => {
//   //   localStorage.setItem("data", JSON.stringify(values));
//   // }, [values]);

//   const onChange = (e) => {
//     setValues({ ...values, [e.target.name]: e.target.value });
//   };
//   return (
//     <div className="register">
//       <form onSubmit={handleSubmit}>
//         <h1 className="register-text">Register</h1>
//         {inputs.map((input) => (
//           <FormInput
//             key={input.id}
//             {...input}
//             value={values[input.name]}
//             onChange={onChange}
//           />
//         ))}
//         <Button className="regiSubmit" variant="outlined" type="submit">
//           Submit
//         </Button>
//         <h3 className="login-link" align="center">
//           <hr />
//           <br />
//           Already have an Account?
//           <Link to="/login">
//             <b>
//               <u> Login</u>
//             </b>
//           </Link>
//         </h3>
//       </form>
//     </div>
//   );
// }

// export default Register;
