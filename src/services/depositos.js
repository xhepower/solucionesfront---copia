import http from "../http-common";
//const axios = require("axios").default;
class DepositoService {
  create(data) {
    return http.post("/depositos", data);
  }

  getAll() {
    return http.get("/depositos");
  }
  get(id) {
    return http.get(`/depositos/${id}`);
  }

  update(id, data) {
    return http.patch(`/depositos/${id}`, data);
  }
  delete(id) {
    return http.delete(`/depositos/${id}`);
  }
  deleteAll() {
    return http.delete(`/depositos`);
  }
  findByTitle(title) {
    return http.get(`/depositos?fecha=${title}`);
  }
  findByDate(fecha) {
    return http.get(`/depositos?fecha=${fecha}`);
  }
  findByInterval(fecha1, fecha2) {
    return http.get(`/depositos?fecha1=${fecha1}&fecha2=${fecha2}`);
  }
}
export default new DepositoService();
