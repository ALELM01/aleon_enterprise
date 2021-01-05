const express = require("express");
const router = express.Router();

var bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded());

router.use(function (req, res, next) {
  next();
});
const Servicioempresas = require("../services/empresa");
const servicioempresas = new Servicioempresas();
const Servicioempleados = require('../services/empleados')
const servicioempleados = new Servicioempleados();
const Serviciojornadas = require('../services/jornadas')
const serviciojornadas = new Serviciojornadas();
//Obtener
//TODO: tengo que modificar tal y tal
router.get("/", async function (req, res) {
  /*va bien*/ console.log("GET /");
  resultado = await servicioempresas.listarempresas();
  res.send(resultado);
});

//por un id especifico
router.get("/api/:id", async function (req, res) {
  /*va bien*/ console.log("GET /" + req.params.id);
  resultado = await servicioempresas.idespecifico(req.params.id);
  console.log(resultado);
  res.send(resultado);
});

//POST
router.post("/api/", async (req, res) => {
  console.log("/POST empresa");
  console.log(req.body);
  resultado = servicioempresas.guardarempresas(req.body);
  res.send(resultado);
});

//PUT
router.put("/api/:id", async function (req, res) {
  resultado = await servicioempresas.modificarempresas(
    req.params.id,
    req.body
  );
  res.send("Modifique los datos");
});

//DELETE
//por un id especifico
router.delete("/api/:id", async function (req, res) {
  /*va bien*/ resultado = await servicioempresas.borrarespecifico(
  req.params.id
);
  res.send("Se ha eliminado");
});

//filtro empresa para visualizar empleados
router.get('/listadoempleados/:idEmpresa', async (req, res) => {
  console.log(req.body);
  result = await servicioempleados.filtrarempresa(req.params.idEmpresa)
  res.render('listadoempleados',
    result)
})
//visualizar fichajes
router.get('/visualizarfichajes/:dni_empleado', async function (req, res) { /*va bien*/
  //resultado = await serviciofichajes.listarfichajes()
  //res.send(resultado);
  res.send("")
});

//BAJA EMPLEADO
router.get('/deshabilitar/:dni_empleado', (req, res) =>  {
  res.render('listadoempleados')
})
//CARGA Y MUESTRA LOS DATOS EMPLEADO
router.get('/mostrarempleado/:id', async function (req, res)  {
  console.log(req.body);
  result = await servicioempleados.idespecifico(req.params.id)
  res.render('modificarempleado',
    result)
})

//MODIFICAR EMPLEADO
router.post('/modificarempleado/:iddelempleadodelaempresa', async function (req, res)  {
  console.log(req.body);
  console.log("-----------------------------------")
  console.log(req.params.iddelempleadodelaempresa);
  console.log("-----------------------------------")
  console.log(req.query);
  console.log("-----------------------------------")
  result = await servicioempleados.modificarempleado(req.params.iddelempleadodelaempresa, req.body)
  res.redirect('/empresas/listadoempleados/' + result.idEmpresa)    
})

//ACCESO A JORNADAS
router.get('/vistajornadas', async function (req, res) { /*va bien*/
  var empresasIdent = req.session.idEmpresa; /* aqui recogemos el valor de la url y en la variable 
  creada se lo pasamos al servicio en forma de parametro*/
  var jornada = await serviciojornadas.listarjornadas(empresasIdent)
  console.log('Pasando por el router');
  console.log(jornada);
    res.render('jornadas',  { jornada : jornada });
  });


  
router.get('/configurarjornadas', async (req, res) => {
  res.render('configurarjornadas')
})
//GUARDAR UNA JORNADA
  //POST
  router.post('/guardarjornada', async  (req, res) => {
    console.log(req.body)
    console.log('------------------------------------');
resultado = serviciojornadas.guardarjornadas(req.body)
console.log()
res.send(resultado);
});

module.exports = router;
