import firebase from 'firebase'

function insertar_actualizar_voluntarios_camapana(Id_campana, Id_voluntario, Tipo_identificacion, Nombre, Primer_apellido, Segundo_apellido, Fecha_nacimiento,
                                                  Genero, Estado_civil, Ocupacion, Provincia, Canton, Distrito, Direccion, Correo_electronico,
                                                  Telefono_uno, Telefono_dos, Fecha_registro, Estado_solicitud) {
    firebase.database().ref('Campanas/' + Id_campana + "/Voluntarios/" + Id_voluntario).update({
        Tipo_identificacion:  Tipo_identificacion,
        Nombre:  Nombre,
        Primer_apellido:  Primer_apellido,
        Segundo_apellido:  Segundo_apellido,
        Fecha_nacimiento:  Fecha_nacimiento,
        Genero:  Genero,
        Estado_civil:  Estado_civil,
        Ocupacion:  Ocupacion,
        Provincia:  Provincia,
        Canton:  Canton,
        Distrito:  Distrito,
        Direccion:  Direccion,
        Correo_electronico:  Correo_electronico,
        Telefono_uno:  Telefono_uno,
        Telefono_dos:  Telefono_dos,
        Fecha_registro: Fecha_registro,
        Estado_solicitud: Estado_solicitud
    });
}


function actualizar_voluntarios_campana(Id_campana, Id_voluntario, llave_valor, nuevo_valor) {
    if(llave_valor !== "Key") {
        const db = firebase.database().ref('Campanas/' + Id_campana + "/Voluntarios/" + Id_voluntario);
        db.child(llave_valor).set(nuevo_valor);
    } else {
        const ref = firebase.database().ref('Campanas/' + Id_campana + "/Voluntarios");
        const child = ref.child(Id_voluntario);
        child.once('value', function (snapshot) {
            ref.child(nuevo_valor).set(snapshot.val());
            child.remove();
        });
    }
}


function eliminar_voluntario(Id_campana, Id_voluntario) {
    const ref = firebase.database().ref('Campanas/' + Id_campana + "/Voluntarios");
    ref.child(Id_voluntario).remove();
}


function leer_voluntarios(Id_campana, Id_voluntario) {
    const ref = firebase.database().ref("Campanas/" + Id_campana + "/Voluntarios/" + Id_voluntario);
    ref.on("value", function (snapshot) {
        console.log(snapshot.val());
        return snapshot.val();
    });
}


function insertar_actualizar_habilidades_voluntarios(Id_campana, Id_voluntario, Id_habilidad, nombre_habilidad) {
    const ref = firebase.database().ref('Campanas/' + Id_campana + "/Voluntarios/" + Id_voluntario + "/Habilidades");
    ref.child(Id_habilidad).set(nombre_habilidad);

}


function eliminar_habilidad_voluntario(Id_campana, Id_voluntario, Id_habilidad) {
    const ref = firebase.database().ref('Campanas/' + Id_campana + "/Voluntarios/" + Id_voluntario + "/Habilidades");
    ref.child(Id_habilidad).remove();
}


function leer_habilidades_voluntario(Id_campana, Id_voluntario) {
    const ref = firebase.database().ref('Campanas/' + Id_campana + "/Voluntarios/ " + Id_voluntario + "/Habilidades");
    ref.on("value", function (snapshot) {
        console.log(snapshot.val());
        return snapshot.val();
    });
}


function insertar_actualizar_informacion_academica(Id_campana, Id_voluntario, grado_academico, centro, titulo, especialidad, Id_titulo) {
    firebase.database().ref('Campanas/' + Id_campana + "/Voluntarios/" + Id_voluntario + "/Info_academica/" + Id_titulo).update({
        grado_academico: grado_academico,
        centro: centro,
        titulo: titulo,
        especialidad: especialidad
    });
}


function leer_informacion_academica(Id_campana, Id_voluntario) {
    const ref = firebase.database().ref('Campanas/' + Id_campana + "/Voluntarios/" + Id_voluntario + "/Info_academica");
    ref.on("value", function (snapshot) {
        console.log(snapshot.val());
        return snapshot.val();
    });
}


function eliminar_informacion_academica(Id_campana, Id_voluntario, Id_titulo) {
    const ref = firebase.database().ref('Campanas/' + Id_campana + "/Voluntarios/" + Id_voluntario + "/Info_academica");
    ref.child(Id_titulo).remove();
}


function insertar_actualizar_beneficiaros(Id_campana, Id_voluntario, cedula, nombre, parentesco, porcentaje) {
    firebase.database().ref('Campanas/' + Id_campana + "/Voluntarios/" + Id_voluntario + "/Beneficiarios/" + cedula).update({
        nombre: nombre,
        parentesco: parentesco,
        porcentaje: porcentaje
    }) ;
}


function actualizar_beneficiario_voluntario(Id_campana, Id_voluntario, cedula, llave_valor, nuevo_valor) {
    if(llave_valor !== "Key") {
        const db = firebase.database().ref('Campanas/' + Id_campana + "/Voluntarios/" + Id_voluntario + "/Beneficiarios/" + cedula);
        db.child(llave_valor).set(nuevo_valor);
    } else {  // This code changes the primary key of the campaign
        const ref = firebase.database().ref('Campanas/'+ Id_campana + "/Voluntarios/" + Id_voluntario + "/Beneficiarios");
        const child = ref.child(cedula);
        child.once('value', function (snapshot) {
            ref.child(nuevo_valor).set(snapshot.val());
            child.remove();
        });
    }
}


function eliminar_beneficiario_voluntario(Id_campana, Id_voluntario, cedula) {
    const ref = firebase.database().ref('Campanas/' + Id_campana + "/Voluntarios/" + Id_voluntario + "/Beneficiarios");
    ref.child(cedula).remove();
}


function leer_beneficiarios_voluntario(Id_campana, Id_voluntario) {
    const ref = firebase.database().ref('Campanas/' + Id_campana + "/Voluntarios/" + Id_voluntario + "/Beneficiarios");
    ref.on("value", function (snapshot) {
        console.log(snapshot.val());
        return snapshot.val();
    });
}


function insertar_actualizar_contacto_emergencia_voluntario(Id_campana, Id_voluntario, nombre, parentesco, telefono) {
    firebase.database().ref("Campanas/" + Id_campana + "/Voluntarios/" + Id_voluntario + "/Emergencia").update({
        nombre: nombre,
        parentesco: parentesco,
        telefono: telefono
    });
}


function eliminar_contacto_emergencia_voluntario(Id_campana, Id_voluntario) {
    const ref = firebase.database().ref("Campanas/" + Id_campana + "/Voluntarios/" + Id_voluntario);
    ref.child("Emergencia").remove();
}


function leer_contacto_emergencia_voluntario(Id_campana, Id_voluntario) {
    const ref = firebase.database().ref("Campanas/" + Id_campana + "/Voluntarios/" + Id_voluntario + "/Emergencia");
    ref.on("value", function (snapshot) {
        console.log(snapshot.val());
        return snapshot.val();
    });
}

