import React from "react";
import CuentaService from "../../services/cuentas";
function Search({ searchValue, setSearchValue, cuentas, setCuentas }) {
  //const [searchValue, setSearchValue] = React.useState("");
  const onSearchValueChange = async (e) => {
    //console.log(e.target.value);
    setSearchValue(e.target.value);
    await findByTitle();
  };
  const findByTitle = () => {
    CuentaService.findByTitle(searchValue)
      .then((response) => {
        setCuentas(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            className="form-control col-12"
            type="search"
            aria-label="Search"
            placeholder="Buscar por nombre"
            value={searchValue}
            onChange={onSearchValueChange}
          />
        </div>
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
  );
}

export default Search;
