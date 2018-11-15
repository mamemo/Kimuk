/**
 * Archivo que contiene las funciones para registrar, actualizar, 
 * consultar y eliminar campañas de voluntariado dentro de la base de datos.
 */


import firebase from 'firebase'
import * as uid from "uid";

export {
    leer_campanas,
    insertar_actualizar_habilidades_campana,
    insertar_actualizar_encargados_campana,
    insertar_actualizar_campana,
    eliminar_habilidad_campana,
    eliminar_campana,
    actualizar_campana,
    actualizar_encargado_campana,
    eliminar_encargado_campana,
    leer_encargados_camapanas,
    leer_habilidades_camapana,
    eliminar_campanas_en_construccion,
    insertar_actualizar_encargado_general_campana,
    insertar_campana_construccion,
    insertar_actualizar_encargados_lista,
    insertar_actualizar_habilidades_campana_lista
}

/**
 * Inserta una nueva campaña o la actualiza.
 * @param Id ID de la campaña.
 * @param nombre El nombre de la campaña.
 * @param descripcion La descripción de la campaña.
 * @param fecha_ejecucion La fecha a realizar la campaña.
 * @param hora La hora a realizar la campaña.
 * @param lugar El lugar a realizar la campaña.
 * @param fecha_limite La fecha límite en que se podrán registrar voluntarios.
 * @param limite_registro La cantidad de voluntarios máxima que pueden registrarse.
 * @param terminos_condiciones Los términos y condiciones de la campaña.
 * @param admin_pass La clave para pasar al modo administrador.
 */
function insertar_actualizar_campana(Id, nombre, descripcion, fecha_ejecucion, hora, lugar,
    fecha_limite, limite_registro, limite_voluntarios, terminos_condiciones,
    admin_pass) {
    return new Promise(resolve => {
        firebase.database().ref('Campanas/' + Id).update({
            Nombre: nombre,
            Descripcion: descripcion,
            Fecha_ejecucion: fecha_ejecucion,
            Hora: hora,
            Lugar: lugar,
            Fecha_limite: fecha_limite,
            Limite_registro: limite_registro,
            Limite_voluntarios: limite_voluntarios,
            terminos_condiciones: terminos_condiciones,
            estado: "Activa",
            Admin_pass: admin_pass
        }).then(function () {
            resolve("Campaña creada exitosamente");
        })
    });
}

/**
 * Inserta la campaña en la base de datos para poder cargar documentos
 * mientras se está configurando.
 * @param Id ID de la campaña.
 */
function insertar_campana_construccion(Id) {
    firebase.database().ref('Campanas/' + Id).update({
        estado: "Construccion"
    }).then(function () {
        alert("Campaña en construccion");
    }).catch(function (error) {
        alert("Error al inicializar la campaña\n" + error);
    });
}

/**
 * Actualiza un campo de la campaña.
 * @param Id_campana ID de la campaña.
 * @param llave_valor El nombre del campo a cambiar.
 * @param nuevo_valor El valor que se pondrá en el campo de la campaña.
 */
