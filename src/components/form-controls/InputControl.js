import { TextField } from "@mui/material";
import React from "react";

export default function InputControl(props) {
  const {
    name,
    label,
    value,
    error = null,
    variant,
    onChange,
    size,
    ref,
    ...other
  } = props;
  return (
    <div>
      <TextField
        variant={variant || "outlined"}
        ref={ref}
        label={label}
        name={name}
        size={size}
        value={value}
        onChange={onChange}
        {...(error && { error: true, helperText: error })}
        {...other}
      />
    </div>
  );
}
