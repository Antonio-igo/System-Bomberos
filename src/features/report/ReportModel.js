import { calculateDistances } from "../../api/distanceMatrix";
import { geocodeAddress } from "../../api/geocoding";
import { fireStations } from "../../constants/firestations";

import { getDirections } from "../../api/directions";

// Función para formatear la duración en horas, minutos y segundos
const formatDuration = (seconds) => {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${secs}`;
};

export const fetchDistances = async (address) => {
  try {
    const origin = await geocodeAddress(address);
    const distances = await Promise.all(
      fireStations.map(async (station) => {
        const routeData = await getDirections(
          `${station.latitude},${station.longitude}`,
          `${origin.lat},${origin.lng}`
        );
        const leg = routeData.routes[0].legs[0];
        return {
          ...station,
          distance: leg.distance.text,
          duration: formatDuration(leg.duration.value), // Formatea la duración
          durationInSeconds: leg.duration.value, // Guarda el valor en segundos para ordenar
        };
      })
    );

    // Ordena los resultados por duración en segundos
    distances.sort((a, b) => a.durationInSeconds - b.durationInSeconds);

    return distances;
  } catch (error) {
    console.error("Error en fetchDistances:", error.message);
    throw error;
  }
};
