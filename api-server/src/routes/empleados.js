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
  router.get('/:id', async function (req, res) { /*va bien*/
    resultado = await servicioempleados.listarempleados()
    
    res.send(resultado);
  });
  

  //POST
  router.post('/', async  (req, res) => {
      console.log(req.body)
  servicioempleados.guardarempleado(req.body)
  res.send('se ha guardado el empleado');
  });

   //PUT
  router.put('/:id', (req, res) => {
    res.send('Modifique los datos');
    });
  //DELETE
  router.delete('/:id', (req, res) => {
    return res.send('Elimine los datos');
  });

 router.get('/', async function (req, res) { /*va bien*/
    resultado = await listarempleados()
    console.log("------------------------------------------------------")
    console.log("result2: "+result2)
    console.log("------------------------------------------------------")
    res.send(resultado);
  });

  module.exports = router