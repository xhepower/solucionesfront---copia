const Joi = require("joi");

const id = Joi.number().integer();
const nombre = Joi.string().min(3).max(30);
const tipo = Joi.string().valid("egreso", "ingreso");
const limit = Joi.number().integer();
const offset = Joi.number().integer();
const createConceptoSchema = Joi.object({
  nombre: nombre.required(),
  tipo: tipo.required(),
});

const updateConceptoSchema = Joi.object({
  nombre: nombre,
  tipo: tipo,
});

const getConceptoSchema = Joi.object({
  id: id.required(),
});
const queryConceptoSchema = Joi.object({
  limit,
  offset,
  nombre,
  tipo,
});
module.exports = {
  createConceptoSchema,
  updateConceptoSchema,
  getConceptoSchema,
  queryConceptoSchema,
};
