import type Genre from "./Genre";

export default interface Author {
  id: number;
  name: string;
  genres: Array<Genre>
}