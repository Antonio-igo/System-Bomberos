import axios from "axios";
import { BASE_URL } from "../constants/mapConfig";

export const geocodeAddress = async (address) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/geocode`, {
      params: { address },
    });
    console.log("Respuesta de geocodeAddress:", response.data);
    return response.data.results[0].geometry.location; // { lat: ..., lng: ... }
  } catch (error) {
    console.error("Error al geocodificar la dirección:", error.message);
    throw new Error("No se pudo geocodificar la dirección.");
  }
};
