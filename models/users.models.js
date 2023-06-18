const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    correo: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    contraseña: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    }
});

const usersmodels = model('usuarios', userSchema);
module.exports = usersmodels;
