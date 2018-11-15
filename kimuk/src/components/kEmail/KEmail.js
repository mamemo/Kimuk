/**
 * Archivo que contiene las funciones para conectar la 
 * aplicación Kimuk con la aplicación que envía correos.
 */

export{enviar_correo,enviar_correo_voluntariado,enviar_correo_voluntario_confirmacion,enviar_correo_voluntario_aceptado}

/**
 * Llama a la aplicación que envía correos.
 * @param correo El correo a donde enviarlo.
 * @param asunto El asunto del correo.
 * @param mensaje El mensaje del correo.
 * @param html Los links a las páginas
 */
async function enviar_correo(correo,asunto,mensaje,html) {
    fetch("https://us-central1-kimuk-backend.cloudfunctions.net/app/api/email?correo="+correo+"&asunto="+asunto+"&mensaje="+mensaje+"&html="+html)
}

/**
 * Envia correo de la creación de voluntariado con el 
 * url de admin y para registrar voluntarios.
 * @param correo El correo a donde enviar información.
 * @param campana El nombre de la campaña
 * @param name El nombre del encargado
 * @param id El ID de la camapaña
 * @param admin_pass La contraseña para ingresar al administrador.
 */
function enviar_correo_voluntariado(correo,campana,name,id,admin_pass) {
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
function enviar_correo_voluntario_confirmacion(correo,campana, name) {
    var mensaje="";
    var asunto="Kimuk - Solicitud de ingreso al voluntariado - " + campana;
    var html=name+" acabás de hacer una solicitud de ingreso al voluntario " + campana + ". Si el administrador te acepta para el voluntariado vas a recibir una notificación por correo electrónico.";
    enviar_correo(correo,asunto,mensaje,html);
}

/**
 * Envia correo de la confirmación al voluntario para una campaña
 * @param correo El correo a donde enviar información.
 * @param informacion La información de la campaña
 */
function enviar_correo_voluntario_aceptado(correo,informacion) {
    var mensaje="";
    var asunto="Kimuk - Aceptación en el voluntariado - " + informacion.campana;
    var html="Hola " + informacion.name + " acabás de ser aceptado como voluntario de " + informacion.campana + ". Estamos muy felices de que participés en esta actividad. Te esperamos";
    enviar_correo(correo,asunto,mensaje,html);
}
