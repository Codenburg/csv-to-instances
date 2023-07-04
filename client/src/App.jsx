import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TrutestFormPage } from "./pages/TrutestFormPage";
import { Home } from "./pages/Home"
import { Toaster } from "react-hot-toast";
import { UploadCsvPage } from "./pages/UploadCsvForm";
import { AnimalCard } from "./components/cards/AnimalCard";
import { MainWrapper } from "../src/layouts/MainWrapper";
import { PrivateRoute } from "../src/layouts/PrivateRoute";
import { Login } from "../src/pages/Login";
import { Logout } from "../src/layouts/Logout";
import { Navigation } from "./components/navigation/Navigation";



function App() {
  return (

    <BrowserRouter>

      <div className="container mx-auto">
        <MainWrapper>
          <Navigation/>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<PrivateRoute> <Home/></PrivateRoute>} />
            <Route path="/trutests/:id" element={<PrivateRoute><AnimalCard /></PrivateRoute>} />
            <Route path="/trutests-create" element={<PrivateRoute><TrutestFormPage /></PrivateRoute>} />
            <Route path="/trutests-upload" element={<PrivateRoute><UploadCsvPage /></PrivateRoute>} />
          </Routes>
          <Toaster />
        </MainWrapper>

      </div>
    </BrowserRouter>
  );
}

export default App;
