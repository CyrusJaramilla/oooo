import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteConfirmation from './DeleteConfirmation';

const Documents = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleteOpen, setIsDeleteOpen] = useState(false); 
  const [documentToDelete, setDocumentToDelete] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile || null);
  };

  const handleUpload = () => {
    if (!title || !description || !date || (!file && !isEditing)) {
      setMessage('Please fill in all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', date);

    if (file) {
      formData.append('file', file);
    }

    const url = isEditing
      ? `http://localhost:3001/api/coe/${documents[currentIndex]?.id}`
      : 'http://localhost:3001/api/coe';
    const method = isEditing ? 'put' : 'post';

    axios({
      method,
      url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        if (isEditing) {
          const updatedDocuments = [...documents];
          updatedDocuments[currentIndex] = response.data;
          setDocuments(updatedDocuments);
          setMessage('Document updated successfully!');
          setIsEditing(false);
        } else {
          setDocuments([...documents, response.data]);
          setMessage('Document uploaded successfully!');
        }

        setTitle('');
        setDescription('');
        setDate('');
        setFile(null);
        setCurrentIndex(null);
      })
      .catch((error) => {
        console.error('Error uploading the document!', error);
        setMessage('Error uploading document.');
      });
  };

  const handleDelete = (index) => {
    const document = documents[index];
    if (document?.id) {
      setDocumentToDelete(document);
      setIsDeleteOpen(true);
    } else {
      setMessage('Invalid document selected for deletion.');
    }
  };

  const confirmDelete = () => {
    if (documentToDelete) {
      axios.delete(`http://localhost:3001/api/coe/${documentToDelete.id}`)
        .then(() => {
          const updatedDocuments = documents.filter(doc => doc.id !== documentToDelete.id);
          setDocuments(updatedDocuments);
          setMessage('Document deleted successfully!');
          setIsDeleteOpen(false); 
          setDocumentToDelete(null); 
        })
        .catch((error) => {
          console.error('Error deleting the document!', error);
          setMessage('Error deleting document.');
        });
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteOpen(false); 
    setDocumentToDelete(null); 
  };

  const handleView = (fileName) => {
    if (!fileName) {
      setMessage('No file associated with this document.');
      return;
    }

    const fileURL = `http://localhost:3001/uploads/${fileName}`;
    console.log("Attempting to view file at:", fileURL);
    setLoading(true);
    axios.head(fileURL)
      .then((response) => {
        if (response.status === 200) {
          window.open(fileURL, '_blank');
        } else {
          setMessage('File not found or unable to open. Please check if the file exists.');
        }
      })
      .catch((error) => {
        console.error('Error opening file:', error);
        setMessage('File not found or unable to open. Please check if the file exists.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEdit = (index) => {
    const document = documents[index];
    setTitle(document.title);
    setDescription(document.description);
    setDate(document.date);
    setFile(null);
    setIsEditing(true);
    setCurrentIndex(index);
  };

  useEffect(() => {
    axios.get('http://localhost:3001/api/coe')
      .then((response) => {
        setDocuments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching the data!', error);
      });
  }, []);

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="document-container">
      <div className="header-container">
        <h2>{isEditing ? 'Edit Document' : 'COE Extension Docs'}</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by title or description"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="form-container">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input type="file" onChange={handleFileChange} />
        <button className="butt" onClick={handleUpload}>
          {isEditing ? 'Update' : 'Upload'}
        </button>
      </div>
      {message && <p>{message}</p>}
      {loading && <p>Loading...</p>} 

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDocuments.map((doc, index) => (
            <tr key={doc.id}>
              <td>{doc.id}</td>
              <td>{doc.title}</td>
              <td>{doc.description}</td>
              <td>{doc.date}</td>
              <td>
                <button className="butt" onClick={() => handleView(doc.file)}>
                  View
                </button>
                <button className="butt" onClick={() => handleEdit(index)}>
                  Edit
                </button>
                <button className="butt" onClick={() => handleDelete(index)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <DeleteConfirmation
        isOpen={isDeleteOpen}
        message="Are you sure you want to delete this document?"
        onConfirm={confirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default Documents;
