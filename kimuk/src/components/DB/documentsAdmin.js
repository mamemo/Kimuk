import firebase from 'firebase';
export {insertar_documento_storage_campana, leer_todos_tipos_documentos,
insertar_url_nombre_documento_campana, leer_url_documento_campana, eliminar_documento_campana, leer_documentos_campana};


function leer_todos_tipos_documentos() {
    return new Promise(resolve => {
        const ref = firebase.database().ref("Documentos/");
        ref.once('value', function(snapshot) {
            resolve(snapshot.val());
        }, function (errorObject) {
            alert("Error en la lectura de los tipos de documentos" + errorObject.code + "\n" + errorObject.message);
        });
    });
}


function insertar_documento_storage_campana(id_campana, tipo_documento, archivo) {
    let storageRef = firebase.storage().ref(id_campana + "/" + tipo_documento + "/" + archivo.name);
    return storageRef.put(archivo);
}


function insertar_url_nombre_documento_campana(id_campana, tipo_documento, nombre_archivo) {
        crear_url_documento_campana(id_campana, tipo_documento, nombre_archivo).then(result => {
            const db = firebase.database().ref('Campanas/' + id_campana + "/DocumentosURL/");
            db.child(tipo_documento).set(result).then(function () {
                insertar_nombre_documento_campana(id_campana, tipo_documento, nombre_archivo).then(result => {
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


function insertar_nombre_documento_campana(id_campana, tipo_documento, nombre_archivo){
    return new Promise(resolve => {
        const db = firebase.database().ref('Campanas/' + id_campana + '/Documentos/');
        db.child(tipo_documento).set(nombre_archivo).then(function () {
            resolve("Nombre del documento insertado exitosamente");
        });
    });
}


function crear_url_documento_campana(id_campana, tipo_documento, nombre_archivo) {
    return new Promise(resolve => {
        resolve(firebase.storage().ref(id_campana + "/" + tipo_documento + "/" + nombre_archivo).getDownloadURL())
    });
}


function eliminar_documento_campana(id_campana, tipo_documento, nombre) {
    const desertRef = firebase.storage().ref().child(id_campana + "/" + tipo_documento + "/" + nombre);
    desertRef.delete().then(function() {
        eliminar_url_documento_campana(id_campana, tipo_documento).then(result => {
            eliminar_nombre_documento_campana(id_campana, tipo_documento).then(result => {
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


function eliminar_url_documento_campana(id_campana, tipo_documento) {
    return new Promise(resolve => {
        const ref = firebase.database().ref('Campanas/' + id_campana + "/DocumentosURL/");
        ref.child(tipo_documento).remove().then(function () {
            resolve("URL de descarga del documento eliminado");
        });
    });
}


function eliminar_nombre_documento_campana(id_campana, tipo_documento) {
    return new Promise(resolve => {
        const ref = firebase.database().ref('Campanas/' + id_campana + "/Documentos/");
        ref.child(tipo_documento).remove().then(function () {
            resolve("Nombre del documento eliminado");
        });
    });
}


function leer_url_documento_campana(id_campana, tipo_documento){
    return new Promise(resolve => {
        const ref = firebase.database().ref("Campanas/" + id_campana + "/DocumentosURL/" + tipo_documento);
        ref.once('value', function(snapshot) {
            resolve(snapshot.val());
        },  function (errorObject) {
            alert("Error en la lectura del url del documento" + errorObject.code + "\n" + errorObject.message);
        });
    });
}


function leer_documentos_campana(id_campana) {
    return new Promise(resolve => {
        const ref = firebase.database().ref("Campanas/" + id_campana + "/DocumentosURL");
        ref.once('value', function(snapshot) {
            resolve(snapshot.val());
        }, function (errorObject) {
            alert("Error en la lectura de los documentos de la campaña"
                + errorObject.code + "\n" + errorObject.message);
        });
    });
}