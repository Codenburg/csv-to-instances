import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <div className="flex justify-between py-3 items-center">
      <Link to="/trutests">
        <h1 className="font-bold text-3xl mb-4">Trutests App</h1>
      </Link>
      
      <button className="bg-indigo-500 p-3 rounded-lg">
        <Link to="/trutests-create">Create Trutest</Link>
      </button>

      <button className="bg-indigo-500 p-3 rounded-lg">
        <Link to="/trutests/form">Upload Trutest</Link>
      </button>
    </div>
  );
}
