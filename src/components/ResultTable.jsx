import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const ResultTable = ({ distances, onOpenModal }) => (
  <table className="w-full text-left border-collapse border border-gray-200">
    <thead>
      <tr className="bg-gray-100">
        <th className="py-2 px-4 border">Compañía</th>
        <th className="py-2 px-4 border">Latitud</th>
        <th className="py-2 px-4 border">Longitud</th>
        <th className="py-2 px-4 border">Distancia</th>
        <th className="py-2 px-4 border">Duración</th>
        <th className="py-2 px-4 border">Mapa</th>
      </tr>
    </thead>
    <tbody>
      {distances.map((station, index) => (
        <tr key={index} className="hover:bg-gray-50">
          <td className="py-2 px-4 border">{station.name}</td>
          <td className="py-2 px-4 border">{station.lat}</td>
          <td className="py-2 px-4 border">{station.lng}</td>
          <td className="py-2 px-4 border">{station.distance}</td>
          <td className="py-2 px-4 border">{station.duration}</td>
          <td className="py-2 px-4 border text-center">
          <button
  onClick={() => onOpenModal(station)}
  className="text-blue-600 hover:underline"
>
  <FaMapMarkerAlt />
</button>

          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ResultTable;
