import React, { useState } from "react";
import Logo from "../../Assets/images/logo.png";
import LoginPageLayout from "../LoginPage/LoginPageLayout/LoginPageLayout";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

function Home() {
  const [isForgot, setIsForgot] = useState(false);

  const parentFunction = () => {
    setIsForgot((prevState) => !prevState);
    console.log(isForgot);
  };

  return (
    // <div className="home-container">
    //   <img alt="logo" src={Logo} />
    //   <div className="left-container">
    //     <h2>BitByBit Recruitement Service Desk</h2>
    //     <p className="web-desc">
    //     BitByBit Solutions is a growing and young TECHNOLOGY solutions providing start up based out of commercial capital of India i.e. Mumbai. An India based technology
    //     services provider firm specialized in providing IT Solutions to reputed clients in India and Indo-Pacific region.
    //     </p>
    //     <Button style={{marginLeft:'-50px'}} variant="outlined">
    //       <Link to="/login">Login/Register</Link>
    //     </Button>
    //   </div>
    //   <div className="right-container">
    //     <img alt="Sample" src={backpic} />
    //   </div>
    // </div>

    <div
      className="flex flex-col md:flex-row  items-center h-screen "
      style={{ backgroundColor: "#0060B5" }}
    >
      <div className="flex flex-col items-center py-10 ms:py-0 justify-center md:w-1/2 bg-white  md:h-screen">
        {/* <div className=" absolute top-2 left-2 "> <img alt="logo" width={100} className="ms-5" src={Logo} />
          
        </div> */}

        <img alt="logo" width={150} src={Logo} />
        <h2 className="text-base font-bold">BitByBit Solutions</h2>
        <p className="mt-10 bottom-2 text-xs md:w-96 mx-5 md:mx-0  font-semibold ">
          <h2 className="text-xl md:text-3xl   text-center md:text-left font-bold font-sans">
            BitByBit Recruitement Service Desk
          </h2>
          <br />
          BitByBit Solutions is a growing and young TECHNOLOGY solutions
          providing start up based out of commercial capital of India i.e.
          Mumbai. An India based technology services provider firm specialized
          in providing IT Solutions to reputed clients in India and Indo-Pacific
          region.
        </p>

        {/* <div className=""> */}
        <h3 className="fixed bg-neutral-200 p-2 bottom-0 w-screen text-center md:w-auto font-bold text-sm">
          Copyright © 2024 BitByBit Solutions All rights reserved.
        </h3>
        {/* </div> */}
      </div>

      <div className="flex justify-center w-1/2">
        {/* <h1 className="font-bold ms-10  text-white text-5xl " style={{ textShadow: '2px 2px 4px #000000' }}>
        Welcome !
      </h1> */}
        <div className="p-10 bg-blue-300 rounded-lg">
          {/* <div className="p-10  bg-blue-300"> */}
          {/* <div class="relative  bg-green-500"> */}
          <LoginPageLayout />

          {/* <div class="absolute -top-10 -left-10 w-20 flex justify-center align-middle  h-20 bg-white border rounded-lg" style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)' }}> */}
          {/* <PersonSearchIcon size="large" /> */}
          {/* </div>
            <div class="absolute -top-10 -right-10 w-20 p-5 h-20 bg-white border rounded-lg" style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)' }}>
              <img src={Img} alt="" />
              </div>
            <div class="absolute -bottom-10 -left-10 w-20 p-5 h-20 bg-white border rounded-lg" style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)' }}>
              <img src={Img} alt="" />
              </div>
            <div class="absolute -bottom-10 -right-10 w-20 p-5 h-20 bg-white border rounded-lg" style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)' }}>
              <img src={Img} alt="" />
              </div> */}

          {/* </div> */}
          {/* <LoginPageLayout/> */}
          {/* {(isForgot)?<ForgotPasswordLayout parentFunction={parentFunction}/>:<Login parentFunction={parentFunction} />} */}
        </div>
      </div>
    </div>
  );
}

export default Home;
