import React from "react";
import Chart from "../../features/Chart";
import StatsContainer from "../../features/Stats/StatsContainer";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./Dashboard.css";
import MainLayout from "./MainLayout";

function Dashboard() {
  // let result = FetchedData();

  // console.log(result);

  return (
    // <div className="dashboard">
    //   <div className="glass">
    //     <Sidebar className="sidebar" />
    //     <div className="dashboard-content">
    //       <div>
    //         <Navbar navHeader="Dashboard" className="navbar" />
    //       </div>
    <MainLayout navbarHeaderContent = "Dashboard" >
        <div className="glass" style={{marginTop:'-20px'}}>
         <div className="dashboard-content">

          <div className="divOne" >
            <StatsContainer />
          </div>
          <div className="divTwo">
            <Chart />
          </div>
          </div>
          </div>
          </MainLayout>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Dashboard;
