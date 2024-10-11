import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Accueil from "./pages/Accueil";
import Support from "./pages/Support";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import Videos from "./pages/Videos";
import VideoGallery from "./components/VideoGallery";
import APropos from "./pages/APropos";
import Contact from "./pages/Contact";
import Profil from "./pages/Profil";

// Route privée qui redirige vers /connexion si non authentifié
const PrivateRoute = ({ children, isAuthenticated }) => {
  return isAuthenticated ? children : <Navigate to="/connexion" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const expirationTime = decodedToken.exp * 1000;
      if (Date.now() >= expirationTime) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    }
  }, []);

  return (
    <Router>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/background.jpg')" }}
      >
        <Navbar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <div className="bg-black bg-opacity-60 min-h-screen">
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/support" element={<Support />} />
            <Route
              path="/connexion"
              element={<Connexion setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/inscription"
              element={<Inscription setIsAuthenticated={setIsAuthenticated} />}
            />
            {/* Ajout des routes pour VideoGallery et Videos */}
            <Route path="/videogallery" element={<VideoGallery />} />{" "}
            {/* Route pour VideoGallery */}
            <Route path="/videos" element={<Videos />} />{" "}
            {/* Route pour Videos */}
            <Route path="/apropos" element={<APropos />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/profil"
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Profil />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
