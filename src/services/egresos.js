import http from "../http-common";
//const axios = require("axios").default;
class EgresoService {
  create(data) {
    return http.post("/egresos", data);
  }

  getAll() {
    return http.get("/egresos");
  }
  get(id) {
    return http.get(`/egresos/${id}`);
  }

  update(id, data) {
    return http.patch(`/egresos/${id}`, data);
  }
  delete(id) {
    return http.delete(`/egresos/${id}`);
  }
  deleteAll() {
    return http.delete(`/egresos`);
  }
  findByTitle(title) {
    return http.get(`/egresos?fecha=${title}`);
  }
  findByDate(fecha) {
    return http.get(`/egresos?fecha=${fecha}`);
  }
  findByInterval(fecha1, fecha2) {
    return http.get(`/egresos?fecha1=${fecha1}&fecha2=${fecha2}`);
  }
}
export default new EgresoService();
