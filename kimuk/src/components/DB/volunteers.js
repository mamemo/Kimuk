/**
 * Archivo que contiene las funciones para registrar, actualizar, 
 * consultar y eliminar voluntarios dentro de la base de datos.
 */


import firebase from 'firebase'

export {
    insertar_actualizar_voluntarios_camapana,
    insertar_actualizar_habilidades_voluntarios,
    actualizar_voluntarios_campana,
    eliminar_voluntario,
    insertar_actualizar_contacto_emergencia_voluntario,
    insertar_actualizar_beneficiaros,
    leer_voluntarios,
    actualizar_beneficiario_voluntario,
    eliminar_beneficiario_voluntario,
    eliminar_contacto_emergencia_voluntario,
    eliminar_habilidad_voluntario,
    leer_beneficiarios_voluntario,
    leer_contacto_emergencia_voluntario,
    leer_habilidades_voluntario
}

/**
 * Inserta un nuevo voluntario o lo actualiza.
 * @param Id_campana ID de la campaña.
 * @param Id_voluntario La identificación de la persona.
 * @param Tipo_identificacion El tipo de identificación de la persona.
 * @param Nombre El nombre de la persona.
 * @param Primer_apellido El primer apellido de la persona.
 * @param Segundo_apellido El segundo apellido de la persona.
 * @param Fecha_nacimiento La fecha de nacimiento de la persona.
 * @param Genero El género de la persona.
 * @param Estado_civil El estado civil de la persona.
 * @param Ocupacion La ocupación de la persona.
 * @param Provincia La provincia de residencia de la persona.
 * @param Canton El cantón de residencia de la persona.
 * @param Distrito El distrito de residencia de la persona.
 * @param Correo_electronico El correo electrónico de la persona.
 * @param Telefono_uno El teléfono 1 de la persona.
 * @param Telefono_dos El teléfono 2 de la persona.
 * @param Fecha_registro La fecha en que se registró la persona.
 * @param Estado_solicitud El estado de la solicitud.
 */
function insertar_actualizar_voluntarios_camapana(Id_campana, Id_voluntario, Tipo_identificacion, Nombre, Primer_apellido, Segundo_apellido, Fecha_nacimiento,
    Genero, Estado_civil, Ocupacion, Provincia, Canton, Distrito, Direccion, Correo_electronico,
    Telefono_uno, Telefono_dos, Fecha_registro, Estado_solicitud) {
    var resul = true;
    firebase.database().ref('Campanas/' + Id_campana + "/Voluntarios/" + Id_voluntario).update({
        Tipo_identificacion: Tipo_identificacion,
        Nombre: Nombre,
        Primer_apellido: Primer_apellido,
        Segundo_apellido: Segundo_apellido,
        Fecha_nacimiento: Fecha_nacimiento,
        Genero: Genero,
        Estado_civil: Estado_civil,
        Ocupacion: Ocupacion,
        Provincia: Provincia,
        Canton: Canton,
        Distrito: Distrito,
        Direccion: Direccion,
        Correo_electronico: Correo_electronico,
        Telefono_uno: Telefono_uno,
        Telefono_dos: Telefono_dos,
        Fecha_registro: Fecha_registro,
        Estado_solicitud: Estado_solicitud
    }).then(function () {
        resul = true;
        return resul;
    }).catch(function (error) {
        resul = false;
        return resul;
    });
    return resul;
}

/**
 * Actualiza un campo de un voluntario.
 * @param Id_campana ID de la campaña.
 * @param Id_voluntario ID del voluntario.
 * @param llave_valor El nombre del campo a cambiar.
 * @param nuevo_valor El valor que se pondrá en el campo de la campaña.
 */
function actualizar_voluntarios_campana(Id_campana, Id_voluntario, llave_valor, nuevo_valor) {
    if (llave_valor !== "Key") {
        const db = firebase.database().ref('Campanas/' + Id_campana + "/Voluntarios/" + Id_voluntario);
        db.child(llave_valor).set(nuevo_valor).then(function () {
            console.log("El valor ha sido actualizado");
        }).catch(function (error) {
            alert("Error al actualizar\n" + error);
        });
    } else {
        const ref = firebase.database().ref('Campanas/' + Id_campana + "/Voluntarios");
        const child = ref.child(Id_voluntario);
        child.once('value', function (snapshot) {
            ref.child(nuevo_valor).set(snapshot.val()).then(function () {
                child.remove().then(function () {
                    alert("ID del voluntario actualizado");
                }).catch(function (error) {
                    alert("Error al actualizar el ID del voluntarios\n" + error);
                });
            }).catch(function (error) {
                alert("Error al actualizar el ID del voluntarios\n" + error);
            });
        }).catch(function (error) {
            alert("Error al actualizar el ID del voluntarios\n" + error);
        });
    }
}

