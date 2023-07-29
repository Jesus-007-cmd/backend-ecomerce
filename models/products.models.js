    const { Schema, model } = require('mongoose');

    const productSchema = new Schema({
        
        nombre: {
            type: String,
            required: true
        },
        costo: {
            type: Number,
            required: true
        },
        precioalpublico: {
            type: Number,
            required: true
        },
              gramos: {
            type: Number,
            required: true
        }
    
    });

    const productsmodels = model('productos', productSchema);
    module.exports = productsmodels;
