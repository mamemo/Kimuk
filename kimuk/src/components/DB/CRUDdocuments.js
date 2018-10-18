import firebase from "firebase";


export {leer_documentos}

function leer_documentos(){
 return new Promise(resolve => {
       const ref = firebase.database().ref("Documentos/");
       ref.once('value', function(snapshot) {
           resolve(snapshot.val());
       }, function (errorObject) {
           alert("Error en la lectura de los tipos de documentos" + errorObject.code + "\n" + errorObject.message);
       });
   });
}