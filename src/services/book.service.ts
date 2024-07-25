import { ApiClient } from "../apiClient/apiClient";

const apiClient = ApiClient.getInstance();

export const fetchBooks = async () => {
  try {
    const response = await apiClient.get(`/books`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
