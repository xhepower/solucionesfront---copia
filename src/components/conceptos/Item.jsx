import React from "react";
import ConceptoService from "../../services/conceptos";

function Item(props) {
  const deleteTutorial = (event) => {
    event.preventDefault();

    if (window.confirm("¿Desea borrar este item?")) {
      //console.log(props.id);
      ConceptoService.delete(props.id)
        .then((response) => {
          // console.log(response.data);
          window.location.href = "/conceptos";
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
        <a className="btn btn-warning" href={`/conceptos/${props.id}`}>
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
