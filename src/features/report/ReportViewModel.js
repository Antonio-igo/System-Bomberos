import { useState } from "react";
import { fetchDistances } from "./ReportModel";

export const useReportViewModel = (fireStations) => {
  const [address, setAddress] = useState("");
  const [distances, setDistances] = useState([]);
  const [error, setError] = useState(null);

  const calculateDistances = async () => {
    try {
      setError(null); // Limpia errores previos
      const results = await fetchDistances(address, fireStations);
      setDistances(results);
    } catch (err) {
      console.error("Error:", err.message);
      setError(err.message); // Muestra el error al usuario
    }
  };

  return {
    address,
    setAddress,
    distances,
    calculateDistances,
    error, // Devuelve el error al componente
  };
};
