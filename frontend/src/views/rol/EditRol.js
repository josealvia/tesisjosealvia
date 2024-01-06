import axios from 'axios';
import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'

const URI= 'http://localhost:5000/rol/'


const CompEditRol  =()=>{

    const [formData, setFormData]= useState({
        nombrerol: '',
    })

    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate()
    const {id} = useParams()


    
    //procedimiento para actualizar
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Perform client-side validation
        const errors = validateForm(formData);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            // If no errors, submit the form
            try {
                await axios.put(URI+id, formData);
                navigate('/rol');
            } catch (error) {
                console.error('Error al guardar el rol', error);
            }
        } else {
            setIsSubmitting(false);
        }
    };

        // Validate the form data
        const validateForm = (data) => {
            const errors = {};
    
            if (!data.nombrerol) {
                errors.nombrerol = 'Este campo es obligatorio.';
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

        useEffect(()=>{
            getRolById()
        },[])

        const getRolById = async ()=>{
            const res = await axios.get(URI+id)
            const rolData = res.data;
            setFormData({
                nombrerol:rolData.nombrerol,
            })
        }
    

    return(
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card mb-4">
                        <div className="card-header">Editar Rol</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">   
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="nombre" className="form-label">
                                                Nombre del rol
                                            </label>
                                            <input
                                                id="nombre"
                                                name="nombrerol"
                                                value={formData.nombrerol}
                                                onChange={handleChange}
                                                type="text"
                                                className={`form-control ${
                                                    formErrors.nombrerol ? 'is-invalid' : ''
                                                }`}
                                                required
                                            />
                                            {formErrors.nombrerol && (
                                                <div className="invalid-feedback">{formErrors.nombrerol}</div>
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

export default CompEditRol
