import { IReview } from "./IReview.interface";

export interface IBook {
  _id: string;
  title: string;
  author: string;
  description?: string;
  pages: number;
  reviews?: IReview[];
}
