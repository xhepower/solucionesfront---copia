import { React, useEffect, useState } from "react";
import ingresoService from "../../services/ingresos";
import cuentaService from "../../services/cuentas";

function Item(props) {
  const [lacuenta, setLacuenta] = useState("");

  const asignarCuenta = () => {
    if (props.tipo === "efectivo") {
      setLacuenta("");
    } else {
      cuentaService
        .get(props.cuenta)
        .then((response) => {
          setLacuenta(response.data.nombre);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  useEffect(() => {
    asignarCuenta();
  }, [props]);

  const deleteTutorial = (event) => {
    event.preventDefault();

    if (window.confirm("¿Desea borrar este item?")) {
      //console.log(props.id);
      ingresoService
        .delete(props.id)
        .then((response) => {
          // console.log(response.data);
          window.location.href = "/ingresos";
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div className="row col-12   border rounded">
      <div className="col-8">
        <strong> {props.fecha}</strong>
        <br />
        <small>{props.monto}</small>
        <br />
        {props.tipo}
        <br />
        {lacuenta}
        <br />
        {props.concepto}
        <br />
        {props.descripcion}
        <br />
      </div>
      <div className="col-4 justify-content-center">
        <a className="btn btn-warning" href={`/ingresos/${props.id}`}>
          Editar
        </a>
        <a className="btn btn-danger" onClick={deleteTutorial}>
          Eliminar
        </a>
      </div>
    </div>
  );
}

export default Item;
