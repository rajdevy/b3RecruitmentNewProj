import React from "react";
import Recruiters from "../../FunctionalComponents/RecruitersInfo/Recruiters";
// import { Users } from "../../components/Users";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import MainLayout from "./MainLayout";



const UserInfo = () => {
  // const [records] = useState(Users);
  // const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
  //   UseDataTable(records, headCells);

  return (
    <MainLayout selectedOption='2' navbarHeaderContent = "Users Information" >
    <Recruiters />
    
    </MainLayout>
  );
};

export default UserInfo;


// <div className="userinfo">
//       <div className="dashboard">
//         <div className="glass">
//           <div className="dashboard-content">
//             <div
//               className="userdata"
//               style={{
//                 height: "auto",
//                 paddingBottom: "30px",
//               }}
//             >
//               <Recruiters />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>