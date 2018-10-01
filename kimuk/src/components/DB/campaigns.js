import firebase from 'firebase'

export {leer_campanas, insertar_actualizar_habilidades_campana, insertar_actualizar_encargados_campana, insertar_actualizar_campana,
eliminar_habilidad_campana, eliminar_campana, actualizar_campana, actualizar_encargado_campana, eliminar_encargado_campana,
leer_encargados_camapanas, leer_habilidades_camapana}

function insertar_actualizar_campana(Id, nombre, descripcion, fecha_ejecucion, hora, lugar,
                                     fecha_limite, limite_registro, limite_voluntarios, formacion_academica, terminos_condiciones
) {
    firebase.database().ref('Campanas/' + Id).update(
        {
            Nombre: nombre,
            Descripcion: descripcion,
            Fecha_ejecucion: fecha_ejecucion,
            Hora: hora,
            Lugar: lugar,
            Fecha_limite: fecha_limite,
            Limite_registro: limite_registro,
            Limite_voluntarios: limite_voluntarios,
            formacion_academica: formacion_academica,
            terminos_condiciones: terminos_condiciones
        }, function (error) {
            return error;
        });
}

function actualizar_campana(Id_campana, llave_valor, nuevo_valor) {
    if(llave_valor !== "Key") {
        const db = firebase.database().ref('Campanas/' + Id_campana + "/" + llave_valor);
        db.set(nuevo_valor, function (error) {return error;});
    } else {  // This code changes the primary key of the campaign
        const ref = firebase.database().ref('Campanas/');
        const child = ref.child(Id_campana);
        child.once('value', function (snapshot) {
            ref.child(nuevo_valor).set(snapshot.val());
            child.remove(function (error) {return error;});
        });
    }
}


function eliminar_campana(Id_campana){
    const ref = firebase.database().ref('Campanas');
    ref.child(Id_campana).remove(function (error) {return error;});
}


function leer_campanas(Id_campana)
{
    return new Promise(resolve => {
        const ref = firebase.database().ref("Campanas/" + Id_campana);
        ref.once('value', function(snapshot) {
            resolve(snapshot.val());
        } );
    });
}


function insertar_actualizar_habilidades_campana(Id_campana, Id_habilidad, nombre_habilidad){
    const db = firebase.database().ref('Campanas/' + Id_campana + "/Habilidades");
    db.child(Id_habilidad).set(nombre_habilidad, function (error) {
        return error;
    });
}


function eliminar_habilidad_campana(Id_campana, Id_habilidad) {
    const ref = firebase.database().ref('Campanas/' + Id_campana + "/Habilidades");
    ref.child(Id_habilidad).remove(function (error) {return error;});
}


function leer_habilidades_camapana(Id_campana) {
    return new Promise(resolve => {
    const ref = firebase.database().ref("Campanas/" + Id_campana + "/Habilidades");
    ref.on("value", function (snapshot) {
        resolve(snapshot.val());
    });
    });
}


function insertar_actualizar_encargados_campana(Id_campana, Id_encargado, nombre_encargado, apellidos_encargado,
                                                correo_electronico_encargado, telefono_encargado){
    firebase.database().ref('Campanas/' + Id_campana + "/Encargados/" + Id_encargado).update({
        nombre: nombre_encargado,
        apellidos: apellidos_encargado,
        correo_electronico: correo_electronico_encargado,
        telefono: telefono_encargado
    }, function (error) {
        return error;
    });
}

function actualizar_encargado_campana(Id_campana, Id_encargado, llave_valor, nuevo_valor) {
    if(llave_valor !== "Key") {
        const db = firebase.database().ref('Campanas/' + Id_campana + "/Encarcados/" + Id_encargado);
        db.child(llave_valor).set(nuevo_valor, function (error) {return error;});
    } else {  // This code changes the primary key of the campaign
        const ref = firebase.database().ref('Campanas/'+ Id_campana + "/Encarcados/");
        const child = ref.child(Id_encargado);
        child.once('value', function (snapshot) {
            ref.child(nuevo_valor).set(snapshot.val(), function (error) {return error;});
            child.remove(function (error) {return error;});
        });
    }
}


function eliminar_encargado_campana(Id_campana, Id_encargado) {
    const ref = firebase.database().ref('Campanas/' + Id_campana + "/Encargados");
    ref.child(Id_encargado).remove(function (error) {return error;});
}


function leer_encargados_camapanas(Id_campana) {
    return new Promise(resolve => {
    const ref = firebase.database().ref("Campanas/" + Id_campana + "/Encargados");
    ref.on("value", function (snapshot) {
        resolve(snapshot.val());
    });
    });
}