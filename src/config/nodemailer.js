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
        from: 'admin@ropdat.com',
        to: userMail,
        subject: "Verifica tu cuenta",
        html: `
        <!DOCTYPE html>
        <html lang: "en">
        <body>
        
        <div class= "w-layout-vflex flex-block" 
        style="flex-direction: column;
            align-items: center; 
            display: flex; border: 1px dashed #000; 
            border-radius: 20px; 
            justify-content: center; 
            align-items: center; 
            width: 400px;">
        <h1 class= "heading" style="font-family: Merriweather, serif;">FashionGEC</h1>
        <img src= "assets/logo.jpg" loading="lazy" width = "150" sizes = "150px" alt = "" srcset = "assets/logo.jpg 500w, assets/logo.jpg 609w" class = "image" style= "border-radius: 100px; ">
            <div 
                style="flex-direction: column;
                align-items: center; 
                display: flex; 
                justify-content: center; 
                align-items: center; 
                width: 400px;">
                <p class = "paragraph" style="text-align: center;">BIENVENIDO A NUESTRA APP <br><br> Gracias por registrate en nuetro <br><br> aplicativo, esperamos que la experiencia <br><br> aqu&#237 sea la mejor.</p>
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
        `,
        attachments:[
            {
                filename: 'logo.jpg',
                path:'./src/assets/logo.jpg',
                cid:'logo'
            }
        ]
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
    <h1> 👗👕👖 APP TE DA LA BIENVENIDA 🙌👍🙌</h1>
    <hr>
    <a href=${process.env.URL_BACKEND}recuperar-password/${token}>Clic para reestablecer tu contraseña</a>
    <hr>
    <footer>GRACIAS POR UNIRTE!</footer>
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
        <div style="border: solid  #66CCCC ; width:500px; border-radius:15px; background-color: #99FFCC;">
        <h1><font color="#660000">Gracias por trabajar con nosotros</font></h1>
        <p>Aqui te enviamos tus credenciales de inicio de sesión</p>
        <p>Contraseña: ${password}<br>Código Único: ${codigo}</p>
        <p>El email es el mismo que nos entregaste</p>
        <p>Recuerda mantenar a salvo tus datos, podras cambiar tu contraseña una vez ingreses</p>
        <p>El código único no se puede cambiar asi que no lo pierdas</p>
        </div>
        <footer>ROPDAT TE AGRADECE POR FORMAR PARTE DE NUESTROS MODERADORES</footer>
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
        <div style="border: solid  #66CCCC ; width:500px; border-radius:15px; background-color: #99FFCC;">
        <h1><font color="#660000">Gracias por trabajar con nosotros</font></h1>
        <p>Este correo te permitirá recuperar tu contraseña</p>
        <a href=${process.env.URL_FRONTEND}moderador/recuperar/${token}>Clic para reestablecer tu contraseña</a>
        </div>
        <footer>ROPDAT TE AGRADECE POR FORMAR PARTE DE NUESTROS MODERADORES</footer>
        `
    });
    console.log("correo enviado con exito: ", info.messageId)
}



export {
    sendMailToUser,
    sendMailToRecoveryPassword,
    sendMailtoNewModer,
    sendMailtoRecoveryModer
}