const mongoose = require('mongoose')
const Schema = mongoose.Schema

// El esquema es la estructura de la colección
const SchemaEmpresa = new Schema({
    _id: Number,
    NIF: String,
    nombre: String,
    email: String
});
// El primer argumento del modelo será la colección de Mongo
// recomendable en plural
module.exports = mongoose.model('empresa', SchemaEmpresa)