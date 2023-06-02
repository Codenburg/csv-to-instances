import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { TrutestFormPage } from "./pages/TrutestFormPage";
import { TrutestsPage } from "./pages/TrustestsPage";
import { Home } from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { UploadCsvPage } from "./pages/UploadCsvForm";
import { AnimalCard } from "./components/AnimalCard";
import { MainWrapper } from "../src/layouts/MainWrapper";
import { PrivateRoute } from "../src/layouts/PrivateRoute";
import { Login } from "../src/pages/Login";
import { Logout } from "../src/pages/Logout";
import { Private } from "../src/pages/Private";

function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto">
        <MainWrapper>
          <Navigation />
          <Routes>
            <Route
              path="/private"
              element={
                <PrivateRoute>
                  <Private/>
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/trutests" element={<TrutestsPage />} />
            <Route path="/trutests/:id" element={<AnimalCard />} />
            <Route path="/trutests-create" element={<TrutestFormPage />} />
            <Route path="/trutests-upload" element={<UploadCsvPage />} />
          </Routes>
          <Toaster />
        </MainWrapper>
      </div>
    </BrowserRouter>
  );
}

export default App;
