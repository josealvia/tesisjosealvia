
import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const URI= 'http://localhost:5000/document/upload'

function DocumentUpload() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      await axios.post(URI, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Documento cargado con éxito');
      setFile(null);
      navigate('/document');
    } catch (error) {
      console.error(error);
      alert('Error al cargar el documento');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Cargar Documento</h2>
              <div className="input-group mb-3">
                <div className="custom-file">
                  <input type="file" className="custom-file-input" id="customFile" onChange={handleFileChange} />
                  <label className="custom-file-label" htmlFor="customFile">
                    {file ? file.name : 'Elegir archivo'}
                  </label>
                </div>
              </div>
              <div className="text-center">
                <button className="btn btn-primary" onClick={handleUpload} disabled={!file}>
                  Subir Documento
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentUpload;