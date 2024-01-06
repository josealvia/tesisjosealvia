import axios from 'axios'
import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

const URI= 'http://localhost:5000/rubro/'

const CompCreaterubro =()=>{

    const [formData, setFormData]= useState({
        nombrerubro: '',
        totalrubro:'',
    })

    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
   
    const navigate = useNavigate()

    //procedimiento guardar

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Perform client-side validation
        const errors = validateForm(formData);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            // If no errors, submit the form
            try {
                await axios.post(URI, formData);
                navigate('/rubro');
            } catch (error) {
                console.error('Error al guardar el rubro', error);
            }
        } else {
            setIsSubmitting(false);
        }
    };


    // Validate the form data
    const validateForm = (data) => {
        const errors = {};

        if (!data.nombrerubro) {
            errors.nombrerubro = 'Este campo es obligatorio.';
        }
        if (!data.totalrubro) {
            errors.totalrubro = 'Este campo es obligatorio.';
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
                        <div className="card-header">Crear Rubro</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">   
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="nombre" className="form-label">
                                                Nombre del rubro
                                            </label>
                                            <input
                                                id="nombre"
                                                name="nombrerubro"
                                                value={formData.nombrerubro}
                                                onChange={handleChange}
                                                type="text"
                                                className={`form-control ${
                                                    formErrors.nombrerubro ? 'is-invalid' : ''
                                                }`}
                                                required
                                            />
                                            {formErrors.nombrerubro && (
                                                <div className="invalid-feedback">{formErrors.nombrerubro}</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="total" className="form-label">
                                                Total del rubro
                                            </label>
                                            <input
                                                id="total"
                                                name="totalrubro"
                                                value={formData.totalrubro}
                                                onChange={handleChange}
                                                type="text"
                                                className={`form-control ${
                                                    formErrors.totalrubro ? 'is-invalid' : ''
                                                }`}
                                                required
                                            />
                                            {formErrors.totalrubro && (
                                                <div className="invalid-feedback">{formErrors.totalrubro}</div>
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

export default CompCreaterubro

