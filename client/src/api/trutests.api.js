import axios from "axios";
import useAxios from "../utils/useAxios";

const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8000";

const TrutestsApi = useAxios();
const trutestsUrl = `${URL}/trutests/api/v1/trutests`;

const FileApi = axios.create({
  baseURL: `${URL}/trutests/api/v1/file`,
});

const AnimalApi = axios.create({
  baseURL: `${URL}/trutests/api/v1/animal`,
});

export const getAllTrutests = () => TrutestsApi.get(trutestsUrl);

export const getTrutest = (id) => TrutestsApi.get(`/${id}`);

export const createTrutest = (trutest) => TrutestsApi.post(trutestsUrl+'/', trutest);

export const updateTrutest = (id, trutest) =>
  TrutestsApi.put(`/${id}/`, trutest);

export const deleteTrutest = (id) => TrutestsApi.delete(`/${id}`);

export const uploadTrutest = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return FileApi.post("/", formData);
};

export const createAnimal = (animal) => AnimalApi.post("/", animal);
