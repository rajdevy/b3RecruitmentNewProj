import { Button, TextField, IconButton, InputAdornment } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CreateIcon from '@mui/icons-material/Create';
import PasswordIcon from '@mui/icons-material/Password';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { errors } from '../../../Util/Errors';

const CreatePassword = ({ setStep, setIsLogin }) => {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isPassValid, setIsPassValid] = useState(false);
  const [disOldPass, setDisOldPass] = useState(false);
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  useEffect(() => {
    setErrorMessage(errors.erroZero);
  }, []);

  const handleOldPass = (e) => {
    setOldPass(e.target.value);
    if (e.target.value
       === '1234') {
      setDisOldPass(true);
      setErrorMessage(errors.errorThree);
      toast.success('Old Password Verified Successfully.');
    }
  };

  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const handleNewPass = (e) => {
    setNewPass(e.target.value);
    setConfirmPassword('');
    if (regex.test(newPass)) {
      setIsPassValid(true);
      setErrorMessage(errors.errorSix);
    } else {
      setErrorMessage(errors.errorFive);
      setIsPassValid(false);
    }
  };

  const handleConfirmPass = (e) => {
    setConfirmPassword(e.target.value);
    if (newPass !== e.target.value) {
      setErrorMessage(errors.errorNine);
    } else {
      setErrorMessage(errors.errorEight);
    }
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (oldPass.length === 0 && setIsLogin) {
      setErrorMessage(errors.errorOne);
    } else if (oldPass !== '1234' && setIsLogin) {
      setErrorMessage(errors.errorTwo);
    } else if (newPass === '') {
      setErrorMessage(errors.errorFour);
    } else if (!regex.test(newPass)) {
      setErrorMessage(errors.errorFive);
    } else if (confirmPassword === '') {
      setErrorMessage(errors.errorSeven);
    } else if (newPass !== confirmPassword) {
      setErrorMessage(errors.errorNine);
    } else if (newPass === confirmPassword) {
      toast.success('Password Change Successfully.');
      if (!setIsLogin) {
        setStep(0);
      } else {
        window.location.href = '/dashboard';
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-center">
      <h1 className={`font-bold text-center ${setIsLogin ? 'mb-5' : 'mb-5'}`}>
        Create New Password
        <PasswordIcon className="mb-2 ms-2 text-blue-500" />
      </h1>

      {setIsLogin && (
        <div className="mb-4">
          <TextField
            id="oldPass"
            type={showOldPass ? 'text' : 'password'}
            value={oldPass}
            label="Enter Old Password"
            variant="standard"
            disabled={disOldPass}
            onChange={handleOldPass}
            sx={{ width: '250px' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowOldPass(!showOldPass)}
                    edge="end"
                    disabled={disOldPass}
                  >
                    {showOldPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
      )}

      <div className="mb-4">
        <TextField
          id="newPass"
          type={showNewPass ? 'text' : 'password'}
          value={newPass}
          label="Enter New Password"
          variant="standard"
          onChange={handleNewPass}
          sx={{ width: '250px' }}
          disabled={!disOldPass && setIsLogin}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowNewPass(!showNewPass)}
                  edge="end"
                  disabled={!disOldPass && setIsLogin}
                >
                  {showNewPass ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>

      <div className="mb-6">
        <TextField
          id="confirmPassword"
          type={showConfirmPass ? 'text' : 'password'}
          label="Confirm Password"
          variant="standard"
          value={confirmPassword}
          onChange={handleConfirmPass}
          sx={{ width: '250px' }}
          disabled={(!disOldPass && setIsLogin) || !isPassValid}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  edge="end"
                  disabled={(!disOldPass && setIsLogin) || !isPassValid}
                >
                  {showConfirmPass ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>

      {errorMessage && (
        <p
          className="text-red-500 text-[12px] mb-4 text-center w-72 h-16"
          dangerouslySetInnerHTML={{ __html: errorMessage }}
        ></p>
      )}

      <div className="flex justify-center mt-5">
        <Button variant="outlined" style={{ backgroundColor: '#2F68C4', color: 'white' }} type="submit">
          Create <CreateIcon size="small" className="mb-1 ml-2" style={{ fontSize: '16px' }} />
        </Button>
      </div>
    </form>
  );
};

export default CreatePassword;
