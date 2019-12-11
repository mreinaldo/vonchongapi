var mysql = require('mysql');

var Schema = mysql.Schema;

var usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es requerido'] },
    email: { type: String, unique: true, required: [true, 'El email es requerido'] },
    password: { type: String, required: [true, 'El password es obligatorio'] },
    role: { type: Number, default: 'regular' }
});

module.exports = mysql.mode('Usuario', usuarioSchema);