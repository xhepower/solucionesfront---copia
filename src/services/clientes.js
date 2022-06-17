import http from "../http-common";
//const axios = require("axios").default;
class ClienteService {
  create(data) {
    return http.post("/clientes", data);
  }

  getAll() {
    return http.get("/clientes");
  }
  get(id) {
    return http.get(`/clientes/${id}`);
  }

  update(id, data) {
    return http.patch(`/clientes/${id}`, data);
  }
  delete(id) {
    return http.delete(`/clientes/${id}`);
  }
  deleteAll() {
    return http.delete(`/clientes`);
  }
  findByTitle(title) {
    return http.get(`/clientes?nombre=${title}`);
  }
}
export default new ClienteService();
