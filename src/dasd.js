const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  timeout: 5000,
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json; charset=utf-8",
  },
});

const cliente = {
  nombre: "Eugenia",
  direccion: "Putisima",
  identidad: "df",
  sexo: "mujer",
};
const create = async (data) => {
  try {
    const resp = await instance.post(
      "http://localhost:3001/api/v1/clientes",
      data
    );
    console.log(resp.data);
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
};

create(cliente);
