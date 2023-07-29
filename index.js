const express = require('express'); // imports en node js sin ninguna configuracion
const cors = require('cors'); // imports en node js sin ninguna configuracion
const multer = require('multer'); // Importa el módulo multer para la subida de imágenes
const path = require('path');

const app = express();
//const appV = express();
const { getUsers, login, createUser, userDelete, userUpdate } = require('./controllers/users.controllers')
const { getProducts, createProduct, productUpdate, productDelete } = require('./controllers/products.controllers')
const { getOrders, createOrder, orderDelete, orderUpdate} = require('./controllers/orders.controllers')
const { loginAdmin, createAdmin } = require('./controllers/admin.controllers');


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

// Configuración de multer para guardar las imágenes en la carpeta 'uploads'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage: storage });

  // Ruta para subir una imagen
app.post('/manejoimagenes/upload', upload.single('imagen'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No se ha seleccionado ninguna imagen' });
      }
  
      // Obtener la ruta de la imagen en la carpeta 'uploads'
      const imagePath = req.file.path;
  
      // Devolver la ruta de la imagen para que pueda ser guardada en la base de datos
      res.status(200).json({ imagePath });
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });
  
//Usuarios Admin
app.post('/loginAdmin', loginAdmin);
app.post('/CrearAdmin', createAdmin); //solo se descomenta para crear nuevos admin con seguridad
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
