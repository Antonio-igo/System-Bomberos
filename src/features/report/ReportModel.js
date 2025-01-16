import { calculateDistances } from "../../api/distanceMatrix";
import { geocodeAddress } from "../../api/geocoding";
import { fireStations } from "../../constants/firestations";

import { getDirections } from "../../api/directions";

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
          duration: leg.duration.text,
        };
      })
    );
    return distances;
  } catch (error) {
    console.error("Error en fetchDistances:", error.message);
    throw error;
  }
};
