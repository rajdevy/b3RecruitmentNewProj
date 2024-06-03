import { makeStyles } from "@material-ui/styles";
import {
  Button,
  ButtonGroup,
  InputAdornment,
  Paper,
  TableBody,
  TableCell,
  TableRow,
  Toolbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Search } from "@mui/icons-material";

import PopupComp from "../../components/PopupComp";
import UseDataTable from "../../Util/useDataTable";
// import { UserDataJson } from "../../Common/UsersDataJson";
import InputControl from "../../components/form-controls/InputControl";
import AddRecuiter from "./AddRecruiter";
import axios from "../../api/apiUrl";
import { toast } from "react-toastify";
import { ENUM_GENDER } from "../../Util/Enums";
// import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    marginTop: "-20px",
    padding: "0px",
  },
  root: {
    margin: "10px 0px",
    display: "flex",
    alignItems: "center",
  },
  formInput: {
    width: "130%",
    right: "110px",
  },

  heading: {
    flexGrow: 1,
    fontSize: "25px",
    color: "#647acb",
  },
  newButton: {
    position: "absolute",
    right: "20px",
  },
  btnGroup: {
    "&:hover": {
      transition: "0.2s ease-in",
      backgroundColor: "#fff",
    },
  },
}));

const headCells = [
  { id: "userId", label: "UserId" },
  { id: "name", label: "Full Name" },
  { id: "email", label: "Email", disableSorting: true },
  { id: "gender", label: "Gender" },
  { id: "mobile", label: "Mobile" },
  { id: "dateOfJoining", label: "Date Of Joining" },
  { id: "actions", label: "Actions", disableSorting: true },
];

function Recruiters() {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  //   const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState([{}]);
  // const [records] = useState(UserDataJson);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    UseDataTable(records, headCells, filterFn);

const fetchData = async () => {
      await axios.get("Recruiters").then((res) => {
         res.data.map(item => item.DateOfJoining.split("T").shift());
        
        setRecords(res.data);
        // setRecords(...records , {DateOfJoining : doj[0]})
        // console.log(doj);
        // console.log(res.data.DateOfJoining.substring(0,10))
      });
    };

  useEffect(() => {
    fetchData();
  }, []);
  const deleteItem = async (item) => {
    const Id = item.Id;
    await axios.delete(`Recruiters/${Id}`).then((res) => {
      const employees = records.filter((item) => item.Id !== Id);
      setRecords({ employees });
      toast.success("Record Deleted.");
    });
    window.location.href = "/users-info";
  };

  //Inserting Records for USer
  // const insertOrUpdate = (id, values, resetForm) => {
  //   if (values.id === 0) {
  //     axios
  //       .post("http://localhost:62075/api/Recruiters", values)
  //       .then((res) => {
  //         setRecords(...records, res.data);
  //       });
  //   } else {
  //     axios
  //       .put(`http://localhost:62075/api/Recruiters/${id}`, values)
  //       .then((res) => {
  //         setRecords(...records, res.data);
  //       });
  //     resetForm();
  //     setOpenPopup(false);
  //   }
  // };

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        // else if (!target.value) return items("not found");
        else
          return items.filter((x) =>
            // for (var i = items; i <= items.length; i++) {
            //   x.i[items].toLowerCase().includes(target.value);
            // }
            x.FullName.toLowerCase().includes(target.value)
          );
      },
    });
  };

  return (
    <>
      <Paper className={classes.pageContent} >
        <div style={{ overflow: "hidden" }}>
          <div className="userdata" >
            <Toolbar className={classes.root}>
              <p className={classes.heading}></p>
              <InputControl
                variant="standard"
                className={classes.formInput}
                label="Search Employees"
                placeholder="Enter name..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                onChange={handleSearch}
              />
              {/* <ExcelFile
            element={
              <Tooltip title="Download">
                <IconButton
                  // onClick={excelDownloadHandler}
                  style={{ right: "25px" }}
                  className={classes.newButton}
                  aria-label="download"
                >
                  <FileDownloadOutlinedIcon />
                </IconButton>
              </Tooltip>
            }
          >
            <ExcelSheet dataset={EmployeeData} name="Employees" />
          </ExcelFile> */}

              <Button
                className={classes.newButton}
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => setOpenPopup(true)}
              >
                Add New
              </Button>
            </Toolbar>
            <TblContainer className="p-100">
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().map((item, index) => (
                  <TableRow style={{ height: "10px !important" }} key={index}>
                    <TableCell>{item.UserId}</TableCell>
                    <TableCell>{item.FullName}</TableCell>
                    <TableCell>{item.Email}</TableCell>
                    <TableCell>{ENUM_GENDER[item.Gender]}</TableCell>
                    <TableCell>{item.MobileNumber}</TableCell>
                    <TableCell
                      className={classes.dateofj}
                      style={{ padding: "0px 35px", width: "100px" }}
                    >
                      {item.DateOfJoining}
                    </TableCell>
                    <TableCell>
                      <ButtonGroup variant="text" className={classes.btnGroup}>
                        {/* <Button
                      onClick={() => {
                        openInPopup(item);
                      }}
                    >
                      Edit
                    </Button> */}
                        <Button
                          onClick={() => {
                            deleteItem(item);
                          }}
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TblContainer>
            <hr />
            <TblPagination />
          </div>
          <PopupComp
            title="User Form"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <AddRecuiter
            // recordForEdit={recordForEdit}
            // insertOrUpdate={insertOrUpdate}
            />
          </PopupComp>
        </div>
      </Paper>
    </>
  );
}

export default Recruiters;
