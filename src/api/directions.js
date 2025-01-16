import axios from "axios";
import { BASE_URL } from "../constants/mapConfig";

export const getDirections = async (origin, destination) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/directions`, {
      params: { origin, destination },
    });
    console.log("Parámetros enviados a Directions API:", { origin, destination });

    console.log("Respuesta de Directions API en frontend:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las rutas:", error.response?.data || error.message);
    throw new Error("No se pudo obtener la ruta.");
  }
};
