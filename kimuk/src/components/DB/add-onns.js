import createFragment from "react-addons-create-fragment";
import React from "react";

export {InCampanasKFormVoluntario, InHabilidadesGraficasKFormVoluntario, InEcargadosKFormVoluntario,
VisualizacionEncargados, InHabilidadesCodigosKFormVoluntario, InHabilidadesBD, InVoluntariosKFormAdmin,
InDocumentosBD}

function InCampanasKFormVoluntario(result) {
    return createFragment({
        Descripcion: result.Descripcion,
        Fecha_ejecucion: result.Fecha_ejecucion,
        Fecha_limite: result.Fecha_limite,
        Hora: result.Hora,
        Limite_registro: result.Limite_registro,
        Limite_voluntarios: result.Limite_voluntarios,
        Lugar: result.Lugar,
        Nombre: result.Nombre,
        Formacion_academica: result.formacion_academica,
        Terminos_condiciones: result.terminos_condiciones
    });
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

    console.log(content);
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
    let nombresHabilidades = [];
    for(let k in result){
        nombresHabilidades.push(result[k]);
    }
    return nombresHabilidades;
}