import http from "../http-common";
//const axios = require("axios").default;
class IngresoService {
  create(data) {
    return http.post("/ingresos", data);
  }

  getAll() {
    return http.get("/ingresos");
  }
  get(id) {
    return http.get(`/ingresos/${id}`);
  }

  update(id, data) {
    return http.patch(`/ingresos/${id}`, data);
  }
  delete(id) {
    return http.delete(`/ingresos/${id}`);
  }
  deleteAll() {
    return http.delete(`/ingresos`);
  }
  findByTitle(title) {
    return http.get(`/ingresos?fecha=${title}`);
  }
  findByDate(fecha) {
    return http.get(`/ingresos?fecha=${fecha}`);
  }
  async findByInterval(fecha1, fecha2) {


    return http.get(`/ingresos?fecha1=${fecha1}&fecha2=${fecha2}`);

  }
}
export default new IngresoService();
