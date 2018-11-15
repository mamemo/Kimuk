/**
 * Archivo que contiene las funciones para trabajar 
 * con los archivos a la hora de registrar un voluntario.
 */


import firebase from "firebase";

export {
    insertar_documento_storage_voluntario,
    insertar_url_nombre_documento_voluntario,
    leer_documentos_voluntario,
    insertar_nombre_documento_voluntario,
    eliminar_url_documento_voluntario,
    crear_url_documento_voluntario,
    eliminar_documento_voluntario,
    eliminar_nombre_documento_voluntario,
    leer_url_documento_voluntario
}

/**
 * Inserta un documento en la base de datos en un voluntario.
 * @param id_campana ID de la campaña.
 * @param id_voluntario El ID del voluntario.
 * @param tipo_documento El tipo del documento.
 * @param archivo El archivo a guardar.
 */
function insertar_documento_storage_voluntario(id_campana, id_voluntario, tipo_documento, archivo) {
    let storageRef = firebase.storage().ref(id_campana + "/Voluntarios/" + id_voluntario + "/" +
        tipo_documento + "/" + archivo.name);
    return storageRef.put(archivo);
}

/**
 * Inserta en un voluntario el url de donde se guardará un documento.
 * @param id_campana ID de la campaña.
 * @param id_voluntario El ID del voluntario.
 * @param tipo_documento El tipo del documento.
 * @param nombre_archivo El nombre del archivo.
 */
function insertar_url_nombre_documento_voluntario(id_campana, id_voluntario, tipo_documento, nombre_archivo) {
    crear_url_documento_voluntario(id_campana, id_voluntario, tipo_documento, nombre_archivo).then(result => {
        const db = firebase.database().ref('Campanas/' + id_campana + "/Voluntarios/" + id_voluntario + "/DocumentosURL/");
        db.child(tipo_documento).set(result).then(function () {
            insertar_nombre_documento_voluntario(id_campana, id_voluntario, tipo_documento, nombre_archivo).then(result => {
                alert("El documento se ha subido exitosamente");
            }).catch(function (error) {
                alert("Error\n" + error + "\nPor favor suba el archivo nuevamente.");
            })
        }).catch(function (error) {
            alert("Error\n" + error + "\nPor favor suba el archivo nuevamente.")
        });
    }).catch(function (error) {
        alert("Error\n" + error + "\nPor favor suba el archivo nuevamente.");
    });
}

/**
 * Crea el url de donde se guardará un documento.
 * @param id_campana ID de la campaña.
 * @param id_voluntario El ID del voluntario.
 * @param tipo_documento El tipo del documento.
 * @param nombre_archivo El nombre del archivo.
 */
function crear_url_documento_voluntario(id_campana, id_voluntario, tipo_documento, nombre_archivo) {
    return new Promise(resolve => {
        resolve(firebase.storage().ref(id_campana + "/Voluntarios/" + id_voluntario + "/" + tipo_documento + "/" + nombre_archivo).getDownloadURL())
    });
}

/**
 * Inserta en un voluntario el nombre del documento que se guardará.
 * @param id_campana ID de la campaña.
 * @param id_voluntario El ID del voluntario.
 * @param tipo_documento El tipo del documento.
 * @param nombre_archivo El nombre del archivo.
 */
function insertar_nombre_documento_voluntario(id_campana, id_voluntario, tipo_documento, nombre_archivo) {
    return new Promise(resolve => {
        const db = firebase.database().ref('Campanas/' + id_campana + '/Voluntarios/' + id_voluntario + '/Documentos/');
        db.child(tipo_documento).set(nombre_archivo).then(function () {
            resolve("Nombre del documento insertado exitosamente");
        });
    });
}

/**
 * Elimina un documento de un voluntario.
 * @param id_campana ID de la campaña.
 * @param id_voluntario El ID del voluntario.
 * @param tipo_documento El tipo del documento.
 * @param nombre El nombre del archivo.
 */
function eliminar_documento_voluntario(id_campana, id_voluntario, tipo_documento, nombre) {
    const desertRef = firebase.storage().ref().child(id_campana + "/Voluntarios/" + id_voluntario + "/" + tipo_documento + "/" + nombre);
    desertRef.delete().then(function () {
        eliminar_url_documento_voluntario(id_campana, tipo_documento).then(result => {
            eliminar_nombre_documento_voluntario(id_campana, tipo_documento).then(result => {
                alert("El documento ha sido eliminado");
            }).catch(function (error) {
                alert("Error\n" + error.message);
            });
        }).catch(function (error) {
            alert("Error\n" + error.message);
        });
    }).catch(function (error) {
        alert("Error\n" + error.message);
    });
}

/**
 * Elimina en un voluntario el url de donde se guarda un documento.
 * @param id_campana ID de la campaña.
 * @param id_voluntario El ID del voluntario.
 * @param tipo_documento El tipo del documento.
 */
function eliminar_url_documento_voluntario(id_campana, id_voluntario, tipo_documento) {
    return new Promise(resolve => {
        const ref = firebase.database().ref('Campanas/' + id_campana + "/Voluntarios/" + id_voluntario + "/DocumentosURL/");
        ref.child(tipo_documento).remove().then(function () {
            resolve("URL de descarga del documento eliminado");
        });
    });
}

/**
 * Elimina en un voluntario el nombre del documento que se guarda.
 * @param id_campana ID de la campaña.
 * @param id_voluntario El ID del voluntario.
 * @param tipo_documento El tipo del documento.
 */
function eliminar_nombre_documento_voluntario(id_campana, id_voluntario, tipo_documento) {
    return new Promise(resolve => {
        const ref = firebase.database().ref('Campanas/' + id_campana + "/Voluntarios/" + id_voluntario + "/Documentos/");
        ref.child(tipo_documento).remove().then(function () {
            resolve("Nombre del documento eliminado");
        });
    });
}

/**
 * Obtiene de un voluntario el url de donde se guarda un documento.
 * @param id_campana ID de la campaña.
 * @param id_voluntario El ID del voluntario.
 * @param tipo_documento El tipo del documento.
 */
function leer_url_documento_voluntario(id_campana, id_voluntario, tipo_documento) {
    return new Promise(resolve => {
        const ref = firebase.database().ref("Campanas/" + id_campana + "/Voluntarios/" + id_voluntario + "/DocumentosURL/" + tipo_documento);
        ref.once('value', function (snapshot) {
            resolve(snapshot.val());
        }, function (errorObject) {
            alert("Error en la lectura del url del documento" + errorObject.code + "\n" + errorObject.message);
        });
    });
}

/**
 * Obtiene de un voluntario los nombres de los documentos que se guarda.
 * @param id_campana ID de la campaña.
 * @param id_voluntario El ID del voluntario.
 */
function leer_documentos_voluntario(id_campana, id_voluntario) {
    return new Promise(resolve => {
        const ref = firebase.database().ref("Campanas/" + id_campana + "/Voluntarios/" + id_voluntario + "/DocumentosURL");
        ref.once('value', function (snapshot) {
            resolve(snapshot.val());
        }, function (errorObject) {
            alert("Error en la lectura de los documentos de la campaña" +
                errorObject.code + "\n" + errorObject.message);
        });
    });
}