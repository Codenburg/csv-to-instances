import useAxios from "../utils/useAxios";

const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8000";

// Importaciones relacionadas con Trutests
const trutestsUrl = `${URL}/trutests/api/v1/trutests`;
const TrutestsApi = useAxios();

// Importaciones relacionadas con Files
const fileUrl = `${URL}/trutests/api/v1/file`;
const FileApi = useAxios();

// Importaciones relacionadas con Animals
const animalUrl = `${URL}/trutests/api/v1/animal`;
const AnimalApi = useAxios();

// Funciones de la API
export const getAllTrutests = () => TrutestsApi.get(trutestsUrl);
export const getTrutest = (id) => TrutestsApi.get(`${trutestsUrl}/${id}`);
export const createTrutest = (trutest) =>
  TrutestsApi.post(trutestsUrl + "/", trutest);
export const updateTrutest = (id, trutest) =>
  TrutestsApi.put(`${trutestsUrl}/${id}/`, trutest);
export const deleteTrutest = (id) =>
  TrutestsApi.delete(`${trutestsUrl}/${id}`);

export const uploadTrutest = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return FileApi.post(fileUrl + "/", formData);
};

export const createAnimal = (animal) =>
  AnimalApi.post(animalUrl + "/", animal);
