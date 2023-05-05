import http from "@/http-common";
import type Quote from "@/types/Quote";
import moment from 'moment'

class QuoteDataService {

  create(data: Quote): Promise<any>{
    const currentDate = moment().format('YYYY-MM-DD hh:mm:ss')
    data.created_at = currentDate
    data.updated_at = currentDate
    return http.post('/quotes', data)
  }

  delete(id: number | null) {
    return http.delete(`/quotes/${id}`)
  }

  get(id: string): Promise<any> {
    return http.get(`/quotes/${id}`)
  }

  getAll(): Promise<any>{
    return http.get("/quotes");
  }

  update(id: string, data: Quote) {
    const currentDate = moment().format('YYYY-MM-DD hh:mm:ss')
    data.updated_at = currentDate
    return http.patch(`/quotes/${id}`, data)
  }
}

export default new QuoteDataService();