/**
 * Elimina un voluntario de una campaña.
 * @param Id_campana ID de la campaña.
 * @param Id_voluntario ID del voluntario.
 */
function eliminar_voluntario(Id_campana, Id_voluntario) {
    const ref = firebase.database().ref('Campanas/' + Id_campana + "/Voluntarios");
    ref.child(Id_voluntario).remove().then(function () {
        alert("Voluntario eliminado")
    }).catch(function (error) {
        alert("Error al eliminar el voluntario\n" + error);
    });
}

/**
 * Obtiene un voluntario de una campaña.
 * @param Id_campana ID de la campaña.
 * @param Id_voluntario ID del voluntario.
 */
function leer_voluntarios(Id_campana, Id_voluntario) {
    return new Promise(resolve => {
        const ref = firebase.database().ref("Campanas/" + Id_campana + "/Voluntarios/" + Id_voluntario);
        ref.once("value", function (snapshot) {
            resolve(snapshot.val());
        }).catch(function (error) {
            alert("Error al leer los voluntarios \n" + error);
        });
    });
}

/**
 * Inserta o actualiza las habilidades de un voluntario.
 * @param Id_campana ID de la campaña.
 * @param Id_voluntario ID del voluntario.
 * @param Id_habilidad ID de la habilidad.
 * @param nombre_habilidad El nombre de la habilidad.
 */
function insertar_actualizar_habilidades_voluntarios(Id_campana, Id_voluntario, Id_habilidad, nombre_habilidad) {
    const ref = firebase.database().ref('Campanas/' + Id_campana + "/Voluntarios/" + Id_voluntario + "/Habilidades");
    ref.child(Id_habilidad).set(nombre_habilidad).then(function () {
        console.log("Habilidad actualizada");
        //alert("Habilidad actualizada");
    }).catch(function (error) {
        alert("Error al actualizar la habilidad \n" + error);
    })
}

/**
 * Elimina una habilidad de un voluntario.
 * @param Id_campana ID de la campaña.
 * @param Id_voluntario ID del voluntario.
 * @param Id_habilidad El ID de la habilidad.
 */
function eliminar_habilidad_voluntario(Id_campana, Id_voluntario, Id_habilidad) {
    const ref = firebase.database().ref('Campanas/' + Id_campana + "/Voluntarios/" + Id_voluntario + "/Habilidades");
    ref.child(Id_habilidad).remove().then(function () {
        alert("Habilidad del volutnario eliminada");
    }).catch(function (error) {
        alert("Error al eliminar la habilidad del voluntario \n" + error);
    });
}

/**
 * Obtiene las habilidades de un voluntario.
 * @param Id_campana ID de la campaña.
 * @param Id_voluntario ID del voluntario.
 */
function leer_habilidades_voluntario(Id_campana, Id_voluntario) {
    return new Promise(resolve => {
        const ref = firebase.database().ref('Campanas/' + Id_campana + "/Voluntarios/ " + Id_voluntario + "/Habilidades");
        ref.once("value", function (snapshot) {
            resolve(snapshot.val());
        }).catch(function (error) {
            alert("Error al leer las habilidades del voluntario \n" + error);
        });
    });
}

/**
 * Inserta o actualiza los beneficiarios de un voluntario.
 * @param Id_campana ID de la campaña.
 * @param Id_voluntario La identificación del voluntario.
 * @param cedula La identificación del beneficiario.
 * @param nombre El nombre del beneficiario.
 * @param parentesco El parentesco con el beneficiario.
 * @param porcentaje El porcentaje de beneficio para ese beneficiario.
 */
function insertar_actualizar_beneficiaros(Id_campana, Id_voluntario, cedula, nombre, parentesco, porcentaje) {
    firebase.database().ref('Campanas/' + Id_campana + "/Voluntarios/" + Id_voluntario + "/Beneficiarios/" + cedula).update({
        nombre: nombre,
        parentesco: parentesco,
        porcentaje: porcentaje
    }).then(function () {
        alert("Beneficiario insertado");
    }).catch(function (error) {
        alert("Error al insertar el beneficiario\n" + error);
    })
}

/**
 * Actualiza un beneficiario de un voluntario.
 * @param Id_campana ID de la campaña.
 * @param Id_voluntario La identificación del voluntario.
 * @param cedula La identificación del beneficiario.
 * @param llave_valor El nombre del campo a cambiar.
 * @param nuevo_valor El valor que se pondrá en el campo del encargado.
 */
