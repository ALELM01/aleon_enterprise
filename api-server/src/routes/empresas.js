const express = require('express');
const router = express.Router()

var bodyParser = require('body-parser')
router.use(bodyParser.json())

router.use(function (req, res, next) {
    next()
  })
  const Servicioempresas = require('../services/empresa')
  const servicioempresas = new Servicioempresas();
  

  router.get('/', function (req, res) { 
    res.send('Saludos desde la empresa');
  });

  router.get('/:id', async function (req, res) { 
    resultado = await servicioempresas.listarempresas()
    res.send(resultado);
  });

  //POST
  router.post('/', async  (req, res) => {
    console.log(req.body)
servicioempresas.guardarempresas(req.body)
res.send('se ha guardado la empresa');
});



   //PUT
  router.put('/:id', (req, res) => {
    res.send('Modifique los datos');
    });
  //DELETE
  router.delete('/:id', (req, res) => {
    return res.send('Elimine los datos');
  });

  module.exports = router