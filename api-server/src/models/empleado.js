const mongoose = require('mongoose')
const Schema = mongoose.Schema

// El esquema es la estructura de la colección
const SchemaEmpleado = new Schema({
    idEmpresa : String,
    dni: {
        type: String,
        required: true
      },
    nombre: String,
    apellidos: String,
    password: String,
    puesto: String,
    codigoEmpleado:  {
        type: Number,
        required: true
      },
    email: String
});
// El primer argumento del modelo será la colección de Mongo
// recomendable en plural
module.exports = mongoose.model('empleado', SchemaEmpleado)