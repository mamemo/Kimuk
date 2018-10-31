import firebase from 'firebase'
import * as uid from "uid";

export {leer_campanas, insertar_actualizar_habilidades_campana, insertar_actualizar_encargados_campana, insertar_actualizar_campana,
eliminar_habilidad_campana, eliminar_campana, actualizar_campana, actualizar_encargado_campana, eliminar_encargado_campana,
leer_encargados_camapanas, leer_habilidades_camapana, eliminar_campanas_en_construccion, insertar_actualizar_encargado_general_campana,
insertar_campana_construccion, insertar_actualizar_encargados_lista, insertar_actualizar_habilidades_campana_lista}

function insertar_actualizar_campana(Id, nombre, descripcion, fecha_ejecucion, hora, lugar,
                                     fecha_limite, limite_registro, limite_voluntarios, terminos_condiciones) {

    return new Promise(resolve => {
        firebase.database().ref('Campanas/' + Id).update(
            {
                Nombre: nombre,
                Descripcion: descripcion,
                Fecha_ejecucion: fecha_ejecucion,
                Hora: hora,
                Lugar: lugar,
                Fecha_limite: fecha_limite,
                Limite_registro: limite_registro,
                Limite_voluntarios: limite_voluntarios,
                terminos_condiciones: terminos_condiciones,
                estado: "Activa"
            }).then(function () {
            resolve("Campaña creada exitosamente");
        })
    });
}


function insertar_campana_construccion(Id)
{
    firebase.database().ref('Campanas/' + Id).update(
        {estado: "Construccion"}
    ).then(function () {
        alert("Campaña en construccion");
    }).catch(function (error) {
        alert("Error al inicializar la campaña\n" + error );
    });
}


function actualizar_campana(Id_campana, llave_valor, nuevo_valor) {
    if(llave_valor !== "Key") {
        const db = firebase.database().ref('Campanas/' + Id_campana + "/" + llave_valor);
        db.set(nuevo_valor).then(function () {
            alert("El valor ha sido actualizado")
        }).catch(function (error) {
            alert("Error al actualizar\n" + error)
        })
    } else {  // This code changes the primary key of the campaign
        const ref = firebase.database().ref('Campanas/');
        const child = ref.child(Id_campana);
        child.once('value', function (snapshot) {
            ref.child(nuevo_valor).set(snapshot.val()).then(function () {
                child.remove().then(function () {
                    alert("Key de la campaña actualizado");
                }).catch(function (error) {
                    alert("Error al actualizar el key\n" + error);
                });
            }).catch(function (error) {
                alert("Error al actualizar el key\n" + error);
            });
        }).catch(function (error) {
            alert("Error al actualizar el key\n" + error);
        });
    }
}


function eliminar_campana(Id_campana){
    const ref = firebase.database().ref('Campanas');
    ref.child(Id_campana).remove().then(function () {
        return "Campaña eliminada";
    }).catch(function (error) {
        alert("Error al eliminar la camapaña\n" + error);
    });
}


function leer_campanas(Id_campana)
{
    return new Promise(resolve => {
        const ref = firebase.database().ref("Campanas/" + Id_campana);
        ref.once('value', function(snapshot) {
            resolve(snapshot.val());
        }).catch(function (error) {
            alert("Error al leer las campañas\n" + error);
        });
    });
}


function insertar_actualizar_habilidades_campana(Id_campana, nombre_habilidad){
    return new Promise(resolve => {
        const Id_habilidad = uid();
        const db = firebase.database().ref('Campanas/' + Id_campana + "/Habilidades");
        db.child(Id_habilidad).set(nombre_habilidad).then(function () {
            resolve("La habilidad ha sido insertada");
        })
    });
}

async function insertar_actualizar_habilidades_campana_lista(Id_campana, habilidades)
{
    /*
     let skills = [];
       for(let skill in this.state.skills) {
         insertar_actualizar_habilidades_campana(this.state.id, this.state.skills[skill]);
       }
     */
    for(let skill in habilidades)
        await insertar_actualizar_habilidades_campana(Id_campana, habilidades[skill]);
}




function eliminar_habilidad_campana(Id_campana, Id_habilidad) {
    const ref = firebase.database().ref('Campanas/' + Id_campana + "/Habilidades");
    ref.child(Id_habilidad).remove().then(function () {
        alert("La habilidad ha sido eliminada de la campana");
    }).catch(function (error) {
        alert("Error al eliminar la habilidad de la campana\n" + error);
    });
}


function leer_habilidades_camapana(Id_campana) {
    return new Promise(resolve => {
    const ref = firebase.database().ref("Campanas/" + Id_campana + "/Habilidades");
    ref.once("value", function (snapshot) {
        resolve(snapshot.val());
        }).catch(function (error) {
        alert("Error al leer las habilidades de las campanas\n" + error);
        });
    });
}

// TODO Crear engargado general
// TODO Dejar una sola vara de fecha limite o fecha registro


