import Logo from '../../Assets/images/logo.png'
import React, { useState } from "react";
import "./Sidebar.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Link } from "react-router-dom";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import AddIcon from "@mui/icons-material/Add";
import { UserData } from "../../Util/session";
import { ENUM_USERTYPE } from "../../Util/Enums";

const Sidebar = () => {
  // const [isActive, setIsActive] = useState(true)

  // const linkStyle = ((isActive) => {
  //   return {
  //     fontWeight: isActive ? 'bold' : 'normal',
  //   }
  // })
  //  const [sidebar, setSidebar] = useState(true);

  // const showSidebar = () => {
  //   setSidebar(!sidebar);
  // };
  const refreshPage = () => {
    window.location("#").reload(true);
  };

  const UserType = ENUM_USERTYPE[UserData.UserType];

  return (<></>
    // <div className={sidebar ? "nav-menu active" : "nav-menu"}>
    //     {/* logo */}
    //     <div className="logo">
    //         <img src={Logo} alt="" />
    // </div>

    // <div className="sidebar">
    //   {/* logo */}
    //   <div className="logo">
    //     <Link to="/dashboard">
    //       <img className="logoImg" src={Logo} alt="" />
    //     </Link>
    //   </div>

    //   {/* Menu */}

    //   <div>
    //     <ul className="menu ">
    //       <li className="menuItem ">
    //         <Link className="linkText" to="/dashboard">
    //           <HomeOutlinedIcon />
    //           Dashboard
    //         </Link>
    //       </li>

    //       {UserType.toLowerCase() === "admin" ? (
    //         <li className="menuItem">
    //           <Link onClick={refreshPage} to="/users-info">
    //             <PersonOutlineOutlinedIcon />
    //             Users Info
    //           </Link>
    //         </li>
    //       ) : (
    //         ""
    //       )}
    //       <li className="menuItem">
    //         <Link onClick={refreshPage} to="/resumes">
    //           <InsertDriveFileOutlinedIcon fontSize="small" />
    //           Search Resumes
    //         </Link>
    //       </li>
    //       <li className="menuItem">
    //         <Link onClick={refreshPage} to="/add-new-resume">
    //           <AddIcon fontSize="small" />
    //           Add New Resume
    //         </Link>
    //       </li>
    //     </ul>
    //   </div>

    //   {/* <div className="menuItem">
    //       <Button id='btn-logout' variant='outlined' ><Link to='/login'>Logout</Link></Button>
    //       </div> */}
    // </div>
  );
};

export default Sidebar