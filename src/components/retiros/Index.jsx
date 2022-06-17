import React, { useState, useEffect } from "react";
import Search from "./Search";
import Item from "./Item";
import List from "./List";
import RetiroService from "../../services/retiros";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { date } from "joi";
//import CreateButton from "./CreateButton";

/*TODO aqui debo agregar de donde jala los datos
tambien me gustaria hacerlo tipo plantilla porque al final es la misma mierda

*/
toast.configure();

function Index() {
  const notify = (mensaje) => {
    toast.warn(mensaje, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  };
  const initialState = {
    fecha: new Date(),

    cuenta: "",
    monto: 0.0,
  };
  const [retiros, setRetiros] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    retrieve();
  }, []);

  const retrieve = async () => {
    await RetiroService.getAll()
      .then((response) => {
        setRetiros(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const onSearchValueChange = (e) => {
    //console.log(e.target.value);
    setSearchValue(e.target.value);
  };
  const findByTitle = () => {
    if (searchValue == "") {
      RetiroService.getAll()
        .then((response) => {
          setRetiros(response.data);
          //console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      if (searchValue.length < 3) {
        notify("El termino de busqueda debe ser mayor a 3 letras");
      } else {
        RetiroService.findByTitle(searchValue)
          .then((response) => {
            setRetiros(response.data);
            //console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  };
  return (
    <>
      <div className="container">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar por fecha YYYY-MM-DD"
              value={searchValue}
              onChange={onSearchValueChange}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByTitle}
              >
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid ">
        <div className="row align-items-center">
          <h2 className="col-10">Lista de retiros</h2>
          <div className="col-2 justify-items-end">
            <a className="btn btn-primary" href="/addretiro">
              {"Agregar Retiro "}
            </a>
          </div>
        </div>
      </div>
      <div className="container">
        <List data={retiros} pageLimit={5} pageNeighbours={1}></List>
      </div>
    </>
  );
}

export default Index;
