const express = require('express'); // imports en node js sin ninguna configuracion
const cors = require('cors'); // imports en node js sin ninguna configuracion

const app = express();

//const appV = express();

const { getUsers, login, createUser, userDelete, userUpdate } = require('./controllers/users.controllers')
const { getProducts, createProduct, productUpdate, productDelete } = require('./controllers/products.controllers')
const { getOrders, createOrder, orderDelete, orderUpdate} = require('./controllers/orders.controllers')
const { getUserAdmins } = require('./controllers/useradmin.controllers');


const mongoose = require('mongoose');
require('dotenv').config() // importamos dotenv (conocidos como variables de entorno y se guardan en el archivo .env)
const port = process.env.PORT || 3000; // regularmente se usa el puerto 3000
// || or, && and
 
// config para recibir info
/*CORS es una medida de seguridad implementada por los navegadores para evitar que un sitio web acceda a recursos en otro 
dominio sin permiso explícito del servidor. Cuando una solicitud se considera de "orígenes cruzados" (Cross-Origin), el
 servidor debe responder con cabeceras específicas que permitan o denieguen el acceso desde el dominio solicitante.*/
app.use(cors())  // cors 
app.use(express.json()) // nos permite que nuestra peticion post reciba informacion desde el body
 
// Con Promise se puede trabajar con then y con catch
mongoose.connect(process.env.HOSTDB).then(() => {
    console.log('Conexion a MongoDB');
}).catch((error) => {
    console.log(error);
})
//Usuarios Admin
app.get('/useradmin', getUserAdmins);
// Usuarios 
app.get('/user', getUsers);
app.post('/user/login', login);
app.post('/user', createUser);
app.put('/user/:id', userUpdate);
app.delete('/user/:id', userDelete);
// Productos
app.get('/product', getProducts);
app.post('/product', createProduct);
app.put('/product/:id', productUpdate);
app.delete('/product/:id', productDelete);
//Ordenes
app.get('/order', getOrders);
app.post('/order', createOrder);
app.put('/order/:id', orderUpdate);
app.delete('/order/:id', orderDelete);



 
// servidor
app.listen(port, () => { // levanta el servidor
    console.log('Servidor funcionando en el puerto: ' + port)
}); 
/*appP.listen(port, () => { // levanta el servidor
    console.log('Servidor funcionando en el puerto: ' + port)
}); */