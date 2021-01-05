const { MongoClient, ObjectID } = require("mongodb");
const mongoose = require("mongoose");
const Jornada = require("../models/jornada");
class serviciojornadas {
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
  async listarjornadas(identEmpresa) {
    await this.connect();
    /*const resultado = await db.collection("empleados").find({}).toArray();
    console.log(resultado);*/
    const result = await Jornada.find({idEmpresa : identEmpresa});
    console.log(result);
    return result;
  }

  //guardar una jornada
  async guardarjornadas(jsonjornadas) {
    await this.connect();
    const jorna = new Jornada(jsonjornadas);
    console.log(jorna)
    console.log('111111111111111111111111111111111111111')
    const result = await jorna.save();
    return result;
  }

  //llamar a un id especifico
  async idespecifico(id) {
    await this.connect();
    /*const result = await db.collection("fichaje").find({"_id" : ObjectID(id)}).toArray();*/
    const result = await Jornada.findOne({ _id: id });
    console.log(result);
    return result;
  }

  //modificar una jornada cambiar a datos de jornada
  async modificarjornada(id, datosNuevos) {
    await this.connect();
    /*const result = await db.collection("jornada").findOne({ _id: ObjectID(id) });*/
    const result = await Jornada.findOne({ _id: id });
    console.log("result: " + JSON.stringify(result));
    result.duracion = datosNuevos.duracion;
    result.tipo = datosNuevos.tipo;
    console.log("result2: " + JSON.stringify(result));
    await result.save();
    return result;
  }

  //borrar a una jornada

  async borrarespecifico(id) {
    await this.connect();
    /*const result = await db.collection("jornada").deleteOne({"_id" : ObjectID(id)});*/
    const result = await Jornada.deleteOne({ _id: id });
    console.log(result);
    console.log("Se ha eliminado");
    return result;
  }
}
module.exports = serviciojornadas;
