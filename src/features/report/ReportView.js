import React, { useRef, useEffect } from "react";
import ResultTable from "../../components/ResultTable";
import MapModal from "../../components/MapModal";
import { useReportViewModel } from "./ReportViewModel";

const fireStations = [
    { lat: -36.830458, lng: -73.055303, name: "1ª Compañía" },
    { lat: -36.830178, lng: -73.047875, name: "2ª Compañía" },
    { lat: -36.831136, lng: -73.062653, name: "3ª Compañía" },
    { lat: -36.832857, lng: -73.053414, name: "4ª Compañía" },
    { lat: -36.833444, lng: -73.048762, name: "5ª Compañía" },
    { lat: -36.834411, lng: -73.057776, name: "6ª Compañía" },
    { lat: -36.835317, lng: -73.050459, name: "7ª Compañía" },
    { lat: -36.836224, lng: -73.058798, name: "8ª Compañía" },
    { lat: -36.837110, lng: -73.051116, name: "9ª Compañía" },
    { lat: -36.838005, lng: -73.055672, name: "10ª Compañía" },
  // Otras estaciones...
];

const ReportView = () => {
  const {
    address,
    setAddress,
    distances,
    calculateDistances,
    showModal,
    modalData,
    openModal,
    closeModal,
  } = useReportViewModel(fireStations);

  // Ref para el input de autocompletado
  const addressInputRef = useRef(null);

  // Configuración de Google Places Autocomplete
  useEffect(() => {
    if (window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
        types: ["geocode"], // Sugiere direcciones
        componentRestrictions: { country: "CL" }, // Limita las sugerencias a Chile
      });

      // Evento para manejar la selección de un lugar
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          setAddress(place.formatted_address); // Actualiza la dirección seleccionada
        }
      });
    }
  }, [setAddress]); // Dependencia para asegurar que `setAddress` esté actualizado

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
        Reporte de Incendios
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          calculateDistances();
        }}
        className="flex flex-col items-center gap-4"
      >
        <input
          ref={addressInputRef} // Ref para integrar con Google Places Autocomplete
          value={address}
          onChange={(e) => setAddress(e.target.value)} // Manejador de cambio de texto
          placeholder="Ingresa la dirección del incendio"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <button
          type="submit"
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Calcular Distancias
        </button>
      </form>
      <div className="mt-8">
        <ResultTable distances={distances} onOpenModal={openModal} />
      </div>
      <MapModal isOpen={showModal} onClose={closeModal} station={modalData} />
    </div>
  );
};

export default ReportView;
