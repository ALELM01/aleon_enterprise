const express = require('express');
const router = express.Router()

var bodyParser = require('body-parser')
router.use(bodyParser.json())

router.use(function (req, res, next) {
  next()
})
const Servicioempleados = require('../services/empleados')
const servicioempleados = new Servicioempleados();
const Serviciofichajes = require('../services/fichajes')
const serviciofichajes = new Serviciofichajes();
//EMPLEADO
//hacer fichaje y en auth para poder visualizarlo
router.get('/visualizarregistro', function (req, res) { 
    console.log("Registro de fichaje")
    res.render('hacerfichaje')
  });

  router.post('/registrarfichaje', async (req, res) => {
    console.log(req.body)
    resultado = serviciofichajes.guardarfichajes(req.body)
    res.send(resultado);
  });
  


  
module.exports = router