import React from "react";

function Principal() {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#opciones"
        >
          <span className="navbar-toggler-icon" />
        </button>
        {/* logo */}
        <a className="navbar-brand" href="/">
          <img src="" width={30} height={30} alt="logo" />
        </a>
        {/* enlaces */}
        <div className="collapse navbar-collapse" id="opciones">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/reportes">
                Reportes
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/ingresos">
                Ingresos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/egresos">
                Egresos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/depositos">
                Depósitos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/retiros">
                Retiros
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/cuentas">
                Cuentas
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/clientes">
                Clientes
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Principal;
