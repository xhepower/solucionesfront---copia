import React from "react";
import ClienteService from "../../services/clientes";

function Item(props) {
  const deleteTutorial = (event) => {
    event.preventDefault();

    if (window.confirm("¿Desea borrar este item?")) {
      //console.log(props.id);
      ClienteService.delete(props.id)
        .then((response) => {
          // console.log(response.data);
          window.location.href = "/clientes";
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
        <small>{props.direccion}</small>
        <br />
        {props.identidad}
        <br />
        {props.sexo}
        <br />
      </div>
      <div className="col-4 justify-content-center">
        <a className="btn btn-warning" href={`/clientes/${props.id}`}>
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
