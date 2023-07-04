import axios from "axios";
import useAxios from "./useAxios";
import { API_BASE_URL } from "../constants";
//Auth
const apiInstance = axios.create({
  baseURL: `${API_BASE_URL}/account`,
  timeout: 5000, // timeout after 5 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
export default apiInstance;

// Importaciones relacionadas con Trutests
const trutestsUrl = `${API_BASE_URL}/trutests/api/v1/trutests`;
const TrutestsApi = useAxios();

// Importaciones relacionadas con Files
const fileUrl = `${API_BASE_URL}/trutests/api/v1/file`;
const FileApi = useAxios();

// Importaciones relacionadas con Animals
const animalUrl = `${API_BASE_URL}/trutests/api/v1/animal`;
const AnimalApi = useAxios();

// CRUD de los animales
export const getAllTrutests = () => TrutestsApi.get(trutestsUrl);
export const getTrutest = (id) => TrutestsApi.get(`${trutestsUrl}/${id}`);
export const createTrutest = (trutest) =>
  TrutestsApi.post(`${trutestsUrl}/${trutest}`);
export const updateTrutest = (id, trutest) =>
  TrutestsApi.put(`${trutestsUrl}/${id}/`, trutest);
export const deleteTrutest = (id) => TrutestsApi.delete(`${trutestsUrl}/${id}`);
//Subir Archivo .csv
export const uploadTrutest = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return FileApi.post(fileUrl + "/", formData);
};
// Crear aniamal individual
export const createAnimal = (animal) =>
  AnimalApi.post(`${animalUrl}/${animal}`);
