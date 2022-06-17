import React, { useState, useEffect } from "react";
import ConceptoService from "../../services/conceptos";
import Joi from "joi-browser";
import { useParams } from "react-router-dom";

//const { createConceptoSchema } = require("../../schemas/concepto.schema");
//const axios = require("axios");

function Add() {
  const elid = useParams().id;

  const initialState = {
    nombre: "",
    tipo: "ingreso",
  };
  const schema = {
    id: Joi.number().integer(),
    nombre: Joi.string().min(3).max(30),
    tipo: Joi.string().valid("ingreso", "egreso"),
  };
  const validateForm = (event) => {
    event.preventDefault();
    const result = Joi.validate(concepto, schema, {
      abortEarly: false,
    });
    console.log(result);
    const { error } = result;
    if (!error) {
      return null;
    } else {
      const errorData = {};
      for (let item of error.details) {
        const name = item.path[0];
        const message = item.message;
        errorData[name] = message;
      }
      console.log(errors);
      setErrors(errorData);
      return errorData;
    }
  };
  const validateProperty = (event) => {
    const { name, value } = event.target;
    if (name !== "nombre") {
      const obj = { [name]: value };
      const subSchema = { [name]: schema[name] };
      const result = Joi.validate(obj, subSchema);
      const { error } = result;
      return error ? error.details[0].message : null;
    }
  };

  const [errors, setErrors] = useState({});
  const [concepto, setConcepto] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const getConcepto = (id) => {
    ConceptoService.get(id)
      .then((response) => {
        setConcepto({
          nombre: response.data.nombre,
          tipo: response.data.tipo,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getConcepto(elid);
  }, [elid]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let errorData = { ...errors };
    const errorMessage = validateProperty(event);
    if (errorMessage) {
      errorData[name] = errorMessage;
    } else {
      delete errorData[name];
    }
    let cData = { ...concepto };
    cData[name] = value;
    setConcepto(cData);
    setErrors(errorData);
  };

  const saveConcepto = (event) => {
    if (validateForm(event) == null) {
      console.log("NO hay errores de formulario");
      var data = {
        // id: concepto.id,
        nombre: concepto.nombre,
        tipo: concepto.tipo,
      };
      console.log(elid);
      console.log(data);
      ConceptoService.update(elid, data)
        .then((response) => {
          setConcepto({
            // id: response.data.id,
            nombre: response.data.nombre,
            tipo: response.data.tipo,
          });
          setSubmitted(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const newConcepto = () => {
    setConcepto(initialState);
    setSubmitted(false);
    window.location.href = "/conceptos";
  };
  return (
    <>
      {submitted ? (
        <div>
          <h4>¡Guardado con éxito!</h4>
          <button className="btn btn-success" onClick={newConcepto}>
            Listo
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              required
              value={concepto.nombre}
              onChange={handleInputChange}
              minLength="3"
              name="nombre"
            />
          </div>
          {errors.nombre && (
            <div className="alert alert-danger">{errors.nombre}</div>
          )}

          <div className="form-group">
            <label htmlFor="radio">Tipo</label>

            <select
              name="tipo"
              id="tipo"
              className="form-control"
              required
              value={concepto.tipo}
              onChange={handleInputChange}
            >
              <option value="ingreso">Ingreso</option>
              <option value="egreso">Egreso</option>
            </select>
          </div>
          <div className="form-group justify-content-end">
            <button
              type="submit"
              onClick={saveConcepto}
              className="btn btn-primary align-self-center"
            >
              Register
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Add;
