/**
 * Archivo que obtiene los documentos disponibles que se pueden utilizar.
 */


import firebase from "firebase";

export {
    leer_documentos
}

/**
 * Obtiene los documentos que posteriormente se pueden escoger al crear una campaña.
 */
function leer_documentos() {
    return new Promise(resolve => {
        const ref = firebase.database().ref("Documentos/");
        ref.once('value', function (snapshot) {
            resolve(snapshot.val());
        }, function (errorObject) {
            alert("Error en la lectura de los tipos de documentos" + errorObject.code + "\n" + errorObject.message);
        });
    });
}