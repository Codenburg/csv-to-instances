import axios from "axios";
import { getRefreshToken, isAccessTokenExpired, setAuthUser } from "../auth";
import { API_BASE_URL } from "../constants";
import Cookies from "js-cookie";

const createAxiosInstance = (accessToken) => {
  return axios.create({
    baseURL: API_BASE_URL,
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

const useAxios = () => {
  const accessToken = Cookies.get("access_token");
  const refreshToken = Cookies.get("refresh_token");
  const axiosInstance = createAxiosInstance(accessToken);

  axiosInstance.interceptors.request.use(async (config) => {
    if (!isAccessTokenExpired(accessToken)) {
      return config;
    }

    try {
      const response = await getRefreshToken(refreshToken);
      setAuthUser(response.access, response.refresh);
      config.headers.Authorization = `Bearer ${response.access}`;
    } catch (error) {
      // Manejar errores al obtener un nuevo token de acceso
      console.error("Error al obtener el token de acceso:", error);
      // Aquí puedes tomar medidas adicionales, como redirigir a la página de inicio de sesión.
      throw error;
    }

    return config;
  });

  return axiosInstance;
};

export default useAxios;
