import React, { useRef, useState } from "react";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { Document, Page } from "react-pdf";

function PdfViewer(props) {
  const {
    pdf = "http://localhost:62075//ResumeFiles/Resume%20(1).pdf",
    width,
    scale,
    height,
  } = props;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const divRef = useRef();

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleNextPage = (e) => {
    e.preventDefault();
    if (pageNumber < numPages) {
      setPageNumber((prevState) => prevState + 1);
    }
  };

  const handlePrevPage = (e) => {
    e.preventDefault();
    if (pageNumber > 1) {
      setPageNumber((prevState) => prevState - 1);
    }
  };
  return (
    <div ref={divRef}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          // marginTop: "-80px",
        }}
      >
        <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            scale={scale}
            pageNumber={pageNumber}
            // width={divRef.current?.clientWidth * 2}
            width={"350"}
            // className="w-full overflow-hidden"
          />
        </Document>
      </div>
      <div style={{ margin: "10px 0", float: "right", padding: "10px" }}>
        {pageNumber > 1 && (
          <button onClick={handlePrevPage}>
            <ArrowCircleLeftOutlinedIcon />
          </button>
        )}
        {pageNumber < numPages && (
          <button onClick={handleNextPage}>
            <ArrowCircleRightOutlinedIcon />
          </button>
        )}
      </div>
      <div>
        <big>{pageNumber}</big>/<small>{numPages}</small>
      </div>
    </div>
  );
}

export default PdfViewer;

// import React from "react";

// const PdfViewer = () => {
//   return <div>PdfViewer</div>;
// };

// export default PdfViewer;
