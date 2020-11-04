const express = require('express');
const router = express.Router()
const {MongoClient, connect} = require('mongodb');
router.use(function (req, res, next) {
    next()
  })


router.get('/inicio', async (req, res) => {
    res.render('inicio')
})

router.get('/database', async (req, res) => {
    res.render('database')
})

router.get('/vistaempleados', async (req, res) => {
    res.render('empleados')
})

router.get('/empresa', async (req, res) => {
    res.render('empresa')
})

//llamada a base de datos
async function basedatos(){
    try {
      const client = await MongoClient.connect('mongodb+srv://admin:Alex_1007@cluster0-yzhtx.mongodb.net/alm_enterprise?retryWrites=true&w=majority', {
          useUnifiedTopology: true
      })
      const db = client.db('alm_enterprise')
      console.log('DB is connected')
      const result = await db.collection('empleados').find({}).toArray()
      console.log(result);
      return result;
    } catch(e) {
      console.log(e)
    } 
  }


  //OPERACIONES DE PUT-DELETE-GET-POST

  //EMPRESA

   //GET
   /*
  router.get('/empres', function (req, res) {  /*fallo en await
    resultado = await basedatos() 
   resultado1 = await db.collection('empresa').find({}).toArray()
    res.send(resultado1)
  });
*/
 



  




  module.exports = router