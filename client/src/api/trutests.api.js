import axios from "axios";

const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8000";

const TrutestsApi = axios.create({
  baseURL: `${URL}/trutests/api/v1/trutests`,
});

const FileApi = axios.create({
  baseURL: `${URL}/trutests/api/v1/file`,
});

export const getAllTrutests = () => TrutestsApi.get("/");

export const getTrutest = (id) => TrutestsApi.get(`/${id}`);

export const createTrutest = (trutest) => TrutestsApi.post("/", trutest);

export const updateTrutest = (id, trutest) =>
  TrutestsApi.put(`/${id}/`, trutest);

export const deleteTrutest = (id) => TrutestsApi.delete(`/${id}`);

export const uploadTrutest = async (file) => {
  const response = await FileApi.post("/", file);
  return response.data; // Retorna el resultado en formato JSON
};
