import firebase from 'firebase';

export function leer_todos_tipos_documentos() {
    return new Promise(resolve => {
        const ref = firebase.database().ref("Documentos/");
        ref.once('value', function(snapshot) {
            resolve(snapshot.val());
        }).catch(function (errorObject) {
            alert("Error en la lectura de los tipos de documentos" + errorObject.code + "\n" + errorObject.message);
        });
    });
}


export function insertar_documento_storage_campana(id_campana, tipo_documento, archivo) {
    let storageRef = firebase.storage().ref(id_campana + "/" + tipo_documento + "/" + archivo.name);
    return storageRef.put(archivo);
}


export function insertar_url_nombre_documento_campana(id_campana, tipo_documento, nombre_archivo) {

    return new Promise(resolve => {
        crear_url_documento_campana(id_campana, tipo_documento, nombre_archivo).then(result => {
            const db = firebase.database().ref('Campanas/' + id_campana + "/DocumentosURL/");
            db.child(tipo_documento).set(result).then( function () {
                insertar_nombre_documento_campana(id_campana, tipo_documento, nombre_archivo).then(result => {
                    alert("El documento se ha subido exitosamente");
                    resolve("El documento se ha subido exitosamente");
                }).catch( function (error) {
                    alert("Error\n" + error + "\nPor favor suba el archivo nuevamente.");
                })
            }).catch( function (error) {
                alert("Error\n" + error + "\nPor favor suba el archivo nuevamente.")
            });
        }).catch( function (error) {
            alert("Error\n" + error + "\nPor favor suba el archivo nuevamente.");
        });
    });
}


export function insertar_nombre_documento_campana(id_campana, tipo_documento, nombre_archivo){
    return new Promise(resolve => {
        const db = firebase.database().ref('Campanas/' + id_campana + '/Documentos/');
        db.child(tipo_documento).set(tipo_documento).then( function () {
            resolve("Nombre del documento insertado exitosamente");
        });
    });
}


export function crear_url_documento_campana(id_campana, tipo_documento, nombre_archivo) {
    return new Promise(resolve => {
        resolve(firebase.storage().ref(id_campana + "/" + tipo_documento + "/" + nombre_archivo).getDownloadURL())
    });
}



export function eliminar_url_documento_campana(id_campana, tipo_documento) {
    return new Promise(resolve => {
        const ref = firebase.database().ref('Campanas/' + id_campana + "/DocumentosURL/");
        ref.child(tipo_documento).remove().then( function () {
            resolve("URL de descarga del documento eliminado");
        });
    });
}


export function eliminar_nombre_documento_campana(id_campana, tipo_documento) {
    return new Promise(resolve => {
        const ref = firebase.database().ref('Campanas/' + id_campana + "/Documentos/");
        ref.child(tipo_documento).remove().then( function () {
            resolve("Nombre del documento eliminado");
        });
    });
}


export function leer_url_documento_campana(id_campana, tipo_documento){
    return new Promise(resolve => {
        const ref = firebase.database().ref("Campanas/" + id_campana + "/DocumentosURL/" + tipo_documento);
        ref.on('value', function(snapshot) {
            resolve(snapshot.val());
        },  function (errorObject) {
            alert("Error en la lectura del url del documento" + errorObject.code + "\n" + errorObject.message);
        });
    });
}


export function leer_documentos_campana(id_campana) {
    return new Promise(resolve => {
        const ref = firebase.database().ref("Campanas/" + id_campana + "/Documentos/");
        ref.once('value', function (snapshot) {
            resolve(snapshot.val());
        }).catch(function (errorObject) {
            alert("Error en la lectura de los documentos de la campaña"
                + errorObject.code + "\n" + errorObject.message);
        });
    });
}