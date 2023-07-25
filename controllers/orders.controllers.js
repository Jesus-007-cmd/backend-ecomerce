const ordersmodels = require('../models/orders.models');

// crear nuestro CRUD

// GET ( obtener )
const getOrders = async (req, res) => {

    const orders = await ordersmodels.find(); // find = obtener todo

    res
        .status(200) // 200 = OK
        .json({
            orders: orders
        })
        .send()

}

// POST ( crear )
const createOrder = async (req, res) => {
    const { fecha, products, total, completada, fecha_completada } = req.body;
    
    const order = new ordersmodels({
        fecha: fecha,
        products: products,
        total: total, 
        completada: completada,
        fecha_completada: fecha_completada
    })

    await order.save()

    res
        .status(201) // 201 = Create
        .json({
            message: 'Orden creada'
        })
        .send()

}

// PUT ( actualizar )
const orderUpdate = async (req, res) => {

    const { id } = req.params;
    const { fecha, products, total, completada, fecha_completada } = req.body;

    await ordersmodels.findByIdAndUpdate(id, {
        fecha: fecha,
        products: products,
        total: total, 
        completada: completada,
        fecha_completada: fecha_completada
    });

    res
        .status(200)
        .json({
            message: 'Actualizado correctamente'
        })
        .send()

}

// DELETE ( eliminar )
const orderDelete = async (req, res) => {

    const { id } = req.params;

    await ordersmodels.findByIdAndDelete(id);

    res
        .status(200)
        .json({
            message: 'Eliminado correctamente'
        })
        .send()

}

module.exports = {
    getOrders,
    createOrder,
    orderDelete,
    orderUpdate
}