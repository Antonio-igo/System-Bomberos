import { geocodeAddress, calculateDistances } from "../../api/mapsApis";

export const fetchDistances = async (address, fireStations) => {
  const geocodeData = await geocodeAddress(address);

  // Verifica si la geocodificación devolvió resultados
  if (!geocodeData.results || geocodeData.results.length === 0) {
    throw new Error("No se encontraron resultados para la dirección ingresada.");
  }

  const location = geocodeData.results[0].geometry.location;
  const destinations = fireStations.map((station) => `${station.lat},${station.lng}`).join("|");

  const distanceData = await calculateDistances(`${location.lat},${location.lng}`, destinations);

  // Verifica si Distance Matrix API devolvió datos
  if (
    !distanceData.rows ||
    distanceData.rows.length === 0 ||
    !distanceData.rows[0].elements
  ) {
    throw new Error("La API Distance Matrix no devolvió resultados.");
  }
  console.log("Geocode Response:", geocodeData);
  console.log("Distance Matrix Response:", distanceData);
  
  return fireStations.map((station, index) => {
    const element = distanceData.rows[0].elements[index];
    return {
      ...station,
      distance: element.distance ? element.distance.text : "No disponible",
      duration: element.duration ? element.duration.text : "No disponible",
    };
  });

};
