import React from "react";
import { useSavedProperties } from "../context/SavedPropertiesContext";

const SavedPropertiesModal = () => {
  const { savedProperties, isModalOpen, closeModal, removeProperty } =
    useSavedProperties();

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">Saved Properties</h2>
        {savedProperties.length === 0 ? (
          <p>No saved properties.</p>
        ) : (
          <ul>
            {savedProperties.map((property) => (
              <li
                key={property.id}
                className="flex justify-between items-center mb-2"
              >
                <span>{property.title}</span>
                <button
                  onClick={() => removeProperty(property.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={closeModal}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SavedPropertiesModal;
