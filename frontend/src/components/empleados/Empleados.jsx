import React, { useState, useEffect } from "react";
import moment from "moment";

import { empleadosService } from "../../services/empleados.service"

import EmpleadosBuscar from "./EmpleadosBuscar";
import EmpleadosListado from "./EmpleadosListado";
import EmpleadosRegistro from "./EmpleadosRegistro";

import modalDialogService from "../../services/modalDialog.service";

export function Empleados(){
    const TituloAccionABMC = {
        A: "(Agregar)",
        B: "(Eliminar)",
        M: "(Modificar)",
        C: "(Consultar)",
        L: "(Listado)",
    };
    const [ AccionABMC, setAccionABMC ] = useState("L");

    const [ ApellidoYNombre, setApellidoYNombre ] = useState("");

    const [ Items, setItems ] = useState(null);
    const [ Item, setItem ] = useState(null);
    const [ RegistrosTotal, setRegistrosTotal ] = useState(0);
    const [ Paginas, setPaginas ] = useState([]);
    const [ Pagina, setPagina ] = useState(1);

    /**
     *  Busca todos los empleados, los almacena en Items, define la cantidad de registros y setea las paginas.
     *  Solo trae los empleados correspondientes al numero de pagina.
     * 
     * @param {Integer} _pagina - Numero de pagina
     */
    async function Buscar(_pagina){
        // Definir pagina
        if (_pagina && _pagina !== Pagina)
            setPagina(_pagina);
        else
            _pagina = Pagina;

        // Buscar los empleados por su apellido y nombre
        const data = await empleadosService.Buscar(ApellidoYNombre, _pagina);

        // Setear los empleados (items) en la lista 
        setItems(data.Items);
        setRegistrosTotal(data.RegistrosTotal);

        // Definir cantidad de paginas
        const arrPaginas = [];
        for( let i = 1; i < Math.ceil(RegistrosTotal / 10); i++)
            arrPaginas.push(i);
        setPaginas(arrPaginas);
    }

    /**
     *  Busca el empleado correspondiente al item enviado, almacenandolo en el estado Item.
     *  Tambien, modifica la AccionABMC.
     * 
     * @param {Object} item - Item con el que se buscara a el empleado
     * @param {String} accionABMC - Nueva Accion ABMC (A, B, M, C, L)
     */
    async function BuscarPorId(item, accionABMC){
        // Buscar el empleado correspondiente
        const data = await empleadosService.BuscarPorId(item);
        setItem(data);
        // Cambiar accion ABMC
        setAccionABMC(accionABMC);
    }

    /**
     *  Busca el empleado correspondiente al item enviado, almacenandolo en el estado Item.
     *  Tambien, modifica la Accion ABMC y la pone en modo consultar.
     * 
     * @param {*} item - Item con el que se buscara a el empleado
     */
    async function Consultar(item){
        BuscarPorId(item, "C");
    }

    /**
     *  Busca el empleado correspondiente al item enviado, almacenandolo en el estado Item.
     *  Para su posterior modificacion.
     *  Tambien, modifica la Accion ABMC y la pone en modo modificar.
     * 
     * @param {*} item - Item con el que se buscara a el empleado
     */
    async function Modificar(item){
        BuscarPorId(item, "M")
    }

    /**
     *  Modifica la Acciona ABMC y la pone en modo Agregar.
     *  Tambien instancia un nuevo item para su posterior modificacion y finalmente agregarlo.
     */
    async function Agregar(){
        setAccionABMC("A");
        setItem({
            IdEmpleado: 0,
            ApellidoYNombre: '',
            FechaNacimiento: moment(new Date()).format("DD/MM/YYYY"),
            Dni: '',
            Suspendido: false
        });
    }

    async function Imprimir(){
        modalDialogService.Alert("Funcion en desarrollo...")
    }

    /**
     *  Se asegura que se deasea eliminar y luego eliminar el empleado correspondiente al item enviado.
     * 
     * @param {Object} item - Empleado que se desea eliminar.
     */
    async function Eliminar(item){
        modalDialogService.Confirm(
            "Está seguro que desea eliminar el empleado?",
            undefined,
            undefined,
            undefined,
            async () => {
                await empleadosService.Eliminar(item);
                await Buscar();
            }
        );
    }

    /**
     *  Graba o Modifica un empleado dependiendo de la accion ABMC
     * 
     * @param {Object} item - Empleado a grabar o modificar
     * @returns 
     */
    async function Grabar(item){
        try {
            await empleadosService.Grabar(item);
        } catch (error) {
            modalDialogService.Alert(error?.response?.data?.message ?? error.toString());
            return;
        }

        await Buscar();
        Volver();

        modalDialogService.Alert(
            "Registro " +
            (AccionABMC === "A" ? "agregado" : "modificado") +
            " correctamente!"
        );
    }

    /**
     *  Modifica la Accion ABMC y la pone en modo Listado
     */
    function Volver(){
        setAccionABMC("L")
    }

    return (
        <div>
            <div className="tituloPagina">
                Empleados <small>{TituloAccionABMC[AccionABMC]}</small>
            </div>

            {AccionABMC === "L" && (
                <EmpleadosBuscar
                    {...{
                        ApellidoYNombre,
                        setApellidoYNombre,
                        Buscar,
                        Agregar
                    }}
                />
            )}

            {AccionABMC === "L" && Items?.length > 0 && (
                <EmpleadosListado
                    {...{
                        Items,
                        Consultar,
                        Modificar,
                        Eliminar,
                        Imprimir,
                        Pagina,
                        RegistrosTotal,
                        Paginas,
                        Buscar
                    }}
                />
            )}

            {AccionABMC === "L" && Items?.length === 0 && (
                <div className="alert alert-info mensajesAlert">
                    <i className="fa fa-exclamation-sign"></i>
                    No se encontraron registros...
                </div>
            )}

            {AccionABMC !== "L" && (
                <EmpleadosRegistro 
                    {...{
                        AccionABMC,
                        Item,
                        Grabar,
                        Volver
                    }}
                />
            )}
        </div>
    )
}