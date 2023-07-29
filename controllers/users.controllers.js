const usersmodels = require('../models/users.models');
const bcrypt = require('bcrypt');
const { generateJWT } = require('../utils/jwt');
// crear nuestro CRUD

// GET ( obtener )
const getUsers = async (req, res) => {

    const users = await usersmodels.find(); // find = obtener todo

    res
        .status(200) // 200 = OK
        .json({
            users: users
        })
        .send()

}
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

// POST ( crear )
const createUser = async (req, res) => {
    const { correo, nombreNegocio, contraseña, RFC, calle, colonia, codigo_postal, ciudad, telefono, responsables } = req.body;
    const hash = bcrypt.hashSync(contraseña, 10) //clase  17 de mayo despues de las 8 pm
    const user = new usersmodels({
        correo: correo,
        nombreNegocio: nombreNegocio,
        contraseña: hash, 
      RFC: RFC,
      calle: calle,
      colonia: colonia,
      codigo_postal: codigo_postal,
      ciudad: ciudad,
      telefono: telefono,
      responsables: responsables
    })
    await user.save()
    res
        .status(201) // 201 = Create
        .json({
            message: 'Usuario creado'
        })
        .send()
}

// PUT ( actualizar )
const userUpdate = async (req, res) => {

    const { id } = req.params;
    const { correo, nombre, contraseña, edad } = req.body;

    await usersmodels.findByIdAndUpdate(id, {
        correo: correo,
        nombre: nombre,
        contraseña: contraseña,
        edad: edad
    });

    res
        .status(200)
        .json({
            message: 'Actualizado correctamente'
        })
        .send()

}

// DELETE ( eliminar )
const userDelete = async (req, res) => {

    const { id } = req.params;

    await usersmodels.findByIdAndDelete(id);

    res
        .status(200)
        .json({
            message: 'Eliminado correctamente'
        })
        .send()

}

module.exports = {
    getUsers,
    login,
    createUser,
    userDelete,
    userUpdate
}