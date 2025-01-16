import { useState } from "react";
import { fetchDistances } from "./ReportModel";
import { getDirections } from "../../api/directions";

export const useReportViewModel = () => {
  const [address, setAddress] = useState("");
  const [distances, setDistances] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [routeData, setRouteData] = useState(null);

  const calculateDistances = async () => {
    if (!address) {
      setError("Por favor, ingresa una dirección.");
      return;
    }
    try {
      setError(null);
      const results = await fetchDistances(address);
      setDistances(results);
    } catch (err) {
      console.error("Error al calcular distancias:", err.message);
      setError("No se pudieron calcular las distancias.");
    }
  };

  const openModal = async (station) => {
    try {
      const routeResponse = await getDirections(
        `${station.latitude},${station.longitude}`,
        address
      );
  
      if (!routeResponse.routes || routeResponse.routes.length === 0) {
        throw new Error("No se encontraron rutas.");
      }
  
      console.log("Datos de la API Directions:", routeResponse);
  
      setRouteData(routeResponse); // Guarda todo el objeto DirectionsResult
      setModalData(station);
      setShowModal(true);
    } catch (err) {
      console.error("Error al obtener las rutas:", err.message);
      setError("No se pudo obtener la ruta.");
    }
  };
  
  
  

  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
    setRouteData(null);
  };

  return {
    address,
    setAddress,
    distances,
    calculateDistances,
    showModal,
    modalData,
    routeData,
    openModal,
    closeModal,
    error,
  };
};
