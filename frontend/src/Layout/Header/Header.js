
import React, {useEffect, useState} from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import {jwtDecode} from 'jwt-decode'; 

const handdleLogout = () => {
  localStorage.removeItem('token');
  window.location.href = '/';
}

function Header() {

  const [hasToken, setHasToken] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setHasToken(true);
      try {
        // Decodificar el token para obtener la información del usuario, incluido el rol
        const decodedToken = jwtDecode(token);
        console.log('decodedToken:', decodedToken); // Add this line to log the decoded token
        if (decodedToken) {
          setUserRole(decodedToken.rol); // Use the correct property name
          setUserName(decodedToken.user);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        setHasToken(false);
        setUserRole(null);
        setUserName(null);
      }
    } else {
      setHasToken(false);
      setUserRole(null);
      setUserName(null);
    }
  }, []);
  console.log('userRole:', userRole);
  console.log('userRole:', userName);

  return (
    <header style={{ marginBottom: '20px', fontFamily: 'Arial, sans-serif' }}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ borderBottom: '2px solid #3498db' }}>
        <div className="container">
          <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
          >
          <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <Nav className="ml-auto">
              {hasToken ? (
                <>
                <Nav.Link href="/home" style={{ color: '#3498db' }}>Inicio</Nav.Link>
                
                {userRole === 'Administrador' ?(
                <>
                <NavDropdown title="Usuarios" id="usuarios-dropdown">
                  <NavDropdown.Item href="/createusuario" style={{ color: '#3498db' }}>Crear Usuario</NavDropdown.Item>
                  <NavDropdown.Item href="/usuario" style={{ color: '#3498db' }}>Listar Usuarios</NavDropdown.Item>
                  <NavDropdown.Item href="/createrol" style={{ color: '#3498db' }}>Crear rol</NavDropdown.Item>
                  <NavDropdown.Item href="/rol" style={{ color: '#3498db' }}>Listar rol</NavDropdown.Item>
                  
                </NavDropdown>

                <NavDropdown title="Socios" id="socios-dropdown">
                  <NavDropdown.Item href="/createsocio" style={{ color: '#3498db' }}>Crear Socio</NavDropdown.Item>
                  <NavDropdown.Item href="/socio" style={{ color: '#3498db' }}>Listar Socios</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Recaudaciones" id="recaudaciones-dropdown">
                  <NavDropdown.Item href="/createpago" style={{ color: '#3498db' }}>Crear Pago</NavDropdown.Item>
                  <NavDropdown.Item href="/pago" style={{ color: '#3498db' }}>Lista Pagos</NavDropdown.Item>
                  <NavDropdown.Item href="/createrubro" style={{ color: '#3498db' }}>Crear rubro</NavDropdown.Item>
                  <NavDropdown.Item href="/rubro" style={{ color: '#3498db' }}>Lista rubro</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Reuniones" id="reuniones-dropdown">
                  <NavDropdown.Item href="/createreunion" style={{ color: '#3498db' }}>Crear Reunion</NavDropdown.Item>
                  <NavDropdown.Item href="/reunion" style={{ color: '#3498db' }}>Lista reunion</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Gastos" id="gastos-dropdown">
                  <NavDropdown.Item href="/creategasto" style={{ color: '#3498db' }}>Crear gasto</NavDropdown.Item>
                  <NavDropdown.Item href="/gasto" style={{ color: '#3498db' }}>Lista gasto</NavDropdown.Item>
                  <NavDropdown.Item href="/createrubro" style={{ color: '#3498db' }}>Crear rubro</NavDropdown.Item>
                  <NavDropdown.Item href="/rubro" style={{ color: '#3498db' }}>Lista rubro</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Reportes" id="reportes-dropdown">
                  <NavDropdown.Item href="/reporte" style={{ color: '#3498db' }}>Lista reporte</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Documentos" id="documentos-dropdown">
                  <NavDropdown.Item href="/createdocument" style={{ color: '#3498db' }}>Subir nuevo documento</NavDropdown.Item>
                  <NavDropdown.Item href="/document" style={{ color: '#3498db' }}>Lista documento</NavDropdown.Item>
                </NavDropdown>
                </>
                ):(
                <>
                <NavDropdown title="Socios" id="socios-dropdown">
                  <NavDropdown.Item href="/createsocio" style={{ color: '#3498db' }}>Crear Socio</NavDropdown.Item>
                  <NavDropdown.Item href="/socio" style={{ color: '#3498db' }}>Listar Socios</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Recaudaciones" id="recaudaciones-dropdown">
                  <NavDropdown.Item href="/createpago" style={{ color: '#3498db' }}>Crear Pago</NavDropdown.Item>
                  <NavDropdown.Item href="/pago" style={{ color: '#3498db' }}>Lista Pagos</NavDropdown.Item>
                  <NavDropdown.Item href="/createrubro" style={{ color: '#3498db' }}>Crear rubro</NavDropdown.Item>
                  <NavDropdown.Item href="/rubro" style={{ color: '#3498db' }}>Lista rubro</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Reuniones" id="reuniones-dropdown">
                  <NavDropdown.Item href="/createreunion" style={{ color: '#3498db' }}>Crear Reunion</NavDropdown.Item>
                  <NavDropdown.Item href="/reunion" style={{ color: '#3498db' }}>Lista reunion</NavDropdown.Item>
                  <NavDropdown.Item href="/createrubro" style={{ color: '#3498db' }}>Asistencia</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Gastos" id="gastos-dropdown">
                  <NavDropdown.Item href="/creategasto" style={{ color: '#3498db' }}>Crear gasto</NavDropdown.Item>
                  <NavDropdown.Item href="/gasto" style={{ color: '#3498db' }}>Lista gasto</NavDropdown.Item>
                  <NavDropdown.Item href="/createrubro" style={{ color: '#3498db' }}>Crear rubro</NavDropdown.Item>
                  <NavDropdown.Item href="/rubro" style={{ color: '#3498db' }}>Lista rubro</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Reportes" id="reportes-dropdown">
                  <NavDropdown.Item href="/reporte" style={{ color: '#3498db' }}>Lista reporte</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Documentos" id="documentos-dropdown">
                  <NavDropdown.Item href="/createdocument" style={{ color: '#3498db' }}>Subir nuevo documento</NavDropdown.Item>
                  <NavDropdown.Item href="/document" style={{ color: '#3498db' }}>Lista documento</NavDropdown.Item>
                </NavDropdown>
                </>
                )}

  <div style={{ marginLeft: 'auto', marginRight: '0' }}>
  <NavDropdown
    title={<span><i className="fas fa-user-circle profile-icon" style={{ marginRight: '5px' }}></i>{userName}</span>}
    id="user-dropdown"
    style={{ color: '#3498db' }}
  >
    <NavDropdown.Divider />
    <NavDropdown.Item
      href="#"
      style={{ color: '#e74c3c' }}
      onClick={handdleLogout}
    >
      Cerrar sesión
    </NavDropdown.Item>
  </NavDropdown>
</div>
                </>
              ):(
                <>
                <Nav.Link href="/" style={{ color: '#3498db' }}>Iniciar sesión</Nav.Link>
                </>
              )}
            </Nav>
          </div>
        </div>
      </nav>
    </header>
  );

}

export default Header;
