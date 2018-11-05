import createFragment from "react-addons-create-fragment";
import React from "react";
import { FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';

export {InCampanasKFormVoluntario, InHabilidadesGraficasKFormVoluntario, InEcargadosKFormVoluntario,
VisualizacionEncargados, InHabilidadesCodigosKFormVoluntario, InHabilidadesBD, InVoluntariosKFormAdmin,
InDocumentosBD}

function InCampanasKFormVoluntario(result) {
    let keys = ["Nombre", "Fecha_ejecucion", "Hora", "Lugar", "Descripcion", "terminos_condiciones"];
    let content = [];
    keys.forEach(k => {
        content.push(result[k]);
    });
    return content;
}

function InEcargadosKFormVoluntario(result) {
    let in_encargado_general = Object.keys(result.EncargadoGeneral).map(key => {
        return result.EncargadoGeneral[key];
    });
    if (result.Encargados){
        let in_encargados = Object.keys(result.Encargados).map(key => {
            return result.Encargados[key];
        });
        return in_encargado_general.concat(in_encargados);
    }

    return in_encargado_general;
}

function InVoluntariosKFormAdmin(result) {
    let content = Object.keys(result.Voluntarios).map(key => {
        return result.Voluntarios[key];
    });
    return content;
}


function VisualizacionEncargados(encargados) {
    let output = [];
    for(let index in encargados) {
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


function InHabilidadesGraficasKFormVoluntario(result)
{
   return createFragment(result.Habilidades);
}

function InHabilidadesCodigosKFormVoluntario(result)
{
    let master_array = [];
    for(let habilidad in result.Habilidades) {
        master_array.push([habilidad.toString(), result.Habilidades[habilidad]]);
    }
    return master_array;
}

function InHabilidadesBD(result) {
    let nombresHabilidades = [];
    for(let k in result){
        nombresHabilidades.push(result[k].Nombre);
    }
    return nombresHabilidades;
}

function InDocumentosBD(result) {
    let documents = [];
    for(let k in result){
        documents.push(result[k]);
    }
    return documents;
}
