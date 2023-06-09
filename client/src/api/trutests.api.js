import axios from "axios";

const URL =
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:8000";

console.log(URL);
const TrutestsApi = axios.create({
  baseURL: `${URL}/trutests/api/v1/trutests`,
});

export const getAllTrutests = () => TrutestsApi.get("/");

export const getTrutest = (id) => TrutestsApi.get(`/${id}`);

export const createTrutest = (trutest) => TrutestsApi.post("/", trutest);

export const updateTrutest = (id, trutest) => TrutestsApi.put(`/${id}/`, trutest);

export const deleteTrutest = (id) => TrutestsApi.delete(`/${id}`);
