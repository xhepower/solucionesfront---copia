import http from "../http-common";
//const axios = require("axios").default;
class RetiroService {
  create(data) {
    return http.post("/retiros", data);
  }

  getAll() {
    return http.get("/retiros");
  }
  get(id) {
    return http.get(`/retiros/${id}`);
  }

  update(id, data) {
    return http.patch(`/retiros/${id}`, data);
  }
  delete(id) {
    return http.delete(`/retiros/${id}`);
  }
  deleteAll() {
    return http.delete(`/retiros`);
  }
  findByTitle(title) {
    return http.get(`/retiros?fecha=${title}`);
  }
  findByDate(fecha) {
    return http.get(`/retiros?fecha=${fecha}`);
  }
  findByInterval(fecha1, fecha2) {
    return http.get(`/retiros?fecha1=${fecha1}&fecha2=${fecha2}`);
  }
}
export default new RetiroService();
