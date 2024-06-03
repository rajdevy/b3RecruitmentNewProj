import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Radio,
  TextField,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import axios from "../../api/apiUrl";
import { Form, useForm } from "../../Util/useForm";
import InputControl from "../../components/form-controls/InputControl";
import RadioGroupControl from "../../components/form-controls/RadioGroupControl";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ButtonControl from "../../components/form-controls/ButtonControl";
import Sidebar from "../../Common/Sidebar/Sidebar";
import Navbar from "../../Common/Navbar/Navbar";

import PdfViewer from "../../components/PdfViewer";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/styles";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../../Common/Dashboard/MainLayout";
import DocxFileViewer from "../../components/DocxFileViewer";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import PDFReader from "../../components/PdfViewer";




const useStyles = makeStyles(() => ({
  btnControls: {
    height: "30px",
    width:"auto",
    padding:"10px",
    top: "15px",
    left: "10px !important",
  },
}));
function AddNewResume() {
  const classes = useStyles();

  const [skills, setSkills] = useState([{}]);
  const [genders, setGenders] = useState([{}]);
  const [helperText, setHelperText] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeFileData, setResumeFileData] = useState(null);
  const [tempVal, setTempVal] = useState([{}]);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isDocxFile, setIsDocxFile] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState([])
  const initialValues = {
    FirstName: "",
    LastName: "",
    Email: "",
    MobileNumber: "",
    Gender: "",
    Experience: "",
    CurrentCTC: "",
    ExpectedCTC: "",
    Skills: "",
    ResumeFile: "",
    SkillsCount: 0,
  };

  const location = useLocation();
  const navigate = useNavigate();

  const recordForEdit = location.state;   //for getting records for updating


  //Calling api for SkillDD
  const skillDataByApi = async () => {
    await axios.get("Skills").then((res) => {
      setSkills(res.data)
      FillSkillRecords(res.data);
    }).catch(err => alert(err));
  };


  const FillSkillRecords = (records) => {
    if (recordForEdit !== null) {
      var SkillRecords = []
      var skillname = recordForEdit.Skills;
      var splitSkills = skillname.split(',');

      for (var i of records) {
        if (splitSkills.includes(i["Skill_Name"])) {
          SkillRecords.push(i);
        }
      }
      // setValues(SkillRecords)
      setSelectedSkills(SkillRecords);
    }
  }


  useEffect(() => {
    skillDataByApi();
    skillName();
    getGenderByApi();
    if (recordForEdit !== null) {
      setValues({
        ...recordForEdit,
      });
    }
  }, []);



  const getGenderByApi = () => {
    axios.get("Genders").then((res) => {
      setGenders(res.data);
      // console.log(res.data);
    }).catch(err => alert(err));
  };

  //Taking Out SkillName from API data
  const skillName = () => {
    skills.map((skill) => skill.Skill_Name);
  };

  //validations
  const validate = (fieldValues = values) => {
    // let temp = { ...errors };
    let temp = {};

    if ("FirstName" in fieldValues)
      temp.FirstName = /^[a-zA-Z ,.'-]+$/.test(fieldValues.FirstName)
        ? ""
        : "Required FirstName ";

    if ("LastName" in fieldValues)
      temp.LastName = /^[a-zA-Z ,.'-]+$/.test(fieldValues.LastName)
        ? ""
        : "Required LastName";

    if ("Experience" in fieldValues) {
      // /^([0-9].?)*$/.
      temp.Experience = /^[+-]?([0-9]*[.])?[0-9]+$/.test(fieldValues.Experience)
        ? ""
        : "Required Experience";
    }

    if ("ExpectedCTC" in fieldValues) {
      temp.ExpectedCTC = /^[+-]?([0-9]*[.])?[0-9]+$/.test(
        fieldValues.ExpectedCTC
      )
        ? ""
        : "Required CTC";
    }

    if ("CurrentCTC" in fieldValues) {
      temp.CurrentCTC = /^[+-]?([0-9]*[.])?[0-9]+$/.test(fieldValues.CurrentCTC)
        ? ""
        : "Current CTC";
    }

    if ("Skills" in fieldValues) {
      temp.Skills = fieldValues.Skills ? "" : "Required Skills";
    }
    if ("Gender" in fieldValues) {
      temp.Gender = fieldValues.Gender ? "" : "Required Gender";
    }

    if ("ResumeFile" in fieldValues) {
      temp.ResumeFile = fieldValues.ResumeFile ? "" : "Required Resume PDF File";
    }

    if ("Email" in fieldValues) {
      //(temp.Email = /$^|.+@.+..+/.test(fieldValues.Email)
      (temp.Email = /^[a-z0-9](\.?[a-z0-9]){2,}@g(oogle)?mail\.com$/i.test(
        fieldValues.Email
      )
        ? ""
        : "Email is not valid") ||
        (temp.Email = fieldValues.Email ? "" : " Required Email ");
    }
    if ("MobileNumber" in fieldValues)
      // temp.mobile = fieldValues.mobile
      temp.MobileNumber = /^([6-9]{1}[0-9]{9})$/.test(fieldValues.MobileNumber)
        ? ""
        : "Required Number";
    setErrors({
      ...temp,
    });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const { values, setValues, handleInputChange, errors, setErrors, resetForm } =
    useForm(initialValues, true, validate, setResumeFileData, setHelperText);

  const handleSubmit = async (e) => {
    alert('hello')
    e.preventDefault();
console.log("submit wrong1")
console.log(values)

    //gender validation 
    // if (values.Gender === "1") {
    //   setHelperText("");
    //   setErrors(false);
    // } else if (values.Gender === "2") {
    //   setHelperText("");
    //   setErrors(false);
    // } else {
    //   setHelperText("Please select an option.");
    //   setErrors(true);
    // }
    if (validate()) {
      if (recordForEdit !== null) {
        const id = recordForEdit.Candidate_Id;
        setValues({
          ...values,
          Skills: recordForEdit.SkillID,
        })

console.log(values);
console.log("submit success1")
        // await axios.put(`Resumes/${id}`, values).then((res) => {
        //   alert("Updated Successfully");
        //   window.location.href = "/resumes";
        // }).catch(err => alert(err));
      } else {
        await axios.post("Resumes/CheckDuplicate", values).then((res) => {
          console.log(res.data)
          if (res.data !== null) {
            setIsDuplicate(true);
            // setValues(res.data);
            setTempVal(res.data);
            console.log("submit wrong2")
          } else {
            setIsDuplicate(false);
            navigate("/resumes");
            toast.done("New Record Added");
            console.log("submit wrong3")
          }
        });
      }
      resetForm();
    }
    else{
      console.log("submit wrong4")
    }
  };

  //File Formats to accept
  const filesFormats = [
    // ".doc",
    ".docx",
    ".pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    // ".document",
    "application/pdf",
  ];

  //FileChange Handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    //console.log(file)
    const data = window.URL.createObjectURL(file)
    setSelectedDocs(data);
    setIsDocxFile(false);
    setFileUploaded(false);
    setErrors({
      ...errors,
      ResumeFile: ''
    })
    const isRightFormat = filesFormats.includes(file.type);
    if (file.type.includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
      setIsDocxFile(true);
    }
    if (isRightFormat) {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });

      setResumeFile(file); //For Viewing the preview
      const formData = new FormData();
      formData.append("resumeFile", file);


      setResumeFileData(formData); //for storing in api 
    } else {
      toast.error("invalid file format!");
    }
  };
  console.log(selectedDocs)
  //File Upload Handler
  const uploadFileHandler = () => {
    if (resumeFileData != null) {
      axios
        .post("Resumes/SaveResumeFile", resumeFileData)
        .then((res) => {
          toast.success("File Uploaded SuccessFully");
          setFileUploaded(true);
        })
        .catch((err) => {
          alert(err)
        });
    }
    else {
      toast.warn("Please Select PDF File First. ")
    }
  };

  //Autocomplete Skills Data Handler
  const handleCheckBox = (e, val) => {
    var selectedValue = "";
    if (selectedValue === "") {
      selectedValue = val.map((value) => value.Skill_Id).toString();
    } else {
      selectedValue = val.replace((value) => value, " ").toString();
    }
    setSelectedSkills(val)
    console.log(selectedValue);
    setValues({
      ...values,
      Skills: val.map((value) => value.Skill_Id).toString(),
      SkillsCount: val.map((value) => value.Skill_Name).length,
    });
    setErrors(false);
  };

  const handleRadioChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    setHelperText("");
    setErrors(false);
  };
  var fileType;
  // var fileName = recordForEdit.ResumeFile.split('/')[5]


  //code start by GS

  const [email, setEmail] = useState("");
  const [isErrors, setIsErrors] = useState({});
  const [isEmailError, setIsEmailError] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const handleEmailSuggestion = (suggest) => {
    const atIndex = email.indexOf("@");
    const username = email.substring(0, atIndex + 1);
    const updatedEmail = username + suggest;
    setEmail(updatedEmail);
    setSuggestions([]);
    setIsEmailError(false);
    setIsErrors({ ...isErrors, Email: "" });
  }
  
  const handleEmailInputChange = (event) => {
handleInputChange(event);
    const input = event.target.value;
    const emailRegex = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/;

    if (input) {
      const atIndex = input.indexOf("@");
      setIsErrors({ ...isErrors, Email: "" });
      if (atIndex !== -1) {
        const domain = input.substring(atIndex + 1);
        const domainSuggestions = getSuggestions(domain);
        setSuggestions(domainSuggestions);
      }
      if (emailRegex.test(input)) {
        setSuggestions([]);
      }
      setEmail(input);
    } else {
      setIsErrors({ ...isErrors, Email: "*input is Empty" });
      setEmail("");
    }
  };
  const getSuggestions = (domain) => {
    return [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "icloud.com",
    ].filter((suggestion) => suggestion.startsWith(domain));
  };

  //code end by GS

  return (
    // <div className="dashboard">
    //   <div className="glass">
    //     <Sidebar className="sidebar" />
    //     <div className="dashboard-content">
    //       <div>
    //         {recordForEdit == null ? (
    //           <Navbar navHeader="Add Resume" />
    //         ) : (
    //           <Navbar navHeader="Update Resume" />
    //         )}
    //       </div>
    <MainLayout selectedOption='4' navbarHeaderContent={recordForEdit == null ? "Add Resume" : "Update Resume"} >

      <div style={{ overflow: "auto", marginTop: '-20px' }} >
        <Form
          onSubmit={handleSubmit}
        // style={{ width: "100%", height: "auto" ,paddingTop:'20px'}}
        >
          <Grid container style={{ width: 1100}} >
            <Grid item xs={4}  >
              <Grid container>
                <Grid item xs={6}>
                  <InputControl
                    label="First Name"
                    name="FirstName"
                    size="small"
                    value={values.FirstName || ""}
                    error={errors.FirstName}
                    onChange={handleInputChange}
                    variant="standard"
                    color="primary"
                    InputLabelProps={{
                      style: { color: '#0d47a1' }
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputControl
                    label="Last Name"
                    name="LastName"
                    size="small"
                    value={values.LastName || ""}
                    error={errors.LastName}
                    onChange={handleInputChange}
                    variant="standard"
                    color="primary"
                    InputLabelProps={{
                      style: { color: '#0d47a1' }
                    }}
                  />
                </Grid>
              </Grid>
              {/* <InputControl
                name="Email"
                label="Email"
                size="small"
                style={{ width: "95%" }}
                error={errors.Email}
                value={values.Email || ""}
                onChange={handleInputChange}
                variant="standard"
                color="primary"
                InputLabelProps={{
                  style: { color: '#0d47a1' }
                }}
              /> */}


              {/* code strt by GS */}

              <InputControl
                name="Email"
                label="Email"
                size="small"
                style={{ width: "95%" }}
                variant="standard"
                color="primary"
                InputLabelProps={{
                  style: { color: '#0d47a1' }
                }}
                onChange={handleEmailInputChange}
                id="txtemail"
                value={email}
               error={errors.Email}
                //error={isEmailError}
                inputProps={{ Autocomplete: "auto" }}
                lable="Error"
              />
              {suggestions.length > 0 && email.includes("@") && (
                <ul className="w-32">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleEmailSuggestion(suggestion)}
                      className="text-blue-500 cursor-pointer hover:underline"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
              {isErrors.Email && (
                <p style={{ color: "red", fontSize: "0.75rem" }}>{isErrors.Email}</p>
              )}

              {/* code end by GS */}


              <Grid container>
                <Grid item xs={6}>
                  <InputControl
                    name="MobileNumber"
                    label="Mobile Number"
                    size="small"
                    error={errors.MobileNumber}
                    value={values.MobileNumber || ""}
                    onChange={handleInputChange}
                    variant="standard"
                    color="primary"
                    InputLabelProps={{
                      style: { color: '#0d47a1' }
                    }}
                    inputProps={{
                      maxLength: 10 // Set maxLength attribute to 2
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputControl
                    name="Experience"
                    label="Experience"
                    error={errors.Experience}
                    size="small"
                    value={values.Experience || ""}
                    onChange={handleInputChange}
                    variant="standard"
                    color="primary"
                    inputProps={{
                      maxLength: 2 // Set maxLength attribute to 2
                    }}
                    InputLabelProps={{
                      style: { color: '#0d47a1' }
                    }}
                  // options={getExperienceData}
                  />
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={6}>
                <InputControl
                    name="CurrentCTC"
                    label="Current CTC"
                    size="small"
                    error={errors.CurrentCTC}
                    value={values.CurrentCTC || ""}
                    onChange={handleInputChange}
                    variant="standard"
                    color="primary"
                    InputLabelProps={{
                      style: { color: '#0d47a1' }
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputControl
                    name="ExpectedCTC"
                    label="Expected CTC"
                    size="small"
                    error={errors.ExpectedCTC}
                    value={values.ExpectedCTC || ""}
                    onChange={handleInputChange}
                    variant="standard"
                    color="primary"
                    InputLabelProps={{

                      style: { color: '#0d47a1' }
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={5}>
              
                  <RadioGroupControl
                    default
                    name="Gender"
                     row
                    label="Gender"
                    error={errors.Gender}
                    value={values.Gender || ""}
                    helpertext={helperText}
                    onChange={handleRadioChange}
                    items={genders}
                    color="primary"
                    style={{ color: '#0d47a1' }}
                    InputLabelProps={{
                      style: { color: '#0d47a1' }
                    }}
                  />
                </Grid>
            
              </Grid>

              {recordForEdit === null ? (
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  limitTags={2}
                  id="skills"
                  style={{ width: "105%" }}
                  onChange={handleCheckBox}
                  options={skills}
                  // defaultValue={recordForEdit.Skills.split(',')}
                  getOptionLabel={(options) => options.Skill_Name}
                  isOptionEqualToValue={(option, value) => option === value}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      // onChange={handleCheckBox}
                      // value={values.skilKls}
                      />
                      {option.Skill_Name}
                    </li>
                  )}
                  renderInput={(params) => (
                    <InputControl
                      {...params}
                      label="Skills"
                      placeholder="Languages"
                      value={values.Skills || ""}
                      error={errors.Skills}
                      variant="standard"
                      InputLabelProps={{
                        style: { color: '#0d47a1' }
                      }}
                    />
                  )}
                />

                // <Autocomplete
                //   multiple
                //   id="skills"
                //   disableCloseOnSelect
                //   limitTags={2}
                //   options={skills}
                //   style={{ width: "110%" }}
                //   onChange={handleCheckBox}
                //   getOptionLabel={(option) => option.Skill_Name}
                //   // value = {values.Skills}
                //   isOptionEqualToValue={(option, value) => option=== value}

                //   // defaultValue={ recordForEdit.Skills.split(',') || null }
                //   renderInput={(params) => (
                //     <TextField
                //       {...params}
                //       label="Skills"
                //       placeholder="Languages"
                //       value={values.Skills || ""}
                //       error={errors.Skills}
                //     />
                //   )}
                // />
              ) : (
                <Autocomplete
                  multiple
                  id="skills"
                  disableCloseOnSelect
                  limitTags={2}
                  options={skills}
                  value={selectedSkills || ""}
                  style={{ width: "110%" }}
                  onChange={handleCheckBox}
                  getOptionLabel={(option) => option.Skill_Name}
                  // isOptionEqualToValue={(option, value) =>option == value}
                  // defaultValue={[recordsSkills]}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                        InputLabelProps={{
                          style: { color: '#0d47a1' }
                        }}
                      // onChange={handleCheckBox}
                      // value={values.skilKls}
                      />
                      {option.Skill_Name}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Skills"
                      placeholder="Languages"
                    // value={values.Skills || ""}
                    // error={errors.Skills}
                    />
                  )}
                />)
              }

              {/* <br /> */}
              {isDuplicate ? (
                <p>
                  Record Already Exist &nbsp;
                  <Link to="/resumes" state={tempVal}>
                    <u>View Records</u>
                  </Link>
                </p>
              ) : (
                ""
              )}
              <div className="flex justify-center">
               <ButtonControl
                  className={classes.btnControls}
                  // classses={{ root: classes.root, label: classes.label }}
                  text="Submit"
                  type="submit"
                />
                &nbsp;&nbsp;
                <ButtonControl
                  // classes={{ root: classes.root, label: classes.label }}
                  className={classes.btnControls}
                  text="Reset"
                  color="error"
                  onClick={resetForm}
                />
                </div>
          
            </Grid>
            <Grid item xs={2} className="flex justify-center " >
              <div className="h-96 w-0.5 mt-20 mb-50 bg-gray-500"></div>
            </Grid>
            <Grid item xs={4}  >
              <div
                style={{
                  marginTop: "18px",
                  border: "2px solid #0d47a1",
                  height: "450px",
                  width: "auto",
                  overflowY: "auto",
                  //paddingLeft: "10px",
                  marginBottom: "10px",
                  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)",
                }}
                
              >
                {recordForEdit === null ? (
                  isDocxFile ? (
                    // <object data={recordForEdit === null ? resumeFile : recordForEdit.ResumeFile} width='700' height='550' ></object>
                    // <DocViewer 
                    // documents={selectedDocs}
                    // // documents={
                    // //   selectedDocs.map((item) => ({
                    // //     uri: window.URL.createObjectURL(item),
                    // //     fileName: item.name,
                    // //   }))}
                    //    pluginRenderers={DocViewerRenderers} />
                    <DocxFileViewer file={recordForEdit === null ? selectedDocs : recordForEdit.ResumeFile} type="docx" />
                  ) : (
                    
                     <PdfViewer scale={1.0}  pdf={recordForEdit === null ? resumeFile : recordForEdit.ResumeFile} />
                  )
                ) : (
                  fileType = recordForEdit.ResumeFile.split('.')[1],
                  fileType === 'docx' ? (
                    // <object data={recordForEdit === null ? resumeFile : recordForEdit.ResumeFile} width='400' height='400' ></object>
                    <DocxFileViewer file={recordForEdit === null ? resumeFile : recordForEdit.ResumeFile} type="docx" />
                  ) : (
                    <PdfViewer scale={2.2} width={300} pdf={recordForEdit === null ? resumeFile : recordForEdit.ResumeFile} />
                    
                  )
                )}
                {/*{isDocxFile ? (
                    console.log(resumeFile),
                    <object data={recordForEdit === null ? resumeFile : recordForEdit.ResumeFile} width='700' height='550' ></object>
                    // <DocxFileViewer file={recordForEdit === null ? resumeFile : recordForEdit.ResumeFile} />
                    ):(
                      <PdfViewer scale={2.2} width={300} pdf={recordForEdit === null ? resumeFile : recordForEdit.ResumeFile} />
                    )} */}
              </div>
              <div
                style={{
                  display: "flex",
                  // paddingBottom: "25px",
                  boxShadow: "0 10px 5px -5px rgba(0, 0, 0, 0.2)",
                }}
              >
                <InputControl
                  type="file"
                  label=" "
                  name="ResumeFile"
                  size="small"
                  value={values.resumeFile}
                  onChange={handleFileChange}
                  error={errors.ResumeFile}
                  variant="standard"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        style={{ paddingRight: "10px" }}
                      >
                        <IconButton onClick={uploadFileHandler} disabled={fileUploaded ? true : false} edge="end">
                          <FileUploadOutlinedIcon fontSize="medium" id="fileUploadICon"
                            // style={{ paddingRight: "10px" }}
                            // fontSize="small"
                            color={fileUploaded ? "success" : "primary"}
                          />
                        </IconButton>
                        {/* <IconButton onClick={deleteFileHandler}>
                              <DeleteOutlineOutlinedIcon
                                // fontSize="small"
                                color="error"
                              />
                            </IconButton> */}
                      </InputAdornment>
                    ),
                  }}
                />
               
              </div>
            </Grid>
          </Grid>
        </Form>
      </div>
    </MainLayout>
    //     </div>
    //   </div>
    // </div>
  );
}

export default AddNewResume;
