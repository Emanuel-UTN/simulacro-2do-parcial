import httpService from "./http.service";

import { config } from "../config";
const urlResource = config.urlResourceEmpleados;

async function Buscar(ApellidoYNombre, Pagina){
    const resp = await httpService.get(urlResource, {
        params: { ApellidoYNombre, Pagina }
    });
    return  resp.data;
}

async function BuscarPorId(item){
    const resp = await httpService.get(urlResource + `/${item.IdEmpleado}`);
    return resp.data;
}

async function Eliminar(item){
    return await httpService.delete(urlResource + `/${item.IdEmpleado}`);
}

async function Grabar(item){
    if (item.IdEmpleado === 0)
        await httpService.post(urlResource, item);
    else
        await httpService.put(urlResource + `/${item.IdEmpleado}`, item);
}

export const empleadosService = {
    Buscar, BuscarPorId, Eliminar, Grabar
}