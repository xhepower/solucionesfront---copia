import React, { useState, useEffect } from "react";
import ClienteService from "../../services/clientes";
import Joi from "joi-browser";
import { useParams } from "react-router-dom";

//const { createClienteSchema } = require("../../schemas/cliente.schema");
//const axios = require("axios");

function Add() {
  const elid = useParams().id;

  const initialState = {
    nombre: "",
    direccion: "",
    identidad: "",
    sexo: "hombre",
  };
  const schema = {
    id: Joi.number().integer(),
    nombre: Joi.string().min(3).max(30),
    direccion: Joi.string().allow(null, "").max(150),
    identidad: Joi.string().allow(null, "").max(50),
    sexo: Joi.string().valid("hombre", "mujer"),
  };
  const validateForm = (event) => {
    event.preventDefault();
    const result = Joi.validate(cliente, schema, {
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
  const [cliente, setCliente] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const getCliente = (id) => {
    ClienteService.get(id)
      .then((response) => {
        setCliente({
          nombre: response.data.nombre,
          direccion: response.data.direccion,
          identidad: response.data.identidad,
          sexo: response.data.sexo,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getCliente(elid);
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
    let cData = { ...cliente };
    cData[name] = value;
    setCliente(cData);
    setErrors(errorData);
  };

  const saveCliente = (event) => {
    if (validateForm(event) == null) {
      console.log("NO hay errores de formulario");
      var data = {
        // id: cliente.id,
        nombre: cliente.nombre,
        direccion: cliente.direccion,
        identidad: cliente.identidad,
        sexo: cliente.sexo,
      };
      console.log(elid);
      console.log(data);
      ClienteService.update(elid, data)
        .then((response) => {
          setCliente({
            // id: response.data.id,
            nombre: response.data.nombre,
            direccion: response.data.direccion,
            identidad: response.data.identidad,
            sexo: response.data.sexo,
          });
          setSubmitted(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const newCliente = () => {
    setCliente(initialState);
    setSubmitted(false);
    window.location.href = "/clientes";
  };
  return (
    <>
      {submitted ? (
        <div>
          <h4>¡Guardado con éxito!</h4>
          <button className="btn btn-success" onClick={newCliente}>
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
              value={cliente.nombre}
              onChange={handleInputChange}
              minLength="3"
              name="nombre"
            />
          </div>
          {errors.nombre && (
            <div className="alert alert-danger">{errors.nombre}</div>
          )}
          <div className="form-group">
            <label htmlFor="direccion">Direccion</label>
            <input
              type="text"
              className="form-control"
              id="direccion"
              value={cliente.direccion}
              onChange={handleInputChange}
              name="direccion"
            />
          </div>
          <div className="form-group">
            <label htmlFor="identidad">Identidad</label>
            <input
              type="text"
              className="form-control"
              id="identidad"
              value={cliente.identidad}
              onChange={handleInputChange}
              name="identidad"
            />
          </div>
          <div className="form-group">
            <label htmlFor="radio">Sexo</label>

            <select
              name="sexo"
              id="sexo"
              className="form-control"
              required
              value={cliente.sexo}
              onChange={handleInputChange}
            >
              <option value="hombre">Hombre</option>
              <option value="mujer">Mujer</option>
            </select>
          </div>
          <br></br>
          <br></br>
          <div className="form-group justify-content-end">
            <button
              type="submit"
              onClick={saveCliente}
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
