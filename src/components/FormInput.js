import React from "react";
import "./FormInput.css";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";

export default function FormInput(props) {
  const { label, onChange, placeholder, id, ...inputProps } = props;
  return (
    <div className="formInput">
      <label>{label}</label>
      <TextField
        className="textInput"
        label={placeholder}
        size="small"
        variant="standard"
        {...inputProps}
        onChange={onChange}
      />
      {/* <Select label={placeholder} onChange={onChange}>
        <MenuItem value="role">Admin</MenuItem>
        <MenuItem value="role">User</MenuItem>
      </Select> */}
    </div>
  );
}

export function FormPassword(props) {
  const {
    label,
    onChange,
    values,
    handleClickShowPassword,
    handleMouseDownPassword,
  } = props;

  return (
    <div className="formInput">
      <label>{label}</label>
      <TextField
        name="password"
        className="textInput"
        label="Password"
        type={values.showPassword ? "text" : "password"}
        size="small"
        variant="standard"
        onChange={onChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" style={{ paddingRight: "10px" }}>
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? (
                  <VisibilityOutlined fontSize="small" color="primary" />
                ) : (
                  <VisibilityOffOutlined fontSize="small" style={{color:'red'}} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}
