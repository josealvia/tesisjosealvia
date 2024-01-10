import axios from 'axios'
import { useEffect, useState } from 'react'
import {useNavigate , useParams} from 'react-router-dom'

const URI= 'http://localhost:5000/reunion/'
const URIUSUARIO= 'http://localhost:5000/usuario/'

const CompCreatereunion =()=>{

    const [formData, setFormData]=useState({
        seccionreunion: '',
        descripcionreunion: '',
        fechareunion: '',
        asistenciatomada: false,
        lugarreunion: '',
        idusuario: ''
    })

    const [usuarios , setUsuario]= useState([])
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate()
//
    
//
    useEffect(()=>{
        axios.get(URIUSUARIO)
        .then(response =>{
            setUsuario(response.data);
        })
        .catch(error => {
            console.error('Error al obtener los roles', error);
        })

    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Perform client-side validation
        const errors = validateForm(formData);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            const user = JSON.parse(localStorage.getItem('user'));
            if(user && user.id)
            {
                formData.idusuario = user.id;
            try {
                const response = await axios.post(URI, formData);
                const reunionId = response.data.id;
                navigate('/reunion');
            } catch (error) {
                console.error('Error al guardar la reunion', error);
            }
            } else {
            console.error('Error: User information not available.');
            setIsSubmitting(false);
            }
        };
    }

    const validateForm = (data) => {
        const errors = {};

        if (!data.seccionreunion) {
            errors.seccionreunion = 'Este campo es obligatorio.';
        }

        if (!data.descripcionreunion) {
            errors.descripcionreunion = 'Este campo es obligatorio.';
        }

        if (!data.fechareunion) {
            errors.fechareunion = 'Este campo es obligatorio.';
        }

        if (!data.lugarreunion) {
            errors.lugarreunion = 'Este campo es obligatorio.';
        }


        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    



    return(
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card mb-4">
                        <div className="card-header">Crear Reunion</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="seccion" className="form-label">
                                                Sección
                                            </label>
                                            <input
                                                id="seccion"
                                                name="seccionreunion"
                                                value={formData.seccionreunion}
                                                onChange={handleChange}
                                                type="text"
                                                className={`form-control ${
                                                    formErrors.seccionreunion ? 'is-invalid' : ''
                                                }`}
                                                required
                                            />
                                            {formErrors.seccionreunion && (
                                                <div className="invalid-feedback">{formErrors.seccionreunion}</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="descripcion" className="form-label">
                                                Descripción
                                            </label>
                                            <input
                                                id="descripcion"
                                                name="descripcionreunion"
                                                value={formData.descripcionreunion}
                                                onChange={handleChange}
                                                type="text"
                                                className={`form-control ${
                                                    formErrors.descripcionreunion ? 'is-invalid' : ''
                                                }`}
                                                required
                                            />
                                            {formErrors.descripcionreunion && (
                                                <div className="invalid-feedback">{formErrors.descripcionreunion}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="fecha" className="form-label">
                                                Fecha
                                            </label>
                                            <input
                                                id="fecha"
                                                name="fechareunion"
                                                value={formData.fechareunion}
                                                onChange={handleChange}
                                                type="datetime-local"
                                                className={`form-control ${
                                                    formErrors.fechareunion ? 'is-invalid' : ''
                                                }`}
                                                required
                                            />
                                            {formErrors.fechareunion && (
                                                <div className="invalid-feedback">{formErrors.fechareunion}</div>
                                            )}
                                        </div>
                                    </div>

                                    
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="lugar" className="form-label">
                                                Lugar
                                            </label>
                                            <input
                                                id="lugar"
                                                name="lugarreunion"
                                                value={formData.lugarreunion}
                                                onChange={handleChange}
                                                type="text"
                                                className={`form-control ${
                                                    formErrors.lugarreunion ? 'is-invalid' : ''
                                                }`}
                                                required
                                            />
                                            {formErrors.lugarreunion && (
                                                <div className="invalid-feedback">{formErrors.lugarreunion}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                    {isSubmitting ? 'Guardando...' : 'Guardar'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompCreatereunion

