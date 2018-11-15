/**
 * Archivo que contiene las funciones para trabajar 
 * con los archivos desde el modo Administrador y a la hora de registrar una campaña.
 */


import firebase from 'firebase';


/**
 * Obtiene todos los tipos de documentos que se pueden utilizar.
 */
export function leer_todos_tipos_documentos() {
    return new Promise(resolve => {
        const ref = firebase.database().ref("Documentos/");
        ref.once('value', function (snapshot) {
            resolve(snapshot.val());
        }).catch(function (errorObject) {
            alert("Error en la lectura de los tipos de documentos" + errorObject.code + "\n" + errorObject.message);
        });
    });
}

/**
 * Inserta un documento en la base de datos en una campaña.
 * @param id_campana ID de la campaña.
 * @param tipo_documento El tipo del documento.
 * @param archivo El archivo a guardar.
 */
export function insertar_documento_storage_campana(id_campana, tipo_documento, archivo) {
    let storageRef = firebase.storage().ref(id_campana + "/" + tipo_documento + "/" + archivo.name);
    return storageRef.put(archivo);
}

/**
 * Inserta en la campaña el url de donde se guardará un documento.
 * @param id_campana ID de la campaña.
 * @param tipo_documento El tipo del documento.
 * @param nombre_archivo El nombre del archivo.
 */
export function insertar_url_nombre_documento_campana(id_campana, tipo_documento, nombre_archivo) {

    return new Promise(resolve => {
        crear_url_documento_campana(id_campana, tipo_documento, nombre_archivo).then(result => {
            const db = firebase.database().ref('Campanas/' + id_campana + "/DocumentosURL/");
            db.child(tipo_documento).set(result).then(function () {
                insertar_nombre_documento_campana(id_campana, tipo_documento, nombre_archivo).then(result => {
                    alert("El documento se ha subido exitosamente");
                    resolve("El documento se ha subido exitosamente");
                    const progressBar = document.getElementById("barimg");
                    progressBar.style.display = "none";

                }).catch(function (error) {
                    alert("Error\n" + error + "\nPor favor suba el archivo nuevamente.");
                })
            }).catch(function (error) {
                alert("Error\n" + error + "\nPor favor suba el archivo nuevamente.")
            });
        }).catch(function (error) {
            alert("Error\n" + error + "\nPor favor suba el archivo nuevamente.");
        });
    });
}

/**
 * Inserta en la campaña el nombre del documento que se guardará.
 * @param id_campana ID de la campaña.
 * @param tipo_documento El tipo del documento.
 * @param nombre_archivo El nombre del archivo.
 */
export function insertar_nombre_documento_campana(id_campana, tipo_documento, nombre_archivo) {
    return new Promise(resolve => {
        const db = firebase.database().ref('Campanas/' + id_campana + '/Documentos/');
        db.child(tipo_documento).set(tipo_documento).then(function () {
            resolve("Nombre del documento insertado exitosamente");
        });
    });
}

/**
 * Crea el url de donde se guardará un documento.
 * @param id_campana ID de la campaña.
 * @param tipo_documento El tipo del documento.
 * @param nombre_archivo El nombre del archivo.
 */
export function crear_url_documento_campana(id_campana, tipo_documento, nombre_archivo) {
    return new Promise(resolve => {
        resolve(firebase.storage().ref(id_campana + "/" + tipo_documento + "/" + nombre_archivo).getDownloadURL())
    });
}

/**
 * Elimina en la campaña el url de donde se guarda un documento.
 * @param id_campana ID de la campaña.
 * @param tipo_documento El tipo del documento.
 */
export function eliminar_url_documento_campana(id_campana, tipo_documento) {
    return new Promise(resolve => {
        const ref = firebase.database().ref('Campanas/' + id_campana + "/DocumentosURL/");
        ref.child(tipo_documento).remove().then(function () {
            resolve("URL de descarga del documento eliminado");
        });
    });
}

/**
 * Elimina en la campaña el nombre del documento que se guarda.
 * @param id_campana ID de la campaña.
 * @param tipo_documento El tipo del documento.
 */
export function eliminar_nombre_documento_campana(id_campana, tipo_documento) {
    return new Promise(resolve => {
        const ref = firebase.database().ref('Campanas/' + id_campana + "/Documentos/");
        ref.child(tipo_documento).remove().then(function () {
            resolve("Nombre del documento eliminado");
        });
    });
}

/**
 * Obtiene de la campaña el url de donde se guarda un documento.
 * @param id_campana ID de la campaña.
 * @param tipo_documento El tipo del documento.
 */
export function leer_url_documento_campana(id_campana, tipo_documento) {
    return new Promise(resolve => {
        const ref = firebase.database().ref("Campanas/" + id_campana + "/DocumentosURL/" + tipo_documento);
        ref.on('value', function (snapshot) {
            resolve(snapshot.val());
        }, function (errorObject) {
            alert("Error en la lectura del url del documento" + errorObject.code + "\n" + errorObject.message);
        });
    });
}

/**
 * Obtiene de la campaña los nombres de los documentos que se guarda.
 * @param id_campana ID de la campaña.
 */
export function leer_documentos_campana(id_campana) {
    return new Promise(resolve => {
        const ref = firebase.database().ref("Campanas/" + id_campana + "/Documentos/");
        ref.once('value', function (snapshot) {
            resolve(snapshot.val());
        }).catch(function (errorObject) {
            alert("Error en la lectura de los documentos de la campaña" +
                errorObject.code + "\n" + errorObject.message);
        });
    });
}