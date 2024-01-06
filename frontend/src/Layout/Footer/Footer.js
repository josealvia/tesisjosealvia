import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-white p-3">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4">
            <img
              src="https://aulavirtualmoodle.uleam.edu.ec/pluginfile.php/1/theme_klass/logo/1701869325/logo_ULEAM_2017_horizontal_blanco.png"
              alt="Uleam"
              style={{ maxWidth: "60%", height: "auto" }}
            />
          </div>
          <div className="col-md-8">
            <p>&copy; Copyright {new Date().getFullYear()}, Todos los derechos reservados Uleam | Facultad Ciencias de la vida y Tecnologías.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer

