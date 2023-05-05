import http from "@/http-common";
import type Author from "@/types/Author";

class AuthorDataService {

  create(data: Author): Promise<any>{
    return http.post("/authors", data);
  }

  getAll(): Promise<any>{
    return http.get("/authors");
  }
}

export default new AuthorDataService();