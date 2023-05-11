import { useNavigate } from "react-router-dom";

export function TrutestCard({ trutest }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer"
      onClick={() => {
        navigate(`/trutests/${trutest.id}`);
      }}
    >
      <h1 className="text-white font-bold uppercase rounded-lg">
        {trutest.idv}
      </h1>
      <p className="text-slate-400">{trutest.nota}</p>
    </div>
  );
}
