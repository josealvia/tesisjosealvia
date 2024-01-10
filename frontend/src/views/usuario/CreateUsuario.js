import axios from 'axios'
import { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

const URI= 'http://localhost:5000/auth/register'
const URIROL='http://localhost:5000/rol/'
const URIUSUARIO= 'http://localhost:5000/usuario/'

const CompCreateusuario =()=>{

    const [formData , setFormData] = useState({
        nombreusuario: '',
        contraseñausuario: '',
        nombrecompletousuario:'',
        correousuario:'',
        telefonousuario:'',
        idrol:''


    })
    const [roles, setRoles] = useState([])
    const [usuarios , setUsuario]= useState([])
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
        axios.get(URIROL)
        .then(response =>{
            setRoles(response.data);
        })
        .catch(error => {
            console.error('Error al obtener los roles', error);
        })

    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Perform client-side validation
        const errors = validateForm(formData);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            const existeUsuario  = usuarios.find((usuario) => usuario.nombreusuario === formData.nombreusuario);
            const existeCorreo = usuarios.find((usuario) => usuario.correousuario === formData.correousuario);
            const existeTelefono = usuarios.find((usuario) => usuario.telefonousuario === formData.telefonousuario);

            if (existeUsuario  && existeCorreo && existeTelefono ) {
                // If cedula already exists, show an error message
                setFormErrors({
                    nombreusuario: 'Ya existe un usuario con el mismo nombre de usuario.',
                    correousuario: 'Ya existe un usuario con el mismo correo.',
                    telefonousuario: 'Ya existe un usuario con el mismo teléfono.'
                });
                setIsSubmitting(false);
            } else if (existeUsuario) {
                // Si ya existe un socio con la misma cédula, mostrar mensaje de error para cédula
                setFormErrors({
                    nombreusuario: 'Ya existe un usuario con el mismo nombre de usuario.',
                    correousuario: '',
                    telefonousuario: ''
                });
                setIsSubmitting(false);
            } else if (existeCorreo) {
                // Si ya existe un socio con el mismo correo, mostrar mensaje de error para correo
                setFormErrors({
                    nombreusuario: '',
                    correousuario: 'Ya existe un usuario con el mismo correo.',
                    telefonousuario: ''
                });
                setIsSubmitting(false);
            } else if (existeTelefono) {
                // Si ya existe un socio con el mismo correo, mostrar mensaje de error para correo
                setFormErrors({
                    nombreusuario: '',
                    correousuario: '',
                    telefonousuario: 'Ya existe un usuario con el mismo teléfono.'
                });
                setIsSubmitting(false);
            }else{
                try {
                    const response = await axios.post(URI, formData);
                    //const usuarioId = response.data.id;
                    console.log(response.data.id);
                    navigate('/usuario');
                } catch (error) {
                    console.error('Error al guardar el usuario', error);
                }
            } 
        } else {
            setIsSubmitting(false);
        }
    };

    const validateForm = (data) => {
        const errors = {};

        if (!data.nombreusuario) {
            errors.nombreusuario = 'Este campo es obligatorio.';
        }

        if (!data.contraseñausuario) {
            errors.contraseñausuario = 'Este campo es obligatorio.';
        }

        if (!data.nombrecompletousuario) {
            errors.nombrecompletousuario = 'Este campo es obligatorio.';
        }

        if (!data.correousuario) {
            errors.correousuario = 'Este campo es obligatorio.';
        }

        if (!data.telefonousuario) {
            errors.telefonousuario = 'Este campo es obligatorio.';
        }

        if (!data.idrol) {
            errors.idrol = 'Debe seleccionar un rol.';
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

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card mb-4">
                        <div className="card-header">Crear Usuario</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="nombreusuario" className="form-label">
                                                Nombre de usuario
                                            </label>
                                            <input
                                                id="nombreusuario"
                                                name="nombreusuario"
                                                value={formData.nombreusuario}
                                                onChange={handleChange}
                                                type="text"
                                                className={`form-control ${
                                                    formErrors.nombreusuario ? 'is-invalid' : ''
                                                }`}
                                                required
                                            />
                                            {formErrors.nombreusuario && (
                                                <div className="invalid-feedback">{formErrors.nombreusuario}</div>
                                            )}
                                        </div>

                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="contraseña" className="form-label">
                                                Contraseña
                                            </label>
                                            <input
                                                id="contraseña"
                                                name="contraseñausuario"
                                                value={formData.contraseñausuario}
                                                onChange={handleChange}
                                                type="text"
                                                className={`form-control ${
                                                    formErrors.contraseñausuario ? 'is-invalid' : ''
                                                }`}
                                                required
                                            />
                                            {formErrors.contraseñausuario && (
                                                <div className="invalid-feedback">{formErrors.contraseñausuario}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="nombrecompleto" className="form-label">
                                                Nombres Completos
                                            </label>
                                            <input
                                                id="nombrecompletousuario"
                                                name="nombrecompletousuario"
                                                value={formData.nombrecompletousuario}
                                                onChange={handleChange}
                                                type="text"
                                                className={`form-control ${
                                                    formErrors.nombrecompletousuario ? 'is-invalid' : ''
                                                }`}
                                                required
                                            />
                                            {formErrors.nombrecompletousuario && (
                                                <div className="invalid-feedback">{formErrors.nombrecompletousuario}</div>
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
                                                name="correousuario"
                                                value={formData.correousuario}
                                                onChange={handleChange}
                                                type="text"
                                                className={`form-control ${
                                                    formErrors.correousuario ? 'is-invalid' : ''
                                                }`}
                                                required
                                            />
                                            {formErrors.correousuario && (
                                                <div className="invalid-feedback">{formErrors.correousuario}</div>
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
                                                name="telefonousuario"
                                                value={formData.telefonousuario}
                                                onChange={handleChange}
                                                type="text"
                                                className={`form-control ${
                                                    formErrors.telefonousuario ? 'is-invalid' : ''
                                                }`}
                                                required
                                            />
                                            {formErrors.telefonousuario && (
                                                <div className="invalid-feedback">{formErrors.telefonousuario}</div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="idrol" className="form-label">
                                                Rol
                                            </label>
                                            <select
                                                id="idrol"
                                                name="idrol"
                                                value={formData.idrol}
                                                onChange={handleChange}
                                                className={`form-select ${
                                                    formErrors.idrol ? 'is-invalid' : ''
                                                }`}
                                                required
                                            >
                                                <option value="">Seleccione Rol</option>
                                                {roles.map((rol) => (
                                                    <option key={rol.id} value={rol.id}>
                                                        {rol.nombrerol}
                                                    </option>
                                                ))}
                                            </select>
                                            {formErrors.idrol && (
                                                <div className="invalid-feedback">{formErrors.idrol}</div>
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

export default CompCreateusuario





