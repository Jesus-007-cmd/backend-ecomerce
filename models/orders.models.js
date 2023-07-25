const { Schema, model } = require('mongoose');
/*const producto ={
nombre:"",
precio:0,
cantidad:0,
}*/
const productschema= new Schema({
    nombre: {type: String} ,
    precio: {type: Number},
    cantidad: {type: Number}
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
        required: true
    }


});

const ordersmodels = model('ordenes', ordersSchema);
module.exports = ordersmodels;