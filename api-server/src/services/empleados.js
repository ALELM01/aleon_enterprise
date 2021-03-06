const { MongoClient, ObjectID } = require("mongodb");
const mongoose = require("mongoose");
const Empleados = require("../models/empleado");
const empresa = require("../models/empresa");

class servicioempleados {
  constructor() { }

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
  async listarempleados() {
    await this.connect();
    /*const resultado = await db.collection("empleados").find({}).toArray();
    console.log(resultado);*/
    const result = await Empleados.find();
    console.log(result);
    return result;
  }

  //llamar a un id especifico
  async idespecifico(id) {
    await this.connect();
    /*const result = await db
      .collection("empleados")
      .find({ _id: ObjectID(id) })
      .toArray();*/
    const result = await Empleados.findOne({ _id: id }); //el de la izquiera es el campo del modelo, el de la derecha es el valor.
    console.log(result);
    return result;
  }

  //modificar un empleado
  async modificarempleado(id2, datosNuevos) {
    await this.connect();
    /*const result = await db
      .collection("empleados")
      .findOne({ _id: ObjectID(id) });*/
    const result = await Empleados.findOne({ _id: id2});
    console.log("result: " + JSON.stringify(result));
    result.dni = datosNuevos.dni;
    result.nombre = datosNuevos.nombre;
    result.apellidos = datosNuevos.apellidos;
    result.puesto = datosNuevos.puesto;
    result.codigoEmpleado = datosNuevos.codigoEmpleado;
    result.email = datosNuevos.email;
    console.log("result2: " + JSON.stringify(result));
    /*const actualizar = await db.collection("empleados").save(result);*/
    await result.save();
    return result;
  }

  //borrar a un usuario

  async borrarespecifico(id) {
    await this.connect();
    /*const result = await db
      .collection("empleados")
      .deleteOne({ _id: ObjectID(id) });*/
    const result = await Empleados.deleteOne({ _id: id });
    console.log("Se ha eliminado");
    return result;
  }

  /*try {
      const client = await MongoClient.connect(
        "mongodb+srv://admin:Alex_1007@cluster0-yzhtx.mongodb.net/alm_enterprise?retryWrites=true&w=majority",
        {
          useUnifiedTopology: true,
        }
      );
      const db = client.db("alm_enterprise");
      console.log("DB is connected");
      const result = await db.collection("empleados").find({}).toArray();
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
    }*/

  async guardarempleado(jsonempleado) {
    await this.connect();
    const emplead = new Empleados(jsonempleado);
    const result = await emplead.save()
    console.log(1)
    return result;
  }

  /*pasar identificador empresa a empleado*/
  async filtrarempresa(idEmpresa) {
    await this.connect();
    const filtro = await Empleados.find({ idEmpresa: idEmpresa });
    console.log(filtro);
    return filtro;
  }

  //filtro login
  //filtro de login
  async filtrologinempl(nombre, contrasenia) {
    await this.connect();
    var result = await Empleados.findOne({
      nombre: nombre,
      password: contrasenia,
    });
    console.log(result);
    return result;
  }
  //comprobacion
  async comprobacionempl(nombre) {
    await this.connect();
    var result = await Empleado.findOne({ nombre: nombre });
    console.log(result);
    return result;
  }
}





module.exports = servicioempleados;
