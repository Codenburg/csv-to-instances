import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  createTrutest,
  deleteTrutest,
  getTrutest,
  updateTrutest,
} from "../api/trutests.api";
import { toast } from "react-hot-toast";

export function TrutestFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTrutest(params.id, data);
      toast.success("Trutest updated", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    } else {
      await createTrutest(data);
      toast.success("New Trutest Added", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    }

    navigate("/trutests");
  });

  useEffect(() => {
    async function loadTrutest() {
      if (params.id) {
        const { data } = await getTrutest(params.id);
        setValue("ide", data.ide);
        setValue("idv", data.idv);
        setValue("fecha_de_nac", data.fecha_de_nac);
        setValue("raza", data.raza);
        setValue("ubicacion", data.ubicacion);
        setValue("inscripta", data.inscripta);
        setValue("peso", data.peso);
        setValue("fecha", data.fecha);
        setValue("hora", data.hora);
        setValue("notas", data.nota);
      }
    }
    loadTrutest();
  }, []);

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={onSubmit} className="bg-zinc-800 p-10 rounded-lg mt-2">
        <input
          type="text"
          placeholder="IDE"
          {...register("ide", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          autoFocus
        />
        {errors.ide && <span>This field is required</span>}

        <input
          type="text"
          placeholder="IDV"
          {...register("idv", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          autoFocus
        />
        {errors.idv && <span>This field is required</span>}

        <input
          type="text"
          placeholder="Fecha de nacimiento"
          {...register("fecha_de_nac")}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          autoFocus
        />
        <input
          type="text"
          placeholder="Raza"
          {...register("raza")}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          autoFocus
        />
        <input
          type="text"
          placeholder="Ubicacion"
          {...register("ubicacion")}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          autoFocus
        />

        <input
          type="text"
          placeholder="Peso"
          {...register("peso")}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          autoFocus
        />

        <input
          type="text"
          placeholder="fecha"
          {...register("fecha")}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          autoFocus
        />
        {errors.fecha && <span>This field is required</span>}

        <textarea
          placeholder="Notas"
          {...register("notas")}
          className="bg-zinc-700 p-3 rounded-lg block w-full"
        />

        <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">
          Save
        </button>
      </form>

      {params.id && (
        <div className="flex justify-end">
          <button
            className="bg-red-500 p-3 rounded-lg w-48 mt-3"
            onClick={async () => {
              const accepted = window.confirm("Are you sure?");
              if (accepted) {
                await deleteTrutest(params.id);
                toast.success("Trutest Removed", {
                  position: "bottom-right",
                  style: {
                    background: "#101010",
                    color: "#fff",
                  },
                });
                navigate("/trutests");
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
