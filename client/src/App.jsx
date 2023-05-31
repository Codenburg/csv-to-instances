import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { TrutestFormPage } from "./pages/TrutestFormPage"
import { TrutestsPage } from "./pages/TrustestsPage";
import { Toaster } from "react-hot-toast";
import { UploadCsvPage } from "./pages/UploadCsvForm";
import { AnimalCard } from "./components/AnimalCard";

;

function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto">
        <Navigation />
        <Routes>
          {/* redirect to trutests */}
          <Route path="/" element={<Navigate to="/trutests" />} />
          <Route path="/trutests" element={<TrutestsPage />} />
          <Route path="/trutests/:id" element={<AnimalCard />} />
          <Route path="/trutests-create" element={<TrutestFormPage />} />
          <Route path="/trutests-upload" element={<UploadCsvPage />} />



        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
