import React, { useState, useEffect } from "react";
import EgresoService from "../../services/egresos";
import CuentaService from "../../services/cuentas";
import Joi from "joi-browser";

//const { createEgresoSchema } = require("../../schemas/egreso.schema");
//const axios = require("axios");

function Add() {
  const initialState = {
    fecha: new Date(),
    concepto: "",
    descripcion: "",
    tipo: "efectivo",
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
    concepto: Joi.string().max(150),
    descripcion: Joi.string().allow(null, "").max(50),
    tipo: Joi.string().valid("efectivo", "transferencia"),
    //cuenta: Joi.string().allow(null, "").max(50),
    cuenta: Joi.when("tipo", {
      is: Joi.string().valid("efectivo"),
      then: Joi.allow(null, ""),
      otherwise: Joi.string().required(),
    }),

    monto: Joi.number().min(0.05),
  };
  const validateForm = (event) => {
    event.preventDefault();
    const result = Joi.validate(egreso, schema, {
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
  const [egreso, setEgreso] = useState(initialState);
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
    let cData = { ...egreso };
    cData[name] = value;
    setEgreso(cData);
    setErrors(errorData);
  };

  const saveEgreso = (event) => {
    if (validateForm(event) == null) {
      var data = {
        id: egreso.id,
        fecha: egreso.fecha,
        descripcion: egreso.descripcion,
        monto: egreso.monto,
        concepto: egreso.concepto,
        tipo: egreso.tipo,
        cuenta: egreso.cuenta,
      };

      EgresoService.create(data)
        .then((response) => {
          setEgreso({
            id: response.data.id,
            fecha: response.data.fecha,
            descripcion: response.data.descripcion,
            monto: response.data.monto,
            concepto: response.data.concepto,
            tipo: response.data.tipo,
            cuenta: response.data.cuenta,
          });

          setSubmitted(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const newEgreso = () => {
    setEgreso(initialState);
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
          <button className="btn btn-success" onClick={newEgreso}>
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
              value={egreso.fecha}
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
              value={egreso.monto}
              onChange={handleInputChange}
              name="monto"
            />
          </div>
          {errors.monto && (
            <div className="alert alert-danger">{errors.monto}</div>
          )}
          <div className="form-group">
            <label htmlFor="concepto">Concepto</label>
            <input
              type="text"
              className="form-control"
              id="concepto"
              value={egreso.concepto}
              onChange={handleInputChange}
              name="concepto"
            />
          </div>
          {errors.concepto && (
            <div className="alert alert-danger">{errors.concepto}</div>
          )}
          <div className="form-group">
            <label htmlFor="concepto">Descripcion</label>
            <input
              type="text"
              className="form-control"
              id="descripcion"
              value={egreso.descripcion}
              onChange={handleInputChange}
              name="descripcion"
            />
          </div>
          {errors.descripcion && (
            <div className="alert alert-danger">{errors.descripcion}</div>
          )}
          <div className="form-group">
            <label htmlFor="tipo">Tipo</label>

            <select
              name="tipo"
              id="tipo"
              className="form-control"
              required
              value={egreso.tipo}
              onChange={handleInputChange}
            >
              <option value="efectivo">Efectivo</option>
              <option value="transferencia">Transferencia</option>
            </select>
          </div>
          {errors.tipo && (
            <div className="alert alert-danger">{errors.tipo}</div>
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
              onClick={saveEgreso}
              className="btn btn-primary align-self-center"
            >
              Register
            </button>
            <br></br>
            <br></br>
            <a href="/egresos" className="btn btn-secondary align-self-center">
              Volver a Egresos
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default Add;
