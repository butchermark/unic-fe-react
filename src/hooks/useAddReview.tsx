import { useState } from "react";
import { IReview } from "../interfaces/IReview.interface";
import { addReview } from "../services/review.service";

const useAddReview = (bookId: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addNewReview = async (review: IReview) => {
    setLoading(true);
    setError(null);
    try {
      const addedReview = await addReview(bookId, review);
      setLoading(false);
      return addedReview;
    } catch (err) {
      setError("Failed to add review.");
      setLoading(false);
      throw err;
    }
  };

  return { addNewReview, loading, error };
};

export default useAddReview;
