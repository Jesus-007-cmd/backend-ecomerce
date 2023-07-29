const multer = require('multer');
const path = require('path');

// Configurar el almacenamiento de archivos con Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Especifica la carpeta donde se guardarán las imágenes. En este ejemplo, se guarda en la carpeta "uploads".
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Genera un nombre único para el archivo al guardarlo.
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  }
});

// Verifica que el archivo sea una imagen válida (opcional)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('El archivo no es una imagen válida.'), false);
  }
};

// Configura Multer con las opciones de almacenamiento y filtro
const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

// Exporta la función de middleware para manejar la carga de imágenes
module.exports = upload.single('imagen'); // 'imagen' es el nombre del campo en el formulario donde se enviará la imagen