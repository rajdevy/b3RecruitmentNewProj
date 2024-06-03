import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Slider,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { makeStyles } from "@material-ui/styles";
import axios from "../../api/apiUrl";
import UseDataTable from "../../Util/useDataTable";
import InputControl from "../../components/form-controls/InputControl";
import { ResumeJSONData } from "../../Common/ResumeJSONData";
import "./ResumeDataTable.css";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ButtonControl from "../../components/form-controls/ButtonControl";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, Form } from "../../Util/useForm";
import { ENUM_GENDER } from "../../Util/Enums";
import ResumeImageIcon from '../../Assets/images/ResumeIcon.png'

// import ResumeModal from "./ResumeModal";
// import PdfViewer from "../../components/PdfViewer";

const useStyles = makeStyles(() => ({
  root: {
    margin: "10px 0px",
    display: "flex",
    alignItems: "center",
    width: "auto"
  },
  pageContent: {
    marginTop: "-20px",
    marginBottom: "100px",
    padding: "0px",
    top: "0px",
    position: "sticky",
    overflow: "auto",
  },
  formInput: {
    width: "300px",
    float: "right",
    left: '-22%',
    // marginTop: '-20px !important',
  },
  updateBtn: {
    height: "20px",
    // fontSize: "10px !important",
    width: "auto",
    height: "30px !important",
    borderRadius: "10% !important",
    // textTransform: "capitalize !important",
    color: "white  !important ",
    backgroundColor: "#647acb  !important",
    "&:hover": {
      color: "#647acb  !important",
      backgroundColor: "white  !important",
    },
  },

  heading: {
    // width: "auto",
    flexGrow: "1",
    overflowX: "visible",
    height: "60px",
    // border: "1px solid",
    fontSize: "14px",
    wordBreak: "break-all",
    textTransform: "capitalize",
    // letterSpacing: "3px",
    lineHeight: "1.5",
    fontWeight: "bold",
    // flexWrap: "wrap",
    color: "#647acb",
  },
  tableContent: {
    overflowX: "auto",
  },
  newButton: {
    position: "absolute",
    justifyContent: "flex-end",
    left: "0",
    fontSize: "12px !important",
    width: "130px",
  },
  btnGroup: {
    "&:hover": {
      transition: "0.2s ease-in",
      backgroundColor: "#fff",
    },
  },
}));

const fieldsForSearching = {
  firstName: "",
  lastName: "",
  email: "",
  mobileNumber: "",
  minExperience: "",
  maxExperience: "",
  minCurrentCTC: "",
  maxCurrentCTC: "",
  minExpectedCTC: "",
  maxExpectedCTC: "",
  skills: "",
};

