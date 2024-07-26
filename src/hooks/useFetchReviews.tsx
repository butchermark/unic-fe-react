import { useState, useEffect } from "react";
import { IReview } from "../interfaces/IReview.interface";
import { fetchReviews } from "../services/review.service";

const useFetchReviews = (bookId?: string) => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      if (bookId) {
        const { averageRating, reviews } = await fetchReviews(bookId);
        setAverageRating(averageRating);
        setReviews(reviews);
      }
    };

    fetchData();
  }, [bookId]);

  return { reviews, averageRating, setReviews, setAverageRating };
};
export default useFetchReviews;
