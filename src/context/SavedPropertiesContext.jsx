import React, { createContext, useState, useContext } from "react";

const SavedPropertiesContext = createContext();

export const SavedPropertiesProvider = ({ children }) => {
  const [savedProperties, setSavedProperties] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addProperty = (property) => {
    setSavedProperties((prev) => {
      if (!prev.find((p) => p.id === property.id)) {
        return [...prev, property];
      }
      return prev;
    });
  };

  const removeProperty = (id) => {
    setSavedProperties((prev) => prev.filter((property) => property.id !== id));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <SavedPropertiesContext.Provider
      value={{
        savedProperties,
        addProperty,
        removeProperty,
        isModalOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </SavedPropertiesContext.Provider>
  );
};

export const useSavedProperties = () => useContext(SavedPropertiesContext);
