import React, { useState, useEffect } from "react";
import Search from "./Search";
import Item from "./Item";
import List from "./List";
import CuentaService from "../../services/cuentas";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    nombre: "",
    tipo: "ingreso",
  };
  const [cuentas, setCuentas] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    retrieve();
  }, []);

  const retrieve = async () => {
    await CuentaService.getAll()
      .then((response) => {
        setCuentas(response.data);
        //console.log(response.data);
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
      CuentaService.getAll()
        .then((response) => {
          setCuentas(response.data);
          //console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      if (searchValue.length < 3) {
        notify("El termino de busqueda debe ser mayor a 3 letras");
      } else {
        CuentaService.findByTitle(searchValue)
          .then((response) => {
            setCuentas(response.data);
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
              placeholder="Buscar por nombre"
              value={searchValue}
              onChange={onSearchValueChange}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid ">
        <div className="row align-items-center">
          <h2 className="col-10">Lista de cuentas</h2>
          <div className="col-2 justify-items-end">
            <a className="btn btn-primary" href="/addcuenta">
              {"Agregar Cuenta "}
            </a>
          </div>
        </div>
      </div>
      <div className="container">
        <List data={cuentas} pageLimit={5} pageNeighbours={1}></List>
      </div>
    </>
  );
}

export default Index;
