import React, { useEffect } from "react";
import PropTypes from "prop-types";

const MapModal = ({ isOpen, onClose, station, route }) => {
  useEffect(() => {
    if (isOpen && station && route?.routes?.[0]?.legs?.[0]?.end_address) {
      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${station.latitude},${station.longitude}&destination=${route.routes[0].legs[0].end_address}`;
      window.open(googleMapsUrl, "_blank", "noopener,noreferrer");
    }
  }, [isOpen, station, route]);

  if (!isOpen || !station) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">{station.name}</h2>
        {route?.routes?.[0]?.legs?.[0] && (
          <div className="mb-4">
            <p>
              <strong>Distancia:</strong> {route.routes[0].legs[0].distance.text}
            </p>
            <p>
              <strong>Duración:</strong> {route.routes[0].legs[0].duration.text}
            </p>
          </div>
        )}
        <div className="mt-4 flex justify-between">
          <a
            href={`https://www.google.com/maps/dir/?api=1&origin=${station.latitude},${station.longitude}&destination=${route?.routes?.[0]?.legs?.[0]?.end_address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Ver ruta en Google Maps
          </a>
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

MapModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  station: PropTypes.shape({
    name: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
  route: PropTypes.object,
};

export default MapModal;