function insertar_actualizar_encargado_general_campana(Id_campana, Id_encargado ,nombre_encargado, apellidos_encargado,
                                                correo_electronico_encargado, telefono_encargado){

    return new Promise(resolve => {
        firebase.database().ref('Campanas/' + Id_campana + "/EncargadoGeneral/" + Id_encargado).update({
            nombre: nombre_encargado,
            apellidos: apellidos_encargado,
            correo_electronico: correo_electronico_encargado,
            telefono: telefono_encargado
        }).then(function () {
            resolve("Encargado general insertado");
        })
    });

}


function actualizar_encargado_general_campana(Id_campana, Id_encargado, llave_valor, nuevo_valor) {
    if(llave_valor !== "Key") {
        const db = firebase.database().ref('Campanas/' + Id_campana + "/EncarcadoGeneral/" + Id_encargado);
        db.child(llave_valor).set(nuevo_valor).then(function () {
            alert("El encargado general ha sido actualizado");
        }).catch(function (error) {
            alert("Error al actualizar el encargado general\n" + error)
        });
    } else {
        const ref = firebase.database().ref('Campanas/'+ Id_campana + "/EncarcadoGeneral/");
        const child = ref.child(Id_encargado);
        child.once('value', function (snapshot) {
            ref.child(nuevo_valor).set(snapshot.val()).catch(function (error) {
               alert("Error al actualizar el ID del encargado general\n" + error);
               return;
            });
            child.remove().then(function () {
                alert("El ID del engarcado general ha sido actualizado")
            }).catch(function (error) {
                alert("Error al actualizar el ID del encargado general\n" + error);
            });
        }).catch(function (error) {
            alert("Error al actualizar el ID del encargado general\n" + error);
        });
    }
}

function eliminar_encargado_general_campana(Id_campana, Id_encargado) {
    const ref = firebase.database().ref('Campanas/' + Id_campana + "/EncargadoGeneral");
    ref.child(Id_encargado).remove().then(function () {
        alert("El encargado general ha sido eliminado");
    }).catch(function (error) {
        alert("Error al eliminar el encargado general\n" + error);
    });
}


function leer_encargado_general_camapanas(Id_campana) {
    return new Promise(resolve => {
        const ref = firebase.database().ref("Campanas/" + Id_campana + "/EncargadoGeneral");
        ref.once("value", function (snapshot) {
            resolve(snapshot.val());
        }).catch(function (error) {
            alert("Error al leer el encargado general\n" + error);
        });
    });
}


function insertar_actualizar_encargados_campana(Id_campana, nombre_encargado, apellidos_encargado,
    correo_electronico_encargado, telefono_encargado){
    return new Promise(resolve => {
        let Id_encargado = uid();
        firebase.database().ref('Campanas/' + Id_campana + "/Encargados/" + Id_encargado).update({
            nombre: nombre_encargado,
            apellidos: apellidos_encargado,
            correo_electronico: correo_electronico_encargado,
            telefono: telefono_encargado
        }).then(function () {
            resolve("El encargado ha sido insertado");
        })
    });
}


async function insertar_actualizar_encargados_lista(Id_campana, encargados) {
    for(let k in encargados)
        await insertar_actualizar_encargados_campana(Id_campana, encargados[k][0], encargados[k][1],
                                                    encargados[k][2], encargados[k][3]);
}




function actualizar_encargado_campana(Id_campana, Id_encargado, llave_valor, nuevo_valor) {
    if(llave_valor !== "Key") {
        const db = firebase.database().ref('Campanas/' + Id_campana + "/Encarcados/" + Id_encargado);
        db.child(llave_valor).set(nuevo_valor, function (error) {return error;});
    } else {  // This code changes the primary key of the campaign
        const ref = firebase.database().ref('Campanas/'+ Id_campana + "/Encarcados/");
        const child = ref.child(Id_encargado);
        child.once('value', function (snapshot) {
            ref.child(nuevo_valor).set(snapshot.val(), function (error) {return error;});
            child.remove(function (error) {return error;});
        });
    }
}


function eliminar_encargado_campana(Id_campana, Id_encargado) {
    const ref = firebase.database().ref('Campanas/' + Id_campana + "/Encargados");
    ref.child(Id_encargado).remove().then(function () {
        alert("Encargado eliminado");
    }).catch(function (error) {
        alert("Error al eliminar el encargado\n" + error);
    });
}


function leer_encargados_camapanas(Id_campana) {
    return new Promise(resolve => {
    const ref = firebase.database().ref("Campanas/" + Id_campana + "/Encargados");
    ref.once("value", function (snapshot) {
        resolve(snapshot.val());
        }).catch(function (error) {
        alert("Error al leer los encargados\n" + error);
    });
    });
}


function leer_todas_campanas()
{
    return new Promise(resolve => {
        const ref = firebase.database().ref("Campanas/");
        ref.once('value', function(snapshot) {
            resolve(snapshot.val());
        }).catch(function (error) {
            alert("Error al leer las campañas\n" + error);
        });
    });
}


function eliminar_campanas_en_construccion()
{
    leer_todas_campanas().then(result => {
        const campanas = result;
        for(let k in campanas)
        {
            if(campanas[k].estado === "Construccion"){
                eliminar_campana(k);
            }
        }
    });
}