export interface IReview {
  _id?: string;
  userId: string;
  bookId: string;
  text: string;
  rating: number;
}
