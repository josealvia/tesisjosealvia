import axios from 'axios'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

const URI = 'http://localhost:5000/rubro/'



const CompShowRubros=()=>{
    const [rubros, setRubro]= useState([])
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [rubroToDeleteId, setRubroToDeleteId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);



    useEffect(()=>{
        getRubros()

    },[])

    //procedimiento para mostrar todos los rubros
    const getRubros = async ()=>{
        const res = await axios.get(URI)
        setRubro(res.data)
        setCurrentPage(1);

    }

    //funciones del modal
    const openDeleteModal = (id) => {
        setRubroToDeleteId(id);
        setShowDeleteModal(true);
    };
    const closeDeleteModal = () => {
        setRubroToDeleteId(null);
        setShowDeleteModal(false);
      };



    //procedimiento para eliminar todos los usuarios
    const deleteRubro = (id) => {
        openDeleteModal(id);
    };

    const confirmDelete = async () => {
        await axios.delete(`${URI}${rubroToDeleteId}`);
        getRubros();
        closeDeleteModal();
    };

    //paginacion

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentRubros = rubros.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(rubros.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <div className='container'>
            <div className='mt-5'>
                <h3>Lista de rubros</h3>
            </div> 
            <div className='row'>
                <div className='col'>
                <div className="mt-5"> </div>
                    <Link to="/createrubro" className='btn btn-primary mt-2 mb-2'>
                        <i className="fas fa-plus"></i> Agregar rubro
                    </Link>
                </div>
                <div>
                    <table className='table table-striped custom-table'>
                        <thead className='table-primary table-header'>
                            <tr>
                                <th>Nombre del Rubro </th>
                                <th>Total </th>
                                <th>Acciones  </th>
                            </tr>

                        </thead>
                        <tbody>
                            { currentRubros.map ((rubro)=>(
                                <tr key={rubro.id}> 
                                    <td> {rubro.nombrerubro} </td>
                                    <td> {rubro.totalrubro}  </td>
                                    
                                    <td>
                                        <Link to={`/editrubro/${rubro.id}`} className='btn btn-info action-button'><i className="fa-solid fa-pen-to-square"></i>   </Link>
                                        <button onClick={()=>deleteRubro(rubro.id)} className='btn btn-danger action-button'> <i className="fa-solid fa-trash-can"></i></button>
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
                            ¿Estás seguro de que deseas eliminar este rubro?
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

export default CompShowRubros
