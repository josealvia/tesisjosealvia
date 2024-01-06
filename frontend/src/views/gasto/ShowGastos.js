import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const URI = 'http://localhost:5000/gasto/';
const URIGASTOFECHA = 'http://localhost:5000/consultagasto/'

const CompShowGastos = () => {
  const [gastos, setGasto] = useState([]);
  const [fecha, setFecha] = useState('');
    const [resultados, setResultados] = useState([]);
    const [mostrarResultados, setMostrarResultados] = useState(false);

  //estados para el modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [gastoToDeleteId, setGastoToDeleteId] = useState(null);

  //estados para la paginacion 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    getGastos();
  }, []);

  const getGastos = async () => {
    const res = await axios.get(URI);
    setGasto(res.data);
    setCurrentPage(1);
  };

  //funciones del modal
  const openDeleteModal = (id) => {
    setGastoToDeleteId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setGastoToDeleteId(null);
    setShowDeleteModal(false);
  };


//procedimiento para eliminar todos los usuarios
  const deleteGasto = (id) => {
    openDeleteModal(id);
  };

  const confirmDelete = async () => {
    await axios.delete(`${URI}${gastoToDeleteId}`);
    getGastos();
    closeDeleteModal();
  };

  //paginacion

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentGastos = gastos.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(gastos.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const consultargasto = async () => {
    try {
      const response = await axios.get(`${URIGASTOFECHA}${fecha}`);
      
        setResultados(response.data);
        setMostrarResultados(true);
      
    } catch (error) {
      console.error(error);
    }
  };

  const mostrarTodosLosGastos = () => {
    setMostrarResultados(false); // Cambia la bandera para mostrar todos los socios
    setFecha(''); // Limpia el campo de búsqueda
};



  return (
    /*<div className='container'>
      <div className='mt-5'>
                <h3>Lista de gastos</h3>
      </div> 
      <div className='row'>
        <div className='col'>
        <div className="mt-5"> </div>
          <Link to="/creategasto" className='btn btn-primary mt-2 mb-2'>
            <i className="fas fa-plus"></i> Agregar gasto
          </Link>
        </div>
        <div>
          <table className='table'>
            <thead className='table-primary'>
              <tr>
                <th>Descripcion </th>
                <th>montogasto </th>
                <th>fechagasto </th>
                <th>id rubro  </th>
                <th>id usuario  </th>
                <th>Acciones  </th>
              </tr>
            </thead>
            <tbody>
              { currentGastos.map((item) => (
                <tr key={item.id}>
                  <td> {item.descripciongasto} </td>
                  <td> {item.montogasto}  </td>
                  <td> {item.fechagasto}</td>
                  <td>{item.rubro.nombrerubro} </td>
                  <td>{item.usuario.nombreusuario} </td>
                  <td>
                    <Link to={`/editgasto/${item.id}`} className='btn btn-info'><i className="fa-solid fa-pen-to-square"></i>   </Link>
                    <button onClick={() => deleteGasto(item.id)} className='btn btn-danger'> <i className="fa-solid fa-trash-can"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className='pagination'>
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button
                className={`page-link ${currentPage === number ? 'active' : ''}`}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {showDeleteModal && (
        <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar eliminación</h5>
                <button type="button" className="btn-close" onClick={closeDeleteModal}></button>
              </div>
              <div className="modal-body">
                ¿Estás seguro de que deseas eliminar este gasto?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>Cancelar</button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};*/


<div className='container'>
  
  <style>
  {`
    h3 {
      color: 	#FF0000;
    }
    .btn-primary {
      margin-bottom: 10px;
    }

    .input-group {
      margin-bottom: 20px;
    }

    .pagination {
      margin-top: 20px;
    }
    .table-container {
      margin-top: 20px;
      

    }

    .custom-table {
      width: 100%;
      border-collapse: collapse;
    }

    .table-header {
      background-color: #007BFF;
      color: #fff;
    }

    .even-row {
      background-color: #f8f9fa;
    }

    .action-button {
      margin-right: 5px;
    }

  `}
  </style>


  <div className='mt-5'>
      <h3>Lista de Gastos</h3>

  </div> 
  <div className='row'>      
      <div className='col'>
          <div className="mt-5"> </div>
          <Link to="/creategasto" className="btn btn-primary mt-2 mb-2">
              <i className="fas fa-plus"></i> Agregar Gasto
          </Link>
      </div>
      <div className="col-xs-6 col-sm-4">
          <div className="mt-5"> </div>
          <div className="input-group mb-3">
          <label htmlFor="fecha" className="form-label">Fecha:</label>
              <input
                  type="date"
                  id="fecha"
                  className="form-control"
                  placeholder="fecha"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  style={{ borderRadius: "0.25rem" }}
              />
              <div className="input-group-append">
                  
                  <button className="btn btn-primary mb-2" onClick={consultargasto}>
                      Consultar
                  </button>
              </div>
          </div>
      </div>

      <div>
          {mostrarResultados ? (
              <div>
                  <button className="btn btn-primary mb-2" onClick={mostrarTodosLosGastos}>
                      Mostrar Todas los Gastos
                  </button>
                  {resultados.length > 0 ?(
                      <table className="table table-striped custom-table">
                          <thead className="table-primary table-header">
                              <tr>
                                <th>Descripcion </th>
                                <th>montogasto </th>
                                <th>fechagasto </th>
                                <th>id rubro  </th>
                                <th>Acciones  </th>
                              </tr>
                          </thead>
                          <tbody>
                              { resultados.map ((item)=>(
                                  <tr key={item.id}> 
                                      <td> {item.descripciongasto} </td>
                                      <td> {item.montogasto}  </td>
                                      <td>{item.fechagasto} </td>
                                      <td>{item.rubro.nombrerubro} </td>
                                      <td>
                                          <Link to={`/editgasto/${item.id}`} className='btn btn-info action-button'><i className="fa-solid fa-pen-to-square"></i>   </Link>
                                          <button onClick={()=>deleteGasto(item.id)} className='btn btn-danger action-button'> <i className="fa-solid fa-trash-can"></i></button>
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                      ) : (
                      <p>No se encontraron resultados.</p>
                  )}
              </div>
          ):(
              <div className='table-container'>
              <table className='table table-striped custom-table'>
                  <thead className='table-primary table-header'>
                      <tr>
                        <th>Descripcion </th>
                        <th>montogasto </th>
                        <th>fechagasto </th>
                        <th>id rubro  </th>
                        <th>Acciones  </th>
                      </tr>
                  </thead>
                  <tbody>
                      { currentGastos.map ((gasto, index)=>(
                          <tr key={gasto.id}  className={index % 2 === 0 ? 'even-row' : null}> 
                              <td> {gasto.descripciongasto} </td>
                              <td> {gasto.montogasto}  </td>
                              <td> {gasto.fechagasto}</td>
                              <td>{gasto.rubro.nombrerubro} </td>
                              
                              <td>
                                  <Link to={`/editgasto/${gasto.id}`} className='btn btn-info action-button'><i className="fa-solid fa-pen-to-square"></i>   </Link>
                                  <button onClick={()=>deleteGasto(gasto.id)} className='btn btn-danger action-button'> <i className="fa-solid fa-trash-can"></i></button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table> 
              </div>   
          )}  
           
      </div>
      <ul className='pagination'>
          {pageNumbers.map((number) => (
              <li key={number} className="page-item">
                  <button
                      className={`page-link ${currentPage === number ? 'active' : ''}`}
                      onClick={() => setCurrentPage(number)}
                  >
                  {number}
                  </button>
              </li>
          ))}                  
      </ul>  
  </div>
  {showDeleteModal && (
          <div className="modal show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
              <div className="modal-dialog" role="document">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h5 className="modal-title">Confirmar eliminación</h5>
                          <button type="button" className="btn-close" onClick={closeDeleteModal}></button>
                      </div>
                      <div className="modal-body">
                      ¿Estás seguro de que deseas eliminar este Gasto?
                      </div>
                      <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" onClick={closeDeleteModal}>Cancelar</button>
                          <button type="button" className="btn btn-danger" onClick={confirmDelete}>Eliminar</button>
                      </div>
                  </div>
              </div>
          </div>
      )}
  </div>
)
}

export default CompShowGastos;
