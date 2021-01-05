const mongoose = require('mongoose')
const Schema = mongoose.Schema

// El esquema es la estructura de la colección
const SchemaEmpresa = new Schema({ 
    cif:  {
        type: String,
        required: true
      },
    nombre:  {
        type: String,
        required: true
      },
    password:  {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
});
// El primer argumento del modelo será la colección de Mongo
// recomendable en plural
module.exports = mongoose.model('empresa', SchemaEmpresa)