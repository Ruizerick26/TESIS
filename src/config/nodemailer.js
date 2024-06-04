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
        from: "admin@ropdat.com",
        to: userMail,
        subject: "Verifica tu cuenta",
        html: `
        <!DOCTYPE html>
        <html lang: "en">
        <body>
        <center>
        <div 
        style="
            border: 1px dashed #000; 
            border-radius: 20px;  
            width: auto;">
        <h1 style="font-family: Merriweather, serif;">FashionGEC</h1>
        <img src= "https://res.cloudinary.com/dscr8kr95/image/upload/v1717376783/wmbcpenc67vp4msrouzb.jpg" loading="lazy" width = "150" sizes = "150px" alt = ""  style= "border-radius: 100px; ">
            <div 
            style="
                width: auto;">
                <p class = "paragraph" style="text-align: center;">BIENVENIDO A NUESTRA APP <br><br> Gracias por registrate en nuetro <br><br> aplicativo, esperamos que la experiencia <br><br> aquí sea la mejor.</p>
                <br>
                <a href="${process.env.URL_FRONTEND}/confirmar/${token}" class = "w-botton" style="display: inline-block;
                        padding: 9px 15px;
                        background-color: #3898EC;
                        color: white;
                        line-height: inherit;
                        text-decoration: none;
                        border-radius: 15px;">Confimar cuenta</a>
            </div>
        </div>
        </body>
        </html>
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
    from: 'admin@ropdat.com',
    to: userMail,
    subject: "Correo para reestablecer tu contraseña",
    html: `
    <!DOCTYPE html>
        <html lang: "en">
        <body>
        <center>
        <div 
        style="
            border: 1px dashed #000; 
            border-radius: 20px;  
            width: auto;">
        <h1 style="font-family: Merriweather, serif;">FashionGEC</h1>
        <img src= "https://res.cloudinary.com/dscr8kr95/image/upload/v1717376783/wmbcpenc67vp4msrouzb.jpg" loading="lazy" width = "150" sizes = "150px" alt = ""  style= "border-radius: 100px; ">
            <div 
            style="
                width: auto;">
                <p class = "paragraph" style="text-align: center;">RECUPERACIÓN DE CUENTA <br><br> Si has olvidado tu contraseña <br><br> ingresa el siguiente codigo <br><br> en la aplicación para <br><br> restablecer tu contraseña</p>
                <br>
                <p class = "w-botton" style="display: inline-block;
                        padding: 9px 15px;
                        background-color: #3898EC;
                        color: white;
                        line-height: inherit;
                        text-decoration: none;
                        border-radius: 15px;">${token}</p>
            </div>
        </div>
        </body>
        </html>
    `
    });
    console.log("Mensaje enviado satisfactoriamente: ", info.messageId);
}

const sendMailtoNewModer = async(userMail,password,codigo) =>{
    let info =await transporter.sendMail({
        from: 'Adminmoderador@ropdat.com',
        to: userMail,
        subject: "Cuenta moderador registrada",
        html:`
        <!DOCTYPE html>
        <html lang: "en">
        <body>
        <center>
        <div 
        style="
            border: 1px dashed #000; 
            border-radius: 20px;  
            width: auto;">
        <h1 style="font-family: Merriweather, serif;">FashionGEC</h1>
        <img src= "https://res.cloudinary.com/dscr8kr95/image/upload/v1717376783/wmbcpenc67vp4msrouzb.jpg" loading="lazy" width = "150" sizes = "150px" alt = ""  style= "border-radius: 100px; ">
            <div 
            style="
                width: auto;">
                <p class = "paragraph" style="text-align: center;">BIENVENIDO A NUESTRA APP <br><br> Gracias por trabajar con nosotros.</p>
                <p style="text-align: center;>Aqui te enviamos tus credenciales de inicio de sesión</p>
                <br>
                <p style="display: inline-block;
                padding: 9px 15px;
                background-color: #3898EC;
                color: white;
                line-height: inherit;
                text-decoration: none;
                border-radius: 15px;">Contraseña: ${password}<br>Código Único: ${codigo}</p>
                <p>El email es el mismo que nos entregaste</p>
                <p>Deberas cambiar tu contraseña en el <br> primer inicio de sesión</p>
                <p>Tu código unico permitira este primer <br> cambio de contraseña</p>
            </div>
            </div>
            <br>
        <footer style="color: white; padding: 9px 15px;
        background-color: #3898EC; border-radius: 15px;">
        ROPDAT TE AGRADECE POR FORMAR PARTE DE NUESTROS MODERADORES</footer>
        </body>
        </html>
        `
    });
    console.log("correo enviado con exito: ", info.messageId)
}

const sendMailtoRecoveryModer = async(userMail,token) =>{
    let info =await transporter.sendMail({
        from: 'Adminmoderador@ropdat.com',
        to: userMail,
        subject: "Recuperar contraseña",
        html:`
        <!DOCTYPE html>
        <html lang: "en">
        <body>
        <center>
        <div style="
            border: 1px dashed #000; 
            border-radius: 20px;  
            width: auto;">
        <h1 style="font-family: Merriweather, serif;">FashionGEC</h1>
        <img src= "https://res.cloudinary.com/dscr8kr95/image/upload/v1717376783/wmbcpenc67vp4msrouzb.jpg" loading="lazy" width = "150" sizes = "150px" alt = ""  style= "border-radius: 100px; ">
            <div style="width: auto;">
                <p class = "paragraph" style="text-align: center;">RECUPERACIÓN DE CUENTA <br><br> Si has olvidado tu contraseña <br> ingresa al siguiente enlace para <br> restablecer tu contraseña</p>
                <br>
                <a href="${process.env.URL_FRONTEND}moderador/recuperar/${token}" class = "w-botton" style="display: inline-block;
                        padding: 9px 15px;
                        background-color: #3898EC;
                        color: white;
                        line-height: inherit;
                        text-decoration: none;
                        border-radius: 15px;">Clic para reestablecer tu contraseña</a>
            </div>
            </div>
            <br>
            <footer style="color: white; padding: 9px 15px;
        background-color: #3898EC; border-radius: 15px;">
        ROPDAT TE AGRADECE POR FORMAR PARTE DE NUESTROS MODERADORES</footer>
        </body>
        </html>
        `
    });
    console.log("correo enviado con exito: ", info.messageId)
}

const sendMailtoBloqueo = async(userMail) =>{
    let info =await transporter.sendMail({
        from: 'Adminmoderador@ropdat.com',
        to: userMail,
        subject: "Cuenta BLOQUEADA",
        html:`
        <!DOCTYPE html>
        <html lang: "en">
        <body>
        <center>
        <div style="
            border: 1px dashed #000; 
            border-radius: 20px;  
            width: auto;">
        <h1 style="font-family: Merriweather, serif;">FashionGEC</h1>
        <img src= "https://res.cloudinary.com/dscr8kr95/image/upload/v1717376783/wmbcpenc67vp4msrouzb.jpg" loading="lazy" width = "150" sizes = "150px" alt = ""  style= "border-radius: 100px; ">
            <div style="width: auto;">
                <p class = "paragraph" style="text-align: center;">CUENTA BLOQUEADA <br><br> Has cometido diversas infracciones <br> dentro del aplicativo. <br> Tu cuenta estara bloqueda <br> indefinidamente </p>
                <br>
            </div>
            </div>
        </body>
        </html>
        `
    });
    console.log("correo enviado con exito: ", info.messageId)
}

const sendMailtoRestring = async(userMail) =>{
    let info =await transporter.sendMail({
        from: 'Adminmoderador@ropdat.com',
        to: userMail,
        subject: "Cuenta RESTRINGIDA",
        html:`
        <!DOCTYPE html>
        <html lang: "en">
        <body>
        <center>
        <div style="
            border: 1px dashed #000; 
            border-radius: 20px;  
            width: auto;">
        <h1 style="font-family: Merriweather, serif;">FashionGEC</h1>
        <img src= "https://res.cloudinary.com/dscr8kr95/image/upload/v1717376783/wmbcpenc67vp4msrouzb.jpg" loading="lazy" width = "150" sizes = "150px" alt = ""  style= "border-radius: 100px; ">
            <div style="width: auto;">
                <p class = "paragraph" style="text-align: center;">CUENTA RESTRINGIDA <br><br> 
                Has infringido en los terminos y condiciones de nuesta app.</p>
                <p>Tu cuenta estara restingida <br> por cierto tiempo </p>
                <p>Revisa tus notificaciones para <br> ver el tiempo de restricción </p>
                <p>No podras interactuar con las publicaciones</p>
                <p>No podras publicar, ni reportar </p>
                <br>
            </div>
            </div>
        </body>
        </html>
        `
    });
    console.log("correo enviado con exito: ", info.messageId)
}

const sendMailtoDeletePublic = async(userMail, motivo) =>{
    let info =await transporter.sendMail({
        from: 'Adminmoderador@ropdat.com',
        to: userMail,
        subject: "Publicación Borrada",
        html:`
        <!DOCTYPE html>
        <html lang: "en">
        <body>
        <center>
        <div style="
            border: 1px dashed #000; 
            border-radius: 20px;  
            width: auto;">
        <h1 style="font-family: Merriweather, serif;">FashionGEC</h1>
        <img src= "https://res.cloudinary.com/dscr8kr95/image/upload/v1717376783/wmbcpenc67vp4msrouzb.jpg" loading="lazy" width = "150" sizes = "150px" alt = ""  style= "border-radius: 100px; ">
            <div style="width: auto;">
                <p class = "paragraph" style="text-align: center;">PUBLICACIÓN BORRADA <br><br> 
                Una publicación infringe los terminos <br> y condiciones de nuesta app.</p>
                <p><b>MOTIVO: ${motivo}</b></p>
                <p>Dado lo sucedido dicha publicación sera borrada.</p>
                <p>Le informaremos de su sanción en un próximo correo</p>
                <p>Esperamos que no vuelva a reincidir en estas conductas</p>
                <br>
            </div>
            </div>
        </body>
        </html>
        `
    });
    console.log("correo enviado con exito: ", info.messageId)
}
const sendMailtoDesbloq = async(userMail) =>{
    let info =await transporter.sendMail({
        from: 'Adminmoderador@ropdat.com',
        to: userMail,
        subject: "Cuenta Desbloqueda",
        html:`
        <!DOCTYPE html>
        <html lang: "en">
        <body>
        <center>
        <div style="
            border: 1px dashed #000; 
            border-radius: 20px;  
            width: auto;">
        <h1 style="font-family: Merriweather, serif;">FashionGEC</h1>
        <img src= "https://res.cloudinary.com/dscr8kr95/image/upload/v1717376783/wmbcpenc67vp4msrouzb.jpg" loading="lazy" width = "150" sizes = "150px" alt = ""  style= "border-radius: 100px; ">
            <div style="width: auto;">
                <p class = "paragraph" style="text-align: center;">CUENTA DESBLOQUEADA <br><br> 
                Felicidades, despues de analizar su caso hemos decidido<br>
                desbloquear su cuenta.</p>
                <pSu cuenta funcionara normal despues de 1 día de desbloqueada</p>
                <p>Durante ese día su cuenta estara en modo restringido</p>
                <p>Recuerde no volver a infringir nuestros terminos y condiciones</p>
                <br>
            </div>
            </div>
        </body>
        </html>
        `
    });
    console.log("correo enviado con exito: ", info.messageId)
}
const sendMailtoDesReg = async(userMail) =>{
    let info =await transporter.sendMail({
        from: 'Adminmoderador@ropdat.com',
        to: userMail,
        subject: "Su cuenta ya no esta restringida",
        html:`
        <!DOCTYPE html>
        <html lang: "en">
        <body>
        <center>
        <div style="
            border: 1px dashed #000; 
            border-radius: 20px;  
            width: auto;">
        <h1 style="font-family: Merriweather, serif;">FashionGEC</h1>
        <img src= "https://res.cloudinary.com/dscr8kr95/image/upload/v1717376783/wmbcpenc67vp4msrouzb.jpg" loading="lazy" width = "150" sizes = "150px" alt = ""  style= "border-radius: 100px; ">
            <div style="width: auto;">
                <p class = "paragraph" style="text-align: center;">CUENTA sin restricciones<br><br> 
                Felicidades, el tiempo de restrincción de su cuenta a finalizado</p>
                <pYa puede usar su cuenta de forma normal</p>
                <p>Recuerde no volver a infringir nuestros terminos y condiciones</p>
                <br>
            </div>
            </div>
        </body>
        </html>
        `
    });
    console.log("correo enviado con exito: ", info.messageId)
}


export {
    sendMailToUser,
    sendMailToRecoveryPassword,
    sendMailtoNewModer,
    sendMailtoRecoveryModer,
    sendMailtoBloqueo,
    sendMailtoRestring,
    sendMailtoDeletePublic,
    sendMailtoDesbloq,
    sendMailtoDesReg
}