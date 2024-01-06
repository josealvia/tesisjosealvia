import axios from 'axios'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

const URI = 'http://localhost:5000/reunion/'
const URIREUNIONFECHA = 'http://localhost:5000/consultareunion/'



const CompShowReuniones=()=>{
    const [reuniones, setReunion]= useState([])
    const [fecha, setFecha] = useState('');
    const [resultados, setResultados] = useState([]);
    const [mostrarResultados, setMostrarResultados] = useState(false);

    //estados para el modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [reunionToDeleteId, setReunionToDeleteId] = useState(null);

    //estados para la paginacion 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);


    useEffect(()=>{
        getReuniones()

    },[])

    //procedimiento para mostrar todos los usuarios
    const getReuniones = async ()=>{
        const res = await axios.get(URI)
        setReunion(res.data)
        setCurrentPage(1);


    }

    //funciones del modal
    const openDeleteModal = (id) => {
        setReunionToDeleteId(id);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setReunionToDeleteId(null);
        setShowDeleteModal(false);
    };




    //procedimiento para eliminar todos los usuarios
    const deleteReunion = (id)=>{
        openDeleteModal(id);
        //axios.delete(`${URI}${id}`)
        //getReuniones()

    }

    const confirmDelete = async () => {
        await axios.delete(`${URI}${reunionToDeleteId}`);
        getReuniones();
        closeDeleteModal();
      };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentReuniones = reuniones.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(reuniones.length / itemsPerPage); i++) {
    pageNumbers.push(i);
    }  

    const consultarreunion = async () => {
        try {
          const response = await axios.get(`${URIREUNIONFECHA}${fecha}`);
          
            setResultados(response.data);
            setMostrarResultados(true);
          
        } catch (error) {
          console.error(error);
        }
      };
    const mostrarTodosLasReuniones = () => {
        setMostrarResultados(false); // Cambia la bandera para mostrar todos los socios
        setFecha(''); // Limpia el campo de búsqueda
    };



    /*return(
        <div className='container'>
            <div className='mt-5'>
                <h3>Lista de reuniones</h3>
            </div> 
            <div className='row'>
                <div className='col'>
                <div className="mt-5"> </div>
                    <Link to="/createreunion" className='btn btn-primary mt-2 mb-2'>
                        <i className="fas fa-plus"></i>Agregar reunión
                    </Link>
                </div>
                <div>
                    <table className='table'>
                        <thead className='table-primary'>
                            <tr>
                                <th>Sección </th>
                                <th>Descripción de la reunión </th>
                                <th>Fecha </th>
                                <th>Lugar  </th>
                                <th>Id de usuario </th>
                                <th>Acciones  </th>
                            </tr>
                        </thead>
                        <tbody>
                            { currentReuniones.map ((reunion)=>(
                                <tr key={reunion.id}> 
                                    <td> {reunion.seccionreunion} </td>
                                    <td> {reunion.descripcionreunion}  </td>
                                    <td> {reunion.fechareunion}</td>
                                    <td>{reunion.lugarreunion} </td>
                                    <td>{reunion.usuario.nombreusuario} </td>
                                    <td>
                                        <Link to={`/editreunion/${reunion.id}`} className='btn btn-info'><i className="fa-solid fa-pen-to-square"></i>   </Link>
                                        <button onClick={()=>deleteReunion(reunion.id)} className='btn btn-danger'> <i className="fa-solid fa-trash-can"></i></button>
                                        <Link to={`/tomarasistencia/${reunion.id}`} className='btn btn-info'><i> Lista</i>   </Link>
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
                            ¿Estás seguro de que deseas eliminar esta reunión?
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
            <h3>Lista de Reuniones</h3>
  
        </div> 
        <div className='row'>      
            <div className='col'>
                <div className="mt-5"> </div>
                <Link to="/createreunion" className="btn btn-primary mt-2 mb-2">
                    <i className="fas fa-plus"></i> Agregar Reunión
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
                        
                        <button className="btn btn-primary mb-2" onClick={consultarreunion}>
                            Consultar
                        </button>
                    </div>
                </div>
            </div>
  
            <div>
                {mostrarResultados ? (
                    <div>
                        <button className="btn btn-primary mb-2" onClick={mostrarTodosLasReuniones}>
                            Mostrar Todas las Reuniones
                        </button>
                        {resultados.length > 0 ?(
                            <table className="table table-striped custom-table">
                                <thead className="table-primary table-header">
                                    <tr>
                                        <th>Sección </th>
                                        <th>Descripción de la reunión </th>
                                        <th>Fecha </th>
                                        <th>Asistencia </th>
                                        <th>Lugar  </th>
                                        <th>Acciones  </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { resultados.map ((item)=>(
                                        <tr key={item.id}> 
                                            <td> {item.seccionreunion} </td>
                                            <td> {item.descripcionreunion}  </td>
                                            <td> {item.fechareunion}</td>
                                            <td> <li>{item.asistenciatomada === 1 || item.asistenciatomada ===true ? 'Si' : 'No'} </li></td>
                                            <td>{item.lugarreunion} </td>
                                            <td>
                                                <Link to={`/editreunion/${item.id}`} className='btn btn-info action-button'><i className="fa-solid fa-pen-to-square"></i>   </Link>
                                                <button onClick={()=>deleteReunion(item.id)} className='btn btn-danger action-button'> <i className="fa-solid fa-trash-can"></i></button>
                                                <Link to={`/tomarasistencia/${item.id}`} className='btn btn-info action-button'><i> Lista</i>   </Link>
                                                <Link to={`/verasistencia/${item.id}`} className='btn btn-info action-button'><i> Ver</i>   </Link>
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
                                <th>Sección </th>
                                <th>Descripción de la reunión </th>
                                <th>Fecha </th>
                                <th>Asistencia </th>
                                <th>Lugar  </th>
                                <th>Acciones  </th>
                            </tr>
                        </thead>
                        <tbody>
                            { currentReuniones.map ((reunion, index)=>(
                                <tr key={reunion.id}  className={index % 2 === 0 ? 'even-row' : null}> 
                                    <td> {reunion.seccionreunion} </td>
                                    <td> {reunion.descripcionreunion}  </td>
                                    <td> {reunion.fechareunion}</td>
                                    <td> <li>{reunion.asistenciatomada === 1 || reunion.asistenciatomada=== true ? 'Si' : 'No'} </li></td>
                                    <td>{reunion.lugarreunion} </td>
                                    
                                    <td>
                                        <Link to={`/editreunion/${reunion.id}`} className='btn btn-info action-button'><i className="fa-solid fa-pen-to-square"></i>   </Link>
                                        <button onClick={()=>deleteReunion(reunion.id)} className='btn btn-danger action-button'> <i className="fa-solid fa-trash-can"></i></button>
                                        <Link to={`/tomarasistencia/${reunion.id}`} className='btn btn-info'><i> Lista</i>   </Link>
                                        <Link to={`/verasistencia/${reunion.id}`} className='btn btn-info action-button'><i> Ver</i>   </Link>
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
                            ¿Estás seguro de que deseas eliminar esta Reunión?
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
  

export default CompShowReuniones
