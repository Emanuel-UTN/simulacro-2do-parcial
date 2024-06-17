import React from "react";
import moment from "moment";

export default function EmpleadosListado({
    Items,
    Consultar,
    Modificar,
    Eliminar,
    Imprimir,
    Pagina,
    RegistrosTotal,
    Paginas,
    Buscar
}){

    return (
        <div className="table-responsive">
            <table className="table table-hover table-sm table-bordered table-stripped">
                <thead>
                    <tr>
                        <th className="text-center">Apellido y Nombre</th>
                        <th className="text-center">Fecha de Nacimiento</th>
                        <th className="text-center">DNI</th>
                        <th className="text-center">Suspendido</th>
                        <th className="text-center text-nowrap">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {Items && Items.map((Item) => (
                        <tr key={Item.IdEmpleado}>
                            <td>{Item.ApellidoYNombre}</td>
                            <td className="text-center">{moment(Item.FechaNacimiento).format("DD/MM/YYYY")}</td>
                            <td className="text-center">{Item.Dni}</td>
                            <td className="text-center">{Item.Suspendido ? "SI" : "NO"}</td>

                            <td className="text-center text-nowrap">
                                <button 
                                    title="Consultar"
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => Consultar(Item)}
                                >
                                    <i className="fa fa-eye"></i>
                                </button>

                                <button 
                                    title="Modificar"
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() => Modificar(Item)}
                                >
                                    <i className="fa fa-pencil"></i>
                                </button>

                                <button 
                                    title="Eliminar"
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => Eliminar(Item)}
                                >
                                    <i className="fa fa-times"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Paginador */}
            <div className="paginador">
                <div className="row">
                    <div className="col">
                        <span className="pyBadge">Registros: {RegistrosTotal}</span>
                    </div>
                    <div className="col text-center">
                        Pagina: &nbsp;
                        <select 
                            value={Pagina}
                            onChange={(e) => Buscar(e.target.value)}
                        >
                            {Paginas?.map((x) => (
                                <option value={x} key={x}>
                                    {x}
                                </option>
                            ))}
                        </select>
                        &nbsp; de {Paginas?.length}
                    </div>

                    <div className="col">
                        <button className="btn btn-primary float-end" onClick={() => Imprimir()}>
                            <i className="fa fa-print"></i> Imprimir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}