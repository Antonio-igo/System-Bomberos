import React from "react";
import AddressInput from "./components/AdressInput";
import DistanceTable from "./components/DistanceTable";
import MapModal from "./components/MapModal";
import { useReportViewModel } from "./ReportViewModel";

const ReportView = () => {
  const {
    address,
    setAddress,
    distances,
    calculateDistances,
    showModal,
    modalData,
    routeData,
    openModal,
    closeModal,
    error,
  } = useReportViewModel();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
        Reporte de Incendios
      </h1>
      <AddressInput
        address={address}
        setAddress={setAddress}
        onSubmit={calculateDistances}
        error={error}
      />

      <DistanceTable distances={distances} onOpenModal={openModal} />
      <MapModal
        isOpen={showModal}
        onClose={closeModal}
        station={modalData}
        route={routeData}
      />
    </div>
  );
};

export default ReportView;
