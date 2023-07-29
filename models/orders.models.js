const { Schema, model } = require('mongoose');

const productschema= new Schema({
    nombre: {type: String} ,
    costo: {type: Number},
    cantidad: {type: Number},
    gramos: {type: Number},
    _id: {type: String}
});

const ordersSchema = new Schema({
    
   
    fecha: {
        type: Date,
        required: true
    },
    products: [productschema],

    total: {
        type: Number,
        required: true
    },
    completada: {
        type: Boolean,
        required: false
    },
    fecha_completada: {
        type: Date,
        required: false
    },
    usuario: {
        type: String,
        required: true
    }



});

const ordersmodels = model('ordenes', ordersSchema);
module.exports = ordersmodels;