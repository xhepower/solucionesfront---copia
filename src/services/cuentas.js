import http from "../http-common";
//const axios = require("axios").default;
class CuentaService {
  create(data) {
    return http.post("/cuentas", data);
  }

  getAll() {
    return http.get("/cuentas");
  }
  get(id) {
    return http.get(`/cuentas/${id}`);
  }

  update(id, data) {
    return http.patch(`/cuentas/${id}`, data);
  }
  delete(id) {
    return http.delete(`/cuentas/${id}`);
  }
  deleteAll() {
    return http.delete(`/cuentas`);
  }
  findByTitle(title) {
    return http.get(`/cuentas?nombre=${title}`);
  }
}
export default new CuentaService();
