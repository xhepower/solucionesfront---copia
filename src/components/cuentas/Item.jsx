import React from "react";
import CuentaService from "../../services/cuentas";

function Item(props) {
  const deleteTutorial = (event) => {
    event.preventDefault();

    if (window.confirm("¿Desea borrar este item?")) {
      //console.log(props.id);
      CuentaService.delete(props.id)
        .then((response) => {
          // console.log(response.data);
          window.location.href = "/cuentas";
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <div className="row col-12   border rounded">
      <div className="col-8">
        <strong> {props.nombre}</strong>
        <br />
        {props.tipo}
        <br />
      </div>
      <div className="col-4 justify-content-center">
        <a className="btn btn-warning" href={`/cuentas/${props.id}`}>
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
