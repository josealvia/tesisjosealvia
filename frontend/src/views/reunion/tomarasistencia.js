import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from 'react-router-dom';

const URISOCIO = 'http://localhost:5000/socio/'
const URIREUNION = 'http://localhost:5000/reunion/'
const TomarAsistencia =()=>{
    const navigate = useNavigate();
    const [socios, setSocios] = useState([]);
    const [asistenciaData, setAsistenciaData] = useState([]);
    const { id } = useParams();
    const [asistenciaExitosa, setAsistenciaExitosa] = useState(false);
    const [mostrarBotonRegresar, setMostrarBotonRegresar] = useState(false);
  const [mostrarBotonImprimir, setMostrarBotonImprimir] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [asistenciaTomada, setAsistenciaTomada] = useState(false);
    


    

    const handleCheckboxChange  = (id)=>{
      setAsistenciaData((prevAsistenciaData) => {
        const updatedAsistenciaData  = prevAsistenciaData.includes(id)
        ? asistenciaData.filter((idsocio)=>idsocio !== id)
        : [...asistenciaData, id];

        return updatedAsistenciaData;
      })
    };

    const validarAsistenciaTomada = async () => {
      try {
        const response = await axios.get(`${URIREUNION}${id}`);
        const asistenciaActualizada = response.data;
  
        if (asistenciaActualizada.asistenciatomada) {
          setAsistenciaTomada(true);
          setMostrarBotonRegresar(true);
          setMostrarBotonImprimir(true);
        } else {
          setAsistenciaTomada(false);
        }
      } catch (error) {
        console.error('Error al validar el estado de la asistencia:', error);
      }
    };

    const TomarAsistencia = async()=>{
      await validarAsistenciaTomada();
      if(!asistenciaTomada){
        try{
          const response = await axios.post(`http://localhost:5000/reunion/${id}/tomarasistencia`,{
            data: asistenciaData,
        });
        console.log(response.data.message); // Mensaje de la API
        await validarAsistenciaTomada();
        } catch(error){
        console.error('Error al tomar la asistencia:', error);
        }
      }
    };

    const handleRegresar = () => {
      navigate(-1);
    };

    useEffect(() => {
      const obtenerSocios = async () => {
        try {
          const response = await axios.get(URISOCIO);
          setSocios(response.data); // Ajusta según la estructura de tu respuesta
        } catch (error) {
          console.error('Error al obtener socios:', error);
        }
      };
  
      obtenerSocios();
      validarAsistenciaTomada();
    }, []);

    return (
      <div className="attendance-container">
        <style>
          {`
            .attendance-container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f8f8f8;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              border-radius: 10px;
            }
    
            .attendance-header {
              text-align: center;
              margin-bottom: 20px;
            }
    
            .attendance-form {
              display: flex;
              margin-top: 20px;
              flex-direction: column;
            }
    
            .attendance-item {
              margin-bottom: 20px;
            }
    
            .checkbox-wrapper {
              display: flex;
              align-items: center;
            }
    
            input[type="checkbox"] {
              margin-right: 10px;
              appearance: none;
              width: 20px;
              height: 20px;
              border: 2px solid #4caf50;
              border-radius: 4px;
              cursor: pointer;
              outline: none;
            }
    
            input[type="checkbox"]:checked {
              background-color: #4caf50;
              border: 2px solid #4caf50;
            }
    
            label {
              cursor: pointer;
              font-size: 16px;
              color: #333;
            }
    
            button {
              background-color: #4caf50;
              color: #ffffff;
              padding: 12px 20px;
              border: none;
              border-radius: 6px;
              cursor: pointer;
              font-size: 18px;
              transition: background-color 0.3s;
            }
    
            button:hover {
              background-color: #45a049;
            }
          `}
        </style>
        <div className="attendance-header">
          <h1>Tomar Asistencia</h1>
        </div>
        
        <div className="attendance-form">
        {asistenciaTomada ? (
          <div>
            <p className="alert alert-warning">Asistencia Guardada.</p>
            {mostrarBotonRegresar && (
              <button className="btn btn-primary" onClick={handleRegresar}>
                Regresar
              </button>
            )}
          </div>
        ) : (
          <div>
            <form>
              {socios.map((socio) => (
                <div key={socio.id} className="attendance-item">
                  <div className="checkbox-wrapper">
                    <input
                      type="checkbox"
                      value={socio.id}
                      checked={asistenciaData.includes(socio.id)}
                      onChange={() => handleCheckboxChange(socio.id)}
                      id={`checkbox-${socio.id}`}
                    />
                    <label htmlFor={`checkbox-${socio.id}`}>
                      <span>{`${socio.nombresocio} ${socio.apellidosocio}`}</span>
                    </label>
                  </div>
                </div>
              ))}
              <button type="button" onClick={TomarAsistencia}>
                Tomar Asistencia
              </button>
            </form>
          </div>
        )}

        {asistenciaExitosa && !asistenciaTomada && (
          <div>
            <p className="alert alert-success">La asistencia ha sido guardada exitosamente.</p>
          </div>
        )}
      </div>
    </div>
  );
};


export default TomarAsistencia;