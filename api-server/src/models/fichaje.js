const { Timestamp } = require('mongodb');
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// El esquema es la estructura de la colección
const SchemaFichaje = new Schema({
    id_fichajes: Number,
    dni_empleado: String,
    fecha_hora:{
        type: Date,
        default: Date.now
    },
    fecha_modificacion: {
        type: Date,
        default: Date.now
    },
    tipo: String
});
// El primer argumento del modelo será la colección de Mongo
// recomendable en plural
module.exports = mongoose.model('fichaje', SchemaFichaje)