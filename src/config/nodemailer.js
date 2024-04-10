import nodemailer from "nodemailer"
import dotenv from 'dotenv'
dotenv.config()

//modelo json para almacenar en la base de datos
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.HOST_MAILTRAP,
    port: process.env.PORT_MAILTRAP,
    auth: {
        user: process.env.USER_MAILTRAP,
        pass: process.env.PASS_MAILTRAP,
    }
});


const sendMailToUser = (userMail, token) => {

    let mailOptions = {
        from: process.env.USER_MAILTRAP,
        to: userMail,
        subject: "Verifica tu cuenta",
        html: `
        <h1> 👗👕👖 APP TE DA LA BIENVENIDA 🙌👍🙌</h1>
        <hr>
        <a href=${process.env.URL_BACKEND}confirmar/${token}>Clic para confirmar tu cuenta</a>
        <hr>
        <footer>GRACIAS POR UNIRTE!</footer>
        `
    };
    

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Correo enviado: ' + info.response);
        }
    });
};


// send mail with defined transport object
const sendMailToRecoveryPassword = async(userMail,token)=>{
    let info = await transporter.sendMail({
    from: 'admin@vet.com',
    to: userMail,
    subject: "Correo para reestablecer tu contraseña",
    html: `
    <h1> 👗👕👖 APP TE DA LA BIENVENIDA 🙌👍🙌</h1>
    <hr>
    <a href=${process.env.URL_BACKEND}recuperar-password/${token}>Clic para reestablecer tu contraseña</a>
    <hr>
    <footer>GRACIAS POR UNIRTE!</footer>
    `
    });
    console.log("Mensaje enviado satisfactoriamente: ", info.messageId);
}



export {
    sendMailToUser,
    sendMailToRecoveryPassword
}