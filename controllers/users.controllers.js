const usersmodels = require('../models/users.models');
const bcrypt = require('bcrypt');
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

// POST ( crear )
const createUser = async (req, res) => {
    const { correo, nombre, contraseña, edad } = req.body;
    const hash= bcrypt.hashSync(contraseña, 10) //clase  17 de mayo despues de las 8 pm
    const user = new usersmodels({
        correo: correo,
        nombre: nombre,
        contraseña: hash, //clase  17 de mayo despues de las 8 pm
        edad: edad
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
    const { correo, nombre, contraseña, edad  } = req.body;

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
    createUser,
    userDelete,
    userUpdate
}