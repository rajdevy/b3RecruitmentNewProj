import { Grid, TextField } from "@mui/material";
// import axios from "axios";
import moment from "moment";
import React, {useState, useEffect } from "react";
import { toast } from "react-toastify";
import ButtonControl from "../../components/form-controls/ButtonControl";
import axios from '../../api/apiUrl'
import InputControl from "../../components/form-controls/InputControl";
import RadioGroupControl from "../../components/form-controls/RadioGroupControl";
import SelectControl from "../../components/form-controls/SelectControl";
import { useForm, Form } from "../../Util/useForm";

// const getUserType = [
//   { id: "1", title: "Admin" },
//   { id: "2", title: "Recruiter" },
//   { id: "3", title: "HR" },
// ];

// const genderItems = [
//   { id: "male", title: "Male" },
//   { id: "female", title: "Female" },
// ];

const initialValues = {
  fullName: "",
  email: "",
  mobileNumber: "",
  gender: "",
  userid: "",
  password: "",
  userType: "",
  dateOfJoining: moment().format("YYYY-MM-DD"),
  // isPermanent: false,
};

// const useStyles = makeStyles(() => ({
//   root: {
//     margin: "10px",
//   },
//   label: {
//     textTransform: "none",
//   },
// }));

function AddRecuiter(props) {
  const { recordForEdit } = props;
  const [userTypes, setUserTypes] = useState([{}]);
  const [genders, setGenders] = useState([{}]);
  const [helperText, setHelperText] = useState("");

  const validate = (fieldValues = values) => {
    // let temp = { ...errors };
    let temp = {};

    if ("fullName" in fieldValues)
      temp.fullName = fieldValues.fullName ? "" : "This field is required";
    if ("email" in fieldValues) {
      (temp.email = /^[a-z0-9](\.?[a-z0-9]){2,}@g(oogle)?mail\.com$/i.test(
        fieldValues.email
      )
        ? ""
        : "Email is not valid") ||
        (temp.email = fieldValues.email ? "" : " Required Email ");
    }
    if ("mobileNumber" in fieldValues)
      // temp.mobile = fieldValues.mobile
      temp.mobileNumber = /^([7-9]{1}[0-9]{9})$/.test(fieldValues.mobileNumber)
        ? ""
        : "Enter a valid Mobile number";
    if ("userType" in fieldValues)
      temp.userType =
        fieldValues.userType.length !== 0 ? "" : "This Field is required";
    if ("userid" in fieldValues)
      temp.userid = fieldValues.userid ? "" : "This field is required";
    if ("password" in fieldValues)
      temp.password =
        fieldValues.password.length >= 6
          ? ""
          : "Password must be atleast 6 digit";

    setErrors({
      ...temp,
    });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };
  const {
    values,
    setValues,
    handleSelectChange,
    handleInputChange,
    errors,
    setErrors,
    resetForm,
  } = useForm(initialValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.gender === "1") {
      setHelperText("");
      setErrors(false);
    } else if (values.gender === "2") {
      setHelperText("");
      setErrors(false);
    } else {
      setHelperText("Please select an option.");
      setErrors(true);
    }

    if (validate()) {
      axios.post("Recruiters", values).then((res) => {
        setValues(...values, res.data);
        toast.success("New User Added...");
      });

      window.location.href = "/users-info";
      resetForm();
    } else {
      toast.error("Please Fill the Form first");
    }
  };

  useEffect(() => {
    getGenderByApi();
    getUserTypes();
    // userRoles();
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit, setValues]);

  const getUserTypes = () => {
    axios.get("UserTypes").then((res) => {
      setUserTypes(res.data);
      // console.table(roles);
    });
  };

  const handleRadioChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setHelperText("");
    setErrors(false);
  };

  const getGenderByApi = () => {
    axios.get("Genders").then((res) => {
      setGenders(res.data);
      // console.log(res.data);
    });
  };

  // const classes = useStyles();
  return (
    <Form style={{ width: "800px" }} onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <InputControl
            label="Full Name"
            name="fullName"
            value={values.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
          />
          <InputControl
            name="email"
            label="Email"
            value={values.email}
            error={errors.email}
            onChange={handleInputChange}
          />
          <InputControl
            name="mobileNumber"
            label="Mobile Number"
            value={values.mobileNumber}
            error={errors.mobileNumber}
            onChange={handleInputChange}
          />
          <InputControl
            name="userid"
            label="UserId"
            error={errors.userid}
            value={values.userid}
            onChange={handleInputChange}
          />
          <InputControl
            name="password"
            label="Password"
            error={errors.password}
            value={values.password}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={5}>
          <RadioGroupControl
            default
            name="gender"
            label="Gender"
            row
            value={values.gender || ""}
            helperText={helperText}
            error={errors.gender}
            onChange={handleRadioChange}
            items={genders}
          />
          <SelectControl
            name="userType"
            label="User Type"
            value={values.userType}
            onChange={handleSelectChange}
            error={errors.userType}
            options={userTypes}
          />
          <TextField
            type="date"
            name="dateOfJoining"
            label="Date of Joining"
            value={values.dateOfJoining || moment().format("YYYY-MM-DD")}
            onChange={handleInputChange}
          />
          <div
            style={{
              margin: "15px 20px",
              display: "flex",
              justifyContent: "flex-start",
              gap: "10px",
            }}
          >
            <ButtonControl
              // classses={{ root: classes.root, label: classes.label }}
              text="Submit"
              type="submit"
            />
            <ButtonControl
              // classes={{ root: classes.root, label: classes.label }}
              text="Reset"
              color="error"
              onClick={resetForm}
            />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
        
      

export default AddRecuiter;
