import axios from 'axios'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

const URI = 'http://localhost:5000/rol/'



const CompShowRol=()=>{
    const [roles, setRoles]= useState([])
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [rolToDeleteId, setRolToDeleteId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);



    useEffect(()=>{
        getRoles()

    },[])

    //procedimiento para mostrar todos los rubros
    const getRoles = async ()=>{
        const res = await axios.get(URI)
        setRoles(res.data)
        setCurrentPage(1);

    }

    //funciones del modal
    const openDeleteModal = (id) => {
        setRolToDeleteId(id);
        setShowDeleteModal(true);
    };
    const closeDeleteModal = () => {
        setRolToDeleteId(null);
        setShowDeleteModal(false);
      };



    //procedimiento para eliminar todos los usuarios
    const deleteRol = (id) => {
        openDeleteModal(id);
    };

    const confirmDelete = async () => {
        await axios.delete(`${URI}${rolToDeleteId}`);
        getRoles();
        closeDeleteModal();
    };

    //paginacion

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentRol = roles.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(roles.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <div className='container'>
            <div className='mt-5'>
                <h3>Lista de roles</h3>
            </div> 
            <div className='row'>
                <div className='col'>
                <div className="mt-5"> </div>
                    <Link to="/createrol" className='btn btn-primary mt-2 mb-2'>
                        <i className="fas fa-plus"></i> Agregar rol
                    </Link>
                </div>
                <div>
                    <table className='table table-striped custom-table'>
                        <thead className='table-primary table-header'>
                            <tr>
                                <th>Nombre del Rol </th>
                                <th>Acciones  </th>
                            </tr>

                        </thead>
                        <tbody>
                            { currentRol.map ((rol)=>(
                                <tr key={rol.id}> 
                                    <td> {rol.nombrerol} </td>        
                                    <td>
                                        <Link to={`/editrol/${rol.id}`} className='btn btn-info action-button'><i className="fa-solid fa-pen-to-square"></i>   </Link>
                                        <button onClick={()=>deleteRol(rol.id)} className='btn btn-danger action-button'> <i className="fa-solid fa-trash-can"></i></button>
                                    </td>
                                </tr>                            ))}
                        </tbody>                    </table>                </div>
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
                            ¿Estás seguro de que deseas eliminar este rol?
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

export default CompShowRol
