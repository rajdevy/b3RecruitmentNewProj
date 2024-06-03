import React from "react";
import {
  FormControl,
  Radio,
  FormControlLabel,
  FormLabel,
  FormHelperText,
  RadioGroup,
} from "@mui/material";

export default function RadioGroupControl(props) {
  const { name, label, value, onChange, helpertext, items, row } = props;
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup {...props} name={name} value={value} onChange={onChange}>
        {items.map((item, index) => (
          <FormControlLabel
            key={index}
            value={item.Gender_Id}
            control={<Radio />}
            label={item.Gender_Title}
          />
        ))}
      </RadioGroup>
      <FormHelperText error>{helpertext}</FormHelperText>
    </FormControl>
  );
}
