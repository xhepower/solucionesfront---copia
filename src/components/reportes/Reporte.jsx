import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import DepositoService from "../../services/depositos";
import EgresoService from "../../services/egresos";
import IngresoService from "../../services/ingresos";
import RetiroService from "../../services/retiros";
import CuentaService from "../../services/cuentas";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { date } from "joi";
function Reporte() {

    const initialState = {
        fecha: new Date(),
        fecha1: new Date(),
        fecha2: new Date(),
        deposito: {
            fecha: new Date(),
            cuenta: "",
            monto: 0,
        },
        egreso: {
            fecha: new Date(),
            concepto: "",
            descripcion: "",
            tipo: "efectivo",
            cuenta: "",
            monto: 0,
        }, ingreso: {
            fecha: new Date(),
            concepto: "",
            descripcion: "",
            tipo: "efectivo",
            cuenta: "",
            monto: 0,
        }, retiro: {
            fecha: new Date(),
            cuenta: "",
            monto: 0,
        }
    };


    const [errors, setErrors] = useState({});
    const [deposito, setDeposito] = useState([]);
    const [retiro, setRetiro] = useState([]);
    const [ingreso, setIngreso] = useState([]);
    const [egreso, setEgreso] = useState([]);
    const [cuentas, setCuentas] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [fecha, setFecha] = useState(initialState.fecha);
    const [fecha1, setFecha1] = useState(initialState.fecha1);
    const [fecha2, setFecha2] = useState(initialState.fecha2);
    const [vIngresos, setVIngresos] = useState(false);
    const [vDepositos, setVDepositos] = useState(false);
    const [vEgresos, setVEgresos] = useState(false);
    const [vRetiros, setVRetiros] = useState(false);
    const [vIngresos2, setVIngresos2] = useState(false);
    const [vDepositos2, setVDepositos2] = useState(false);
    const [vEgresos2, setVEgresos2] = useState(false);
    const [vRetiros2, setVRetiros2] = useState(false);

    //const [sIngresosEfectivo, setSIngresosEfectivo] = useState(0);
    useEffect(() => {
        retrieve();
        llenarCuentas()
    }, []);
    const retrieve = () => {
        IngresoService.getAll()
            .then((response) => {
                setIngreso(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
        EgresoService.getAll()
            .then((response) => {
                setEgreso(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
        RetiroService.getAll()
            .then((response) => {
                setRetiro(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
        DepositoService.getAll()
            .then((response) => {
                setDeposito(response.data);
            })
            .catch((e) => {
                console.log(e);
            });

    }
    //let currentData = [];

    const onFechaValueChange = (e) => {

        setFecha(e.target.value);

    };
    const onFecha1ValueChange = (e) => {

        setFecha1(e.target.value);
    };
    const onFecha2ValueChange = (e) => {

        setFecha2(e.target.value);
    };
    const llenarCuentas = () => {
        CuentaService.getAll()
            .then((response) => {
                setCuentas(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const findByDate = () => {
        if (fecha == "") {
            retrieve()
        } else {
            IngresoService.findByDate(fecha)
                .then((response) => {
                    setIngreso(response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
            EgresoService.findByDate(fecha)
                .then((response) => {
                    setEgreso(response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
            DepositoService.findByDate(fecha)
                .then((response) => {
                    setDeposito(response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
            RetiroService.findByDate(fecha)
                .then((response) => {
                    setRetiro(response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    }
    const findByInterval = () => {

        IngresoService.findByInterval(fecha1, fecha2)
            .then((response) => {
                setIngreso(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
        EgresoService.findByInterval(fecha1, fecha2)
            .then((response) => {
                setEgreso(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
        RetiroService.findByInterval(fecha1, fecha2)
            .then((response) => {
                setRetiro(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
        DepositoService.findByInterval(fecha1, fecha2)
            .then((response) => {
                setDeposito(response.data);
            })
            .catch((e) => {
                console.log(e);
            });

    }
    let suma = (elarr) => elarr.map(item => item.monto).reduce((previousValue, currentValue) => parseFloat(previousValue) + parseFloat(currentValue),
        0)
    let filtroTipo = (arr, fil) => {
        return arr.filter((item => item.tipo == fil))
    }
    let lacuenta = (elid) => {
        return CuentaService.get(elid)
            .then((response) => {
                return (response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }


    const found = (eldi) => cuentas.find(element => element.id == eldi);
    return (

        <>

            <div className="container">

                <header>
                    <h1>Reporte</h1>

                    <div >
                        <fieldset>
                            <legend>Fecha única</legend>
                            <input className="form-control" type="date" name="fecha" id="fecha" aria-label="Search" placeholder="YYYY-MM-DD" value={fecha}
                                onChange={onFechaValueChange} />
                            <button className="btn btn-outline-secondary" type="button" onClick={findByDate}>
                                Buscar
                            </button>
                        </fieldset>
                        <fieldset>
                            <legend>Intervalo</legend>
                            <label htmlFor="fecha1">De</label>
                            <input type="date" name="fecha1" id="fecha1" aria-label="Search" placeholder="YYYY-MM-DD" value={fecha1} className="form-control"
                                onChange={onFecha1ValueChange} />
                            <label htmlFor="fecha2">Hasta</label>
                            <input type="date" name="fecha2" id="fecha2" aria-label="Search" placeholder="YYYY-MM-DD" value={fecha2} className="form-control"
                                onChange={onFecha2ValueChange} />
                            <button className="btn btn-outline-secondary" type="button" onClick={findByInterval}>
                                Buscar
                            </button>
                        </fieldset>
                    </div>
                </header>
                <main>
                    <section>
                        <div className="efectivo" width="80%"><h2><table><thead><tr><th width="80%"><h2>Efectivo</h2></th><th width="20%" style={{ textAlign: "right" }}>{(parseFloat(suma(retiro)) - parseFloat(suma(deposito)) + parseFloat(suma(filtroTipo(ingreso, "efectivo"))) - parseFloat(suma(filtroTipo(egreso, "efectivo")))).toFixed(2)}</th></tr></thead></table></h2>
                            <div className="ingresos">
                                <div className="table-responsive tablatitulo tablatituloingreso">
                                    <table width="80%" className="table table-striped   table-hover tabla-resumen">
                                        <tbody><tr className="table-success">
                                            <th width="30%" scope="col">+ Ingresos</th>
                                            <th width="50%" style={{ textAlign: "right" }} scope="col">{parseFloat(suma(filtroTipo(ingreso, "efectivo"))).toFixed(2)}</th>
                                            <th width="20%" scope="col"><button className="btn btn-default dropdown-toggle" type="button" onClick={() => setVIngresos(s => !s)}>

                                            </button></th>
                                        </tr>

                                        </tbody></table>
                                </div>


                                {vIngresos ? <div className=" table-responsive tablaIngreso tablaingresoEfectivo" >
                                    <table id="tbl-ingresos " className="table table-striped  table-bordered table-hover"><tbody>

                                        {

                                            filtroTipo(ingreso, "efectivo").map((item) => (

                                                < tr key={item.id} >
                                                    <td>{item.fecha}</td>
                                                    <td>{item.concepto}</td>
                                                    <td align="right">{item.monto}</td>
                                                </tr>

                                            ))

                                        }

                                    </tbody></table>
                                </div> : null}

                            </div>
                            <div className="retiros">
                                <div className="table-responsive tablatitulo tablatituloretiro">
                                    <table width="80%" className="table table-striped   table-hover tabla-resumen">
                                        <tbody><tr className="table-success">
                                            <th scope="col" width="30%">+ Retiros</th>
                                            <th width="50%" style={{ textAlign: "right" }} scope="col">{suma(retiro).toFixed(2)}</th>
                                            <th width="20%" scope="col"><button className="btn btn-default dropdown-toggle" type="button" onClick={() => setVRetiros(s => !s)}>

                                            </button></th>
                                        </tr>

                                        </tbody></table>
                                </div>


                                {vRetiros ? <div className=" table-responsive tablaRetiro tablaRetiroEfectivo" >
                                    <table id="tbl-ingresos " className="table table-striped  table-bordered table-hover"><tbody>

                                        {

                                            retiro.map((item) => (

                                                < tr key={item.id} >
                                                    <td>{item.fecha}</td>
                                                    <td>{found(item.cuenta).nombre}</td>
                                                    <td align="right">{item.monto}</td>
                                                </tr>

                                            ))

                                        }

                                    </tbody></table>
                                </div> : null}

                            </div>
                            <div className="egresos">
                                <div className="table-responsive tablatitulo tablatituloegreso">
                                    <table width="80%" className="table table-striped   table-hover tabla-resumen">
                                        <tbody><tr className="table-danger">
                                            <th width="30%" scope="col">- Egresos</th>
                                            <th width="50%" style={{ textAlign: "right" }} scope="col">{suma(filtroTipo(egreso, "efectivo")).toFixed(2)}</th>
                                            <th width="20%" scope="col"><button className="btn btn-default dropdown-toggle" type="button" onClick={() => setVEgresos(s => !s)}>

                                            </button></th>
                                        </tr>

                                        </tbody></table>
                                </div>


                                {vEgresos ? <div className=" table-responsive tablaIngreso tablaingresoEfectivo" >
                                    <table id="tbl-ingresos " className="table table-striped  table-bordered table-hover"><tbody>

                                        {

                                            filtroTipo(egreso, "efectivo").map((item) => (

                                                < tr key={item.id} >
                                                    <td>{item.fecha}</td>
                                                    <td>{item.concepto}</td>
                                                    <td align="right">{item.monto}</td>
                                                </tr>

                                            ))

                                        }

                                    </tbody></table>
                                </div> : null}

                            </div>
                            <div className="depositos">
                                <div className="table-responsive tablatitulo tablatitulodeposito">
                                    <table width="80%" className="table table-striped   table-hover tabla-resumen">
                                        <tbody><tr className="table-danger">
                                            <th width="30%" scope="col">- Depositos</th>
                                            <th width="50%" style={{ textAlign: "right" }} scope="col">{suma(deposito).toFixed(2)}</th>
                                            <th width="20%" scope="col"><button className="btn btn-default dropdown-toggle" type="button" onClick={() => setVDepositos(s => !s)}>

                                            </button></th>
                                        </tr>

                                        </tbody></table>
                                </div>


                                {vDepositos ? <div className=" table-responsive tablaDepositos " >
                                    <table id="tbl-depositos " className="table table-striped  table-bordered table-hover"><tbody>

                                        {

                                            deposito.map((item) => (

                                                < tr key={item.id} >
                                                    <td>{item.fecha}</td>
                                                    <td>{found(item.cuenta).nombre}</td>
                                                    <td align="right">{item.monto}</td>
                                                </tr>

                                            ))

                                        }

                                    </tbody></table>
                                </div> : null}

                            </div>
                        </div>
                    </section>
                    <section>
                        <div className="efectivo" width="80%"><h2><table><thead><tr><th width="80%"><h2>Banco</h2></th><th width="20%" style={{ textAlign: "right" }}>{(parseFloat(suma(deposito)) - parseFloat(suma(retiro)) + parseFloat(suma(filtroTipo(ingreso, "transferencia"))) - parseFloat(suma(filtroTipo(egreso, "transferencia")))).toFixed(2)}</th></tr></thead></table></h2>
                            <div className="ingresos">
                                <div className="table-responsive tablatitulo tablatituloingreso">
                                    <table width="80%" className="table table-striped   table-hover tabla-resumen">
                                        <tbody><tr className="table-success">
                                            <th width="30%" scope="col">+ Ingresos</th>
                                            <th width="50%" style={{ textAlign: "right" }} scope="col">{parseFloat(suma(filtroTipo(ingreso, "transferencia"))).toFixed(2)}</th>
                                            <th width="20%" scope="col"><button className="btn btn-default dropdown-toggle" type="button" onClick={() => setVIngresos2(s => !s)}>

                                            </button></th>
                                        </tr>

                                        </tbody></table>
                                </div>


                                {vIngresos2 ? <div className=" table-responsive tablaIngreso tablaingresoEfectivo" >
                                    <table id="tbl-ingresos " className="table table-striped  table-bordered table-hover"><tbody>

                                        {

                                            filtroTipo(ingreso, "transferencia").map((item) => (

                                                < tr key={item.id} >
                                                    <td>{item.fecha}</td>
                                                    <td>{item.concepto}</td>
                                                    <td align="right">{item.monto}</td>
                                                </tr>

                                            ))

                                        }

                                    </tbody></table>
                                </div> : null}

                            </div>
                            <div className="depositos">
                                <div className="table-responsive tablatitulo tablatitulodeposito">
                                    <table width="80%" className="table table-striped   table-hover tabla-resumen">
                                        <tbody><tr className="table-success">
                                            <th width="30%" scope="col">+ Depositos</th>
                                            <th width="50%" style={{ textAlign: "right" }} scope="col">{suma(deposito).toFixed(2)}</th>
                                            <th width="20%" scope="col"><button className="btn btn-default dropdown-toggle" type="button" onClick={() => setVDepositos2(s => !s)}>

                                            </button></th>
                                        </tr>

                                        </tbody></table>
                                </div>


                                {vDepositos2 ? <div className=" table-responsive tablaDepositos " >
                                    <table id="tbl-depositos " className="table table-striped  table-bordered table-hover"><tbody>

                                        {

                                            deposito.map((item) => (

                                                < tr key={item.id} >
                                                    <td>{item.fecha}</td>
                                                    <td>{found(item.cuenta).nombre}</td>
                                                    <td align="right">{item.monto}</td>
                                                </tr>

                                            ))

                                        }

                                    </tbody></table>
                                </div> : null}

                            </div>
                            <div className="egresos">
                                <div className="table-responsive tablatitulo tablatituloegreso">
                                    <table width="80%" className="table table-striped   table-hover tabla-resumen">
                                        <tbody><tr className="table-danger">
                                            <th width="30%" scope="col">- Egresos</th>
                                            <th width="50%" style={{ textAlign: "right" }} scope="col">{suma(filtroTipo(egreso, "transferencia")).toFixed(2)}</th>
                                            <th width="20%" scope="col"><button className="btn btn-default dropdown-toggle" type="button" onClick={() => setVEgresos2(s => !s)}>

                                            </button></th>
                                        </tr>

                                        </tbody></table>
                                </div>


                                {vEgresos2 ? <div className=" table-responsive tablaIngreso tablaingresoEfectivo" >
                                    <table id="tbl-ingresos " className="table table-striped  table-bordered table-hover"><tbody>

                                        {

                                            filtroTipo(egreso, "transferencia").map((item) => (

                                                < tr key={item.id} >
                                                    <td>{item.fecha}</td>
                                                    <td>{item.concepto}</td>
                                                    <td align="right">{item.monto}</td>
                                                </tr>

                                            ))

                                        }

                                    </tbody></table>
                                </div> : null}

                            </div>
                            <div className="retiros">
                                <div className="table-responsive tablatitulo tablatituloretiro">
                                    <table width="80%" className="table table-striped   table-hover tabla-resumen">
                                        <tbody><tr className="table-danger">
                                            <th scope="col" width="30%">+ Retiros</th>
                                            <th width="50%" style={{ textAlign: "right" }} scope="col">{suma(retiro).toFixed(2)}</th>
                                            <th width="20%" scope="col"><button className="btn btn-default dropdown-toggle" type="button" onClick={() => setVRetiros2(s => !s)}>

                                            </button></th>
                                        </tr>

                                        </tbody></table>
                                </div>


                                {vRetiros2 ? <div className=" table-responsive tablaRetiro tablaRetiroEfectivo" >
                                    <table id="tbl-ingresos " className="table table-striped  table-bordered table-hover"><tbody>

                                        {

                                            retiro.map((item) => (

                                                < tr key={item.id} >
                                                    <td>{item.fecha}</td>
                                                    <td>{found(item.cuenta).nombre}</td>
                                                    <td align="right">{item.monto}</td>
                                                </tr>

                                            ))

                                        }

                                    </tbody></table>
                                </div> : null}

                            </div>

                        </div>
                    </section>
                    <section className="total" />
                </main>
                <footer className="bg-light text-center text-lg-start">
                    {/* Copyright */}
                    <div className="text-center p-3" >
                        © 2022 Hecho con amor por:
                        <a className="text-dark" href="https://xhepower.com/"> Xhepo</a>
                    </div>
                    {/* Copyright */}
                </footer>

            </div>


        </>
    );
}

export default Reporte;