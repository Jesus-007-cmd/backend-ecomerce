const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    correo: {
        type: String,
        required: true,
        unique: true
    },
    nombreNegocio: {
        type: String,
        required: true
    },
    contraseña: {
        type: String,
        required: true
    },
    RFC: {
        type: String,
        required: true
    },
    calle: {
        type: String,
        required: true
    },
    colonia: {
        type: String,
        required: true
    },
    codigo_postal: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },
    fecha_de_alta: {
        type: Date,
        default: Date.now
    },
    telefono: {
        type: String,
        required: true
    },
    responsables: {
        type: [String],
        required: true
    }
});
const usersmodels = model('usuarios', userSchema);
module.exports = usersmodels;