import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

function GetTimeTable() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <h1>PDF Viewer</h1>
      <Document
        file={`http://localhost:5000/pdf/:id`}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
     
    </div>
  );
}

export default GetTimeTable;
