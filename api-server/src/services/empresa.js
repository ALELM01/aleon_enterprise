const {MongoClient, connect} = require('mongodb');
class servicioempresas {
  constructor() {}

  //llamada a base de datos
  async listarempresas() {
    try {
      const client = await MongoClient.connect(
        "mongodb+srv://admin:Alex_1007@cluster0-yzhtx.mongodb.net/alm_enterprise?retryWrites=true&w=majority",
        {
          useUnifiedTopology: true,
        }
      );
      const db = client.db("alm_enterprise");
      console.log("DB is connected");
      const result = await db.collection("empresas").find({}).toArray();
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  guardarempresas(jsonempresas){
    console.log ('vamos a guardar la empresa: '+JSON.stringify(jsonempresas));

}

}



module.exports = servicioempresas;