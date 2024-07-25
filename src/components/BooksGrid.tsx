import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import useFetchBooks from "../hooks/useFetchBooks";
import { useState } from "react";
import { IBook } from "../interfaces/IBook.interface";
import BookModal from "./BookModal";

const BooksGrid = () => {
  const { books } = useFetchBooks();
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (book: IBook) => {
    setSelectedBook(book);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBook(null);
  };
  return (
    <Box p={2}>
      {books.length === 0 ? (
        <Typography variant="h6" align="center">
          No books available
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book._id}>
              <Card onClick={() => handleOpen(book)} sx={{ cursor: "pointer" }}>
                <CardContent>
                  <Typography variant="h6">{book.title}</Typography>
                  <Typography variant="subtitle1">{book.author}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {book.description || "No description available"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Pages: {book.pages}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <BookModal open={open} onClose={handleClose} book={selectedBook} />
    </Box>
  );
};

export default BooksGrid;
