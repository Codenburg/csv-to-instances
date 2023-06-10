import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  createAnimal,
  getTrutest,
  updateTrutest,
} from "../utils/api/trutests.api";
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
      await createAnimal(data);
      toast.success("New Trutest Added", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    }

    navigate("/");
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
        setValue("nota", data.nota);
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
          placeholder="fecha"
          {...register("fecha", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          autoFocus
        />
        {errors.fecha && <span>This field is required</span>}
        <input
          type="text"
          placeholder="hora"
          {...register("hora", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          autoFocus
        />
        {errors.hora && <span>This field is required</span>}
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
          {...register("raza", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          autoFocus
        />
        {errors.raza && <span>This field is required</span>}
        <input
          type="text"
          placeholder="Ubicacion"
          {...register("ubicacion", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          autoFocus
        />
        {errors.ubicacion && <span>This field is required</span>}
        <input
          type="text"
          placeholder="Inscripta"
          {...register("inscripta", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          autoFocus
        />
        {errors.inscripta && <span>This field is required</span>}

        <input
          type="text"
          placeholder="Peso"
          {...register("peso", { required: true })}
          className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
          autoFocus
        />
        {errors.peso && <span>This field is required</span>}

        <textarea
          placeholder="Notas"
          {...register("nota")}
          className="bg-zinc-700 p-3 rounded-lg block w-full"
        />

        <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">
          Save
        </button>
      </form>
    </div>
  );
}
