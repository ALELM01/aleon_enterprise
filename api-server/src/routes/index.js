const express = require('express');
const router = express.Router()
const {MongoClient, connect} = require('mongodb');
const { get } = require('mongoose');

//SERVICIOS UTILIZADOS DE EMPRESA Y EMPLEADOS
const Servicioempleados = require('../services/empleados')
const servicioempleados = new Servicioempleados();
const Servicioempresas = require("../services/empresa");
const servicioempresas = new Servicioempresas();

router.use(function (req, res, next) {
    next()
  })
  
//----------------------------------------------------//




router.get('/', async (req, res) => {
  console.log(req.session);
    res.render('inicio')
})

router.get('/vistaLoginEmpresa', async (req, res) => {
  res.render('loginempresa')
})

router.get('/vistaLoginEmpleados', async (req, res) => {
  res.render('loginempleado')
})

router.get('/vistaRegistrarEmpleados', async (req, res) => {
  res.render('empleados')
})

//VISUALIZAR JORNADAS
/*
router.get('/vistajornadas', async (req, res) => {
  res.render('jornadas')
})
*/







router.get('/listadoempleados', async (req, res) => {
  result = await servicioempleados.listarempleados()
  res.render('listadoempleados',
  result)
})
//login
router.get("/loginEmpresa", async (req, res) => {
  console.log("/get login");
  console.log(req.body);
  //TODO login

  //login bien
  res.render('inicio')

  //login mal
  //res.render('loginempresa')
});
router.get("/loginEmpleado", async (req, res) => {
  console.log("/get login");
  console.log(req.body);
  //TODO login

  //login bien
  res.render('inicio')

  //login mal
  //res.render('loginempleado')
});

router.get('/loginAceptado', async (req, res) => {
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




router.post("/regiempre", async (req, res) => {
  console.log("/POST empresa");
  console.log(req.body);
  resultado = await servicioempresas.guardarempresas(req.body);
  console.log('estructura');
  console.log(resultado);
  if (resultado == null){
    res.redirect('empresa')
  }
  
  else {
    console.log('se ha guardado');
    res.render('loginempresa')
  }
});

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