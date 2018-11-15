/**
 * Archivo que permite convertir la información de la base de datos
 * en objetos para ser utilizados en la aplicación.
 */


import createFragment from "react-addons-create-fragment";
import React from "react";
import {
    FaUser,
    FaPhone,
    FaEnvelope
} from 'react-icons/fa';

export {
    InCampanasKFormVoluntario,
    InHabilidadesGraficasKFormVoluntario,
    InEcargadosKFormVoluntario,
    VisualizacionEncargados,
    InHabilidadesCodigosKFormVoluntario,
    InHabilidadesBD,
    InVoluntariosKFormAdmin,
    InDocumentosBD
}

/**
 * Devuelve los campos importantes de una campaña.
 * @param result Los datos crudos obtenidos de la base de datos.
 */
function InCampanasKFormVoluntario(result) {
    let keys = ["Nombre", "Fecha_ejecucion", "Hora", "Lugar", "Descripcion", "terminos_condiciones"];
    let content = [];
    keys.forEach(k => {
        content.push(result[k]);
    });
    return content;
}

/**
 * Devuelve los encargados de una campaña.
 * @param result Los datos crudos obtenidos de la base de datos.
 */
function InEcargadosKFormVoluntario(result) {
    let in_encargado_general = Object.keys(result.EncargadoGeneral).map(key => {
        return result.EncargadoGeneral[key];
    });
    if (result.Encargados) {
        let in_encargados = Object.keys(result.Encargados).map(key => {
            return result.Encargados[key];
        });
        return in_encargado_general.concat(in_encargados);
    }

    return in_encargado_general;
}

/**
 * Devuelve los voluntarios de una campaña.
 * @param result Los datos crudos obtenidos de la base de datos.
 */
function InVoluntariosKFormAdmin(result) {
    let content = Object.keys(result.Voluntarios).map(key => {
        result.Voluntarios[key]["Cedula"] = key;
        return result.Voluntarios[key];
    });
    return content;
}

/**
 * Devuelve los encargados de una campaña con formato de html.
 * @param encargados Los encargados devueltos por InEcargadosKFormVoluntario.
 */
function VisualizacionEncargados(encargados) {
    let output = [];
    for (let index in encargados) {
        output.push(<li>
            <FaUser />
            {"  " + encargados[index]["nombre"] + " " + encargados[index]["apellidos"] + " | "}
            <FaPhone />
            {"  " + encargados[index]["telefono"] + " | "}
            <FaEnvelope />
            {"  " + encargados[index]["correo_electronico"] + "  "}
          </li>);
    }
    return output;
}

/**
 * Devuelve los nombres de las habilidades de una campaña.
 * @param result Los datos crudos obtenidos de la base de datos.
 */
function InHabilidadesGraficasKFormVoluntario(result) {
    return createFragment(result.Habilidades);
}

/**
 * Devuelve las habiliades [ID, nombre]  de una campaña.
 * @param result Los datos crudos obtenidos de la base de datos.
 */
function InHabilidadesCodigosKFormVoluntario(result) {
    let master_array = [];
    for (let habilidad in result.Habilidades) {
        master_array.push([habilidad.toString(), result.Habilidades[habilidad]]);
    }
    return master_array;
}

/**
 * Devuelve las habilidades completas de una campaña.
 * @param result Los datos crudos obtenidos de la base de datos.
 */
function InHabilidadesBD(result) {
    let nombresHabilidades = [];
    for (let k in result) {
        nombresHabilidades.push(result[k].Nombre);
    }
    return nombresHabilidades;
}

/**
 * Devuelve los documentos de una campaña.
 * @param result Los datos crudos obtenidos de la base de datos.
 */
function InDocumentosBD(result) {
    let documents = [];
    for (let k in result) {
        documents.push(result[k]);
    }
    return documents;
}