function actualizar_campana(Id_campana, llave_valor, nuevo_valor) {
    if (llave_valor !== "Key") {
        const db = firebase.database().ref('Campanas/' + Id_campana + "/" + llave_valor);
        db.set(nuevo_valor).then(function () {
            alert("El valor ha sido actualizado")
        }).catch(function (error) {
            alert("Error al actualizar\n" + error)
        })
    } else { // This code changes the primary key of the campaign
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

/**
 * Elimina una campaña de la base de datos.
 * @param Id_campana ID de la campaña.
 */
function eliminar_campana(Id_campana) {
    const ref = firebase.database().ref('Campanas');
    ref.child(Id_campana).remove().then(function () {
        return "Campaña eliminada";
    }).catch(function (error) {
        alert("Error al eliminar la camapaña\n" + error);
    });
}

/**
 * Obtiene una campaña de la base de datos.
 * @param Id_campana ID de la campaña.
 */
function leer_campanas(Id_campana) {
    return new Promise(resolve => {
        const ref = firebase.database().ref("Campanas/" + Id_campana);
        ref.once('value', function (snapshot) {
            resolve(snapshot.val());
        }).catch(function (error) {
            alert("Error al leer las campañas\n" + error);
        });
    });
}

/**
 * Inserta o actualiza las habilidades de una campaña.
 * @param Id_campana ID de la campaña.
 * @param nombre_habilidad El nombre de la habilidad.
 */
function insertar_actualizar_habilidades_campana(Id_campana, nombre_habilidad) {
    return new Promise(resolve => {
        const Id_habilidad = uid();
        const db = firebase.database().ref('Campanas/' + Id_campana + "/Habilidades");
        db.child(Id_habilidad).set(nombre_habilidad).then(function () {
            resolve("La habilidad ha sido insertada");
        })
    });
}

/**
 * Función asíncrona para insertar o actualizar habilidades de una campaña.
 * @param Id_campana ID de la campaña.
 * @param habilidades Las habilidades a utilizar.
 */
async function insertar_actualizar_habilidades_campana_lista(Id_campana, habilidades) {
    for (let skill in habilidades)
        await insertar_actualizar_habilidades_campana(Id_campana, habilidades[skill]);
}

/**
 * Elimina una habilidad de la campaña.
 * @param Id_campana ID de la campaña.
 * @param Id_habilidad El ID de la habilidad.
 */
function eliminar_habilidad_campana(Id_campana, Id_habilidad) {
    const ref = firebase.database().ref('Campanas/' + Id_campana + "/Habilidades");
    ref.child(Id_habilidad).remove().then(function () {
        alert("La habilidad ha sido eliminada de la campana");
    }).catch(function (error) {
        alert("Error al eliminar la habilidad de la campana\n" + error);
    });
}

/**
 * Obtiene las habilidades de una campaña.
 * @param Id_campana ID de la campaña.
 */
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

/**
 * Inserta o actualiza el encargado general de una campaña.
 * @param Id_campana ID de la campaña.
 * @param Id_encargado La identificación del encargado.
 * @param nombre_encargado El nombre de la persona.
 * @param apellidos_encargado Los apellidos de la persona.
 * @param correo_electronico_encargado El correo de la persona.
 * @param telefono_encargado El teléfono de la persona.
 */
function insertar_actualizar_encargado_general_campana(Id_campana, Id_encargado, nombre_encargado, apellidos_encargado,
    correo_electronico_encargado, telefono_encargado) {

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

/**
 * Inserta o actualiza los encargados, que no sean el general, de una campaña.
 * @param Id_campana ID de la campaña.
 * @param nombre_encargado El nombre de la persona.
 * @param apellidos_encargado Los apellidos de la persona.
 * @param correo_electronico_encargado El correo de la persona.
 * @param telefono_encargado El teléfono de la persona.
 */
function insertar_actualizar_encargados_campana(Id_campana, nombre_encargado, apellidos_encargado,
    correo_electronico_encargado, telefono_encargado) {
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

/**
 * Función asíncrona para insertar o actualizar encargados de una campaña.
 * @param Id_campana ID de la campaña.
 * @param encargados Los encargados a utilizar.
 */
async function insertar_actualizar_encargados_lista(Id_campana, encargados) {
    for (let k in encargados)
        await insertar_actualizar_encargados_campana(Id_campana, encargados[k][0], encargados[k][1],
            encargados[k][2], encargados[k][3]);
}

/**
 * Actualiza un campo de un encargado.
 * @param Id_campana ID de la campaña.
 * @param Id_encargado La identificación de la persona.
 * @param llave_valor El nombre del campo a cambiar.
 * @param nuevo_valor El valor que se pondrá en el campo del encargado.
 */
function actualizar_encargado_campana(Id_campana, Id_encargado, llave_valor, nuevo_valor) {
    if (llave_valor !== "Key") {
        const db = firebase.database().ref('Campanas/' + Id_campana + "/Encarcados/" + Id_encargado);
        db.child(llave_valor).set(nuevo_valor, function (error) {
            return error;
        });
    } else { // This code changes the primary key of the campaign
        const ref = firebase.database().ref('Campanas/' + Id_campana + "/Encarcados/");
        const child = ref.child(Id_encargado);
        child.once('value', function (snapshot) {
            ref.child(nuevo_valor).set(snapshot.val(), function (error) {
                return error;
            });
            child.remove(function (error) {
                return error;
            });
        });
    }
}

/**
 * Elimina un encargado de la campaña.
 * @param Id_campana ID de la campaña.
 * @param Id_encargado El ID del encargado.
 */
function eliminar_encargado_campana(Id_campana, Id_encargado) {
    const ref = firebase.database().ref('Campanas/' + Id_campana + "/Encargados");
    ref.child(Id_encargado).remove().then(function () {
        alert("Encargado eliminado");
    }).catch(function (error) {
        alert("Error al eliminar el encargado\n" + error);
    });
}

/**
 * Obtiene los encargados de una campaña.
 * @param Id_campana ID de la campaña.
 */
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

/**
 * Obtiene todas las campañas de la base de datos.
 */
function leer_todas_campanas() {
    return new Promise(resolve => {
        const ref = firebase.database().ref("Campanas/");
        ref.once('value', function (snapshot) {
            resolve(snapshot.val());
        }).catch(function (error) {
            alert("Error al leer las campañas\n" + error);
        });
    });
}

/**
 * Elimina las campañas que están en construcción.
 * Para limpiar la base de datos.
 */
function eliminar_campanas_en_construccion() {
    leer_todas_campanas().then(result => {
        const campanas = result;
        for (let k in campanas) {
            if (campanas[k].estado === "Construccion") {
                eliminar_campana(k);
            }
        }
    });
}