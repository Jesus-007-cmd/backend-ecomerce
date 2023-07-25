const Admin = require('../models/admin.models');

// Crear un nuevo usuario "admin"
const createAdmin = async (req, res) => {
  try {
    const { usuario, contraseña, correo, description } = req.body;
    const admin = new Admin({
        usuario,
        contraseña,
        correo,
        description
    });
    await admin.save();
    res.status(201).json({ message: 'Usuario admin creado exitosamente' });
  } catch (error) {
    console.error('Error al crear usuario admin:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
// Login / Post 
const login = async (req, res) => {
    const { correo, contraseña } = req.body;
    
    const user = await usersmodels.findOne({ correo: correo });
    if (!user) {
        
        return res
                .status(404)
                .json({
                    
                    message: 'Usuario no encontrado'
                })
                .send()
    }
    console.log(bcrypt.hashSync(contraseña, 10), user.contraseña);
    const isMatch = bcrypt.compareSync(contraseña, user.contraseña);
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
                .send()
    } else {
        return res
                .status(401)
                .json({
                   message: 'Usuario incorrecto'
                })
                .send()
    }
}
module.exports = {
  createAdmin,
};