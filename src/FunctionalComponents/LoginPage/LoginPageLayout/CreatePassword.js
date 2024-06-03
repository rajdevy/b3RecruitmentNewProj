import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import CreateIcon from '@mui/icons-material/Create';
import PasswordIcon from '@mui/icons-material/Password';

const CreatePassword = ({ setStep, setIsLogin }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // const [isLogin, setIsLogin1] = useState(false)

  // setIsLogin1(setIsLogin);
  const handlePasswordChange = (e) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setPassword(e.target.value);
    console.log(e.target.value)
    if (regex.test(e.target.value)) {
      setErrorMessage('Password is valid');
    } else {
      setErrorMessage(
        'Password must contain at least 8 characters,<br /> one uppercase letter, one lowercase letter,<br /> one number, and one special character (@$!%*?&).'
      );
    }
    


  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    console.log(pass)
    console.log(password)
    console.log(confirmPassword)



    if(pass=='' && setIsLogin){
      setErrorMessage('Please enter old password');
    }
    else if(password==''){
      setErrorMessage('Please enter new password');
    }
    else if(confirmPassword==''){
      setErrorMessage('Please enter confirm password');
    }


    if(password!=''){

      if (password === confirmPassword) {
        // toast.success('Password Created Successfully');
        if(!setIsLogin){
          setStep(0);
        }
        // Additional logic such as form submission can be added here
      } else {
        setErrorMessage('Passwords do not match.');
        // toast.error('Password Do not Match');
      }
    }
   
  };
  // const handleOldPass=()=>{
  //   alert("fukdtluwe")
  // }

  // const [isRight, setIsRight] = useState(false);
  const [pass, setPass] = useState('')
  const handleOldPass = (e) => {
      console.log(e.target.value)
      setPass(e.target.value)
  }

  // const handlePasswordSubmit = (e) => {
  //     e.preventDefault();
  //     console.log(pass)
  //     if (pass==1234) {
  //         console.log("first")
  //         // setIsRight(true)
  //     }
  // }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className={`font-bold text-center ${setIsLogin ? 'mb-2' : 'mb-11'}`}>
        Create New Password
        <PasswordIcon className='mb-2 ms-2 text-blue-500' />
      </h1>

      {(setIsLogin) &&
        <div className="mb-4">
          {/* <form onSubmit={handlePasswordSubmit}> */}
          <TextField
        id="oldPass"
        type="oldPass"
        // value={oldPass}
        label="Enter Old Password"
        variant="standard"
        onChange={handleOldPass}
        sx={{ width: '250px' }}
      />

          {/* </form> */}
      
    </div>
}

      <div className="mb-4">
        <TextField 
          id="password"
          type="password"
          value={password}
          label="Enter New Password" 
          variant="standard" 
          onChange={handlePasswordChange}
          sx={{ width: '250px' }}
        />
      </div>
      <div className="mb-6">
        <TextField 
          id="confirmPassword"
          type="password"
          label="Confirm Password" 
          variant="standard" 
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          sx={{ width: '250px' }}
        />
      </div>
{
  errorMessage && (
    <p
      className="text-red-500 text-xs mb-4"
      dangerouslySetInnerHTML={{ __html: errorMessage }}
    />
  )
}
<div className="flex justify-center mt-5">
  <Button variant="outlined" style={{ backgroundColor: '#2F68C4', color: 'white' }} type="submit">
    Create <CreateIcon size={"small"} className="mb-1 ml-2" style={{ fontSize: '16px' }} />
  </Button>
</div>
    </form >
  );
};

export default CreatePassword;
