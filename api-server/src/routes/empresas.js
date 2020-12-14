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

//Obtener
//TODO: tengo que modificar tal y tal
router.get("/", async function (req, res) {
  /*va bien*/ console.log("GET /");
  resultado = await servicioempresas.listarempresas();
  res.send(resultado);
});

//por un id especifico
router.get("/:id", async function (req, res) {
  /*va bien*/ console.log("GET /" + req.params.id);
  resultado = await servicioempresas.idespecifico(req.params.id);
  console.log(resultado);
  res.send(resultado);
});

//POST
router.post("/", async (req, res) => {
  console.log("/POST empresa");
  console.log(req.body);
  resultado = servicioempresas.guardarempresas(req.body);
  res.send(resultado);
});

//PUT
router.put("/:id", async function (req, res) {
  resultado = await servicioempresas.modificarempresas(
    req.params.id,
    req.body
  );
  res.send("Modifique los datos");
});

//DELETE
//por un id especifico
router.delete("/:id", async function (req, res) {
  /*va bien*/ resultado = await servicioempresas.borrarespecifico(
    req.params.id
  );
  res.send("Se ha eliminado");
});


module.exports = router;
