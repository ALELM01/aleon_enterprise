const { MongoClient, ObjectID } = require("mongodb");
const mongoose = require("mongoose");
const Fichaje = require("../models/fichaje");
class serviciofichajes {
  constructor() {}

  async connect() {
    try {
      mongoose
        .connect(
          "mongodb+srv://admin:Alex_1007@cluster0-yzhtx.mongodb.net/alm_enterprise?retryWrites=true&w=majority",
          { useNewUrlParser: true, useUnifiedTopology: true }
        )
        .then((db) => console.log("Conectado a la BD"))
        .catch((error) => console.log(error));
      /*
      const client = await MongoClient.connect(
        "mongodb+srv://admin:Alex_1007@cluster0-yzhtx.mongodb.net/alm_enterprise?retryWrites=true&w=majority",
        {
          useUnifiedTopology: true,
        }
      );
      const db = client.db("alm_enterprise");*/
    } catch (e) {
      console.log(e);
    }
  }

  //llamada a base de datos
  async listarfichajes() {
    await this.connect();
    /*const resultado = await db.collection("empleados").find({}).toArray();
    console.log(resultado);*/
    const result = await Fichaje.find();
    console.log(result);
    return result;
  }

  //guardar una fichaje
  async guardarfichajes(jsonfichajes) {
    await this.connect();
    const ficha = new Fichaje(jsonfichajes);
    ficha.fecha_hora = Date.now();
    ficha.fecha_modificacion = Date.now();
    const result = await ficha.save();
    return result;
  }

  //llamar a un id especifico
  async idespecifico(id) {
    await this.connect();
    /*const result = await db.collection("fichaje").find({"_id" : ObjectID(id)}).toArray();*/
    const result = await Fichaje.findOne({ _id: id });
    console.log(result);
    return result;
  }

  //modificar una fichaje  cambiar a datos de fichaje
  async modificarfichaje(id, datosNuevos) {
    await this.connect();
    /* const result = await db.collection("fichaje").findOne({ _id: ObjectID(id) });*/
    const result = await Fichaje.findOne({ _id: id });
    console.log("result: " + JSON.stringify(result));
    result.id_fichajes = datosNuevos.id_fichajes;
    result.dni_empleado = datosNuevos.dni_empleado;
    result.fecha_hora = datosNuevos.fecha_hora;
    result.fecha_modificacion = Date.now();
    result.tipo = datosNuevos.tipo;
    console.log("result2: " + JSON.stringify(result));
    await result.save();
    return result;
  }

  //borrar a una fichaje

  async borrarespecifico(id) {
    await this.connect();
    /* const result = await db.collection("fichaje").deleteOne({"_id" : ObjectID(id)});*/
    const result = await Fichaje.deleteOne({ _id: id });
    console.log("Se ha eliminado");
    return result;
  }
}
module.exports = serviciofichajes;
