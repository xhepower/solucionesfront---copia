const Joi = require("joi");

const id = Joi.number().integer();
const nombre = Joi.string().min(3).max(30);
const direccion = Joi.string().allow(null, "").max(50);
const identidad = Joi.string().allow(null, "").max(50);
const sexo = Joi.string().valid("hombre", "mujer");
const limit = Joi.number().integer();
const offset = Joi.number().integer();
const createClienteSchema = Joi.object({
  nombre: nombre.required(),
  direccion: direccion,
  identidad: identidad,
  sexo: sexo.required(),
});

const updateClienteSchema = Joi.object({
  nombre: nombre,
  direccion: direccion,
  identidad: identidad,
  sexo: sexo,
});

const getClienteSchema = Joi.object({
  id: id.required(),
});
const queryClienteSchema = Joi.object({
  limit,
  offset,
  nombre,
  sexo,
});
module.exports = {
  createClienteSchema,
  updateClienteSchema,
  getClienteSchema,
  queryClienteSchema,
};
