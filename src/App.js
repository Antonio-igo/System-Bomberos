import React from "react";
import { LoadScript } from "@react-google-maps/api";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReportView from "./features/report/ReportView";

const GOOGLE_MAPS_API_KEY = "AIzaSyCYpXE7zH0vSAnI4pogNYEKMQQSgpvINDo";

const App = () => {
  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          {/* Encabezado o barra de navegación opcional */}
          <header className="bg-red-800 text-white p-4 text-center">
            <h1 className="text-2xl font-bold">Sistema de Reporte de Incendios</h1>
          </header>

          {/* Rutas de la aplicación */}
          <main className="p-4">
            <Routes>
              {/* Ruta principal */}
              <Route path="/" element={<ReportView />} />

              {/* Ruta genérica para 404 */}
              <Route path="*" element={<div>404: Página no encontrada</div>} />
            </Routes>
          </main>

          {/* Footer opcional */}
          <footer className="bg-gray-200 text-center py-2">
            <p>© 2025 Sistema de Reporte de Incendios. Todos los derechos reservados.</p>
          </footer>
        </div>
      </Router>
    </LoadScript>
  );
};

export default App;
