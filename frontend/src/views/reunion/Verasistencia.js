import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from 'react-router-dom';

const URIREUNION = "http://localhost:5000/reunion/";

const VerAsistencia =()=>{
    const { id } = useParams();
    const [reunion, setReunion] = useState(null);
    const navigate = useNavigate();

    const getReunion= async()=>{
        try {
            const response = await axios.get(`${URIREUNION}${id}`);
            setReunion(response.data);
          } catch (error) {
            console.error('Error al obtener la reunion:', error);
          }
    };


    useEffect(() => {
        getReunion();
      }, []);

    const handlePrint = () => {
        // Add your printing logic here
        window.print();
    };



    return(
        <div>
            <h2 className="mb-4">Datos del Reunión</h2>
            {reunion && (
                <div>
                  <div className="container">
                    <div className="card">
                      <div className="card-body">

                        <div className="row mb-2">
                          <div className="col-md-6">
                            <p>
                            <strong>Sesión:</strong> {reunion.seccionreunion}
                            </p>
                          </div>
                          <div className="col-md-6">
                            <p>
                            <strong>Descripción de la reunion:</strong> {reunion.descripcionreunion}
                            </p>
                          </div>
                        </div>

                        <div className="row mb-2">
                          <div className="col-md-6">
                            <p>
                            <strong>Fecha:</strong> {reunion.fechareunion}
                            </p>
                          </div>
                          <div className="col-md-6">
                            <p>
                            <strong>Lugar:</strong> {reunion.lugarreunion}
                            </p>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>


                    <h3 className="mb-3">Detalles de la Reunión</h3>
                    {reunion.detalle_reuniones.length > 0}
                    <div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
                                <thead >
                                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Cédula </th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Nombres </th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Asistencia </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { reunion.detalle_reuniones.map ((detalle)=>(
                                        <tr  key={detalle.id}> 
                                            <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}> {detalle.socio.cedulasocio} </td>
                                            <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}> {detalle.socio.nombresocio} {detalle.socio.apellidosocio} </td>
                                            <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}> {detalle.asistencia === 1 || detalle.asistencia === true ? 'Asistió' : 'No asistió'}</td>
              
                                        </tr>
                                    ))}
                                </tbody>
                      </table>
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
}


export default VerAsistencia;