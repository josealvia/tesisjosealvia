import axios from 'axios';
import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'

const URI= 'http://localhost:5000/socio/'
const URIUSUARIO= 'http://localhost:5000/usuario/'
const URISOCIO= 'http://localhost:5000/socio/'


const CompEditSocio  =()=>{

    const [formData, setFormData]= useState({
        cedulasocio: '',
        nombresocio: '',
        apellidosocio: '',
        direccionsocio: '',
        telefonosocio: '',
        idusuario: '',
        correosocio:'',
    })

    const [socios , setSocios]= useState([])
    const [usuarios , setUsuario]= useState([])
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(()=>{
        getSocioById()
        axios.get(URIUSUARIO)
        .then(response =>{
            setUsuario(response.data);
        })
        .catch(error => {
            console.error('Error al obtener los roles', error);
        })

        axios.get(URISOCIO)
        .then(response =>{
            setSocios(response.data);
        })
        .catch(error => {
            console.error('Error al obtener los socios', error);
        })
    },[])


    //procedimiento para actualizar
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Perform client-side validation
        const errors = validateForm(formData);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            //const existesocio = socios.find((socio) => socio.cedulasocio === formData.cedulasocio);      
                const user = JSON.parse(localStorage.getItem('user'));
                if(user && user.id)
                {
                    formData.idusuario = user.id;
                // If no errors, submit the form
                try {
                    await axios.put(URI+id, formData);
                    navigate('/socio');
                } catch (error) {
                    console.error('Error al guardar el socio', error);
                }
                }else {
                    console.error('Error: User information not available.');
                    setIsSubmitting(false);
                }
            }
    };


         // Validate the form data
    const validateForm = (data) => {
        const errors = {};

        if (!data.cedulasocio) {
            errors.cedulasocio = 'Este campo es obligatorio.';
        }

        if (!data.nombresocio) {
            errors.nombresocio = 'Este campo es obligatorio.';
        }

        if (!data.apellidosocio) {
            errors.apellidosocio = 'Este campo es obligatorio.';
        }

        if (!data.direccionsocio) {
            errors.direccionsocio = 'Este campo es obligatorio.';
        }

        if (!data.telefonosocio) {
            errors.telefonosocio = 'Este campo es obligatorio.';
        }

        if (!data.correosocio) {
            errors.correosocio = 'Este campo es obligatorio.';
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



    

    const getSocioById = async ()=>{
        const res = await axios.get(URI+id)
        const socioData = res.data;
        setFormData({
            cedulasocio:socioData.cedulasocio,
            nombresocio:socioData.nombresocio,
            apellidosocio:socioData.apellidosocio,
            direccionsocio:socioData.direccionsocio,
            telefonosocio:socioData.telefonosocio,
            idusuario:socioData.idusuario,
            correosocio:socioData.correosocio

        })
    }

    return(
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card mb-4">
                        <div className="card-header">Editar Socio</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="cedula" className="form-label">
                                                N° Cédula
                                            </label>
                                            <input
                                                id="cedula"
                                                name="cedulasocio"
                                                value={formData.cedulasocio}
                                                onChange={handleChange}
                                                type="text"
                                                className={`form-control ${
                                                    formErrors.cedulasocio ? 'is-invalid' : ''
                                                }`}
                                                required
                                            />
                                            {formErrors.cedulasocio && (
                                                <div className="invalid-feedback">{formErrors.cedulasocio}</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="nombre" className="form-label">
                                                Nombres
                                            </label>
                                            <input
                                                id="nombre"
                                                name="nombresocio"
                                                value={formData.nombresocio}
                                                onChange={handleChange}
                                                type="text"
                                                className={`form-control ${
                                                    formErrors.nombresocio ? 'is-invalid' : ''
                                                }`}
                                                required
                                            />
                                            {formErrors.nombresocio && (
                                                <div className="invalid-feedback">{formErrors.nombresocio}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="apellido" className="form-label">
                                                Apellidos
                                            </label>
                                            <input
                                                id="apellido"
                                                name="apellidosocio"
                                                value={formData.apellidosocio}
                                                onChange={handleChange}
                                                type="text"
                                                className={`form-control ${
                                                    formErrors.apellidosocio ? 'is-invalid' : ''
                                                }`}
                                                required
                                            />
                                            {formErrors.apellidosocio && (
                                                <div className="invalid-feedback">{formErrors.apellidosocio}</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="direccion" className="form-label">
                                                Dirección
                                            </label>
                                            <input
                                                id="direccion"
                                                name="direccionsocio"
                                                value={formData.direccionsocio}
                                                onChange={handleChange}
                                                type="text"
                                                className={`form-control ${
                                                    formErrors.direccionsocio ? 'is-invalid' : ''
                                                }`}
                                                required
                                            />
                                            {formErrors.direccionsocio && (
                                                <div className="invalid-feedback">{formErrors.direccionsocio}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="telefono" className="form-label">
                                                Teléfono
                                            </label>
                                            <input
                                                id="telefono"
                                                name="telefonosocio"
                                                value={formData.telefonosocio}
                                                onChange={handleChange}
                                                type="text"
                                                className={`form-control ${
                                                    formErrors.telefonosocio ? 'is-invalid' : ''
                                                }`}
                                                required
                                            />
                                            {formErrors.telefonosocio && (
                                                <div className="invalid-feedback">{formErrors.telefonosocio}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="correo" className="form-label">
                                                Correo
                                            </label>
                                            <input
                                                id="correo"
                                                name="correosocio"
                                                value={formData.correosocio}
                                                onChange={handleChange}
                                                type="text"
                                                className={`form-control ${
                                                    formErrors.correosocio ? 'is-invalid' : ''
                                                }`}
                                                required
                                            />
                                            {formErrors.correosocio && (
                                                <div className="invalid-feedback">{formErrors.correosocio}</div>
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

export default CompEditSocio
