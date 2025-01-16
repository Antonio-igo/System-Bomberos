import React from "react";

const DistanceTable = ({ distances, onOpenModal }) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th>Compañía</th>
          <th>Distancia</th>
          <th>Duración</th>
          <th>Mapa</th>
        </tr>
      </thead>
      <tbody>
        {distances.map((station, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td>{station.name}</td>
            <td>{station.distance}</td>
            <td>{station.duration}</td>
            <td>
              <button onClick={() => onOpenModal(station)}>
                Ver Mapa
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DistanceTable;
