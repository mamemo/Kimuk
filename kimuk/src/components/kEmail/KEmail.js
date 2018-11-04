export{enviar_correo,enviar_correo_voluntariado,enviar_correo_voluntario_confirmacion,enviar_correo_voluntario_aceptado}

async function enviar_correo(correo,asunto,mensaje,html){
    fetch("https://us-central1-kimuk-backend.cloudfunctions.net/app/api/email?correo="+correo+"&asunto="+asunto+"&mensaje="+mensaje+"&html="+html)
}

/**
 * Envia correo -> creación de voluntariado (link admin y registro)
 * @param {correo} correo 
 * @param {campana} nombreDeCampana
 */
function enviar_correo_voluntariado(correo,campana,name,id,admin_pass){
    var asunto="Kimuk - Enlaces de inscripción y administración - " + campana;
    var mensaje="";
    var html="Hola " + name + " acabás de crear el voluntariado "+campana;    
    html=html+"<p>Si querés que las personas se inscriban compartí el siguiente enlace:</p>";
    html=html+"<a href='https://kimuk-backend.firebaseapp.com/voluntario/"+id+"'>https://kimuk-backend.firebaseapp.com/voluntario/"+id+"</a>";
    html=html+"<p>Si querés administrar el voluntariado "+campana+" ingresá en el siguiente enlace:</p>";
    html=html+"<a href='https://kimuk-backend.firebaseapp.com/admin/"+id+"?p="+admin_pass+"'>https://kimuk-backend.firebaseapp.com/admin/"+id+"?p="+admin_pass+"</a>";
    enviar_correo(correo,asunto,mensaje,html);
}

/**
 * Envia correo -> registro de voluntario (confirmacion de voluntario registrado)
 * @param {correo} correo 
 * @param {campana} nombreCampana
 * @param {name} nombreVoluntarioRegistrado
 */
function enviar_correo_voluntario_confirmacion(correo,campana, name){
    var mensaje="";
    var asunto="Kimuk - Confirmación de inscripción - " + campana;
    var html=name+" acabás de ser registrado como voluntario de " + campana + ". Si el administrador te acepta para el voluntariado vas a recibir una notificación por correo electrónico.";
    enviar_correo(correo,asunto,mensaje,html);
}

/**
 * Envia correo -> confirmacion de voluntario en voluntariado
 * @param {correo} correo 
 * @param {informacion:campana} nombreDeCampana
 * @param {informacion:name} nombreVoluntarioRegistrado
 */
function enviar_correo_voluntario_aceptado(correo,informacion){
    var mensaje="";
    var asunto="Kimuk - Aceptación en el voluntariado - " + informacion.campana;
    var html="Hola " + informacion.name + " acabás de ser aceptado como voluntario de " + informacion.campana + ". Estamos muy felices de que participés en esta actividad. Te esperamos";
    enviar_correo(correo,asunto,mensaje,html);
}