import firebase from "firebase";
import * as uid from "uid";

export {insertar_actualizar_habilidades, actualizar_key_habilidades, eliminar_habilidades, leer_habilidades}

function insertar_actualizar_habilidades(nombre) {
    let Id = uid();
    firebase.database().ref('Habilidades/' + Id).update({
        Nombre: nombre
    }).then(function () {
        alert("Habilidad insertada con exito");
    }).catch(function (error) {
        alert("Error al insertar la habilidad\n" + error);
    })
}


function actualizar_key_habilidades(Id_habilidad, Id_nuevo) {
    const ref = firebase.database().ref('Habilidades/');
    const child = ref.child(Id_habilidad);
    child.once('value', function (snapshot) {
        ref.child(Id_nuevo).set(snapshot.val()).then(
            function () {
                child.remove().then(function () {
                    alert("Key de la habilidad actualizado")
                }).catch(function (error) {
                    alert("Error al actualizar la key de la habilidad\n" + error);
                });
            }
        ).catch(function (error) {
            alert("Error al actualizar la key de la habilidad\n" + error);
        });
    }).catch(function (error) {
        alert("Error al actualizar la key de la habilidad\n" + error);
    });
}


function eliminar_habilidades(Id_habilidad) {
    const ref = firebase.database().ref('Habilidades');
    ref.child(Id_habilidad).remove(function () {
        alert("Habilidad eliminada con éxito");
    }).catch(function (error) {
        alert("Error al eliminar la habilidad\n" + error);
    });
}


function leer_habilidades() {
    return new Promise(resolve => {
        const ref = firebase.database().ref("Habilidades");
                ref.once("value", function (snapshot) {
                resolve(snapshot.val());
            }).catch(function (error) {
            alert("Error a leer las habilidades\n" + error);
            });
        });
}