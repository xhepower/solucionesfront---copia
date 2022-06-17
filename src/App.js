import { Routes, Route } from "react-router-dom";
import Clientes from "./components/clientes/Index";
import AddClientes from "./components/clientes/Add";
import ClientesUpdate from "./components/clientes/Update";
import Conceptos from "./components/conceptos/Index";
import AddConceptos from "./components/conceptos/Add";
import ConceptosUpdate from "./components/conceptos/Update";
import Cuentas from "./components/cuentas/Index";
import AddCuentas from "./components/cuentas/Add";
import CuentasUpdate from "./components/cuentas/Update";
import Ingresos from "./components/ingresos/Index";
import AddIngresos from "./components/ingresos/Add";
import IngresosUpdate from "./components/ingresos/Update";
import Egresos from "./components/egresos/Index";
import AddEgresos from "./components/egresos/Add";
import EgresosUpdate from "./components/egresos/Update";
import Depositos from "./components/depositos/Index";
import AddDepositos from "./components/depositos/Add";
import DepositosUpdate from "./components/depositos/Update";
import Retiros from "./components/retiros/Index";
import AddRetiros from "./components/retiros/Add";
import RetirosUpdate from "./components/retiros/Update";
import MenuPrincipal from "./components/menus/Principal";
import Home from "./components/home/Home";
import Reporte from "./components/reportes/Reporte";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <MenuPrincipal />
      <div className="container mt-3">
        <Routes>
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/addcliente" element={<AddClientes />} />
          <Route path="/clientes/:id" element={<ClientesUpdate />} />
          <Route path="/conceptos" element={<Conceptos />} />
          <Route path="/addconcepto" element={<AddConceptos />} />
          <Route path="/conceptos/:id" element={<ConceptosUpdate />} />
          <Route path="/cuentas" element={<Cuentas />} />
          <Route path="/addcuenta" element={<AddCuentas />} />
          <Route path="/cuentas/:id" element={<CuentasUpdate />} />
          <Route path="/ingresos" element={<Ingresos />} />
          <Route path="/addingreso" element={<AddIngresos />} />
          <Route path="/ingresos/:id" element={<IngresosUpdate />} />
          <Route path="/egresos" element={<Egresos />} />
          <Route path="/addegreso" element={<AddEgresos />} />
          <Route path="/egresos/:id" element={<EgresosUpdate />} />
          <Route path="/depositos" element={<Depositos />} />
          <Route path="/adddeposito" element={<AddDepositos />} />
          <Route path="/depositos/:id" element={<DepositosUpdate />} />
          <Route path="/retiros" element={<Retiros />} />
          <Route path="/addretiro" element={<AddRetiros />} />
          <Route path="/retiros/:id" element={<RetirosUpdate />} />
          <Route path="/reportes" element={<Reporte />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
