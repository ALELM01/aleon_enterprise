const express = require('express');
const router = express.Router()

var bodyParser = require('body-parser')
router.use(bodyParser.json())

router.use(function (req, res, next) {
    next()
  })
  const Serviciojornadas = require('../services/jornadas')
 const serviciojornadas = new Serviciojornadas();

//FICHAJES

  
   //GET
 /*
   router.get('/', function (req, res) { 
    res.send('Saludos del empleado');
  });
  */
 router.get('/', async function (req, res) { /*va bien*/
  resultado = await serviciojornadas.listarjornadas()
    res.send(resultado);
  });
//por un id especifico
  router.get('/:id', async function (req, res) { /*va bien*/
    resultado = await serviciojornadas.idespecifico( req.params.id)
    res.send(resultado);
  });
  

  //POST
  router.post('/', async  (req, res) => {
      console.log(req.body)
  resultado = serviciojornadas.guardarjornadas(req.body)
  res.send(resultado);
  });

   //PUT
  router.put('/:id', async function (req, res) {
    resultado = await serviciojornadas.modificarjornada( req.params.id, req.body)
    res.send('Modifique los datos');
    });




  //DELETE
//por un id especifico
router.delete('/:id', async function (req, res) { /*va bien*/
  resultado = await serviciojornadas.borrarespecifico( req.params.id)
  res.send();
});


  module.exports = router