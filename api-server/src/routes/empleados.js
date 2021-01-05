const express = require('express');
const router = express.Router()

var bodyParser = require('body-parser')
router.use(bodyParser.json())

router.use(function (req, res, next) {
  next()
})
const Servicioempleados = require('../services/empleados')
const servicioempleados = new Servicioempleados();

//EMPLEADO


//GET
/*
  router.get('/', function (req, res) { 
   res.send('Saludos del empleado');
 });
 */
router.get('/', async function (req, res) { /*va bien*/
  result = await servicioempleados.listarempleados()
  res.send(result);
});
//por un id especifico
router.get('/api/:id', async function (req, res) { /*va bien*/
  resultado = await servicioempleados.idespecifico(req.params.id)
  res.send(resultado);
});


//POST
router.post('/api/', async (req, res) => {
  console.log(req.body)
  console.log(0)
  
  resultado = await servicioempleados.guardarempleado(req.body).catch((error)=>{
    console.log(2)
    res.send(error);
  })
  console.log(2)
  res.send(resultado);
});

//PUT
router.put('/api/:id', async function (req, res) {
  console.log(req.body)
  resultado = await servicioempleados.modificarempleado(req.params.id, req.body)
  res.send('Modifique los datos');
});




//DELETE
//por un id especifico
router.delete('/api/:id', async function (req, res) { /*va bien*/
  resultado = await servicioempleados.borrarespecifico(req.params.id)
  res.send();
});


module.exports = router