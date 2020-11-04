const { MongoClient, connect } = require("mongodb");

// Database connection

class servicioempleados {
  constructor() {}

  async connect() {
    try {
      const client = await MongoClient.connect(
        "mongodb+srv://admin:Alex_1007@cluster0-yzhtx.mongodb.net/alm_enterprise?retryWrites=true&w=majority",
        {
          useUnifiedTopology: true,
        }
      );
      const db = client.db("alm_enterprise");
      console.log("DB is connected");
      return db;
    } catch (e) {
      console.log(e);
    }
  }
  /*
//conectar a la base de datos
const atlasURL = 
'mongodb+srv://admin:Alex_1007@cluster0-yzhtx.mongodb.net/alejandroleonmunozpro?retryWrites=true&w=majority'
mongoose.connect(atlasURL, {userNewUrlParser: true, useUnifiedTopology: true})
    .then(db => console.log('Conectado a la DB'))
    .catch(error => console.log(error))
*/
  //llamada a base de datos
  async listarempleados() {
    try {
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
    }
  }

  async guardarempleado(jsonempleado) {
    const db = await connect();
    const result = await db.collection("empleados").insert(jsonempleado);
    res.json(result);
  }

  /*console.log ('vamos a guardar el empleado: '+JSON.stringify(jsonempleado));*/
}

module.exports = servicioempleados;
