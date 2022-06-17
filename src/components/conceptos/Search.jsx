import React from "react";
import ConceptoService from "../../services/conceptos";
function Search({ searchValue, setSearchValue, conceptos, setConceptos }) {
  //const [searchValue, setSearchValue] = React.useState("");
  const onSearchValueChange = async (e) => {
    //console.log(e.target.value);
    setSearchValue(e.target.value);
    await findByTitle();
  };
  const findByTitle = () => {
    ConceptoService.findByTitle(searchValue)
      .then((response) => {
        setConceptos(response.data);
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
