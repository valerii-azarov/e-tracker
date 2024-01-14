import axios, { AxiosResponse, AxiosError } from "axios";

const authAPI = {
  register: async (credentials: { surname: string, name: string, email: string; password: string }) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}/users/signup`, credentials, { withCredentials: true })
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError<{ message: string }>) => {
        throw new Error(error.response ? error.response.data.message : error.message);
      });
  },

  login: async (credentials: { email: string; password: string }) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}/users/signin`, credentials, { withCredentials: true })
      .then((response: AxiosResponse) => {
        localStorage.setItem("firstLogin", "true");
        return response.data;
      })
      .catch((error: AxiosError<{ message: string }>) => {
        throw new Error(error.response ? error.response.data.message : error.message);
      });
  },

  logout: async () => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/users/logout`, { withCredentials: true })
      .then((response: AxiosResponse) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("firstLogin");
        return response.data;
      })
      .catch((error: AxiosError<{ message: string }>) => {
        throw new Error(error.response ? error.response.data.message : error.message);
      });
  },

  refreshToken: async () => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/users/refresh_token`, { withCredentials: true })
      .then((response: AxiosResponse) => {
        const accessToken = response.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        return accessToken;
      })
      .catch((error: AxiosError<{ message: string }>) => {
        return error.response ? error.response.data.message : error.message;
      });
  },
};

export default authAPI;
