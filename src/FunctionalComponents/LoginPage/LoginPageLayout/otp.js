// import React, { useRef, useState } from 'react';
// import { Button } from '@mui/material';
// import VerifiedIcon from '@mui/icons-material/Verified';
// import PersonSearchIcon from '@mui/icons-material/PersonSearch';
// // import './App.css';

// const OTPInput = () => {
//   const [otp, setOtp] = useState(new Array(4).fill(""));
//   const inputRefs = useRef([]);

//   const handleChange = (element, index) => {
//     if (isNaN(element.value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = element.value;
//     setOtp(newOtp);

//     // Focus next input field if available
//     if (element.value !== "" && index < 3) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === 'Backspace' && !otp[index] && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const paste = e.clipboardData.getData('text');
//     const pasteArray = paste.split('').slice(0, 4);
//     setOtp(pasteArray);
//     pasteArray.forEach((value, index) => {
//       if (inputRefs.current[index]) {
//         inputRefs.current[index].value = value;
//       }
//     });
//   };
  
//   return (
//     <div className="flex justify-center space-x-2">
//       {otp.map((data, index) => {
//         return (
//           <input
//             key={index}
//             type="text"
//             maxLength="1"
//             style={{border:"none",borderBottom:"2px solid #0060B5",borderRadius:"0px",outlineColor:"#0060B5"}}
//             value={data}
//             onChange={e => handleChange(e.target, index)}
//             onKeyDown={e => handleKeyDown(e, index)}
//             ref={el => inputRefs.current[index] = el}
//             className="w-10 h-10 text-center text-lg border border-gray-300 rounded"
//             onPaste={handlePaste}
//           />
//         );
//       })}
//     </div>
//   );
// };



// function OTP({nextStep}) {
//   const handleClick=()=>{
//     nextStep();
//   }
//   return (
    
//     // <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//     <div className='w-72'>
//       {/* <h2 className="mb-4 text-2xl font-bold">Enter OTP</h2> */}
//       <h1 className='font-bold text-center mb-5'>User Verification  <PersonSearchIcon className='mb-2 text-2xl text-green-700' /></h1>
//         <h2 className='text-sm text-center font-semibold'>Please enter the OTP to verify your account </h2>
//         <h6 className='my-2 text-center' style={{ fontSize: '11px' }}>( A OTP has been sent to your registerd mobile number )</h6>
//       <OTPInput />
//       <div className="flex justify-center mt-5" >
//         <Button onClick={handleClick} variant="contained" sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }}  type="submit">
//           VERIFY  <VerifiedIcon size={"small"}  className="mb-1 ml-2" style={{ color: '',fontSize: '16px' }}/>
//         </Button>
//         </div>

//     </div>
    
//   );
// }

// export default OTP;
