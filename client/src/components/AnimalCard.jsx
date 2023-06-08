import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTrutest } from "../api/trutests.api";
import { deleteTrutest } from "../api/trutests.api";
import { toast } from "react-hot-toast";

export function AnimalCard() {
  const params = useParams();
  const [trutest, setTrutest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await getTrutest(params.id);
      setTrutest(data);
    } catch (error) {
      console.error(error);
      setTrutest(null);
    }
  };

  if (!trutest) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-black shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-bold">{trutest.ide}</h2>
        <p>IDV: {trutest.idv}</p>
        <div className="mt-2">
          <strong>Fecha de nacimiento:</strong> {trutest.fecha_de_nac}
        </div>
        <div className="mt-2">
          <strong>Raza:</strong> {trutest.raza}
        </div>
        <div className="mt-4">
          <strong>Ubicación:</strong> {trutest.ubicacion}
        </div>
        <div className="mt-2">
          <strong>Inscripta:</strong> {trutest.inscripta}
        </div>
        <div className="mt-2">
          <strong>Peso:</strong> {trutest.peso}
        </div>
        <div className="mt-2">
          <strong>Fecha:</strong> {trutest.fecha}
        </div>
        <div className="mt-2">
          <strong>Hora:</strong> {trutest.hora}
        </div>
        <div className="mt-2">
          <strong>Nota:</strong> {trutest.nota}
        </div>
      </div>
      {params.id && (
        <div className="flex justify-end">
          <button
            className="bg-red-500 p-3 rounded-lg w-48 mt-3"
            onClick={async () => {
              const accepted = window.confirm("Are you sure?");
              if (accepted) {
                await deleteTrutest(params.id);
                toast.success("Animal removed", {
                  position: "bottom-right",
                  style: {
                    background: "#101010",
                    color: "#fff",
                  },
                });
                navigate("/");
              }
            }}
          >
            delete
          </button>
        </div>
      )}
    </div>
  );
}
