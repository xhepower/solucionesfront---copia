import React, { useState, useEffect } from "react";
import RetiroService from "../../services/retiros";
import CuentaService from "../../services/cuentas";
import Joi from "joi-browser";

//const { createRetiroSchema } = require("../../schemas/retiro.schema");
//const axios = require("axios");

function Add() {
  const initialState = {
    fecha: new Date(),
    cuenta: "",
    monto: 0,
  };
  /*const schema = Joi.object({
    field1: Joi.string().valid("A", "B", "C", "D", "E", "F", "H", "I").required(),
    field2: Joi.when("field1", {
      is: Joi.string().valid("A", "B", "C", "H"),
      then: Joi.valid(null),
      otherwise: Joi.date().required(),
    }),
  });*/
  const schema = {
    // id = Joi.number().integer(),
    fecha: Joi.date(),
    cuenta: Joi.when("tipo", {
      is: Joi.string().valid("efectivo"),
      then: Joi.allow(null, ""),
      otherwise: Joi.string().required(),
    }),
    monto: Joi.number().min(0.05),
  };
  const validateForm = (event) => {
    event.preventDefault();
    const result = Joi.validate(retiro, schema, {
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
  const [retiro, setRetiro] = useState(initialState);
  const [cuentas, setCuentas] = useState([]);
  useEffect(() => {
    llenarCuentas();
  }, []);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let errorData = { ...errors };
    const errorMessage = validateProperty(event);
    if (errorMessage) {
      errorData[name] = errorMessage;
    } else {
      delete errorData[name];
    }
    let cData = { ...retiro };
    cData[name] = value;
    setRetiro(cData);
    setErrors(errorData);
  };

  const saveRetiro = (event) => {
    if (validateForm(event) == null) {
      var data = {
        id: retiro.id,
        fecha: retiro.fecha,
        monto: retiro.monto,
        cuenta: retiro.cuenta,
      };

      RetiroService.create(data)
        .then((response) => {
          setRetiro({
            id: response.data.id,
            fecha: response.data.fecha,
            monto: response.data.monto,
            cuenta: response.data.cuenta,
          });

          setSubmitted(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const newRetiro = () => {
    setRetiro(initialState);
    setSubmitted(false);
  };
  const llenarCuentas = () => {
    CuentaService.getAll()
      .then((response) => {
        setCuentas(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //console.log(cuentas);
  return (
    <>
      {submitted ? (
        <div>
          <h4>¡Guardado con éxito!</h4>
          <button className="btn btn-success" onClick={newRetiro}>
            Listo
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="fecha">Fecha</label>
            <input
              type="date"
              className="form-control"
              id="fecha"
              required
              value={retiro.fecha}
              onChange={handleInputChange}
              min="2022-01-01"
              name="fecha"
            />
            <span>
              <small>Si no elige una fecha se elegirá la fecha de hoy</small>
            </span>
          </div>
          {errors.fecha && (
            <div className="alert alert-danger">{errors.fecha}</div>
          )}
          <div className="form-group">
            <label htmlFor="monto">Monto</label>
            <input
              type="number"
              className="form-control"
              id="monto"
              value={retiro.monto}
              onChange={handleInputChange}
              name="monto"
            />
          </div>
          {errors.monto && (
            <div className="alert alert-danger">{errors.monto}</div>
          )}

          <div className="form-group">
            <label htmlFor="cuenta">Cuenta</label>

            <select
              name="cuenta"
              id="cuenta"
              className="form-control"
              required
              onChange={handleInputChange}
            >
              <option value=""></option>
              {cuentas.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nombre}
                </option>
              ))}
            </select>
          </div>
          {errors.cuenta && (
            <div className="alert alert-danger">{errors.cuenta}</div>
          )}
          <br></br>
          <br></br>
          <div className="form-group justify-content-end">
            <button
              type="submit"
              onClick={saveRetiro}
              className="btn btn-primary align-self-center"
            >
              Register
            </button>
            <br></br>
            <br></br>
            <a href="/retiros" className="btn btn-secondary align-self-center">
              Volver a Retiros
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default Add;
