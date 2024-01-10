import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const URI = 'http://localhost:5000/document/'

function CompShowFiles() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET al servidor para obtener la lista de documentos
    axios.get(URI)
      .then((response) => {
        setDocuments(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener documentos:', error);
      });
  }, []); // El segundo argumento vacío asegura que la solicitud se realice solo una vez al montar el componente

  const downloadFile = (documentId) => {
   
  window.open(`${URI}download/${documentId}`);
  };

  
  return (
    
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <Link to="/createdocument" className="btn btn-primary">
            <i className="fas fa-plus"></i> Crear Documento
          </Link>
        </div>
      </div>
      <div className="row">
        <div className="col mb-4">
          <h1>Lista de Documentos</h1>
          <ul className="list-group">
            {documents.map((document) => (
              <li key={document.id} className="list-group-item d-flex justify-content-between align-items-center">
                {document.name}
                <div className="btn-group" role="group">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => downloadFile(document.id)}
                  >
                    Descargar
                  </button>
                  
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}


export default CompShowFiles;