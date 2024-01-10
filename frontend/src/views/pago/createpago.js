import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const URI = "http://localhost:5000/pago/";

const AddPago = () => {
  const navigate = useNavigate();
  const [socios, setSocios] = useState([]);
  const [selectedSocio, setSelectedSocio] = useState(""); // Estado para el usuario seleccionado
  const [pago, setPago] = useState({
    cedulasocio: "", // Valor inicial vacío
    nombresocio: "", // Valor inicial vacío
    apellidosocio: "", // Valor inicial vacío
    cantidadpago: 0.0, // Valor estático
    fechapago: "",
    estadopago: 0, // Valor predeterminado
    idsocio: "", // Agregado si es necesario
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchSocios() {
      try {
        const response = await axios.get("http://localhost:5000/socio/");
        setSocios(response.data);
        /*if (response.data.length > 0) {
          setSelectedSocio(response.data[0].cedulasocio); // Cambiar a cedulasocio
        }*/
      } catch (error) {
        console.error("Error al cargar la lista de socios", error);
      }
    }
    fetchSocios();
  }, []);
  

  const handleChangeSocio = (e) => {
    const selectedCedula = e.target.value;
    setSelectedSocio(selectedCedula);

    // Encontrar el usuario seleccionado por su cédula
    const selectedSocioData = socios.find(
      (soc) => soc.cedulasocio === selectedCedula
    );

    if (selectedSocioData) {
      // Actualizar los datos del pago con los del usuario seleccionado
      setPago({
        ...pago,
        idsocio: selectedSocioData.id, // Utiliza el ID del socio
        cedulasocio: selectedSocioData.cedulasocio,
        nombresocio: selectedSocioData.nombresocio,
        apellidosocio: selectedSocioData.apellidosocio,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPago({
      ...pago,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const isValid = validateForm(pago);
      if(isValid){
        const nuevoPago={
          cantidadpago: pago.cantidadpago,
          fechapago: pago.fechapago,
          estadopago: pago.estadopago,
          idsocio: pago.idsocio,

      }
      //alert(nuevoPago.idsocio);
      await axios.post(URI, nuevoPago);
      navigate("/pago");
    } else{
      console.log("Form validation failed. Please check for errors.");
    }
    }catch (error){
      console.error("Error al agregar el pago", error);

    }
    finally {
      setIsSubmitting(false);

    }   
  };




  const validateForm = (data) => {
    const errors = {};
    if (!data.idsocio || data.idsocio === "") {
      errors.idsocio= "seleccione un socio"
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
    };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header">Crear Pago</div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="idsocio" className="form-label">
                        Seleccionar Socio
                      </label>
                      <select
                        id="idsocio"
                        name="idsocio"
                        value={selectedSocio}
                        onChange={handleChangeSocio}
                        className="form-select"
                        required
                      >
                        <option value=""> Selecione el socio</option>
                        {socios.map((soc) => (
                          <option
                            key={soc.cedulasocio}
                            value={soc.cedulasocio}
                          >
                            {soc.nombresocio} {soc.apellidosocio}
                          </option>
                        ))}
                      </select>
                      {formErrors.idsocio && (
                        <div className="invalid-feedback">
                          {formErrors.idsocio}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="cedula" className="form-label">
                        N° Cédula
                      </label>
                      <input
                        id="cedula"
                        name="cedulasocio"
                        value={pago.cedulasocio}
                        onChange={handleChange}
                        type="text"
                        className={`form-control ${
                          formErrors.cedulasocio ? "is-invalid" : ""
                        }`}
                        required
                        disabled
                      />
                      {formErrors.cedulasocio && (
                        <div className="invalid-feedback">
                          {formErrors.cedulasocio}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="nombre" className="form-label">
                        Nombres
                      </label>
                      <input
                        id="nombre"
                        name="nombresocio"
                        value={pago.nombresocio}
                        onChange={handleChange}
                        type="text"
                        className={`form-control ${
                          formErrors.nombresocio ? "is-invalid" : ""
                        }`}
                        required
                        disabled
                      />
                      {formErrors.nombresocio && (
                        <div className="invalid-feedback">
                          {formErrors.nombresocio}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="apellido" className="form-label">
                        Apellidos
                      </label>
                      <input
                        id="apellido"
                        name="apellidosocio"
                        value={pago.apellidosocio}
                        onChange={handleChange}
                        type="text"
                        className={`form-control ${
                          formErrors.apellidosocio ? "is-invalid" : ""
                        }`}
                        required
                        disabled
                      />
                      {formErrors.apellidosocio && (
                        <div className="invalid-feedback">
                          {formErrors.apellidosocio}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="cantidadpago" className="form-label">
                        Cantidad de Pago
                      </label>
                      <input
                        id="cantidadpago"
                        name="cantidadpago"
                        value={pago.cantidadpago}
                        onChange={handleChange}
                        type="number"
                        className={`form-control ${
                          formErrors.cantidadpago ? "is-invalid" : ""
                        }`}
                        readOnly
                        disabled // Campo de solo lectura
                      />
                      {formErrors.cantidadpago && (
                        <div className="invalid-feedback">
                          {formErrors.cantidadpago}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="fechapago" className="form-label">
                        Fecha de Pago
                      </label>
                      <input
                        id="fechapago"
                        name="fechapago"
                        value={pago.fechapago}
                        onChange={handleChange}
                        type="datetime-local"
                        className={`form-control ${
                          formErrors.fechapago ? "is-invalid" : ""
                        }`}
                        required
                      />
                      {formErrors.fechapago && (
                        <div className="invalid-feedback">
                          {formErrors.fechapago}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Guardando..." : "Guardar"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPago;