import React from "react";
import { useSavedProperties } from "../context/SavedPropertiesContext";

const SavedPropertiesModal = ({ isOpen, onClose }) => {
  const { savedProperties, removeProperty } = useSavedProperties();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-11/12 md:w-2/3 lg:w-1/2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Saved Properties</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            Close
          </button>
        </div>
        {savedProperties.length === 0 ? (
          <p>No properties saved yet.</p>
        ) : (
          <ul>
            {savedProperties.map((property) => (
              <li
                key={property.Id}
                className="flex justify-between items-center border-b py-2"
              >
                <span>{property.Title}</span>
                <button
                  onClick={() => removeProperty(property.Id)}
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SavedPropertiesModal;
