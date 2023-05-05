import type Genre from "./Genre";
import type Author from "./Author";

export default interface Quote {
  id: number;
  text: string;
  author: Author;
  genres: Array<Genre>;
  created_at: string;
  updated_at: string;
}