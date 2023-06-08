import useAxios from "../utils/useAxios";

const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8000";

// Importaciones relacionadas con Trutests
const trutestsUrl = `${URL}/trutests/api/v1/trutests`;
const TrutestsApi = useAxios();
const TrutestsInstance = TrutestsApi.create();

// Importaciones relacionadas con Files
const fileUrl = `${URL}/trutests/api/v1/file`;
const FileApi = useAxios();
const FileInstance = FileApi.create();

// Importaciones relacionadas con Animals
const animalUrl = `${URL}/trutests/api/v1/animal`;
const AnimalApi = useAxios();
const AnimalInstance = AnimalApi.create();

// Funciones de la API
export const getAllTrutests = () => TrutestsInstance.get(trutestsUrl);
export const getTrutest = (id) => TrutestsInstance.get(`${trutestsUrl}/${id}`);
export const createTrutest = (trutest) =>
  TrutestsInstance.post(trutestsUrl + "/", trutest);
export const updateTrutest = (id, trutest) =>
  TrutestsInstance.put(`${trutestsUrl}/${id}/`, trutest);
export const deleteTrutest = (id) =>
  TrutestsInstance.delete(`${trutestsUrl}/${id}`);

export const uploadTrutest = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return FileInstance.post(fileUrl + "/", formData);
};

export const createAnimal = (animal) =>
  AnimalInstance.post(animalUrl + "/", animal);
