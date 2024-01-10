/*import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";

const URI = "http://localhost:5000/pago/";
const URIRUBRO = "http://localhost:5000/rubro/";

const CobrarPago = () => {
  const [formData, setFormData] = useState({
    cantidaddetalle: "",
    idpago: "",
    idrubro: "",
  });
  const { id } = useParams();
  const [pago, setPago] = useState(null);
  const [pagos, setPagos] = useState([]);
  const [cobroExitoso, setCobroExitoso] = useState(false);
  const [rubros, setRubro] = useState([]);

  const [rubrosSeleccionados, setRubrosSeleccionados] = useState([]);
  const [rubroToAdd, setRubroToAdd] = useState("");


  useEffect(() => {
    getPagoById();
    getPago();
    axios
      .get(URIRUBRO)
      .then((response) => {
        setRubro(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los rubros", error);
      });

    axios
      .get(URI)
      .then((response) => {
        setPagos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los gastos", error);
      });
  }, []);

  const getPago = async () => {
    try {
      const response = await axios.get(`${URI}${id}`);
      setPago(response.data);
    } catch (error) {
      console.error("Error al obtener el pago:", error);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleRubroAdd = () => {
    if (rubroToAdd) {
      const selectedRubro = rubros.find((rubro) => rubro.id === rubroToAdd);

     setRubrosSeleccionados([...rubrosSeleccionados, selectedRubro]);
      setRubroToAdd(""); // Reset the selected rubro
    }
  };

  const handleCobrar = async () => {
    try {
      // Registrar el detalle del pago en la tabla detallepago
      await axios.post(`${URI}${id}/detallepago`, formData, rubros= rubrosSeleccionados,);
      setCobroExitoso(true);
    } catch (error) {
      console.error("Error al registrar el detalle del pago:", error);
    }
  };

  const calcularTotalRubros = () => {
    return rubrosSeleccionados.reduce(
      (total, rubro) => total + parseFloat(rubro.totalrubro),
      0
    );
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  

  
  

  const getPagoById = async () => {
    const res = await axios.get(URI + id);
    const pagoData = res.data;
    setFormData({
      cantidaddetalle: pagoData.cantidaddetalle,
      idpago: pagoData.idpago,
      idrubro: pagoData.idrubro,
    });
  };

  return (
    <div className="container">
      <h2>Cobro de pago por rubro</h2>
      {pago && (
        <div>
          <p>ID del Pago: {pago.id}</p> *
          <p>Fecha de Pago: {formatDate(pago.fechapago)}</p>
          <p>Cantidad de Pago: {pago.cantidadpago}</p>
          {cobroExitoso ? (
            <p>El pago ha sido cobrado exitosamente.</p>
          ) : (
            <div>
              <div>
                <label htmlFor="idrubro" className="form-label">
                  Nombre del rubro
                </label>
                <select
                  id="idrubro"
                  name="idrubro"
                  value={rubroToAdd}
                  onChange={(e)=> setRubroToAdd(e.target.value)}
                >
                  <option value=""> Selecione rubro</option>
                  {rubros.map((rubro) => (
                    <option key={rubro.id} value={rubro.id}>
                      {rubro.nombrerubro}
                    </option>
                  ))}
                </select>
                <button className="btn btn-primary" onClick={handleRubroAdd}>
                  Agregar
                </button>
              </div>

              {rubrosSeleccionados.length > 0 && (
                <div>
                  <h3>Rubros Seleccionados</h3>
                  <ul>
                    {rubrosSeleccionados.map((rubro) => (
                      <li key={rubro.id}>
                        ID: {rubro.id}, Nombre: {rubro.nombrerubro}, Total:{" "}
                        {rubro.totalrubro}
                      </li>
                    ))}
                  </ul>
                  <p>Total: ${calcularTotalRubros()}</p>
                </div>
              )}

              <button className="btn btn-primary" onClick={handleCobrar}>
                Cobrar Pago
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CobrarPago;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const URI = 'http://localhost:5000/pago/';
const URIRUBRO = 'http://localhost:5000/rubro/';

const CobrarPago = () => {

  const [formData, setFormData]= useState({
    cantidaddetalle: '',
    idpago: '',
    idrubro: ''
  })

  const { id } = useParams();
  const [pago, setPago] = useState(null);
  const [pagos , setPagos]= useState([])
  const [cobroExitoso, setCobroExitoso] = useState(false);
  const [rubros , setRubro]= useState([])
  const [rubrosSeleccionados, setRubrosSeleccionados] = useState([]);

  useEffect(() => {
    getPagoById()
    getPago();
    axios.get(URIRUBRO)
        .then(response =>{
            setRubro(response.data);
        })
        .catch(error => {
            console.error('Error al obtener los rubros', error);
    })

    axios.get(URI)
        .then(response =>{
            setPagos(response.data);
        })
        .catch(error => {
            console.error('Error al obtener los gastos', error);
    })


  }, []);

  const getPago = async () => {
    try {
      const response = await axios.get(`${URI}${id}`);
      setPago(response.data);
    } catch (error) {
      console.error('Error al obtener el pago:', error);
    }
  };

  const handleCobrar = async () => {
    try {
      // Registrar el detalle del pago en la tabla detallepago
      await axios.post(`${URI}${id}/detallepago`, formData);
      setCobroExitoso(true);
    } catch (error) {
      console.error('Error al registrar el detalle del pago:', error);
    }
  };

  const handleAgregarRubro = () => {
    if (formData.idrubro) {
      const selectedRubro = rubros.find((rubro) => rubro.id === parseInt(formData.idrubro));
      if(selectedRubro){
        setRubrosSeleccionados([...rubrosSeleccionados, selectedRubro]);
        setFormData({
          ...formData,
          idrubro: ''
        });
      } else {
        console.error("Rubro not found")

      }
    }
  };


  
  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({
      ...formData,
      [name]: value,
  });
};


const getPagoById = async ()=>{
  const res = await axios.get(URI+id)
  const pagoData = res.data;
  setFormData({
    cantidaddetalle:pagoData.cantidaddetalle,
    idpago:pagoData.idpago,
    idrubro:pagoData.idrubro
  })
}

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Cobrar Pago</h2>
      {pago && (
        <div className="card mb-4">
          <div className="card-body">
          
            <div className="container">
              <h2>Detalles del Pago</h2>
              <div className="card">
                <div className="card-body">
                  <div className="row mb-2">
                    <div className="col-md-6">
                      <p>
                        <strong>ID del Pago:</strong> {pago.id}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <strong>Socio:</strong> {`${pago.socio.nombresocio} ${pago.socio.apellidosocio}`}
                      </p>
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-md-6">
                      <p>
                        <strong>Cédula:</strong> {pago.socio.cedulasocio}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <strong>Fecha:</strong> {pago.fechapago}
                      </p>
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-md-6">
                      <p>
                        <strong>Dirección:</strong> {pago.socio.direccionsocio}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <strong>Teléfono:</strong> {pago.socio.telefonosocio}
                      </p>
                    </div>
                  </div>

                  <div className="row mb-2">
                    <div className="col-md-6">
                      <p>
                      <strong>Cantidad de Pago:</strong> {pago.cantidadpago}
                      </p>
                    </div>
                
                  </div>
                </div>
              </div>
            </div>
  
            {cobroExitoso ? (
              <p className="alert alert-success">El pago ha sido cobrado exitosamente.</p>
            ) : (
              <div>
               
                <div className="mb-3">
                  <label htmlFor="cantidad" className="form-label">
                    Monto Cobrado:
                  </label>
                  <input
                    id="cantidad"
                    name="cantidaddetalle"
                    value={formData.cantidaddetalle}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                  />
                </div>

             
                <div className="mb-3">
                  <label htmlFor="idpago" className="form-label">
                    Nombre del Pago
                  </label>
                  <select
                    id="idpago"
                    name="idpago"
                    value={formData.idrubro}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Seleccione pago</option>
                    {pagos.map((pag) => (
                      <option key={pag.id} value={pag.id}>
                        {pag.id}
                      </option>
                    ))}
                  </select>
                </div>

             
                <div className="mb-3">
                  <label htmlFor="idrubro" className="form-label">
                    Nombre del Rubro
                  </label>
                  <select
                    id="idrubro"
                    name="idrubro"
                    value={formData.idrubro}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Seleccione rubro</option>
                    {rubros.map((rubro) => (
                      <option key={rubro.id} value={rubro.id}>
                        {rubro.nombrerubro}
                      </option>
                    ))}
                  </select>
                  <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAgregarRubro}
                  >
                  Agregar rubro
                  </button>
                </div>
                {rubrosSeleccionados.length > 0 && (
                  <div className="mb-3">
                    <h3>Rubros Seleccionados</h3>
                    <ul>
                      {rubrosSeleccionados.map((rubro) => (
                        <li key={rubro.id}>
                          ID: {rubro.id || 'N/A'}, Nombre: {rubro.nombrerubro || 'N/A'}, Total: {rubro.totalrubro || 'N/A'}
                        </li>
                      ))}
                    </ul>
                </div>  
              )}
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCobrar}
              > Cobrar Pago
              </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

      
  

export default CobrarPago;*/


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams , useNavigate } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';

