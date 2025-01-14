import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const MapModal = ({ isOpen, onClose, station }) => {
  if (!isOpen || !station) return null;

  const { lat, lng, name, address } = station;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">{name}</h2>
        <p>
          <strong>Dirección:</strong> {address}
        </p>
        <p>
          <strong>Latitud:</strong> {lat}
        </p>
        <p>
          <strong>Longitud:</strong> {lng}
        </p>
        <div className="h-64 w-full mt-4">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            zoom={15}
            center={{ lat, lng }}
          >
            <Marker position={{ lat, lng }} />
          </GoogleMap>
        </div>
        <div className="mt-4 flex justify-between">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Ver en Google Maps
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

export default MapModal;
