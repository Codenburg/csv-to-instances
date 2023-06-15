import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import { Logout } from "../../pages/Logout";

export function Navigation() {
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
  ]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      {isLoggedIn() && (
        <div className="flex justify-between py-3 items-center">
          <Link to="/">
            <h1 className="font-bold text-3xl mb-4">Trutests App</h1>
          </Link>

          <button className="bg-indigo-500 p-3 rounded-lg">
            <Link to="/trutests-create">Crear Animal</Link>
          </button>

          <button className="bg-indigo-500 p-3 rounded-lg">
            <Link to="/trutests-upload">Subir Trutest</Link>
          </button>

          <div className="relative inline-block text-left">
            <button
              className="bg-indigo-500 p-3 rounded-lg"
              onClick={toggleDropdown}
            >
              {user().username}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-10">
                <Link
                  to="/logout"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Logout
                </Link>
                <Link
                  to="/activity-log"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Activity Log
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      {!isLoggedIn() && <Logout />}
    </div>
  );
}
