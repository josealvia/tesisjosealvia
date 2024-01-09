import logo from './logo.svg';
import './App.css';
import Footer from '../src/Layout/Footer/Footer'; 
import Header from './Layout/Header/Header';

//import los componentes

import CompShowUsuarios from './views/usuario/ShowUsuarios'
import CompCreateusuario  from './views/usuario/CreateUsuario'
import CompEditUsuario from './views/usuario/EditUsuario';
import CompLogin from './views/login/login';
import CompShowRoles from './views/rol/ShowRol';
import CompCreaterol from './views/rol/CreateRol';
import CompEditRol from './views/rol/EditRol';
import CompShowSocios from './views/socio/ShowSocios';
import CompCreatesocio from './views/socio/CreateSocio';
import CompEditSocio from './views/socio/EditSocio';
import CompShowRubros from './views/rubro/ShowRubros';
import CompCreaterubro from './views/rubro/CreateRubro';
import CompEditRubro from './views/rubro/EditRubro';
import CompShowReuniones from './views/reunion/ShowReuniones';
import CompCreatereunion from './views/reunion/CreateReunion';
import CompEditReunion from './views/reunion/EditReunion';
import CompShowGastos from './views/gasto/ShowGastos';
import CompEditGasto from './views/gasto/EditGasto';
import DocumentUpload from './views/documento/CreateFile';
import CompShowFiles from './views/documento/ShowFile';
import CompShowPagos from './views/pago/ShowPagos';
import CobrarPago from './views/pago/cobrarpago';
import CompCrearPago from './views/pago/createpago';
import TomarAsistencia from './views/reunion/tomarasistencia';
import CompShowReportes from './views/reporte/ShowReportes';
import ReportePDF from './views/reporte/ReportePDF';
import VerAsistencia from './views/reunion/Verasistencia';
import VerPago from './views/pago/Verpago';


import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import CompCreategasto from './views/gasto/CreateGasto';
import Home from './views/home/home';


//funcion para validar la session 
function parseJwt (token) {
  if (!token) {
    return null;
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    // Maneja el caso en el que el token no tenga el formato esperado.
    return null;
  }

  const base64Url = parts[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  try {
    const parsedPayload = JSON.parse(jsonPayload);
    return parsedPayload;
  } catch (error) {
    // Maneja el caso en el que el JSON no se pueda analizar correctamente.
    return null;
  }
}
   


const token = localStorage.getItem('token');
const tokenPayload = parseJwt(token);
const tokenExistAndStillValid = tokenPayload && tokenPayload.exp && tokenPayload.exp * 1000 > Date.now();



function App() {

  
  return (
    <div className="App">
      
      <Header/>
      
      <BrowserRouter>
        <Routes>    
        <Route path="/" element={tokenExistAndStillValid ? <Navigate to="/home" /> : <CompLogin />} />
        <Route path="/home" element={tokenExistAndStillValid ? <Home /> : <Navigate to="/" />} />
        <Route path="/usuario" element={tokenExistAndStillValid ? <CompShowUsuarios /> : <Navigate to="/" />} />
        <Route path="/createusuario" element={tokenExistAndStillValid ? <CompCreateusuario /> : <Navigate to="/" />} />
        <Route path="/editusuario/:id" element={tokenExistAndStillValid ? <CompEditUsuario /> : <Navigate to="/" />} />
        <Route path="/socio" element={tokenExistAndStillValid ? <CompShowSocios /> : <Navigate to="/" />} />
        <Route path="/createsocio" element={tokenExistAndStillValid ? <CompCreatesocio /> : <Navigate to="/" />} />
        <Route path="/editsocio/:id" element={tokenExistAndStillValid ? <CompEditSocio /> : <Navigate to="/" />} />

        <Route path="/rol" element={tokenExistAndStillValid ? <CompShowRoles /> : <Navigate to="/" />} />
        <Route path="/createrol" element={tokenExistAndStillValid ? <CompCreaterol /> : <Navigate to="/" />} />
        <Route path="/editrol/:id" element={tokenExistAndStillValid ? <CompEditRol /> : <Navigate to="/" />} />
        <Route path="/reunion" element={tokenExistAndStillValid ? <CompShowReuniones /> : <Navigate to="/" />} />
        <Route path="/createreunion" element={tokenExistAndStillValid ? <CompCreatereunion /> : <Navigate to="/" />} />
        <Route path="/editreunion/:id" element={tokenExistAndStillValid ? <CompEditReunion /> : <Navigate to="/" />} />
        <Route path="/rubro" element={tokenExistAndStillValid ? <CompShowRubros /> : <Navigate to="/" />} />
        <Route path="/createrubro" element={tokenExistAndStillValid ? <CompCreaterubro /> : <Navigate to="/" />} />
        <Route path="/editrubro/:id" element={tokenExistAndStillValid ? <CompEditRubro /> : <Navigate to="/" />} />
        <Route path="/gasto" element={tokenExistAndStillValid ? <CompShowGastos /> : <Navigate to="/" />} />
        <Route path="/creategasto" element={tokenExistAndStillValid ? <CompCreategasto /> : <Navigate to="/" />} />
        <Route path="/editgasto/:id" element={tokenExistAndStillValid ? <CompEditGasto /> : <Navigate to="/" />} />
        <Route path="/document" element={tokenExistAndStillValid ? <CompShowFiles /> : <Navigate to="/" />} />
        <Route path="/createdocument" element={tokenExistAndStillValid ? <DocumentUpload /> : <Navigate to="/" />} />
        <Route path="/pago" element={tokenExistAndStillValid ? <CompShowPagos /> : <Navigate to="/" />} />
        <Route path="/cobrarpago/:id" element={tokenExistAndStillValid ? <CobrarPago /> : <Navigate to="/" />} />
        <Route path="/createpago" element={tokenExistAndStillValid ? <CompCrearPago /> : <Navigate to="/" />} />
        <Route path='/tomarasistencia/:id' element={tokenExistAndStillValid ? <TomarAsistencia /> : <Navigate to="/" />} />
        <Route path='/reporte' element={tokenExistAndStillValid ? <CompShowReportes /> : <Navigate to="/" />} />
        <Route path='/reporte11' element={tokenExistAndStillValid ? <ReportePDF /> : <Navigate to="/" />} />
        <Route path='/verasistencia/:id' element={tokenExistAndStillValid ? <VerAsistencia /> : <Navigate to="/" />} />
        <Route path='/verpago/:id' element={tokenExistAndStillValid ? <VerPago /> : <Navigate to="/" />} />


        </Routes>
      </BrowserRouter>
      

      

      <div>
      <Footer />

    </div>

      
    </div>
  )

}

export default App;
