/**
 * Archivo que contiene la aplicación encargada de mandar correos.
 */


const functions = require('firebase-functions');
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

/**
 * Envía un correo según la solicitud que entra por parámetro.
 * Tiene constantes que especifican el correo a utilizar.
 */
app.get("/api/email", (req, res) => {
    res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'kimuk.voluntariado@gmail.com',
            pass: 'kimuk2018'
        }
    })
    const mailOptions = {
        from: 'kimuk.voluntariado@gmail.com',
        to: req.param('correo'),
        subject: req.param('asunto'),
        text: req.param('mensaje'),
        html: req.param('html')
    }
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err);
        else
            console.log(info);
    })
    console.log(req.param('correo'))
})


exports.app = functions.https.onRequest(app);