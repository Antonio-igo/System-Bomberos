import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

const AddressInput = ({ address, setAddress, onSubmit, error }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ["geocode"], // Sugiere direcciones
        componentRestrictions: { country: "CL" }, // Limita las sugerencias a Chile
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          setAddress(place.formatted_address); // Actualiza la dirección seleccionada
        }
      });
    }
  }, [setAddress]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex flex-col items-center gap-4"
    >
      <input
        type="text"
        ref={inputRef}
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Ingresa la dirección del incendio"
        className="w-full p-3 border rounded-lg"
      />
      {error && <p className="text-red-600">{error}</p>}
      <button
        type="submit"
        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
      >
        Calcular Distancias
      </button>
    </form>
  );
};

AddressInput.propTypes = {
  address: PropTypes.string.isRequired,
  setAddress: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default AddressInput;
