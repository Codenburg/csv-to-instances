import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import { Logout } from "../../pages/Logout";

const DropdownItem = ({ to, label, onClick }) => (
  <Link
    to={to}
    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
    onClick={onClick}
  >
    {label}
  </Link>
);

const NavDropdown = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const closeDropdownOnOutsideClick = (event) => {
      if (!event.target.closest(".nav-dropdown")) {
        closeDropdown();
      }
    };

    document.addEventListener("click", closeDropdownOnOutsideClick);

    return () => {
      document.removeEventListener("click", closeDropdownOnOutsideClick);
    };
  }, []);

  return (
    <div className="relative inline-block text-left nav-dropdown">
      <button
        className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none"
        onClick={toggleDropdown}
      >
        {label}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
          {items.map((item, index) => (
            <DropdownItem
              key={index}
              {...item}
              onClick={() => {
                item.onClick && item.onClick();
                closeDropdown();
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export function Navigation() {
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
  ]);

  return (
    <div>
      {isLoggedIn() && (
        <div className="bg-indigo-500 py-3 w-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <Link to="/">
              <h1 className="font-bold text-3xl text-white">Trutests App</h1>
            </Link>
            <NavDropdown
              label="Tru-Test"
              items={[
                {
                  to: "/trutests-create",
                  label: "Crear Animal",
                },
                {
                  to: "/trutests-upload",
                  label: "Subir Trutest",
                },
              ]}
            />
            <NavDropdown
              label="Animales"
              items={[
                {
                  to: "/categorias",
                  label: "Categorias",
                },
                {
                  to: "/prenadas",
                  label: "Prenadas",
                },
              ]}
            />
            <NavDropdown
              label="Estructuras"
              items={[
                {
                  to: "/ubicaciones",
                  label: "Ubicaciones",
                },
              ]}
            />
            <NavDropdown
              label={user().username}
              items={[
                {
                  to: "/logout",
                  label: "Logout",
                },
                {
                  to: "/activity-log",
                  label: "Activity Log",
                },
              ]}
            />
          </div>
        </div>
      )}
      {!isLoggedIn() && <Logout />}
    </div>
  );
}
