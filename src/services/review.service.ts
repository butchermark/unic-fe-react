import { ApiClient } from "../apiClient/apiClient";
import { IReview } from "../interfaces/IReview.interface";

const apiClient = ApiClient.getInstance();

export const fetchReviews = async (bookId?: string) => {
  try {
    if (!bookId) return { averageRating: 0, reviews: [] };
    const response = await apiClient.get(`/books/${bookId}/reviews`);
    const { averageRating, reviews } = response.data;
    return { averageRating, reviews };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const addReview = async (bookId: string, review: IReview) => {
  try {
    console.log(review);
    const response = await apiClient.post(`/books/${bookId}/reviews`, review);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
