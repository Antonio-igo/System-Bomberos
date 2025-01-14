import { geocodeAddress, calculateDistances } from "../../api/mapsApis";

export const fetchDistances = async (address, fireStations) => {
  const geocodeData = await geocodeAddress(address);
  const location = geocodeData.results[0].geometry.location;

  const destinations = fireStations.map((station) => `${station.lat},${station.lng}`).join("|");
  const distanceData = await calculateDistances(`${location.lat},${location.lng}`, destinations);

  return fireStations.map((station, index) => ({
    ...station,
    distance: distanceData.rows[0].elements[index].distance.text,
    duration: distanceData.rows[0].elements[index].duration.text,
  }));
};
