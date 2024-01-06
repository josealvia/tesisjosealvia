import React, {useState} from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const URISOCIO = 'http://localhost:5000/socio/'

const ReportePDF =()=>{
    const [socios, setSocios]= useState([]);

    const obtenerSocios = async()=>{
        try {
            const response = await axios.get(URISOCIO);
            setSocios(response.data)
            
        } catch (error) {
            console.error('Error al obtener los socios:', error);
        }
    };

    const generarPDF =()=>{
        const content = document.getElementById('reporte-pdf');
        html2canvas(content).then(canvas=>{
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save('reporte_socios.pdf')
        });
    };

    return (
      <div>
        <button onClick={obtenerSocios}>Obtener Socios</button>
        <button onClick={generarPDF}>Generar PDF</button>
        
        <div id="reporte-pdf">
          <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Reporte de Socios</h1>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>ID</th>
                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Nombre</th>
                <th style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Apellido</th>
              </tr>
            </thead>
            <tbody>
              {socios.map(socio => (
                <tr key={socio.id}>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{socio.id}</td>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{socio.nombresocio}</td>
                  <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{socio.apellidosocio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
export default ReportePDF;