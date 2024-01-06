import axios from 'axios'
import { useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

const URI= 'http://localhost:5000/gasto/'
const URIUSUARIO= 'http://localhost:5000/usuario/'
const URIRUBRO= 'http://localhost:5000/rubro/'

const CompCreategasto =()=>{

    const [formData, setFormData] = useState({
        descripciongasto: '',
        montogasto: '',
        fechagasto: '',
        idrubro: '',
        idusuario: '',

    })
    
    const [usuarios , setUsuario]= useState([])
    const [rubros , setRubro]= useState([])
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
   
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get(URIUSUARIO)
        .then(response =>{
            setUsuario(response.data);
        })
        .catch(error => {
            console.error('Error al obtener los roles', error);
        })

        axios.get(URIRUBRO)
        .then(response =>{
            setRubro(response.data);
        })
        .catch(error => {
            console.error('Error al obtener los rubros', error);
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
                await axios.post(URI, formData);
                navigate('/gasto');
            } catch (error) {
                console.error('Error al guardar el gasto', error);
            }
            } else {
                setIsSubmitting(false);
            }
        };
    }

    // Validate the form data
    const validateForm = (data) => {
        const errors = {};

        if (!data.descripciongasto) {
            errors.descripciongasto = 'Este campo es obligatorio.';
        }

        if (!data.montogasto) {
            errors.montogasto = 'Este campo es obligatorio.';
        }

        if (!data.fechagasto) {
            errors.fechagasto = 'Este campo es obligatorio.';
        }

        if (!data.idrubro) {
            errors.idrubro = 'Este campo es obligatorio.';
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
                        <div className="card-header">Crear Gasto</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="descripcion" className="form-label">
                                                Descripción
                                            </label>
                                            <input
                                                id="descripcion"
                                                name="descripciongasto"
                                                value={formData.descripciongasto}
                                                onChange={handleChange}
                                                type="text"
                                                className={`form-control ${
                                                    formErrors.descripciongasto ? 'is-invalid' : ''
                                                }`}
                                                required
                                            />
                                            {formErrors.descripciongasto && (
                                                <div className="invalid-feedback">{formErrors.descripciongasto}</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="monto" className="form-label">
                                                Monto
                                            </label>
                                            <input
                                                id="monto"
                                                name="montogasto"
                                                value={formData.montogasto}
                                                onChange={handleChange}
                                                type="text"
                                                className={`form-control ${
                                                    formErrors.montogasto ? 'is-invalid' : ''
                                                }`}
                                                required
                                            />
                                            {formErrors.montogasto && (
                                                <div className="invalid-feedback">{formErrors.montogasto}</div>
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
                                                name="fechagasto"
                                                value={formData.fechagasto}
                                                onChange={handleChange}
                                                type="datetime-local"
                                                className={`form-control ${
                                                    formErrors.fechagasto ? 'is-invalid' : ''
                                                }`}
                                                required
                                            />
                                            {formErrors.fechagasto && (
                                                <div className="invalid-feedback">{formErrors.fechagasto}</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="idrubro" className="form-label">
                                                Nombre del rubro
                                            </label>
                                            <select
                                                id="idrubro"
                                                name="idrubro"
                                                value={formData.idrubro}
                                                onChange={handleChange}
                                                className={`form-select ${
                                                    formErrors.idrubro ? 'is-invalid' : ''
                                                }`}
                                                required
                                            >
                                                <option value="">Seleccione rubro</option>
                                                {rubros.map((rubro) => (
                                                    <option key={rubro.id} value={rubro.id}>
                                                        {rubro.nombrerubro}
                                                    </option>
                                                ))}
                                            </select>
                                            {formErrors.idrubro && (
                                                <div className="invalid-feedback">{formErrors.idrubro}</div>
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

export default CompCreategasto

