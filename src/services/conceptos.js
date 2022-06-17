import http from "../http-common";
//const axios = require("axios").default;
class ConceptoService {
  create(data) {
    return http.post("/conceptos", data);
  }

  getAll() {
    return http.get("/conceptos");
  }
  get(id) {
    return http.get(`/conceptos/${id}`);
  }

  update(id, data) {
    return http.patch(`/conceptos/${id}`, data);
  }
  delete(id) {
    return http.delete(`/conceptos/${id}`);
  }
  deleteAll() {
    return http.delete(`/conceptos`);
  }
  findByTitle(title) {
    return http.get(`/conceptos?nombre=${title}`);
  }
}
export default new ConceptoService();
