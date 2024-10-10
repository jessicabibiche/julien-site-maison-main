import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const [langue, setLangue] = useState("français");
  const [showDropdown, setShowDropdown] = useState(false); // Pour afficher/masquer le menu déroulant
  const navigate = useNavigate();

  useEffect(() => {
    const savedLangue = localStorage.getItem("langue");
    if (savedLangue) {
      setLangue(savedLangue);
    }
  }, []);

  const handleLangueChange = (e) => {
    const newLangue = e.target.value;
    setLangue(newLangue);
    localStorage.setItem("langue", newLangue);
  };

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token"); // Suppression du token
    setIsAuthenticated(false);
    alert("Vous êtes déconnecté");
    navigate("/"); // Rediriger vers la page d'accueil après déconnexion
  };

  // Toggle pour afficher ou cacher le menu déroulant
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="bg-black p-4 flex justify-between items-center shadow-lg border-b-2 border-[#d8a44d]">
      <div className="flex items-center">
        <h1 className="text-4xl font-extrabold text-gradient">KOD_ELDRAGON</h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Liens de Navigation */}
        {[
          { label: "Accueil", path: "/" },
          { label: "Vidéos", path: "/videos" },
          { label: "À Propos", path: "/apropos" },
          { label: "Jeux", path: "/jeux" },
          { label: "Contact", path: "/contact" },
        ].map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="text-lg font-semibold neon-link px-4 py-2 rounded-full transition-all duration-300"
          >
            {item.label}
          </Link>
        ))}

        {/* Si l'utilisateur est connecté */}
        {isAuthenticated ? (
          <>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="text-white px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
              >
                <FontAwesomeIcon icon={faUser} className="text-2xl" />{" "}
                {/* Icône utilisateur */}
              </button>

              {/* Menu déroulant */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                  <Link
                    to="/profil"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => setShowDropdown(false)}
                  >
                    Paramètres du compte
                  </Link>
                  <Link
                    to="/change-password"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => setShowDropdown(false)}
                  >
                    Changer le mot de passe
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link
              to="/connexion"
              className="bg-gradient-to-r from-[#d8a44d] to-[#a46cba] text-white px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg transform hover:scale-105"
            >
              Connexion
            </Link>
            <Link
              to="/inscription"
              className="bg-gradient-to-r from-[#d8a44d] to-[#a46cba] text-white px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg transform hover:scale-105"
            >
              Inscription
            </Link>
          </>
        )}

        {/* Sélecteur de Langue */}
        <select
          id="langue"
          value={langue}
          onChange={handleLangueChange}
          className="bg-gray-800 text-white border border-[#d8a44d] rounded-full px-4 py-2 transition-all duration-300 hover:border-[#a46cba]"
        >
          <option value="français">Français</option>
          <option value="portugais">Portugais</option>
          <option value="anglais">Anglais</option>
        </select>
      </div>
    </nav>
  );
}

export default Navbar;
