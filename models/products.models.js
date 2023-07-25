const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    gramos: {
        type: Number,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    inventario: {
        type: Number,
        required: true
    }
});

const productsmodels = model('productos', productSchema);
module.exports = productsmodels;
