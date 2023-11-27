import React, { useState } from 'react';

function TimeTable() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('pdfFile', file);

      const response = await fetch('http://localhost:5000/upload-timetable', {
        method: 'POST',
        body: formData,
        headers: {
          // Omit 'Content-Type' header to let the browser set it automatically for FormData
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      alert('PDF uploaded successfully!');
    } catch (error) {
      console.error('Error uploading PDF', error);
    }
  };

  return (
    <div>
      <h1>PDF Uploader</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload PDF</button>
    </div>
  );
}

export default TimeTable;
