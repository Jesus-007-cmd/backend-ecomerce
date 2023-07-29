const adminmodels = require('../models/admin.models');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../utils/jwt');

// Crear un nuevo usuario "admin"



const createAdmin = async (req, res) => {
  try {
    const { correo, password, description } = req.body;
    const pass = bcrypt.hashSync(password, 10)
    const admin = new adminmodels({
      correo: correo,
      password: pass,
      description:  description
    });
    await admin.save();
    res.status(201).json({ message: 'Usuario admin creado exitosamente' });
  } catch (error) {
    console.error('Error al crear usuario admin:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
// Login Admin / Post 
const loginAdmin = async (req, res) => {
  const { correo, password } = req.body; // Cambiar "contraseña" a "password"
  
  const user = await adminmodels.findOne({ correo: correo });
  if (!user) {
      return res
              .status(404)
              .json({
                  message: 'Usuario no encontrado'
              })
              .send();
  }
  
  const isMatch = bcrypt.compareSync(password, user.password);
  
  if (isMatch) {
      const token = generateJWT(user._id);
      return res
              .status(200)
              .json({
                  message: 'Usuario logeado correctamente',
                  user: {
                      correo: user.correo
                  },
                  token: token
              })
              .send();
  } else {
      return res
              .status(401)
              .json({
                 message: 'Usuario incorrecto'
               
              })
              .send();
  }
}
module.exports = {
  createAdmin, loginAdmin
};