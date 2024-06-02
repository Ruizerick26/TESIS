import { check, validationResult } from 'express-validator'

const validacionContraU =[
    check("password")
    .isLength({ min: 10 })
        .withMessage('El campo "password" debe tener al menos 10 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
        .withMessage('El campo "password" debe contener al menos una letra mayúscula, una letra minúscula y un número')
    .customSanitizer(value => value?.trim()),

    (req,res,next)=>{
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        } else {
            return res.status(400).send({ errors: errors.array() });
        }
    }
]

const validacionContra =[
    check("passwordnuevo")
    .isLength({ min: 10 })
        .withMessage('El campo "password" debe tener al menos 10 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
        .withMessage('El campo "password" debe contener al menos una letra mayúscula, una letra minúscula y un número')
    .customSanitizer(value => value?.trim()),

    (req,res,next)=>{
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        } else {
            return res.status(400).send({ errors: errors.array() });
        }
    }
]

const validacionPublicacion =[
    check("descripcion")
        .isLength({max: 150 })
            .withMessage('El campo "Descripcion" debe tener un máximo de 150 caracteres')
        .customSanitizer(value => value?.trim()),
    (req,res,next)=>{
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        } else {
            return res.status(400).send({ errors: errors.array() });
        }
    }
]
const validacionReporte =[
    check("detalle")
        .isLength({max: 75 })
            .withMessage('El campo "Detalle" debe tener un máximo de 75 caracteres')
        .customSanitizer(value => value?.trim()),
    (req,res,next)=>{
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        } else {
            return res.status(400).send({ errors: errors.array() });
        }
    }
]

const validacionFormulario =[
    check(["nombre","apellido"])
        .isLength({ min: 3, max: 12 })
            .withMessage('El campo "nombre" y/o "apellido" debe(n) tener entre 3 y 12 caracteres')
        .isAlpha('es-ES', { ignore: 'áéíóúÁÉÍÓÚñÑ' })
            .withMessage('El campo "nombre" y/o "apellido" debe(n) contener solo letras')
        .customSanitizer(value => value?.trim()),

    check("email")
    .isEmail()
        .withMessage('El campo "email" no es correcto')
    .customSanitizer(value => value?.trim()),

    check("password")
    .isLength({ min: 10 })
        .withMessage('El campo "password" debe tener al menos 10 caracteres')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
        .withMessage('El campo "password" debe contener al menos una letra mayúscula, una letra minúscula y un número')
    .customSanitizer(value => value?.trim()),

    (req,res,next)=>{
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        } else {
            return res.status(400).send({ errors: errors.array() });
        }
    }
]
const validacionActualizar =[
    check(["nombre","apellido"])
        .isLength({ min: 3, max: 12 })
            .withMessage('El campo "nombre" y/o "apellido" debe(n) tener entre 3 y 12 caracteres')
        .isAlpha('es-ES', { ignore: 'áéíóúÁÉÍÓÚñÑ' })
            .withMessage('El campo "nombre" y/o "apellido" debe(n) contener solo letras')
        .customSanitizer(value => value?.trim()),

    check("descripcion")
    .isLength({ min: 10,max: 150 })
        .withMessage('El campo "Descripcion" debe tener un máximo de 150 caracteres')
    .customSanitizer(value => value?.trim()),

    (req,res,next)=>{
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        } else {
            return res.status(400).send({ errors: errors.array() });
        }
    }
]

const validacionModerador =[
    check(["nombre","apellido"])
        .isLength({ min: 3, max: 12 })
            .withMessage('El campo "nombre" y/o "apellido" debe(n) tener entre 3 y 12 caracteres')
        .isAlpha('es-ES', { ignore: 'áéíóúÁÉÍÓÚñÑ' })
            .withMessage('El campo "nombre" y/o "apellido" debe(n) contener solo letras')
        .customSanitizer(value => value?.trim()),

    check("email")
    .isEmail()
        .withMessage('El campo "email" no es correcto')
    .customSanitizer(value => value?.trim()),

    (req,res,next)=>{
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        } else {
            return res.status(400).send({ errors: errors.array() });
        }
    }
]


export {
    validacionContraU,
    validacionContra,
    validacionFormulario,
    validacionPublicacion,
    validacionModerador,
    validacionActualizar,
    validacionReporte
}