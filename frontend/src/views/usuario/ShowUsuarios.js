import axios from 'axios'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

const URI = 'http://localhost:5000/usuario/'



const CompShowUsuarios=()=>{
    const [usuarios, setUsuario]= useState([])
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [usuarioToDeleteId, setUsuarioToDeleteId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    //estados para el modal
    

    useEffect(()=>{
        getUsuarios()

    },[])

    //procedimiento para mostrar todos los usuarios
    const getUsuarios = async ()=>{
        const res = await axios.get(URI)
        setUsuario(res.data)

    }

    const openDeleteModal = (id) => {
        setUsuarioToDeleteId(id);
        setShowDeleteModal(true);
    };
    const closeDeleteModal = () => {
        setUsuarioToDeleteId(null);
        setShowDeleteModal(false);
    };
    const deleteUsuario = (id) => {
        openDeleteModal(id);
    };

    const confirmDelete = async () => {
        await axios.delete(`${URI}${usuarioToDeleteId}`);
        getUsuarios();
        closeDeleteModal();
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    usuarios.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(usuarios.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }



    return(
        <div className='container'>
            <div className='mt-5'>
                <h3>Lista de Usuarios</h3>
            </div> 
            <div className='row'>
                <div className='col'>
                <div className="mt-5"> </div>
                    <Link to="/createusuario" className='btn btn-primary mt-2 mb-2'>
                        <i className="fa-solid fa-plus"></i> Agregar Usuario
                    </Link>
                </div>
                <div>
                    <table className='table table-striped custom-table'>
                        <thead className='table-primary table-header'>
                            <tr>
                                <th>nomusuario </th>
                                <th>Nombres </th>
                                <th>Correo </th>
                                <th>Telefono  </th>
                                <th>Rol  </th>
                                <th>Acciones  </th>
                            </tr>
                        </thead>
                        <tbody>
                            { usuarios.map ((usuario)=>(
                                <tr key={usuario.id}> 
                                    <td> {usuario.nombreusuario} </td>
                                    <td> {usuario.nombrecompletousuario}  </td>
                                    <td> {usuario.correousuario}</td>
                                    <td>{usuario.telefonousuario} </td>
                                    <td>{usuario.role.nombrerol} </td>
                                    <td>
                                        <Link to={`/editusuario/${usuario.id}`} className='btn btn-info action-button'><i className="fa-solid fa-pen-to-square"></i>   </Link>
                                        <button onClick={()=>deleteUsuario(usuario.id)} className='btn btn-danger action-button'> <i className="fa-solid fa-trash-can"></i></button>
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
                            ¿Estás seguro de que deseas eliminar este usuario?
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

}


export default CompShowUsuarios
