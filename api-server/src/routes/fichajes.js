const express = require('express');
const router = express.Router()

var bodyParser = require('body-parser')
router.use(bodyParser.json())

router.use(function (req, res, next) {
  next()
})
const Serviciofichajes = require('../services/fichajes')
const serviciofichajes = new Serviciofichajes();

//FICHAJES


//GET
/*
  router.get('/', function (req, res) { 
   res.send('Saludos del empleado');
 });
 */


//por un id especifico
router.get('/:id', async function (req, res) { /*va bien*/
  resultado = await serviciofichajes.idespecifico(req.params.id)
  res.send(resultado);
});


//POST
router.post('/', async (req, res) => {
  console.log(req.body)
  resultado = serviciofichajes.guardarfichajes(req.body)
  res.send(resultado);
});

//PUT
router.put('/:id', async function (req, res) {
  resultado = await serviciofichajes.modificarfichaje(req.params.id, req.body)
  res.send('Modifique los datos');
});




//DELETE
//por un id especifico
router.delete('/:id', async function (req, res) { /*va bien*/
  resultado = await serviciofichajes.borrarespecifico(req.params.id)
  res.send();
});


module.exports = router