function actualizar_beneficiario_voluntario(Id_campana, Id_voluntario, cedula, llave_valor, nuevo_valor) {
    if (llave_valor !== "Key") {
        const db = firebase.database().ref('Campanas/' + Id_campana + "/Voluntarios/" + Id_voluntario + "/Beneficiarios/" + cedula);
        db.child(llave_valor).set(nuevo_valor).then(function () {
            alert("Datos del beneficiario actualizados");
        }).catch(function (error) {
            alert("Error al actualizar los datos del beneficiario\n" + error);
        });
    } else {
        const ref = firebase.database().ref('Campanas/' + Id_campana + "/Voluntarios/" + Id_voluntario + "/Beneficiarios");
        const child = ref.child(cedula);
        child.once('value', function (snapshot) {
            ref.child(nuevo_valor).set(snapshot.val()).then(function () {
                child.remove().then(function () {
                    alert("ID del beneficiario actualizado");
                }).catch(function (error) {
                    alert("Error al actualizar los datos del beneficiario \n" + error);
                });
            }).catch(function (error) {
                alert("Error al actualizar los datos del beneficiario \n" + error);
            });
        }).catch(function (error) {
            alert("Error al actualizar los datos del beneficiario \n" + error);
        });
    }
}

/**
 * Elimina un beneficiario de un voluntario.
 * @param Id_campana ID de la campaña.
 * @param Id_voluntario La identificación del voluntario.
 * @param cedula La identificación del beneficiario.
 */
function eliminar_beneficiario_voluntario(Id_campana, Id_voluntario, cedula) {
    const ref = firebase.database().ref('Campanas/' + Id_campana + "/Voluntarios/" + Id_voluntario + "/Beneficiarios");
    ref.child(cedula).remove().then(function () {
        alert("Beneficiario eliminado");
    }).catch(function (error) {
        alert("Error al eliminar el beneficiario\n" + error);
    });
}

/**
 * Obtiene los beneficiarios de un voluntario.
 * @param Id_campana ID de la campaña.
 * @param Id_voluntario La identificación del voluntario.
 */
function leer_beneficiarios_voluntario(Id_campana, Id_voluntario) {
    return new Promise(resolve => {
        const ref = firebase.database().ref('Campanas/' + Id_campana + "/Voluntarios/" + Id_voluntario + "/Beneficiarios");
        ref.once("value", function (snapshot) {
            resolve(snapshot.val());
        }).catch(function (error) {
            alert("Error al leer los beneficiarios\n" + error);
        });
    });
}

/**
 * Inserta o actualiza el contacto de emergencia de un voluntario.
 * @param Id_campana ID de la campaña.
 * @param Id_voluntario La identificación del voluntario.
 * @param nombre El nombre del contacto.
 * @param parentesco El parentesco con el contacto.
 * @param telefono El telefono del contacto.
 */
function insertar_actualizar_contacto_emergencia_voluntario(Id_campana, Id_voluntario, nombre, parentesco, telefono) {
    firebase.database().ref("Campanas/" + Id_campana + "/Voluntarios/" + Id_voluntario + "/Emergencia").update({
        nombre: nombre,
        parentesco: parentesco,
        telefono: telefono
    }).then(function () {
        alert("Contacto de emergencia insertado");
    }).catch(function (error) {
        alert("Error al insertar el contacto de emergencia\n" + error);
    })
}

/**
 * Elimina el contacto de emergencia de un voluntario.
 * @param Id_campana ID de la campaña.
 * @param Id_voluntario La identificación del voluntario.
 */
function eliminar_contacto_emergencia_voluntario(Id_campana, Id_voluntario) {
    const ref = firebase.database().ref("Campanas/" + Id_campana + "/Voluntarios/" + Id_voluntario);
    ref.child("Emergencia").remove().then(function () {
        alert("Contacto de emergencia eliminado");
    }).catch(function (error) {
        alert("Error al eliminar el contacto de emergencia\n" + error);
    });
}

/**
 * Obtiene el contacto de emergencia de un voluntario.
 * @param Id_campana ID de la campaña.
 * @param Id_voluntario La identificación del voluntario.
 */
function leer_contacto_emergencia_voluntario(Id_campana, Id_voluntario) {
    return new Promise(resolve => {
        const ref = firebase.database().ref("Campanas/" + Id_campana + "/Voluntarios/" + Id_voluntario + "/Emergencia");
        ref.once("value", function (snapshot) {
            console.log(snapshot.val());
            resolve(snapshot.val());
        }).catch(function (error) {
            alert("Error al leer el contacto de emergencia\n" + error);
        });
    });
}