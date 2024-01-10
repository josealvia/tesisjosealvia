import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const URI = 'http://localhost:5000/pago/';
const URICEDULA = 'http://localhost:5000/consultapagocedula/'

const CompShowPagos = () => {
  const [pagos, setPago] = useState([]);
  const [cedula, setCedula] = useState('');
  const [resultados, setResultados] = useState([]);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  //estados para el modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pagoToDeleteId, setPagoToDeleteId] = useState(null);

  //estados para la paginacion 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    getPagos();
  }, []);

  const getPagos = async () => {
    const res = await axios.get(URI);
    setPago(res.data);
    setCurrentPage(1);
  };

  //funciones del modal
  const openDeleteModal = (id) => {
    setPagoToDeleteId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setPagoToDeleteId(null);
    setShowDeleteModal(false);
  };


//procedimiento para eliminar todos los usuarios
  const deletePago = (id) => {
    openDeleteModal(id);
  };

  const confirmDelete = async () => {
    await axios.delete(`${URI}${pagoToDeleteId}`);
    getPagos();
    closeDeleteModal();
  };

  //paginacion

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPagos = pagos.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(pagos.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }


  const consultarPagoPorCedula = async () => {
    try {
      const response = await axios.get(`${URICEDULA}${cedula}`);
      
        setResultados(response.data);
        setMostrarResultados(true);
      
    } catch (error) {
      console.error(error);
    }
  };
const mostrarTodosLosPagos = () => {
    setMostrarResultados(false); // Cambia la bandera para mostrar todos los socios
    setCedula(''); // Limpia el campo de búsqueda
};


  /*return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <Link to="/createpago" className='btn btn-primary mt-2 mb-2'><i className="fa-solid fa-plus"></i></Link>
        </div>
        <div className="col-xs-6 col-sm-4">
                <div className="mt-5"> </div>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Número de cédula"
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                        style={{ borderRadius: "0.25rem" }}
                    />
                    <div className="input-group-append">
                        
                        <button className="btn btn-primary mb-2" onClick={consultarPagoPorCedula}>
                            Consultar
                        </button>
                    </div>
                </div>
          </div>


        <div>
          <table className='table'>
            <thead className='table-primary'>
              <tr>
                <th>Cedula Socio </th>
                <th>Nombres </th>
                <th>Apellidos </th>
                <th>Cantidad de pago  </th>
                <th>Fecha de pago  </th>
                <th>Estado  </th>
                <th>Acciones  </th>
              </tr>
            </thead>
            <tbody>
              { currentPagos.map((item, index) => (
                <tr key={item.id}>
                  <td> {item.socio.cedulasocio} </td>
                  <td> {item.socio.nombresocio}  </td>
                  <td> {item.socio.apellidosocio}</td>
                  <td>{item.cantidadpago} </td>
                  <td>{item.fechapago} </td>
                  <td> <li>{item.estadopago === 1 ? 'Pagado' : 'No pagado'} </li></td>
                  <td>

                  <Link to={`/cobrarpago/${item.id}`} className='btn btn-info'><i>Cobrar</i>   </Link>
                    <Link to={`/editpago/${item.id}`} className='btn btn-info'><i className="fa-solid fa-pen-to-square"></i>   </Link>
                    <button onClick={() => deletePago(item.id)} className='btn btn-danger'> <i className="fa-solid fa-trash-can"></i></button>
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

return(
        
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
          <h3>Lista de Pagos</h3>

      </div> 
      <div className='row'>      
          <div className='col'>
              <div className="mt-5"> </div>
              <Link to="/createpago" className="btn btn-primary mt-2 mb-2">
                  <i className="fas fa-plus"></i> Agregar Pago
              </Link>
          </div>
          <div className="col-xs-6 col-sm-4">
              <div className="mt-5"> </div>
              <div className="input-group mb-3">
                  <input
                      type="text"
                      className="form-control"
                      placeholder="Número de cédula"
                      value={cedula}
                      onChange={(e) => setCedula(e.target.value)}
                      style={{ borderRadius: "0.25rem" }}
                  />
                  <div className="input-group-append">
                      
                      <button className="btn btn-primary mb-2" onClick={consultarPagoPorCedula}>
                          Consultar
                      </button>
                  </div>
              </div>
          </div>

          <div>
              {mostrarResultados ? (
                  <div>
                      <button className="btn btn-primary mb-2" onClick={mostrarTodosLosPagos}>
                          Mostrar Todos los Socios
                      </button>
                      {resultados.length > 0 ?(
                          <table className="table table-striped custom-table">
                              <thead className="table-primary table-header">
                                  <tr>
                                    <th>Cedula Socio </th>
                                    <th>Nombres </th>
                                    <th>Apellidos </th>
                                    <th>Cantidad de pago  </th>
                                    <th>Fecha de pago  </th>
                                    <th>Estado  </th>
                                    <th>Acciones  </th>
                                  </tr>
                              </thead>
                              <tbody>
                                  { resultados.map ((item)=>(
                                      <tr key={item.id}> 
                                          <td> {item.socio.cedulasocio} </td>
                                          <td> {item.socio.nombresocio}  </td>
                                          <td> {item.socio.apellidosocio}</td>
                                          <td>{item.cantidadpago} </td>
                                          <td>{item.fechapago} </td>
                                          <td> <li>{item.estadopago === 1 || item.estadopago ===true ? 'Pagado' : 'No pagado'} </li></td>
                    
                                          <td>
                                          <Link to={`/cobrarpago/${item.id}`} className='btn btn-info action-button'><i>Cobrar </i>   </Link>
                                          <Link to={`/verpago/${item.id}`} className='btn btn-info action-button'><i>Ver </i>  </Link>
                                              
                                              <button onClick={()=>deletePago(item.id)} className='btn btn-danger action-button'> <i className="fa-solid fa-trash-can"></i></button>
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
                            <th>Cedula Socio </th>
                            <th>Nombres </th>
                            <th>Apellidos </th>
                            <th>Cantidad de pago  </th>
                            <th>Fecha de pago  </th>
                            <th>Estado  </th>
                            <th>Acciones  </th>
                          </tr>
                      </thead>
                      <tbody>
                          { currentPagos.map ((pago, index)=>(
                              <tr key={pago.id}  className={index % 2 === 0 ? 'even-row' : null}> 
                                  <td> {pago.socio.cedulasocio} </td>
                                  <td> {pago.socio.nombresocio}  </td>
                                  <td> {pago.socio.apellidosocio}</td>
                                  <td>{pago.cantidadpago} </td>
                                  <td>{pago.fechapago} </td>
                                  <td> <li>{pago.estadopago === 1 || pago.estadopago=== true ? 'Pagado' : 'No pagado'} </li></td>
                                  
                                  <td>
                                  <Link to={`/cobrarpago/${pago.id}`} className='btn btn-info action-button'><i>Cobrar</i>   </Link>
                                  <Link to={`/verpago/${pago.id}`} className='btn btn-info action-button'><i>Ver </i>  </Link>
                                    
                                      <button onClick={()=>deletePago(pago.id)} className='btn btn-danger action-button'> <i className="fa-solid fa-trash-can"></i></button>
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
                          ¿Estás seguro de que deseas eliminar este pago?
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


export default CompShowPagos;
