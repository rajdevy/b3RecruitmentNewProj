import React, { useState } from "react";
import ResumeDataTable from "../../FunctionalComponents/ResumesDataTable/ResumeDataTable";
import "./Dashboard.css";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import MainLayout from "./MainLayout";

function ResumeContent() {
  const [searchHeader, setSearchHeader] = useState("Search Resume");
  return (
    // <div>
    //   <div className="dashboard">
    //     <div className="glass">
    //       <Sidebar className="sidebar" />
    //       <div className="dashboard-content">
    //         <div>
    //           <Navbar navHeader={searchHeader} />
    //         </div>
    <MainLayout selectedOption='3' navbarHeaderContent={searchHeader}>
      <ResumeDataTable  setSearchHeader={setSearchHeader} />
    </MainLayout>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default ResumeContent;
