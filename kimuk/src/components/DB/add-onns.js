import createFragment from "react-addons-create-fragment";
import React from "react";

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
    let in_encargados = [];
    for(let encargado in result.Encargados) {
        let frag = createFragment(result.Encargados[encargado]);
        frag.unshift(encargado);
        in_encargados.push(frag);
    }
    return in_encargados;
}

function InVoluntariosKFormAdmin(result) {
    let content = Object.keys(result.Voluntarios).map(key => {
        return result.Voluntarios[key];
    });
    return content;
}


function VisualizacionEncargados(encargados) {
    let output = [];
    if(encargados instanceof Array) {
        for(let index in encargados) {
            output.push(<li>{encargados[index][3] + " " + encargados[index][1] + " - Correo: " + encargados[index][2]}</li>);
        }
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