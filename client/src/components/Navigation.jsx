import { Link } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { Logout } from "../pages/Logout";

export function Navigation() {
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
  ]);
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

          <LoggedInView user={user()} />
        </div>
      )}
      {!isLoggedIn() && <Logout />}
    </div>
  );
}

export const LoggedInView = () => {
  return (
    <div>
      <Link to="/logout">
        <button className="bg-indigo-500 p-3 rounded-lg">Logout</button>
      </Link>
    </div>
  );
};
