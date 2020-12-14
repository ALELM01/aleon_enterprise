const mongoose = require('mongoose')
const Schema = mongoose.Schema

// El esquema es la estructura de la colección
const SchemaEmpleado = new Schema({
    dni: String,
    nombre: String,
    apellidos: String,
    password: String,
    puesto: String,
    codigoEmpleado: Number,
    email: String
});
// El primer argumento del modelo será la colección de Mongo
// recomendable en plural
module.exports = mongoose.model('empleado', SchemaEmpleado)