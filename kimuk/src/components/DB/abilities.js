import firebase from "firebase";


export {insertar_actualizar_habilidades, actualizar_key_habilidades, eliminar_habilidades, leer_habilidades}

function insertar_actualizar_habilidades(Id, nombre) {
    firebase.database().ref('Habilidades/' + Id).update({
        Nombre: nombre
    }, function (error) {return error;});
}


function actualizar_key_habilidades(Id_habilidad, Id_nuevo) {
    const ref = firebase.database().ref('Habilidades/');
    const child = ref.child(Id_habilidad);
    child.once('value', function (snapshot) {
        ref.child(Id_nuevo).set(snapshot.val(), function (error) {return error;});
        child.remove(function (error) {return error;});
    });
}


function eliminar_habilidades(Id_habilidad) {
    const ref = firebase.database().ref('Habilidades');
    ref.child(Id_habilidad).remove(function (error) {return error;});
}


function leer_habilidades() {
    return new Promise(resolve => {
    const ref = firebase.database().ref("Habilidades");
    ref.on("value", function (snapshot) {
       resolve(snapshot.val());
    });
    });
}
