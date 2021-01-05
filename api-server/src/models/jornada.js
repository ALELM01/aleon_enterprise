const mongoose = require('mongoose')
const Schema = mongoose.Schema

// El esquema es la estructura de la colección
const SchemaJornada = new Schema({
    idEmpresa : String,
    duracion: Number,
    tipo: {
        type: String,
        enum : ['complete','partialM','partialW']
    },
});
// El primer argumento del modelo será la colección de Mongo
// recomendable en plural
module.exports = mongoose.model('jornada', SchemaJornada)