import {
  Modal,
  Box,
  IconButton,
  Typography,
  TextField,
  Button,
  Rating,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useContext, useState } from "react";
import { IBookModalProps } from "../interfaces/IBookModalProps.interface";
import { IReview } from "../interfaces/IReview.interface";
import useFetchReviews from "../hooks/useFetchReviews";
import useAddReview from "../hooks/useAddReview";
import AuthContext from "../context/AuthContext";

const BookModal: React.FC<IBookModalProps> = ({ open, onClose, book }) => {
  const { reviews, setReviews, averageRating, setAverageRating } =
    useFetchReviews(book?._id || "");
  const { addNewReview, loading, error } = useAddReview(book?._id || "");
  const [newReview, setNewReview] = useState<string>("");
  const [rating, setRating] = useState<number | null>(null);
  const ctx = useContext(AuthContext);

  const handleReviewSubmit = async () => {
    if (book && newReview && rating) {
      const review: IReview = {
        userId: ctx.user._id,
        bookId: book._id,
        text: newReview,
        rating: rating,
      };
      try {
        const addedReview = await addNewReview(review);
        setReviews([...reviews, addedReview]);
        const newAverageRating =
          (averageRating * reviews.length + rating) / (reviews.length + 1);
        setAverageRating(newAverageRating);
        setNewReview("");
        setRating(null);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        {book && (
          <>
            <Typography variant="h6">{book.title}</Typography>
            <Typography variant="subtitle1">{book.author}</Typography>
            <Typography variant="body1">
              {book.description || "No description available"}
            </Typography>
            <Box
              mt={2}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography>Pages: {book.pages}</Typography>
              <Typography>Average Rating: {averageRating}</Typography>
            </Box>

            <Box mt={2}>
              <Typography variant="h6">Reviews</Typography>
              {reviews.length === 0 ? (
                <Typography variant="body2">No reviews yet.</Typography>
              ) : (
                reviews.map((review) => (
                  <Box key={review._id} mb={2}>
                    <Typography variant="body2">
                      <strong>{ctx.user.email}</strong>: {review.text}
                    </Typography>
                    <Rating value={review.rating} readOnly />
                  </Box>
                ))
              )}
            </Box>
            <Box mt={2}>
              <Typography variant="h6">Add a Review</Typography>
              <TextField
                label="Review"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
              />
              <Rating
                value={rating}
                onChange={(_event, newValue) => setRating(newValue)}
                max={5}
                precision={1}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleReviewSubmit}
                disabled={!newReview || !rating || loading}
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
              {error && <Typography color="error">{error}</Typography>}
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default BookModal;
