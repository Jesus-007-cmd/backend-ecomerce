const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
  correo: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  }
});

const adminmodels = model('Admin', adminSchema);

module.exports = adminmodels;