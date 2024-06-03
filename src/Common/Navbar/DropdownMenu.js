import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { UserData } from "../../Util/session";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function DropDownMenu() {
 
    const clearnfo=()=>{
        sessionStorage.removeItem("recruiter-details");
    }
  return (
    <PopupState variant="popover" popupId="demo-popup-menu" >
      {(popupState) => (
        <div className="">
          <Button variant="contained" style={{width:"170px"}} main {...bindTrigger(popupState)}>{UserData.FullName} <KeyboardArrowDownIcon className='ms-2'/>
          </Button>
          <Menu {...bindMenu(popupState)}>
            {/* <MenuItem onClick={popupState.close}>Profile</MenuItem> */}



            <MenuItem   style={{width:"170px"}} onClick={popupState.close}>
            <Link
            style={{width:"170px",color:"gray"}}
                to="/change-password"
              >Change Password
                </Link>
            </MenuItem>
            <MenuItem onClick={popupState.close} style={{width:"170px"}}>
            <Link
            // style={{color:""}}
            onClick={clearnfo}
            style={{width:"170px"}}
                // style={{ position: "absolute", margin: "-32px 0px 0px -20px" }}
                to="/"
              >
                Logout<LogoutIcon className='ms-2'/>
              </Link>
              </MenuItem>
          </Menu>
        </div>
      )} 
    </PopupState>
  );
}
