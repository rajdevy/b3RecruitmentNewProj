import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtilsUtils from "@date-io/date-fns";
import React from "react";

export default function DatePickerControl(props) {
  const { name, value, label, onChange } = props;

  const convertToDefEventParam = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtilsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        inputVariant="outlined"
        label={label}
        format="MM/dd/yyyy"
        name={name}
        value={value}
        onChange={(date) => onChange(convertToDefEventParam(name, date))}
      />
    </MuiPickersUtilsProvider>
  );
}
