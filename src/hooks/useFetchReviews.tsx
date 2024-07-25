import { useState, useEffect } from "react";
import { IReview } from "../interfaces/IReview.interface";
import { fetchReviews } from "../services/review.service";

const useFetchReviews = (bookId?: string) => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const reviews = await fetchReviews(bookId);
      setReviews(reviews);
    };

    fetchData();
  }, [bookId]);
  return { reviews, setReviews };
};
export default useFetchReviews;
