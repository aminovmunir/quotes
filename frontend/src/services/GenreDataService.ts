import http from "@/http-common";
import type Genre from "@/types/Genre";

class GenreDataService {

  create(data: Genre): Promise<any> {
    return http.post('/genres', data)
  }

  getAll(): Promise<any>{
    return http.get("/genres");
  }

}

export default new GenreDataService();