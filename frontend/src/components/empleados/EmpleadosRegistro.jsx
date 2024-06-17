import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function EmpleadosRegistro({
    AccionABMC,
    Item,
    Grabar,
    Volver
}){
    const {
        register,
        handleSubmit,
        formState: {errors, touchedFields, isValid, isSubmitted}
    } = useForm({ values: Item });

    const onSubmit = (data) => {
        Grabar(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container-fluid">

                <fieldset disabled={AccionABMC === "C"}>

                    {/* Campo Apellido y Nombre */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label htmlFor="ApellidoYNombre" className="col-form-label">
                                Apellido y Nombre <span className="text-danger">*</span>
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input 
                                type="text"
                                {...register("ApellidoYNombre", {
                                    required: { value: true, message: "El Apellido y Nombre son requeridos"},
                                    minLength: {
                                        value: 5,
                                        message: "El Apellido y Nombre debe tener al menos 5 caracteres"
                                    },
                                    maxLength: {
                                        value: 60,
                                        message: "El Apellido y Nombre debe tener como máximo 60 caracteres"
                                    }
                                })}
                                autoFocus
                                className={"form-control " + (errors?.ApellidoYNombre ? 'is-invalid' : '')}
                            />

                            {errors?.ApellidoYNombre && touchedFields.ApellidoYNombre && (
                                <div className="invalid-feedback">
                                    {errors?.ApellidoYNombre?.message}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Campo Fecha Nacimiento */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label htmlFor="FechaNacimiento" className="col-form-label">
                                Fecha Nacimiento <span className="text-danger">*</span>
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input 
                                type="date"
                                {...register("FechaNacimiento", {
                                    required: { value: true, message: "La Fecha de Nacimiento es requerida"},
                                })}
                                className={"form-control " + (errors?.FechaNacimiento ? 'is-invalid' : '')}
                            />

                            {errors?.FechaNacimiento && touchedFields.FechaNacimiento && (
                                <div className="invalid-feedback">
                                    {errors?.FechaNacimiento?.message}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Campo DNI */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label htmlFor="Dni" className="col-form-label">
                                DNI <span className="text-danger">*</span>
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <input 
                                type="text"
                                {...register("Dni", {
                                    required: { value: true, message: "El DNI es requerido"},
                                    min: {
                                        value: 0,
                                        message: "El DNI no puede ser menor a 0"
                                    }
                                })}
                                className={"form-control " + (errors?.Dni ? 'is-invalid' : '')}
                            />

                            {errors?.Dni && touchedFields.Dni && (
                                <div className="invalid-feedback">
                                    {errors?.Dni?.message}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Campo Suspendido */}
                    <div className="row">
                        <div className="col-sm-4 col-md-3 offset-md-1">
                            <label htmlFor="Suspendido" className="col-form-label">
                                Suspendido <span className="text-danger">*</span>
                            </label>
                        </div>
                        <div className="col-sm-8 col-md-6">
                            <select 
                                {...register("Suspendido", {
                                    required: { value: true, message: "Suspendido es requerido"}
                                })}
                                className={"form-control " + (errors?.Suspendido ? 'is-invalid' : '')}
                            >
                                <option value={null}></option>
                                <option value={false}>NO</option>
                                <option value={true}>SI</option>
                            </select>

                            {errors?.Suspendido && touchedFields.Suspendido && (
                                <div className="invalid-feedback">
                                    {errors?.Suspendido?.message}
                                </div>
                            )}
                        </div>
                    </div>

                </fieldset> <hr />

                {/* Botones Grabar, Cancelar/Volver */}
                <div className="row justify-content-center">
                    <div className="col text-center botones">
                        {AccionABMC !== "C" && (
                            <button type="submit" className="btn btn-primary">
                                <i className="fa fa-check"></i> Grabar
                            </button>
                        )}

                        <button type="button" className="btn btn-warning" onClick={() => Volver()}>
                            <i className="fa fa-undo"></i>
                            {AccionABMC === "C" ? 'Volver' : 'Cancelar'}
                        </button>
                    </div>
                </div>

                {/* texto: Revisar los datos ingrsados... */}
                {!isValid && isSubmitted && (
                    <div className="row alert alert-danger mensajesAlert">
                        <i className="fa fa-exclamation-sign"></i>
                        Revisar los datos ingresados...
                    </div>
                )}
            </div>
        </form>
    );
}