import {
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useState } from "react";
import ResumeContent from "./ResumesContainer";
import Logo from "../../Assets/images/logo.png";
import { Link } from "react-router-dom";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import AddIcon from "@mui/icons-material/Add";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Navbar from "../Navbar/Navbar";
import { UserData } from "../../Util/session";
import { ENUM_USERTYPE } from "../../Util/Enums";
// import "./Dashboard.css";
import PopupComp from "../../components/PopupComp";
import InputControl from "../../components/form-controls/InputControl";
import AddNewSkill from "../AddNewSkill";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const MainLayout = (props) => {

  const UserType = UserData == null ? null : ENUM_USERTYPE[UserData.UserType];

  const items = [
   
    getItem(
      <p className="inline-block relative group group-hover:text-[#0087ca]">
      <Link to="/dashboard" className="text-[#0087ca]">
        Dashboard
      </Link>
      <span
        className="block absolute w-full h-[2px] bg-[#0087ca] bottom-0 left-0 transform scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100 origin-bottom-left"
      />
    </p>
     ,
      "1",
      <HomeOutlinedIcon />
    ),
    UserType
      ? UserType.toLowerCase() === "admin"
        ? getItem(
            <Link to="/users-info">
              Users Info
            </Link>,
            "2",
            <PersonOutlineOutlinedIcon />
          )
        : ""
      : "",
    getItem(
      <Link to="/resumes">
        Search Resumes
      </Link>,
      "3",
      <InsertDriveFileOutlinedIcon />
    ),
    getItem(
      <Link to="/add-new-resume">
        Add Resume
      </Link>,
      "4",
      <PostAddOutlinedIcon />
    ),
    UserType.toLowerCase() === "admin"
      ? getItem(
          <Link onClick={() => setOpenPopup(true)} to="#">
            Add Skill
          </Link>,
          "5",
          <AddIcon />
        )
      : "",
  ];
  const [openPopup, setOpenPopup] = useState(false);

  const { navbarHeaderContent, selectedOption, children } = props;
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <Layout
        style={{
          minHeight: "100vh"

        }}
      >
        <Sider
          // style={{ background: "#f0f0f0" }}
          style={{ background: "white" }}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Link to="/dashboard">
            <img
              // className={collapsed ? "logoImgSide" : "logoImg"}
              src={Logo}
              alt=""
            />
          </Link>
          <Menu
            style={{
              marginTop: "20px",
              // background: "#f0f0f0",
              // background: "green",
              color: "#000",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
            selectedKeys={selectedOption}
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            // style={{background: '#3a497f'}}
            // {items.map((item, index)  =>{
            //   return {
            //     ...item,
            //     label:<Link to={item.path}>{item.label}</Link>,
            //     key: item.key
            //   }
            // } )} />    }
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            style={{
              padding: 0,
              // background: colorBgContainer,
              // background: "yellow",
            }}
          >
            <Navbar navHeader={navbarHeaderContent} />
          </Header>
          <Content
            style={{
              margin: "0 0 px",
              // background: "red",
                // background: "blue",

              overflowY: "auto",
            }}
          >
            <div
              style={{
                // padding: 24,
                padding: "25px 0px",
                minHeight: 360,
                height: "90vh",
                
                // background: "#efeef1",
                   background: "#0060B5",
                // background: colorBgContainer,
              }}
            >
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
      <PopupComp
        title="Add Skill"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <AddNewSkill />
      </PopupComp>
    </>
  );
};
export default MainLayout;
