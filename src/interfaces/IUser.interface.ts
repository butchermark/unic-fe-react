import { IReview } from "./IReview.interface";

export interface IUser {
  _id: string;
  email: string;
  username: string;
  password: string;
  reviews?: IReview[];
}
