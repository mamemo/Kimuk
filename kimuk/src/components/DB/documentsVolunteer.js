import firebase from "firebase";

export {insertar_documento_storage_voluntario, insertar_url_nombre_documento_voluntario,
leer_documentos_voluntario, insertar_nombre_documento_voluntario, eliminar_url_documento_voluntario,
crear_url_documento_voluntario, eliminar_documento_voluntario, eliminar_nombre_documento_voluntario, leer_url_documento_voluntario}


function insertar_documento_storage_voluntario(id_campana, id_voluntario, tipo_documento, archivo) {
    let storageRef = firebase.storage().ref(id_campana + "/Voluntarios/" + id_voluntario + "/"
                                            + tipo_documento + "/" + archivo.name);
    return storageRef.put(archivo);
}


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

function crear_url_documento_voluntario(id_campana, id_voluntario, tipo_documento, nombre_archivo) {
    return new Promise(resolve => {
        resolve(firebase.storage().ref(id_campana + "/Voluntarios/" + id_voluntario + "/" + tipo_documento + "/" + nombre_archivo).getDownloadURL())
    });
}


function insertar_nombre_documento_voluntario(id_campana, id_voluntario, tipo_documento, nombre_archivo){
    return new Promise(resolve => {
        const db = firebase.database().ref('Campanas/' + id_campana + '/Voluntarios/' + id_voluntario + '/Documentos/');
        db.child(tipo_documento).set(nombre_archivo).then(function () {
            resolve("Nombre del documento insertado exitosamente");
        });
    });
}





function eliminar_documento_voluntario(id_campana, id_voluntario, tipo_documento, nombre) {
    const desertRef = firebase.storage().ref().child(id_campana + "/Voluntarios/" + id_voluntario + "/" + tipo_documento + "/" + nombre);
    desertRef.delete().then(function() {
        eliminar_url_documento_voluntario(id_campana, tipo_documento).then(result => {
            eliminar_nombre_documento_voluntario(id_campana, tipo_documento).then(result => {
                alert("El documento ha sido eliminado");
            }).catch(function(error) {
                alert("Error\n" + error.message);
            });
        }).catch(function(error) {
            alert("Error\n" + error.message);
        });
    }).catch(function(error) {
        alert("Error\n" + error.message);
    });
}


function eliminar_url_documento_voluntario(id_campana, id_voluntario, tipo_documento) {
    return new Promise(resolve => {
        const ref = firebase.database().ref('Campanas/' + id_campana + "/Voluntarios/" + id_voluntario + "/DocumentosURL/");
        ref.child(tipo_documento).remove().then(function () {
            resolve("URL de descarga del documento eliminado");
        });
    });
}


function eliminar_nombre_documento_voluntario(id_campana, id_voluntario, tipo_documento) {
    return new Promise(resolve => {
        const ref = firebase.database().ref('Campanas/' + id_campana + "/Voluntarios/" + id_voluntario + "/Documentos/");
        ref.child(tipo_documento).remove().then(function () {
            resolve("Nombre del documento eliminado");
        });
    });
}


function leer_url_documento_voluntario(id_campana, id_voluntario, tipo_documento){
    return new Promise(resolve => {
        const ref = firebase.database().ref("Campanas/" + id_campana + "/Voluntarios/" + id_voluntario +  "/DocumentosURL/" + tipo_documento);
        ref.once('value', function(snapshot) {
            resolve(snapshot.val());
        },  function (errorObject) {
            alert("Error en la lectura del url del documento" + errorObject.code + "\n" + errorObject.message);
        });
    });
}


function leer_documentos_voluntario(id_campana, id_voluntario) {
    return new Promise(resolve => {
        const ref = firebase.database().ref("Campanas/" + id_campana + "/Voluntarios/" + id_voluntario +  "/DocumentosURL");
        ref.once('value', function(snapshot) {
            resolve(snapshot.val());
        }, function (errorObject) {
            alert("Error en la lectura de los documentos de la campaña"
                + errorObject.code + "\n" + errorObject.message);
        });
    });
}