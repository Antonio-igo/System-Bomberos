import { useState } from "react";
import { fetchDistances } from "./ReportModel";

export const useReportViewModel = (fireStations) => {
  const [address, setAddress] = useState("");
  const [distances, setDistances] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const calculateDistances = async () => {
    try {
      const updatedStations = await fetchDistances(address, fireStations);
      setDistances(updatedStations);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al calcular las distancias.");
    }
  };

  const openModal = (station) => {
    setModalData({
      ...station,
      address, // Incluye la dirección ingresada
    });
    setShowModal(true);
  };
  

  const closeModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  return { address, setAddress, distances, calculateDistances, showModal, modalData, openModal, closeModal };
};
