import React, { createContext, useState, useContext } from 'react';
export const FileCountContext = createContext();

export const FileCountProvider = ({ children }) => {
  const [fileCounts, setFileCounts] = useState({
    cit: 0,
    coed: 0,
    coe: 0,
    cas: 0,
  });

  const addFile = (category) => {
    setFileCounts((prevCounts) => ({
      ...prevCounts,
      [category]: prevCounts[category] + 1,
    }));
  };

  return (
    <FileCountContext.Provider value={{ fileCounts, addFile }}>
      {children}
    </FileCountContext.Provider>
  );
};


const CiteExtension = () => {
  const [category, setCategory] = useState('cit'); 
  const { addFile } = useContext(FileCountContext); 

  const handleFileUpload = () => {
    addFile(category);
  };

  return (
    <div>
      <h2>Upload File to Cit Extension</h2>
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="cit">CIT</option>
        <option value="coed">COED</option>
        <option value="coe">COE</option>
        <option value="cas">CAS</option>
      </select>
      <button onClick={handleFileUpload}>Upload File</button>
    </div>
  );
};

export default CiteExtension;
