import axios from 'axios'
import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const URISOCIO = 'http://localhost:5000/socio/'
const URIPAGO = 'http://localhost:5000/pago/'
const URIREUNION = 'http://localhost:5000/reunion/'
const URIGASTO = 'http://localhost:5000/gasto/';


const CompShowReportes=()=>{


    // para mostrar socios//
    const [mostrarEncabezado, setMostrarEncabezado] = useState(false);
    const [socios, setSocios]= useState([]);

    const obtenerSocios = async()=>{
        try {
            const response = await axios.get(URISOCIO);
            setSocios(response.data);
            setMostrarEncabezado(true);
            
        } catch (error) {
            console.error('Error al obtener los socios:', error);
        }
    };

    const cerrarEncabezado = () => {
        setMostrarEncabezado(false);
    };

    const generarPDF =()=>{
        const content = document.getElementById('reporte-pdf');
        html2canvas(content).then(canvas=>{
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 10, 10,180,180);
            pdf.save('reporte_socios.pdf')
        });
    };

    //  ------------------------------------//

    // para mostrar pagos 
    const [mostrarEncabezadoPago, setMostrarEncabezadoPago] = useState(false);
    const [pagos, setPagos]= useState([]);

    const obtenerPagos = async()=>{
        try {
            const response = await axios.get(URIPAGO);
            setPagos(response.data);
            setMostrarEncabezadoPago(true);
            
        } catch (error) {
            console.error('Error al obtener los pagos:', error);
        }
    };

    const cerrarEncabezadoPago = () => {
        setMostrarEncabezadoPago(false);
    };
    const generarpagoPDF =()=>{
        const content = document.getElementById('reportepago-pdf');
        html2canvas(content).then(canvas=>{
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 10, 10,180,180);
            pdf.save('reporte_recaudaciones.pdf')
        });
    };

    // ----------------------------//

    // recaudaciones por mes ////
    const [mostrarEncabezadoMes, setMostrarEncabezadoMes] = useState(false);
    const [pagosMes, setPagosMes]= useState([]);
    const obtenerPagosMes = async()=>{
        try {
            const response = await axios.get(URIPAGO);
            setPagosMes(response.data);
            setMostrarEncabezadoMes(true);
            
        } catch (error) {
            console.error('Error al obtener los pagos:', error);
        }
    };

    const cerrarEncabezadoMes = () => {
        setMostrarEncabezadoMes(false);
    };

    const generarpagoMesPDF =()=>{
        const content = document.getElementById('reportepagomes-pdf');
        html2canvas(content).then(canvas=>{
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 10, 10,180,180);
            pdf.save('reporte_recaudacionesmes.pdf')
        });
    };

    // -------------------                    //


    //mostrar todas las reuniones

    const [mostrarEncabezadoreunion, setMostrarEncabezadoReunion] = useState(false);
    const [reuniones, setReuniones]= useState([]);

    const obtenerReunion = async()=>{
        try {
            const response = await axios.get(URIREUNION);
            setReuniones(response.data);
            setMostrarEncabezadoReunion(true);
            
        } catch (error) {
            console.error('Error al obtener las reuniones:', error);
        }
    };

    const cerrarEncabezadoReunion = () => {
        setMostrarEncabezadoReunion(false);
    };

    const generarreunionPDF =()=>{
        const content = document.getElementById('reportereunion-pdf');
        html2canvas(content).then(canvas=>{
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 10, 10,180,180);
            pdf.save('reporte_reunion.pdf')
        });
    };

    //-----------------------------------///


    // Todos los gastos //

    const [mostrarEncabezadogasto, setMostrarEncabezadoGasto] = useState(false);
    const [gastos, setGastos]= useState([]);

    const obtenerGasto = async()=>{
        try {
            const response = await axios.get(URIGASTO);
            setGastos(response.data);
            setMostrarEncabezadoGasto(true);
            
        } catch (error) {
            console.error('Error al obtener los gastos:', error);
        }
    };

    const cerrarEncabezadoGasto = () => {
        setMostrarEncabezadoGasto(false);
    };

    const generargastoPDF =()=>{
        const content = document.getElementById('reportegasto-pdf');
        html2canvas(content).then(canvas=>{
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 10, 10,180,180);
            pdf.save('reporte_gasto.pdf')
        });
    };



    return(
        <div className='container'>
            <div className='mt-5'>
                <h4>Reportes</h4>
            </div> 
            <div className="container mt-4">
                <div className="card mb-4" id="reporte-pdf">
                    <div className="card-body d-flex flex-column align-items-start">
                        <h5 className="card-title mb-3">Reporte de socios</h5>
                        {!mostrarEncabezado && (
                        <button onClick={obtenerSocios} type="submit" className="btn btn-primary" >Todos los socios</button>
                        )}
                        {mostrarEncabezado && (
                        <div>
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>ID</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Cédula</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Nombres</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Apellidos</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Dirección</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Teléfono</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {socios.map(socio => (
                                    <tr key={socio.id}>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{socio.id}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{socio.cedulasocio}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{socio.nombresocio}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{socio.apellidosocio}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{socio.direccionsocio}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{socio.telefonosocio}</td>
                                        
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className='btn btn-primary action-button' onClick={generarPDF}>Generar PDF</button>
                            <button  onClick={cerrarEncabezado} className="btn btn-danger action-button">Cerrar</button>
                        </div>
                        )}  
                    </div>
                </div>

                <div className="card mb-4" id="reportepago-pdf">
                    <div className="card-body d-flex flex-column align-items-start">
                        <h5 className="card-title mb-3">Reporte de recaudaciones</h5>
                        {!mostrarEncabezadoPago && (
                        <button onClick={obtenerPagos} type="submit" className="btn btn-primary" style={{ marginRight: '10px', marginBottom: '10px' }} >Todos las recaudaciones</button>
                        )}
                        {mostrarEncabezadoPago && (
                        <div>
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>ID</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Cédula Socio</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Nombres</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Apellidos</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Cantidad de Pago</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Fecha</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pagos.map(pago => (
                                    <tr key={pago.id}>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{pago.id}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{pago.socio.cedulasocio}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{pago.socio.nombresocio}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{pago.socio.apellidosocio}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{pago.cantidadpago}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{pago.fechapago}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{pago.estadopago === 1 || pago.estadopago ===true ? 'Pagado' : 'No pagado' }</td>
                                        
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className='btn btn-primary action-button' onClick={generarpagoPDF}>Generar PDF</button>
                            <button onClick={cerrarEncabezadoPago} className="btn btn-danger action-button">Cerrar</button>
                        </div>
                        )}
                    </div>
                </div>



                <div className="card mb-4" id="reportereunion-pdf">
                    <div className="card-body d-flex flex-column align-items-start">
                        <h5 className="card-title mb-3">Reporte de reuniones</h5>
                        {!mostrarEncabezadoreunion && (
                        <button onClick={obtenerReunion} type="submit" className="btn btn-primary" >Todas las reuniones</button>
                        )}
                        {mostrarEncabezadoreunion && (
                        <div>
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>ID</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Sección</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Descripción</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Fecha</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Lugar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reuniones.map(reunion => (
                                    <tr key={reunion.id}>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{reunion.id}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{reunion.seccionreunion}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{reunion.descripcionreunion}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{reunion.fechareunion}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{reunion.lugarreunion}</td>
                                        
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className='btn btn-primary action-button' onClick={generarreunionPDF}>Generar PDF</button>
                            <button onClick={cerrarEncabezadoReunion} className="btn btn-danger action-button">Cerrar</button>
                        </div>
                        )}
                    </div>
                </div>

                <div className="card mb-4" id="reportegasto-pdf">
                    <div className="card-body d-flex flex-column align-items-start">
                        <h5 className="card-title mb-3">Reporte de gastos</h5>
                        {!mostrarEncabezadogasto && (
                        <button onClick={obtenerGasto} type="submit" className="btn btn-primary" style={{ marginRight: '10px', marginBottom: '10px' }} >Todos los Gastos</button>
                        )}
                        {mostrarEncabezadogasto && (
                        <div>
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>ID</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Descripción</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Monto</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Fecha</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Rubro</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {gastos.map(gasto => (
                                    <tr key={gasto.id}>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{gasto.id}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{gasto.descripciongasto}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{gasto.montogasto}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{gasto.fechagasto}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{gasto.rubro.nombrerubro}</td>
                                        
                                        
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className='btn btn-primary action-button' onClick={generargastoPDF}>Generar PDF</button>
                            <button onClick={cerrarEncabezadoGasto} className="btn btn-danger action-button">Cerrar</button>
                        </div>
                        )}

                    </div>
                </div>

            </div>
        </div>

        
        
    );


}

    /*return(
        <div className='container'>
            <div className='mt-5'>
                <h4>Reportes</h4>
            </div> 
            <div className="container mt-4">
                <div className="card mb-4" id="reporte-pdf">
                    <div className="card-body d-flex flex-column align-items-start">
                        <h5 className="card-title mb-3">Reporte de socios</h5>
                        {!mostrarEncabezado && (
                        <button onClick={obtenerSocios} type="submit" className="btn btn-primary" >Todos los socios</button>
                        )}
                        {mostrarEncabezado && (
                        <div>
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>ID</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Cédula</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Nombres</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Apellidos</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Dirección</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Teléfono</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {socios.map(socio => (
                                    <tr key={socio.id}>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{socio.id}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{socio.cedulasocio}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{socio.nombresocio}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{socio.apellidosocio}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{socio.direccionsocio}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{socio.telefonosocio}</td>
                                        
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className='btn btn-primary action-button' onClick={generarPDF}>Generar PDF</button>
                            <button  onClick={cerrarEncabezado} className="btn btn-danger action-button">Cerrar</button>
                        </div>
                        )}  
                    </div>
                </div>

                <div className="card mb-4" id="reportepago-pdf">
                    <div className="card-body d-flex flex-column align-items-start">
                        <h5 className="card-title mb-3">Reporte de recaudaciones</h5>
                        {!mostrarEncabezadoPago && (
                        <button onClick={obtenerPagos} type="submit" className="btn btn-primary" style={{ marginRight: '10px', marginBottom: '10px' }} >Todos las recaudaciones</button>
                        )}
                        {mostrarEncabezadoPago && (
                        <div>
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>ID</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Cédula Socio</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Nombres</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Apellidos</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Cantidad de Pago</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Fecha</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pagos.map(pago => (
                                    <tr key={pago.id}>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{pago.id}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{pago.socio.cedulasocio}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{pago.socio.nombresocio}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{pago.socio.apellidosocio}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{pago.cantidadpago}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{pago.fechapago}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{pago.estadopago}</td>
                                        
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className='btn btn-primary action-button' onClick={generarpagoPDF}>Generar PDF</button>
                            <button onClick={cerrarEncabezadoPago} className="btn btn-danger action-button">Cerrar</button>
                        </div>
                        )}


                        {!mostrarEncabezadoMes && (
                        <button onClick={obtenerPagosMes} type="submit" className="btn btn-primary" style={{ marginRight: '10px', marginBottom: '10px' }} >Recaudaciones por meses</button>
                        )}
                        {mostrarEncabezadoMes && (
                            <div id="reportepagomes-pdf">
                                <h5 className="card-title mb-3">Reporte de recaudaciones</h5>
                                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>ID</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Cédula Socio</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Nombres</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Apellidos</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {pagosMes.map(pagomes => (
                                    <tr key={pagomes.id}>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{pagomes.id}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{pagomes.socio.cedulasocio}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{pagomes.socio.nombresocio}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{pagomes.socio.apellidosocio}</td>
                                        
                                        
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className='btn btn-primary action-button' onClick={generarpagoMesPDF}>Generar PDF</button>
                            <button onClick={cerrarEncabezadoMes} className="btn btn-danger action-button">Cerrar</button>
                            </div>
                        )}

                    </div>
                </div>



                <div className="card mb-4" id="reportereunion-pdf">
                    <div className="card-body d-flex flex-column align-items-start">
                        <h5 className="card-title mb-3">Reporte de reuniones</h5>
                        {!mostrarEncabezadoreunion && (
                        <button onClick={obtenerReunion} type="submit" className="btn btn-primary" >Todas las reuniones</button>
                        )}
                        {mostrarEncabezadoreunion && (
                        <div>
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>ID</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Sección</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Descripción</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Fecha</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Lugar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reuniones.map(reunion => (
                                    <tr key={reunion.id}>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{reunion.id}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{reunion.seccionreunion}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{reunion.descripcionreunion}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{reunion.fechareunion}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{reunion.lugarreunion}</td>
                                        
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className='btn btn-primary action-button' onClick={generarreunionPDF}>Generar PDF</button>
                            <button onClick={cerrarEncabezadoReunion} className="btn btn-danger action-button">Cerrar</button>
                        </div>
                        )}
                    </div>
                </div>

                <div className="card mb-4" id="reportegasto-pdf">
                    <div className="card-body d-flex flex-column align-items-start">
                        <h5 className="card-title mb-3">Reporte de gastos</h5>
                        {!mostrarEncabezadogasto && (
                        <button onClick={obtenerGasto} type="submit" className="btn btn-primary" style={{ marginRight: '10px', marginBottom: '10px' }} >Todos las recaudaciones</button>
                        )}
                        {mostrarEncabezadogasto && (
                        <div>
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>ID</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Descripción</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Monto</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Fecha</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Rubro</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {gastos.map(gasto => (
                                    <tr key={gasto.id}>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{gasto.id}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{gasto.descripciongasto}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{gasto.montogasto}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{gasto.fechagasto}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{gasto.rubro.nombrerubro}</td>
                                        
                                        
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className='btn btn-primary action-button' onClick={generargastoPDF}>Generar PDF</button>
                            <button onClick={cerrarEncabezadoGasto} className="btn btn-danger action-button">Cerrar</button>
                        </div>
                        )}


                        {!mostrarEncabezadoMes && (
                        <button onClick={obtenerPagosMes} type="submit" className="btn btn-primary" style={{ marginRight: '10px', marginBottom: '10px' }} >Recaudaciones por meses</button>
                        )}
                        {mostrarEncabezadoMes && (
                            <div id="reportepagomes-pdf">
                                <h5 className="card-title mb-3">Reporte de recaudaciones</h5>
                                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>ID</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Cédula Socio</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Nombres</th>
                                        <th style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>Apellidos</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {pagosMes.map(pagomes => (
                                    <tr key={pagomes.id}>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{pagomes.id}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{pagomes.socio.cedulasocio}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{pagomes.socio.nombresocio}</td>
                                        <td style={{ border: '3px solid #dddddd', textAlign: 'left', padding: '25px 35px', fontSize: '15px' }}>{pagomes.socio.apellidosocio}</td>
                                        
                                        
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className='btn btn-primary action-button' onClick={generarpagoMesPDF}>Generar PDF</button>
                            <button onClick={cerrarEncabezadoMes} className="btn btn-danger action-button">Cerrar</button>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>

        
        
    );


}*/


export default CompShowReportes