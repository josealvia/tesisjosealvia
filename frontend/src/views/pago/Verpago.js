import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from 'react-router-dom';


const URIPAGO = "http://localhost:5000/pago/";

const VerPago =()=>{
    const { id } = useParams();
    const [pago, setPago] = useState(null);
    const navigate = useNavigate();


    const getPago= async()=>{
        try {
            const response = await axios.get(`${URIPAGO}${id}`);
            setPago(response.data);
          } catch (error) {
            console.error('Error al obtener el pago:', error);
          }
    };
    useEffect(() => {
        getPago();
    }, []);
    const handlePrint = () => {
        window.print();
    };


    return(
        <div>
            <h2 className="mb-4">Datos del Pago</h2>
            {pago && (
                <div>
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
                                    <strong>Cantidad de Pago:</strong> {pago.cantidadpago }
                                    </p>
                                </div>

                                <div className="col-md-6">
                                    <p>
                                    <strong>Estado:</strong> {pago.estadopago ===1 || pago.estadopago ===true ? 'Pagado' : 'No pagado'}
                                    </p>
                                </div>
                                
                            </div>
                        </div>
                    </ div>
                  </div>


                    <h3 className="mb-3">Detalles de pago</h3>
                    {pago.detalle_pagos.length > 0}
                    <div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
                                <thead >
                                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Rubro </th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>total </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pago.detalle_pagos.map ((detalle)=>(
                                        <tr  key={detalle.id}> 
                                            <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}> {detalle.rubro.nombrerubro} </td>
                                            <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}> {detalle.rubro.totalrubro} </td>
              
                                        </tr>
                                    ))}
                                </tbody>
                      </table>
                        <div className="row mb-2">
                                <div className="col-md-6">
                                    <p>
                                    <strong>Total Pagado:</strong> {pago.cantidadpago}
                                    </p>
                                </div>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-md-6">
                            <button className="btn btn-primary mr-2" onClick={handlePrint}>
                                Imprimir
                            </button>
                        </div>
                        <div className="col-md-6 text-right">
                            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                                Regresar
                            </button>
                        </div>
                    </div>
                    <div className="mt-5"> </div>

                </div>
            )}
        </div>
    

    )


};
export default VerPago;
