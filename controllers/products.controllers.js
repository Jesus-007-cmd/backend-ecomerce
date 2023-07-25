const productssmodels = require('../models/products.models');

// crear nuestro CRUD

// GET ( obtener )
/*const getProducts = async (req, res) => {

    const products = await productssmodels.find(); // find = obtener todo

    res
        .status(200) // 200 = OK
        .json({
            products: products
        })
        .send()

}*/
const getProducts = async (req, res) => {
    try {
      const products = await productssmodels.find(); // find = obtener todo
      res.status(200).json({ products: products });
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  };

// POST ( crear )
const createProduct = async (req, res) => {
    const { nombre, precio, gramos, imagen, inventario } = req.body;
    
    const product = new productssmodels({
        nombre: nombre,
        precio: precio,
        gramos: gramos, 
        imagen: imagen,
        inventario: inventario
    })

    await product.save()

    res
        .status(201) // 201 = Create
        .json({
            message: 'Producto creado'
        })
        .send()

}

// PUT ( actualizar )
const productUpdate = async (req, res) => {

    const { id } = req.params;
    const { nombre, precio, gramos, imagen, inventario }  = req.body;

    await productssmodels.findByIdAndUpdate(id, {
        precio: nombre,
        nombre: precio,
        gramos: gramos, 
        imagen: imagen,
        inventario: inventario
    });

    res
        .status(200)
        .json({
            message: 'Actualizado correctamente'
        })
        .send()

}

// DELETE ( eliminar )
const productDelete = async (req, res) => {

    const { id } = req.params;

    await productssmodels.findByIdAndDelete(id);

    res
        .status(200)
        .json({
            message: 'Eliminado correctamente'
        })
        .send()

}

module.exports = {
    getProducts,
    createProduct,
    productDelete,
    productUpdate
}