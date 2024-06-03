import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";

export function useForm(
  initialValues,
  validateOnChange = false,
  validate,
  setHelperText
) {
  const [selectedSearchFields, setSelectedSearchFields] = useState({});
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);

  const handleInputChange = (e) => {
    console.log(e.target.value)
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    setSelectedSearchFields(
      value === ""
        ? ""
        : {
            ...selectedSearchFields,
            [name]: value,
          }
    );
    console.log(selectedSearchFields.value);
    if (validateOnChange) validate({ [name]: value });
  };

  const handleSelectChange = (e) => {
    //   setValues(...values, e.target.value);

    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) validate({ [name]: value });
    console.log({ value }.text);
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setHelperText("");
    setSelectedSearchFields([]);
    window.location.reload();
  };

  return {
    values,
    setValues,
    handleInputChange,
    errors,
    setErrors,
    resetForm,
    handleSelectChange,
    selectedSearchFields,
    setSelectedSearchFields,
  };
}

//styled Components
const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: "#809ede54",
    "& .MuiFormControl-root": {
      width: "90%",
      margin: "16px",
    },
  },
}));
export function Form(props) {
  const classes = useStyles();

  const { children, ...other } = props;
  return (
    <div>
      <form className={classes.root} autoComplete="off" {...other}>
        {children}
      </form>
    </div>
  );
}
