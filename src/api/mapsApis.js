import axios from "axios";

const GOOGLE_MAPS_API_KEY = "AIzaSyCYpXE7zH0vSAnI4pogNYEKMQQSgpvINDo";

export const geocodeAddress = async (address) => {
  const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
    params: { address, key: GOOGLE_MAPS_API_KEY },
  });
  return response.data;
};

export const calculateDistances = async (origin, destinations) => {
  const response = await axios.get(`/maps/api/distancematrix/json`, {
    params: {
      origins: origin,
      destinations,
      key: GOOGLE_MAPS_API_KEY,
    },
  });
  return response.data;
};
