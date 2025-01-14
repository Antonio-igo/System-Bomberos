import axios from "axios";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const BASE_URL = "https://system-bomberos-backend.vercel.app";

export const geocodeAddress = async (address) => {
  const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
    params: { address, key: GOOGLE_MAPS_API_KEY },
  });
  return response.data;
};

export const calculateDistances = async (origin, destinations) => {
  try {

    const response = await axios.get(`${BASE_URL}/api/distance-matrix`, {
      //const response = await axios.get(`http://localhost:5000/api/distance-matrix`, {
      params: {
        origins: origin,
        destinations,
      },
    });
    console.log("Respuesta del Backend:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al consultar el backend:", error.response?.data || error.message);
    throw new Error("Error al consultar el backend para cálculo de distancias.");
  }
};