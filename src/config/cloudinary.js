//importar cloudinary
import {v2 as cloudinary} from 'cloudinary'

//establecer variables de entorno
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
    secure: true
});

//Crear el metodo para enviar la imagen a cloudinary
const uploadImage = async(filePath) => {
    return await cloudinary.uploader.upload(filePath,{folder:'aplicacionMovil'})
}
const uploadImageP = async(filePath) => {
    return await cloudinary.uploader.upload(filePath,{folder:'aplicacionMovil/UPerfil'})
}

//Crear metodo para eliminar las imagenes de cloudinary
const deleteImage = async (publicId)=>{   
    return await cloudinary.uploader.destroy(publicId)
}

export{
    uploadImage,
    deleteImage,
    uploadImageP
}