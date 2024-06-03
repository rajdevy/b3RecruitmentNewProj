import React from "react";
import "./ResumeModal.css";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";
import ResumeFile from "../../Assets/Resume-Mangal.pdf";
import ActionButtonControl from "../../components/form-controls/ActionButtonControl";
import { saveAs } from "file-saver";

function ResumeModal(props) {
  const openImage = () => {
    window.open(ResumeFile);
  };
  return (
    <div className="resume-modal">
      <div className="modal-image">
        <img
          src="https://resumegenius.com/wp-content/uploads/2022-Modern-Resume-Template-Hub.png"
          onClick={openImage}
          alt=""
        ></img>
      </div>
      <div>
        <ActionButtonControl onClick={() => saveAs(ResumeFile)}>
          <DownloadForOfflineOutlinedIcon style={{ paddingRight: "5px" }} />
          Download
        </ActionButtonControl>
      </div>
    </div>
  );
}

export default ResumeModal;
