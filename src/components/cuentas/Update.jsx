import React, { useState, useEffect } from "react";
import CuentaService from "../../services/cuentas";
import Joi from "joi-browser";
import { useParams } from "react-router-dom";

//const { createCuentaSchema } = require("../../schemas/cuenta.schema");
//const axios = require("axios");

function Add() {
  const elid = useParams().id;

  const initialState = {
    nombre: "",
    tipo: "ahorro",
  };
  const schema = {
    id: Joi.number().integer(),
    nombre: Joi.string().min(3).max(30),
    tipo: Joi.string().valid("ahorro", "billetera electronica"),
  };
  const validateForm = (event) => {
    event.preventDefault();
    const result = Joi.validate(cuenta, schema, {
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
  const [cuenta, setCuenta] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const getCuenta = (id) => {
    CuentaService.get(id)
      .then((response) => {
        setCuenta({
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
    getCuenta(elid);
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
    let cData = { ...cuenta };
    cData[name] = value;
    setCuenta(cData);
    setErrors(errorData);
  };

  const saveCuenta = (event) => {
    if (validateForm(event) == null) {
      console.log("NO hay errores de formulario");
      var data = {
        // id: cuenta.id,
        nombre: cuenta.nombre,
        tipo: cuenta.tipo,
      };
      console.log(elid);
      console.log(data);
      CuentaService.update(elid, data)
        .then((response) => {
          setCuenta({
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
  const newCuenta = () => {
    setCuenta(initialState);
    setSubmitted(false);
    window.location.href = "/cuentas";
  };
  return (
    <>
      {submitted ? (
        <div>
          <h4>¡Guardado con éxito!</h4>
          <button className="btn btn-success" onClick={newCuenta}>
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
              value={cuenta.nombre}
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
              value={cuenta.tipo}
              onChange={handleInputChange}
            >
              <option value="ahorro">Ahorro</option>
              <option value="billetera electronica">
                Billetera electronica
              </option>
            </select>
          </div>
          <div className="form-group justify-content-end">
            <button
              type="submit"
              onClick={saveCuenta}
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
