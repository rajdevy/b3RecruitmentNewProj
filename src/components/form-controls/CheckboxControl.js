import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import React from "react";

export default function CheckboxControl(props) {
  const { name, label, onChange, value } = props;

  const convertToDefEventParam = (name, value) => ({
    target: {
      name,
      value,
    },
  });
  return (
    <FormControl>
      <FormControlLabel
        control={
          <Checkbox
            name={name}
            color="primary"
            checked={value}
            onChange={(e) =>
              onChange(convertToDefEventParam(name, e.target.checked))
            }
          />
        }
        label={label}
      />
    </FormControl>
  );
}
