import axios, { AxiosResponse, AxiosError } from "axios";

const categoriesApi = {
  loadCategories: async (token: string) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/categories/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response: AxiosResponse) => {
        return response.data.categories;
      })
      .catch((error: AxiosError<{ message: string }>) => {
        throw new Error(error.response ? error.response.data.message : error.message);
      });
  },

  addCategory: async (token: string, category: { name: string }) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}/categories/add`, category, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error: AxiosError<{ message: string }>) => {
        throw new Error(error.response ? error.response.data.message : error.message);
      });
  },
};

export default categoriesApi;
