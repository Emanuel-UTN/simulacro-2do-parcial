import React from "react";

export default function EmpleadosBuscar({ApellidoYNombre, setApellidoYNombre, Buscar, Agregar}) {

    return (
        <form>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-sm-4 col-md-2">
                        <label className="col-form-label">Apellido y Nombre:</label>
                    </div>
                    <div className="col-sm-10 col-md-6">
                        <input 
                            type="text"
                            className="form-control"
                            onChange={(e) => setApellidoYNombre(e.target.value)}
                            value={ApellidoYNombre}
                            maxLength="60"
                            autoFocus
                        />
                    </div>
                </div>

                <hr />

                {/* Botones */}
                <div className="row">
                    <div className="col text-center botones">
                        <button type="button" className="btn btn-primary" onClick={() =>Buscar(1)}>
                            <i className="fa fa-search"></i> Buscar
                        </button>

                        <button type="button" className="btn btn-success" onClick={() => Agregar()}>
                            <i className="fa fa-plus"></i> Agregar
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}