import React, { useState } from 'react';

const CsvUploader = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('file', file);

      // Make a POST request to your API endpoint using fetch
      const response = await fetch("http://localhost:5000/importCSV", {
        method: 'POST',
        body: formData,
      });
      console.log(response);

      // Parse the response as JSON
      const data = await response.json();

      // Handle the response from the server
      console.log('File uploaded successfully', data);
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload CSV</button>
    </div>
  );
};

export default CsvUploader;