const headCells = [
  { id: "action", label: "Action" },
  { id: "firstName", label: "First Name" },
  { id: "lastName", label: "Last Name" },
  { id: "email", label: "Email", disableSorting: true },
  { id: "mobile", label: "Mobile" },
  { id: "gender", label: "Gender" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience (years)" },
  { id: "currentCTC", label: "CurrentCTC (LPA)" },
  { id: "expectedCTC", label: "ExpectedCTC (LPA)" },
  { id: "resume", label: "Resume", disableSorting: true },
];



const ResumeDataTable = (props) => {
  const { setSearchHeader } = props;

  const classes = useStyles();
  const [records, setRecords] = useState([{}]);
  const [skills, setSkills] = useState([{}]);
  const [disableTable, setDisableTable] = useState(true);
  const [helperText, setHelperText] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState({});
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });


  //----------For Range Slider-------------
  // const [value, setValue] = useState([5, 10]);

  // const handleRangeChange = (event, newValue) => {
  //   setValue(newValue);
  //   setValues({...values,
  //     minExperience: newValue[0],
  //     maxExperience:newValue[1]
  //   })
  // };
  // function valuetext(value) {
  //   return `${value}`;
  // }

  // const [recordForEdit, setRecordForEdit] = useState(null);

  // const [records] = useState(ResumeJSONData);
  const navigate = useNavigate();
  const location = useLocation();

  const duplicateRecords = location.state;

  useEffect(() => {
    // axios.get("resumes").then((res) => {
    //   setRecords(res.data);
    //   console.log(res.data);
    // });
    if (duplicateRecords !== null) {
      setDisableTable(false);
      setRecords(duplicateRecords);
    } else {
      setDisableTable(true);
    }

    skillDataByApi();
    skillName();
    
  }, [duplicateRecords]);

  const skillDataByApi = async () => {
    await axios.get("Skills").then((res) => {
      setSkills(res.data);
      
    });
  };

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    UseDataTable(records, headCells, filterFn);

  const validate = (fieldValues = values) => {
    // let temp = { ...errors };
    let temp = {};

    if ("firstName" in fieldValues)
      temp.firstName = /^[a-zA-Z ,.'-]+$/.test(fieldValues.firstName)
        ? ""
        : "Required FirstName ";

    if ("lastName" in fieldValues)
      temp.lastName = /^[a-zA-Z ,.'-]+$/.test(fieldValues.lastName)
        ? ""
        : "Required LastName";

    if ("experience" in fieldValues) {
      // /^([0-9].?)*$/.
      temp.experience = /^[+-]?([0-9]*[.])?[0-9]+$/.test(fieldValues.experience)
        ? ""
        : "Required Experience";
    }

    if ("expectedCTC" in fieldValues) {
      temp.expectedCTC = /^[+-]?([0-9]*[.])?[0-9]+$/.test(
        fieldValues.expectedCTC
      )
        ? ""
        : "Required CTC";
    }

    if ("currentCTC" in fieldValues) {
      temp.currentCTC = /^[+-]?([0-9]*[.])?[0-9]+$/.test(fieldValues.currentCTC)
        ? ""
        : "Current CTC";
    }

    if ("skills" in fieldValues) {
      temp.skills = fieldValues.skills ? "" : "Required Skills";
    }

    if ("email" in fieldValues) {
      //(temp.email = /$^|.+@.+..+/.test(fieldValues.email)
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
        : "Required Number";
    setErrors({
      ...temp,
    });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const searchModifyHandler = () => {
    setDisableTable(true);
    setSearchHeader("Search Resume");

    resetForm();
  };

  const {
    values,
    handleSelectChange,
    setValues,
    setSelectedSearchFields,
    handleInputChange,
    errors,
    setErrors,
    resetForm,
    selectedSearchFields,
  } = useForm(fieldsForSearching, true, validate, setHelperText);
  // const [options, setOptions] = useState(
  //   records.forEach((record) => record.first_name)
  // );
  // //   records.forEach((record) => record.first_name);
  // const optionClick = (e) => {
  //   setOptions(e.taget.value);
  // };

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({ 
      fn: (items) => {
        if (target.value === "") return items;
        // else if (!target.value) return items("not found");
        else
          return items.filter(
            (x) =>
              // for (var i = items; i <= items.length; i++) {
              //   x.i[items].toLowerCase().includes(target.value);
              // }
              x.MobileNumber.toString().includes(target.value) ||
              x.FirstName.toString().toLowerCase().includes(target.value) ||
              x.LastName.toString().toLowerCase().includes(target.value) ||
              x.Email.toString().toLowerCase().includes(target.value) ||
              x.Skills.toString().toLowerCase().includes(target.value) ||
              x.Experience.toString().includes(target.value) ||
              x.CurrentCTC.toString().includes(target.value) ||
              x.ExpectedCTC.toString().includes(target.value)
          );
      },
    });
  };
  const updateResumeHandler = (item) => {
    // window.location.href = "/add-resume";
    navigate("/add-new-resume", { state: item });
    setRecordForEdit(item);
    // console.log(item);
  };

  //Resume Download Method
  const resumeOptions = (item) => {
    const Id = item.Id;
    console.log(item.ResumeFile);
    if (Id !== 0) {
      window.open(item.ResumeFile);
    }
  };

  const handleCheckBox = (e, val) => {
    var selectedValue = "";
    if (selectedValue === "") {
      selectedValue = val.map((value) => value.Skill_Name).toString();
    } else {
      selectedValue = val.replace((value) => value, " ").toString();
    }

    setSelectedSearchFields({
      ...selectedSearchFields,
      skills: val.map((value) => value.Skill_Name).toString(),
    });
    setValues({
      ...values,
      skills: val.map((value) => value.Skill_Name).toString(),
    });
    setErrors(false);
  };
  const skillName = () => {
    skills.map((skill) => skill.Skill_Name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchHeader("Search Results");
    console.log(values)
    axios.post("Resumes/SearchResume", values).then((res) => {
      setRecords(res.data);
    });
    setDisableTable(false);
  };
  // const searchFields = [...new Set(selectedSearchFields)];

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  // const rowDeleteHandler = (id) => {
  //   axios
  //     .delete(`https://localhost:44379/api/Recruiters/${id}`)
  //     .then((res) => setRecords(res.data));
  // };

  // const excelDownloadHandler = () => {
  //   return (
  //     <ExcelFile>
  //       <ExcelSheet dataset={records} name="Employees" />
  //     </ExcelFile>
  //   );
  // };

  return (
    <>
      {disableTable ? (
        <div className="bg-white p-10 m-10 rounded-md" style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)' }}>
          <Form
            onSubmit={handleSubmit}
            style={{ width: "100%", height: "auto" }}
          >
            <Grid container style={{ marginTop: "20px", width:1000 }}>
              <Grid item xs={3}>
                <InputControl
                  label="First Name"
                  name="firstName"
                  size="small"
                  value={values.firstName}
                  error={errors.firstName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={3}>
                <InputControl
                  label="Last Name"
                  name="lastName"
                  size="small"
                  value={values.lastName}
                  error={errors.lastName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <InputControl
                  name="email"
                  label="Email"
                  size="small"
                  style={{ width: "95%" }}
                  error={errors.email}
                  value={values.email || ""}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={3}>
                <InputControl
                  name="mobileNumber"
                  label="Mobile Number"
                  size="small"
                  error={errors.mobileNumber}
                  value={values.mobileNumber || ""}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  // onBlur={handleSkillBlur}
                  // value={values.skills}
                  limitTags={2}
                  id="skills"
                  style={{ width: "110%" }}
                  onChange={handleCheckBox}
                  options={skills}
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
                        // value={values.skills}
                      />
                      {option.Skill_Name}
                    </li>
                  )}
                  renderInput={(params) => (
                    <InputControl
                      {...params}
                      label="Skills"
                      placeholder="Languages"
                      value={values.skills || ""}
                      size="small"
                      error={errors.skills}
                    />
                  )}
                />
              </Grid>

              <FormControl style={{ flexDirection: "row" }}>
                <Grid item>
                  <FormLabel>Experience</FormLabel>
                 {/* <Box sx={{ width: 300 , marginTop: '20px'}}>
                    <Slider
                    track={true}
                      getAriaLabel={() => 'Experience range'}
                      value={value}
                      max={15}
                      onChange={handleRangeChange}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext}
                    />
                  </Box>*/}
                  <FormGroup row>
                    <Grid item xs={4}>
                      <InputControl
                        name="minExperience"
                        label="Min."
                        size="small"
                        error={errors.minExperience}
                        value={values.minExperience || ""}
                        onChange={handleInputChange}
                        // options={getExperienceData}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <InputControl
                        name="maxExperience"
                        label="Max."
                        size="small"
                        error={errors.maxExperience}
                        value={values.maxExperience || ""}
                        onChange={handleInputChange}
                        // options={getExperienceData}
                      />
                    </Grid>
                  </FormGroup>
                </Grid>

                {/* <Grid item xs={2}>
                  <InputControl
                    name="experience"
                    label="Max. Experience"
                    error={errors.experience}
                    value={values.experience || ""}
                    onChange={handleInputChange}
                    // options={getExperienceData}
                  />
                </Grid> */}
                <Grid item sx={12}>
                  <FormLabel>CurrentCTC</FormLabel>
                  <FormGroup row>
                    <Grid item xs={4}>
                      <InputControl
                        name="minCurrentCTC"
                        size="small"
                        label="Min."
                        error={errors.minCurrentCTC}
                        value={values.minCurrentCTC || ""}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <InputControl
                        name="maxCurrentCTC"
                        label="Max."
                        size="small"
                        error={errors.maxCurrentCTC}
                        value={values.maxCurrentCTC || ""}
                        onChange={handleInputChange}
                      />
                    </Grid>
                  </FormGroup>
                </Grid>
                <Grid item sx={12}>
                  <FormLabel>ExpectedCTC</FormLabel>
                  <FormGroup row>
                    <Grid item xs={4}>
                      <InputControl
                        name="minExpectedCTC"
                        label="Min."
                        size="small"
                        error={errors.minExpectedCTC}
                        value={values.minExpectedCTC || ""}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <InputControl
                        name="maxExpectedCTC"
                        label="Max."
                        size="small"
                        error={errors.maxExpectedCTC}
                        value={values.maxExpectedCTC || ""}
                        onChange={handleInputChange}
                      />
                    </Grid>
                  </FormGroup>
                </Grid>
              </FormControl>

              {/* </Grid> */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginTop: "20px",
                  marginLeft: "20px",
                  width: "250px",
                }}
              >
                <ButtonControl
                  // classses={{ root: classes.root, label: classes.label }}
                  text="Search"
                  type="submit"
                />
                <ButtonControl
                  // classes={{ root: classes.root, label: classes.label }}
                  text="Reset"
                  color="error"
                  onClick={resetForm}
                />
              </div>
              {/* </Grid> */}
            </Grid>
          </Form>
        </div>
      ) : (
        <Paper className={classes.pageContent} >
          <div style={{ overflowX: "scroll", width:"100%" }}>
            <div className="userdata">
              <Toolbar className={classes.root}>
                <div className={classes.heading}>
                  <table className="tbl-filtered">
                    <thead>
                      <tr>
                        {Object.keys(selectedSearchFields).map(
                          (keys, index) => {
                            return (
                              <th key={index} className="tbl-filtered-row">
                                {keys}
                              </th>
                            );
                          }
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="tbl-data">
                        {Object.values(selectedSearchFields).map((value) => {
                          return <td className="tbl-filtered-row">{value}</td>;
                        })}
                      </tr>
                    </tbody>

                    {/* <td>{Object.values(selectedSearchFields).join(" , ")}</td> */}
                  </table>
                </div>
                <InputControl
                  variant="standard"
                  className={classes.formInput}
                  label="Search Resume"
                  placeholder="search..."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleSearch}
                />
                <ButtonControl
                  className={classes.newButton}
                  text="Modify Search"
                  variant="outlined"
                  startIcon={<EditOutlinedIcon />}
                  onClick={searchModifyHandler}
                />
                {/* <ExcelFile
            element={
              <Tooltip title="Download">
                <IconButton

                  style={{ right: "25px" }}
                  className={classes.newButton}
                  aria-label="download"
                >
                  <FileDownloadOutlinedIcon />
                </IconButton>
              </Tooltip>
            }
          >
            <ExcelSheet dataset={records} name="Employees">
            <ExcelColumn label={headCells.label} />
            </ExcelSheet>
          </ExcelFile> */}
                {/* <Button
                className={classes.newButton}
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => setOpenPopup(true)}
                // onClick={openAddPopup}
              >
                Add New
              </Button> */}
              </Toolbar>
              <TblContainer> 
                <TblHead />
                <TableBody className={classes.tableContent}>
                  {recordsAfterPagingAndSorting().map((item, index) => (
                    //F => f ~ f => F
                    <TableRow key={index}>
                      <TableCell>
                        <IconButton
                          className={classes.updateBtn}
                          onClick={() => {
                            updateResumeHandler(item);
                          }}
                        >
                          <EditOutlinedIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                      <TableCell>{item.FirstName}</TableCell>
                      <TableCell>{item.LastName}</TableCell>
                      <TableCell>{item.Email}</TableCell>
                      <TableCell>{item.MobileNumber}</TableCell>
                      <TableCell>{ENUM_GENDER[item.Gender]}</TableCell>
                      <TableCell>{item.Skills}</TableCell>
                      <TableCell>{item.Experience}</TableCell>
                      <TableCell>{item.CurrentCTC}</TableCell>
                      <TableCell>{item.ExpectedCTC}</TableCell>
                      <Tooltip title="Click To Download" placement="top">
                        <TableCell
                          style={{ padding: "0px 35px" }}
                          onClick={() => {
                            resumeOptions(item);
                            // hoverPdf(item);
                          }}
                          // onMouseOver={() => {
                          //   hoverPdf(item);
                          // }}
                        >
                          <img
                            src={ResumeImageIcon}
                            className="resume-image"
                            alt="Resume"
                          />

                          {/* <img src={item.resume} onMouseOver={resumeOpen} /> */}
                          {/* <IconButton onMouseOver={openResumeOptions}>
                        <FilePresentOutlinedIcon />
                      </IconButton> */}
                        </TableCell>
                      </Tooltip>
                    </TableRow>
                  ))}
                </TableBody>
              </TblContainer>
              {/* <hr style={{ width: "105vw" }} /> */}
              <TblPagination />
            
            </div> 
            {/* <PopupComp
              title="Download Resume"
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
            >
              <PdfViewer width={800} pdf={ResumeMangal} />
            </PopupComp> */}
          </div>
        </Paper>
      )}
    </>
  );
};

export default ResumeDataTable;
