import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListingsPage from "./pages/ListingsPage";
import DetailsPage from "./pages/DetailsPage";
import { SavedPropertiesProvider } from "./context/SavedPropertiesContext";
import SavedPropertiesModal from "./components/SavedPropertiesModal";
import listingsData from "./data/listings.json";
import NavBar from "./components/NavBar";

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <SavedPropertiesProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<ListingsPage listings={listingsData} />} />
          <Route
            path="/listing/:id"
            element={<DetailsPage listings={listingsData} />}
          />
        </Routes>
      </Router>
      <button
        onClick={() => setModalOpen(true)}
        className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded"
      >
        View Saved Properties
      </button>
      <SavedPropertiesModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </SavedPropertiesProvider>
  );
}

export default App;
