import { IBook } from "./IBook.interface";

export interface IBookModalProps {
  open: boolean;
  onClose: () => void;
  book: IBook | null;
}
