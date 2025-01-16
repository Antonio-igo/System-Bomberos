import axios from "axios";
import { BASE_URL } from "../constants/mapConfig";

export const calculateDistances = async (origin, destinations) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/distance-matrix`, {
      params: {
        origin, // Coordenadas o dirección del origen
        destinations: destinations.join("|"), // Coordenadas separadas por "|"
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al calcular las distancias:", error.response?.data || error.message);
    throw new Error("No se pudo calcular la distancia.");
  }
};
