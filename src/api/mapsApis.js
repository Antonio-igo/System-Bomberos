import axios from "axios";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
export const geocodeAddress = async (address) => {
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: { address, key: GOOGLE_MAPS_API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error("Error en Geocoding API:", error.response?.data || error.message);
    throw new Error("Error al consultar la API de geocodificación.");
  }
};


export const calculateDistances = async (origin, destinations) => {
  //const response = await axios.get(`/maps/api/distancematrix/json`, {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json`, {
        params: {
          origins: origin,
          destinations,
          key: GOOGLE_MAPS_API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error en Distance Matrix API:", error.response?.data || error.message);
      throw new Error("Error al consultar la API de cálculo de distancias.");
    }
  };