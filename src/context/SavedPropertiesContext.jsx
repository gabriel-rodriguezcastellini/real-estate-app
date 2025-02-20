import React, { createContext, useContext, useEffect, useState } from "react";

const SavedPropertiesContext = createContext();

export const SavedPropertiesProvider = ({ children }) => {
  const [savedProperties, setSavedProperties] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("savedProperties");
    if (stored) {
      setSavedProperties(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("savedProperties", JSON.stringify(savedProperties));
  }, [savedProperties]);

  const addProperty = (property) => {
    setSavedProperties((prev) => {
      if (prev.some((p) => p.Id === property.Id)) {
        return prev;
      }
      return [...prev, property];
    });
  };

  const removeProperty = (id) => {
    setSavedProperties((prev) => prev.filter((p) => p.Id !== id));
  };

  return (
    <SavedPropertiesContext.Provider
      value={{ savedProperties, addProperty, removeProperty }}
    >
      {children}
    </SavedPropertiesContext.Provider>
  );
};

export const useSavedProperties = () => useContext(SavedPropertiesContext);
