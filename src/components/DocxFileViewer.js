import React from 'react'
import * as docx from 'docx-preview';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { FileViewer } from 'react-file-viewer';


function PreviewWordDoc(file) {
  //URL of the Word Document.
  var url =file;

  //Send a XmlHttpRequest to the URL.
  var request = new XMLHttpRequest();
  request.open('GET', url, true); 
  request.setRequestHeader( 'Access-Control-Allow-Origin', '*');
  request.responseType = 'blob';
  request.onload = function () {
      //Set the ContentType to docx.
      var contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

      //Convert BLOB to File object.
      var doc = new File([request.response], contentType);

      //If Document not NULL, render it.
      if (doc != null) {
          //Set the Document options.
          var docxOptions = Object.assign(docx.defaultOptions, {
              useMathMLPolyfill: true
          });
          //Reference the Container DIV.
          var container = document.querySelector("#word-container");

          //Render the Word Document.
          docx.renderAsync(doc, container, null, docxOptions);
      }
  };
  request.send();
};

function DocxFileViewer(props) {
  const { file, type} = props;
  // console.log(file)
  // console.log(type)
  // return(
  //   <FileViewer
  //       fileType={type}
  //       filePath={file} />
  // )
  PreviewWordDoc(file);
  return(
    <div style={{marginLeft: '50%'}} id="word-container" className=""></div>
  )
    // const docs = [
    //     { uri: require('../Assets/Output.docx') }  
    //   ];
      // return <DocViewer documents={
      //   file.map((item) => ({
      //     uri: window.URL.createObjectURL(item),
      //     fileName: item.name,
      //   }))}
      //    pluginRenderers={DocViewerRenderers} />;
}

export default DocxFileViewer