const URISOCIO = "http://localhost:5000/socio/";
const URIRUBRO = "http://localhost:5000/rubro/";
const URI = "http://localhost:5000/pago/";

const CobrarPago = () => {

  const { id } = useParams();
  const [pago, setPago] = useState(null);
  const [socioData, setSocioData] = useState({});
  const [rubros, setRubros] = useState([]);
  const [rubrosSeleccionados, setRubrosSeleccionados] = useState([]);
  const [totalAPagar, setTotalAPagar] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [pagoExitoso, setPagoExitoso] = useState(false);
  const [mostrarBotonRegresar, setMostrarBotonRegresar] = useState(false);
  const [mostrarBotonImprimir, setMostrarBotonImprimir] = useState(false);
  const [rubrosSelected, setRubrosSelected] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const navigate = useNavigate();


  useEffect(() => {
    getPago();
    obtenerDatosSocio();
    obtenerRubros();
  }, []);


  // Obtener datos del socio al cargar el componente
  const obtenerDatosSocio = async () => {
    try {
      const response = await axios.get(URISOCIO);
      setSocioData(response.data); // Ajusta según la estructura de tu respuesta
    } catch (error) {
      console.error('Error al obtener datos del socio:', error);
    }
  };

  // Obtener rubros al cargar el componente
  const obtenerRubros = async () => {
    try {
      const response = await axios.get(URIRUBRO);
      setRubros(response.data); // Ajusta según la estructura de tu respuesta
    } catch (error) {
      console.error('Error al obtener rubros:', error);
    }
  };

  const getPago = async () => {
    try {
      const response = await axios.get(`${URI}${id}`);
      setPago(response.data);
    } catch (error) {
      console.error('Error al obtener el pago:', error);
    }
  };



  useEffect(() => {
    // Calcular el total a pagar al cambiar los rubros seleccionados
    const calcularTotalAPagar = () => {
      const total = rubrosSeleccionados.reduce((acc, rubroId) => {
        const rubro = rubros.find(r => r.id === rubroId);
        return acc + parseFloat(rubro.totalrubro);
      }, 0);
      setTotalAPagar(total);
    };

    calcularTotalAPagar();
    setRubrosSelected(rubrosSeleccionados.length > 0);
  }, [rubrosSeleccionados, rubros]);


  const handleRubroSeleccionado = (rubroId) => {
      setRubrosSeleccionados((prev) =>
      prev.includes(rubroId) 
       ? prev.filter((id) => id !== rubroId)
       : [...prev, rubroId]
    );
    
  };

  const validarPagoCobrado = async () => {
    try {
      const response = await axios.get(`${URI}${id}`);
      const pagoActualizado = response.data;

      if (pagoActualizado.estadopago) {
        setPagoExitoso(true);
        setMostrarBotonRegresar(true);
        setMostrarBotonImprimir(true);

      } else {
        setPagoExitoso(false);
      }
    } catch (error) {
      console.error('Error al validar el estado del pago:', error);
    }
  };

  const handleSubmitPago = async () => {
    // Validar el estado del pago antes de realizar un nuevo pago
    await validarPagoCobrado();
    // Enviar la solicitud de pago a la API

    if(!pagoExitoso){
      try {
        const response = await axios.post(`${URI}${id}/detallepago`, {
          idrubro: rubrosSeleccionados,
          // Otros datos necesarios para la API de cobro, si es necesario
        });
        alert(response.data.message); // Mensaje de la API
        await validarPagoCobrado();
      } catch (error) {
        console.error('Error al realizar el pago:', error);
      }
    }
  };

  const handleEliminarRubro = (rubroId) => {
    setRubrosSeleccionados((prev) => prev.filter((id) => id !== rubroId));
  };

  const handleRegresar = () => {
    navigate(-1)
  };

  const handleImprimir = () =>{
    window.print(); 
  }

  

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Datos del Socio</h2>
      {pago && (
        <div className="card mb-4">
          <div className="card-body">
            <div className="container">
              <div className="card">
                <div className="card-body">
                  <div className="row mb-2">
                    <div className="col-md-6">
                      <p>
                        <strong>ID del Pago:</strong> {pago.id}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <strong>Socio:</strong> {`${pago.socio.nombresocio} ${pago.socio.apellidosocio}`}
                      </p>
                    </div>
                  </div>
  
                  <div className="row mb-2">
                    <div className="col-md-6">
                      <p>
                        <strong>Cédula:</strong> {pago.socio.cedulasocio}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <strong>Fecha:</strong> {pago.fechapago}
                      </p>
                    </div>
                  </div>
  
                  <div className="row mb-2">
                    <div className="col-md-6">
                      <p>
                        <strong>Dirección:</strong> {pago.socio.direccionsocio}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <strong>Teléfono:</strong> {pago.socio.telefonosocio}
                      </p>
                    </div>
                  </div>
  
                  <div className="row mb-2">
                    <div className="col-md-6">
                      <p>
                        <strong>Cantidad de Pago:</strong> {pago.cantidadpago}
                      </p>
                    </div>
                    <div className="col-md-6">
                        <p>
                        <strong>Estado:</strong> {pago.estadopago ===1 || pago.estadopago ===true ? 'Pagado' : 'No pagado'}
                        </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {!pagoExitoso && !pago.estadopago && (
            <button type="button" className="btn btn-primary" onClick={handleShowModal}>
              Agregar Rubro
            </button>
            )}
            <div className="mt-3">
              <h2>Rubros Seleccionados</h2>
              {!pago.estadopago && (
              <div className="container">
                <div className="card">
                  <div className="card-body">
                    <div className='table-container'>
                      <table className='table table-striped custom-table'>
                        <thead className='table-primary table-header'>
                          <tr>
                            <th>Rubro</th>
                            <th>Total</th>
                            <th>Eliminar</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rubrosSeleccionados.map((rubroId, index) => {
                            const rubro = rubros.find((r) => r.id === rubroId);
                            return (
                              <tr key={rubro.id} className={index % 2 === 0 ? 'even-row' : null}>
                                <td>{rubro.nombrerubro}</td>
                                <td>{rubro.totalrubro}</td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() =>
                                      handleEliminarRubro(rubroId)
                                    }
                                  >
                                    <i className="fa-solid fa-trash-can"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <h2 className="total-pagar-label">Total a Pagar:</h2>
                  <div className="total-pagar-box">
                  <span>{totalAPagar}</span>
                  </div> 
                  </div>
              </div>
              )}
            </div>      
            <div className="mt-3">
              {pagoExitoso ? (
                <div>
                  <p className="alert alert-success">El pago ha sido cobrado exitosamente.</p>
                  {mostrarBotonRegresar && (
                    <button className="btn btn-primary" onClick={handleRegresar}>
                      Regresar
                    </button>
                  )}
                  {mostrarBotonImprimir && (
                    <button className="btn btn-primary" onClick={handleImprimir}>
                      Imprimir
                    </button>
                  )}
                </div>
                ) : (
                <div>
                {pago && pago.estadopago ? (
                  
                  <p className="alert alert-warning">Este pago ya ha sido completado anteriormente.</p>

                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmitPago}
                    disabled={!rubrosSelected}
                  >
                  Realizar Pago
                  </button>
                )}
              </div>
            )}
            </div>
          </div>
        </div>
      )}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Seleccionar Rubro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
            {rubros.map((rubro) => (
              <li key={rubro.id}>
                <button onClick={() => handleRubroSeleccionado(rubro.id)}>
                  Agregar {rubro.nombrerubro} - Total: {rubro.totalrubro}
                </button>
              </li>
            ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  );
};

export default CobrarPago;
