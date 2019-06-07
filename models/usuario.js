var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var rolesValidos = {
    values: ['ADMIN', 'COACH', 'CUSTOMER'],
    message: '{VALUE} no es un role válido'
};

var usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es requerido'] },
    apellido: { type: String, required: [true, 'El apellido es requerido'] },
    altura: { type: Number, required: false },
    peso: { type: Number, required: false },
    role: { type: String, required: false, default: 'CUSTOMER', enum: rolesValidos },
    email: { type: String, unique: true, required: [true, 'El email es requerido'] },
    password: { type: String, required: [true, 'La contraseña es requerida'] },
    direccion: { type: String, required: false },
    tfno: { type: String, required: false },
    img: { type: String, required: false },
    google: { type: Boolean, default: false }
});

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} ya existe' });

module.exports = mongoose.model('Usuario', usuarioSchema);