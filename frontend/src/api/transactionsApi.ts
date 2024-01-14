import axios, { AxiosResponse, AxiosError } from "axios";

const transactionsApi = {
  loadTransactions: async (token: string) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/transactions/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response: AxiosResponse) => {
        return response.data.transactions;
      })
      .catch((error: AxiosError<{ message: string }>) => {
        throw new Error(error.response ? error.response.data.message : error.message);
      });
  },

  addTransaction: async (token: string, transaction: { title: string, description: string, amount: number, type: string, categoryId: string }) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}/transactions/add`, transaction, {
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

  deleteTransaction: async (token: string, transactionId: string) => {
    return axios
      .delete(`${process.env.REACT_APP_API_URL}/transactions/${transactionId}`, {
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

export default transactionsApi;
