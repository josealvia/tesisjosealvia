import axios from 'axios'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import '../../style.css'

const URI = 'http://localhost:5000/socio/'
const URICEDULA = 'http://localhost:5000/consulta/'



const CompShowSocios=()=>{
    const [socios, setSocio]= useState([])
    const [cedula, setCedula] = useState('');
    const [resultados, setResultados] = useState([]);
    const [mostrarResultados, setMostrarResultados] = useState(false);

    //estados para el modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [socioToDeleteId, setSocioToDeleteId] = useState(null);
    

    // esta para paginador 
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    useEffect(()=>{
        getSocios()

    },[])

    //procedimiento para mostrar todos los usuarios
    const getSocios = async ()=>{
        const res = await axios.get(URI)
        setSocio(res.data)
        //paginador
        setCurrentPage(1);

    }

    //funciones del modal
    const openDeleteModal = (id) => {
        setSocioToDeleteId(id);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setSocioToDeleteId(null);
        setShowDeleteModal(false);
    };




    //procedimiento para eliminar todos los usuarios
    const deleteSocio = (id)=>{
        openDeleteModal(id);
        //axios.delete(`${URI}${id}`)
        //getSocios()

    }
    const confirmDelete = async () => {
        await axios.delete(`${URI}${socioToDeleteId}`);
        getSocios();
        closeDeleteModal();
      };


    const consultarPorCedula = async () => {
        try {
          const response = await axios.get(`${URICEDULA}${cedula}`);
          
            setResultados(response.data);
            setMostrarResultados(true);
          
        } catch (error) {
          console.error(error);
        }
      };
    const mostrarTodosLosSocios = () => {
        setMostrarResultados(false); // Cambia la bandera para mostrar todos los socios
        setCedula(''); // Limpia el campo de búsqueda
    };
    


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSocios = socios.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(socios.length / itemsPerPage); i++) {
    pageNumbers.push(i);
    }   

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
            <h3>Lista de socios</h3>

        </div> 
        <div className='row'>      
            <div className='col'>
                <div className="mt-5"> </div>
                <Link to="/createsocio" className="btn btn-primary mt-2 mb-2">
                    <i className="fas fa-plus"></i> Agregar Socio
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
                        
                        <button className="btn btn-primary mb-2" onClick={consultarPorCedula}>
                            Consultar
                        </button>
                    </div>
                </div>
            </div>

            <div>
                {mostrarResultados ? (
                    <div>
                        <button className="btn btn-primary mb-2" onClick={mostrarTodosLosSocios}>
                            Mostrar Todos los Socios
                        </button>
                        {resultados.length > 0 ?(
                            <table className="table table-striped custom-table">
                                <thead className="table-primary table-header">
                                    <tr>
                                        <th>N° Cédula</th>
                                        <th>Nombres</th>
                                        <th>Apellidos</th>
                                        <th>Dirección</th>
                                        <th>telefono</th>
                                        <th>Correo</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { resultados.map ((persona)=>(
                                        <tr key={persona.id}> 
                                            <td> {persona.cedulasocio} </td>
                                            <td> {persona.nombresocio}  </td>
                                            <td> {persona.apellidosocio}</td>
                                            <td>{persona.direccionsocio} </td>
                                            <td>{persona.telefonosocio} </td>
                                            <td>{persona.correosocio} </td>
                                            <td>
                                                <Link to={`/editsocio/${persona.id}`} className='btn btn-info action-button'><i className="fa-solid fa-pen-to-square"></i>   </Link>
                                                <button onClick={()=>deleteSocio(persona.id)} className='btn btn-danger action-button'> <i className="fa-solid fa-trash-can"></i></button>
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
                                <th>N° Cédula </th>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Dirección</th>
                                <th>telefono</th>
                                <th>Correo</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            { currentSocios.map ((socio, index)=>(
                                <tr key={socio.id}  className={index % 2 === 0 ? 'even-row' : null}> 
                                    <td> {socio.cedulasocio} </td>
                                    <td> {socio.nombresocio}  </td>
                                    <td> {socio.apellidosocio}</td>
                                    <td>{socio.direccionsocio} </td>
                                    <td>{socio.telefonosocio} </td>
                                    <td>{socio.correosocio} </td>
                                    <td>
                                        <Link to={`/editsocio/${socio.id}`} className='btn btn-info action-button'><i className="fa-solid fa-pen-to-square"></i>   </Link>
                                        <button onClick={()=>deleteSocio(socio.id)} className='btn btn-danger action-button'> <i className="fa-solid fa-trash-can"></i></button>
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
                            ¿Estás seguro de que deseas eliminar este socio?
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

export default CompShowSocios
