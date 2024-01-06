import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';


const URISOCIOT = 'http://localhost:5000/consultasocio/socio/'
const URIREUNIONT = 'http://localhost:5000/consultareunion/reunion/'
const URIRECAUDACIONT = 'http://localhost:5000/consultatrecaudacion/recaudacion/'
const URIGASTOT = 'http://localhost:5000/consultatgasto/gasto/'
const URIDOCT = 'http://localhost:5000/consultatdocumento/doc'




//estilos///
const cardStyle = {
    backgroundColor: "#f8f9fa", // Set your desired background color
    border: "1px solid #dee2e6", // Set your desired border color
    borderRadius: "10px", // Add border-radius for rounded corners
    marginBottom: "20px", // Adjust margin for space between cards
  };
  
  const imageStyle = {
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    maxHeight: "200px", // Set max height for the image
    objectFit: "cover", // Ensure the image covers the entire container
  };
  
  const cardBodyStyle = {
    padding: "1rem", // Add padding for the card body
  };


  // ----------------------///

  
const Home = () => {

    const [totalSocios, setTotalSocios] = useState(0);
    const [totalReunion, setTotalReunion] = useState(0);
    const [totalRecaudacion, setTotalRecaudacion] = useState(0);
    const [totalGasto, setTotalGasto] = useState(0);
    const [totalDocumento, setTotalDocumento] = useState(0);

    useEffect(()=>{
        axios.get(URIREUNIONT)
            .then(response => setTotalReunion(response.data.totalReunion))
            .catch(error => console.error('Error al obtener total de reuniones:', error));


        axios.get(URISOCIOT)
            .then(response => setTotalSocios(response.data.totalSocios))
            .catch(error => console.error('Error al obtener total de socios:', error));

        axios.get(URIRECAUDACIONT)
            .then(response => setTotalRecaudacion(response.data.totalRecaudacion))
            .catch(error => console.error('Error al obtener total de recaudaciones:', error));

        axios.get(URIGASTOT)
            .then(response => setTotalGasto(response.data.totalGasto))
            .catch(error => console.error('Error al obtener total de gastos:', error));

        axios.get(URIDOCT)
            .then(response => setTotalDocumento(response.data.totalDocumento))
            .catch(error => console.error('Error al obtener total de documentos:', error));
            
            
    },[]);
    
    
    return (
        <div className="container mt-4">
            <h3 className="mb-4">Sistema Administrativo | Comunidad Bajos del Pechiche</h3>
            <div>
                <h5>Bienvenido</h5>
                <i className="fa-solid fa-person"></i>
            </div>
                <div className="row mb-3">
                    <div className="col-xl-3 col-sm-6 py-2">
                    <Link to="/socio" style={{ textDecoration: 'none' }}>
                        <div className="card bg-success text-white h-100">
                            <div className="card-body bg-success" style={{backgroundColor:"#57b960"}}>
                                <div className="rotate">
                                    <i className="fa fa-user fa-4x"></i>
                                </div>
                                <h5 className="card-title">Módulo de socios</h5>
                                <p className="card-text">{totalSocios}</p>
                                
                            </div>
                        </div>
                    </Link>
                    </div>

                    <div className="col-xl-3 col-sm-6 py-2">
                    <Link to="/pago" style={{ textDecoration: 'none' }}>
                        <div className="card text-white bg-danger h-100">
                            <div className="card-body bg-danger" >
                                <div className="rotate">
                                    <i className="fa fa-solid fa-money-bill fa-4x"></i> 
                                </div>
                                <h5 className="card-title">Módulo de recaudaciones</h5>
                                <p className="card-text">{totalRecaudacion}</p>
                            </div>
                        </div>
                    </Link>
                    </div>

                    <div className="col-xl-3 col-sm-6 py-2">
                    <Link to="/reunion" style={{ textDecoration: 'none' }}>
                        <div className="card text-white  h-100">
                            <div className="card-body" style={{backgroundColor:"#5776b9"}}>
                                <div className="rotate">
                                    <i class="fa fa-solid fa-users fa-4x"></i>
                                </div>
                                <h5 className="card-title">módulo de reuniones</h5>
                                <p className="card-text">{totalReunion}</p>
                            </div>
                        </div>
                    </Link>
                    </div>

                    <div className="col-xl-3 col-sm-6 py-2">
                    <Link to="/gasto" style={{ textDecoration: 'none' }}>
                        <div className="card text-white bg-warning h-100">
                            <div className="card-body bg-warning">
                                <div className="rotate">
                                    <i className="fa fa-solid fa-dollar-sign fa-4x"></i> 
                                </div>
                                <h5 className="card-title">Módulo de Gastos</h5>
                                <p className="card-text">{totalGasto}</p>
                            </div>
                        </div>
                    </Link>
                    </div>

                    <div className="col-xl-3 col-sm-6 py-2">
                    <Link to="/reporte" style={{ textDecoration: 'none' }}>
                        <div className="card text-white bg-info h-100">
                            <div className="card-body bg-info">
                                <div className="rotate">
                                    <i className="fa fa-solid fa-file-pdf fa-4x"></i> 
                                </div>
                                <h5 className="card-title"> Módulo de Reportes</h5>
                            </div>
                        </div>
                    </Link>
                    </div>

                    <div className="col-xl-3 col-sm-6 py-2">
                    <Link to="/document" style={{ textDecoration: 'none' }}>
                        <div className="card text-white bg-warning h-100">
                            <div className="card-body" style={{backgroundColor:"#bda01e"}}>
                                <div className="rotate">
                                    <i class="fa fa-solid fa-file fa-4x"></i>
                                </div>
                                <h5 className="card-title"> Módulo de documentos</h5>
                                <p className="card-text">{totalDocumento}</p>
                            </div>
                        </div>
                    </Link>
                    </div>

        </div>
      {/* Add more widgets with inline styles */}
    </div>
  );
}

export default Home;