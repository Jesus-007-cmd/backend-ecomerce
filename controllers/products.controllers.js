const productssmodels = require('../models/products.models');


// GET ( obtener )
const getProducts = async (req, res) => {
  try {
    const products = await productssmodels.find();
    res.status(200).json({ products: products });
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// POST ( crear )
const createProduct = async (req, res) => {
  try {
    const { nombre, costo, precioalpublico,  gramos } = req.body;
   
    const product = new productssmodels({
      nombre: nombre,
      costo: costo,
      precioalpublico: precioalpublico,
      gramos: gramos,
     
    });
    await product.save();
    res
      .status(201) // 201 = Create
      .json({
        message: 'Producto creado'
      });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// PUT ( actualizar )
const productUpdate = async (req, res) => {
  const { id } = req.params;
  const { nombre, costo, precioalpublico,  gramos } = req.body;

  await productssmodels.findByIdAndUpdate(id, {
    nombre: nombre,
    costo: costo,
    precioalpublico: precioalpublico,
    gramos: gramos
    
  });

  res
    .status(200)
    .json({
      message: 'Actualizado correctamente'
    });
};

// DELETE ( eliminar )
const productDelete = async (req, res) => {
  const { id } = req.params;

  await productssmodels.findByIdAndDelete(id);

  res
    .status(200)
    .json({
      message: 'Eliminado correctamente'
    });
};

module.exports = {
  getProducts,
  createProduct,
  productDelete,
  productUpdate
};