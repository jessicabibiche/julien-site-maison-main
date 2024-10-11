import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const [langue, setLangue] = useState("français");
  const [showDropdown, setShowDropdown] = useState(false);
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    alert("Vous êtes déconnecté");
    navigate("/");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="relative bg-black p-4 shadow-lg flex justify-between items-center rounded-lg">
      <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-blue-500">
        KOD_ELDRAGON
      </div>

      <div className="flex items-center space-x-6">
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
            className="text-lg text-white font-semibold px-4 py-2 transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:to-blue-500"
          >
            {item.label}
          </Link>
        ))}

        {isAuthenticated ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white px-4 py-2 rounded-lg transition-all duration-300 hover:scale-110"
            >
              <FontAwesomeIcon icon={faUser} className="text-2xl" />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg py-2 z-20">
                <Link
                  to="/profil"
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  Paramètres du compte
                </Link>
                <Link
                  to="/change-password"
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  Changer le mot de passe
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-red-500"
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link
              to="/connexion"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg"
            >
              Connexion
            </Link>
            <Link
              to="/inscription"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg"
            >
              Inscription
            </Link>
          </div>
        )}

        <select
          id="langue"
          value={langue}
          onChange={handleLangueChange}
          className="bg-gray-800 text-white border border-yellow-500 rounded-full px-4 py-2 hover:border-yellow-600 transition-all duration-300"
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
