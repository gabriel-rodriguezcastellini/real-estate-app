import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListingsPage from "./pages/ListingsPage";
import DetailsPage from "./pages/DetailsPage";
import { SavedPropertiesProvider } from "./context/SavedPropertiesContext";
import SavedPropertiesModal from "./components/SavedPropertiesModal";

const App = () => {
  return (
    <SavedPropertiesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ListingsPage />} />
          <Route path="/listing/:id" element={<DetailsPage />} />
        </Routes>
      </Router>
      <SavedPropertiesModal />
    </SavedPropertiesProvider>
  );
};

export default App;
