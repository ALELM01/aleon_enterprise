const { MongoClient, ObjectID } = require("mongodb");
const mongoose = require("mongoose");
const { db } = require("../models/empresa");
const Empresa = require("../models/empresa");
class servicioempresas {
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
  async listarempresas() {
    await this.connect();
    /*const resultado = await db.collection("empleados").find({}).toArray();
    console.log(resultado);*/
    const result = await Empresa.find();
    console.log(result);
    return result;
  }

  //guardar una empresa
  async guardarempresas(jsonempresas) {
    /*console.log ('vamos a guardar la empresa: '+JSON.stringify(jsonempresas));*/
    await this.connect();
    var resultado = await Empresa.findOne({ nombre : jsonempresas.nombre });
    console.log(resultado);
    if (resultado == null){
      const empre = new Empresa(jsonempresas);
      const result = await empre.save();
      return result;
    }
    else {
      console.log('no se ha guardado');
    }
    return null;
  }

  //llamar a un id especifico
  async idespecifico(id) {
    await this.connect();
    /*const result = await db.collection("empresa").find({"_id" : ObjectID(id)}).toArray();*/
    const result = await Empresa.findOne({ _id: id });
    console.log(result);
    return result;
  }

  //modificar una empresa
  async modificarempresas(id, datosNuevos) {
    await this.connect();
    /*const result = await db.collection("empresa").findOne({ _id: ObjectID(id) });*/
    const result = await Empresa.findOne({ _id: id });
    console.log("result: " + JSON.stringify(result));
    result.cif = datosNuevos.cif;
    result.nombre = datosNuevos.nombre;
    result.email = datosNuevos.email;
    console.log("result2: " + JSON.stringify(result));
    await result.save();
    return result;
  }
  //borrar a una empresa

  async borrarespecifico(id) {
    await this.connect();
    /*const result = await db.collection("empresa").deleteOne({"_id" : ObjectID(id)});*/
    const result = await Empresa.deleteOne({ _id: id });
    console.log("Se ha eliminado");
    return result;
  }

  //filtro de login
  async filtrologin(nombre, contrasenia) {
    await this.connect();
    var result = await Empresa.findOne({
      nombre: nombre,
      password: contrasenia,
    });
    console.log(result);
    return result;
  }

  //comprobacion
  /*La funcion comprobacion sirve para registrar una empresa*/
  async comprobacion(nombre) {
    await this.connect();
    var result = await Empresa.findOne({ nombre: nombre });
    console.log(result);
    return result;
  }
}

module.exports = servicioempresas;
