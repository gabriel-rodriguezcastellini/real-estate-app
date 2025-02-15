import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListingsPage from "./pages/ListingsPage";
import DetailsPage from "./pages/DetailsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListingsPage />} />
        <Route path="/listing/:id" element={<DetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
