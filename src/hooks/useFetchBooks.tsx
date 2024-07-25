import { useEffect, useState } from "react";
import { IBook } from "../interfaces/IBook.interface";
import { fetchBooks } from "../services/book.service";

const useFetchBooks = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const books = await fetchBooks();
      setBooks(books);
    };

    fetchData();
  }, []);

  return { books };
};
export default useFetchBooks;
