const express = require("express");
const app = express();
const session = require("express-session");
const path = require("path");
const Servicioempresas = require("./services/empresa");
const servicioempresas = new Servicioempresas();
const Servicioempleados = require("./services/empleados");
const servicioempleados = new Servicioempleados();
const Serviciojornadas = require('./services/jornadas')
const serviciojornadas = new Serviciojornadas();
// parse application/json
var bodyParser = require("body-parser");
app.use(bodyParser());
const port = 3000;

//SESION

app.use(
  session({
    secret: "alejandro",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  res.locals.admin = req.session.admin;
  res.locals.employee = req.session.empleado;
  res.locals.idEmpresa = req.session.idEmpresa;
  res.locals.userid = req.session.userid;
  next();
});

// Authentication and Authorization Middleware
var auth = function (req, res, next) {
  if (req.session && req.session.admin) {
    res.locals.user = req.session.user;
    res.locals.idEmpresa = req.session.idEmpresa;
    res.locals.admin = req.session.admin;
    res.locals.employee = req.session.employee;
    console.log(res.locals)
    next();
  } else return res.sendStatus(401);
};
var authempleado = function (req, res, next) {
  if (req.session && req.session.user) {
    res.locals.user = req.session.user;
    res.locals.idEmpresa = req.session.idEmpresa;
    res.locals.admin = req.session.admin;
    res.locals.userid = req.session.userid;
    res.locals.employee = req.session.employee;
    console.log(res.locals)
    next();
  } else return res.sendStatus(401);
};
// Importing Routes
const indexRoutes = require("./routes/index");
const empleadosRoutes = require("./routes/empleados");
const empresasRoutes = require("./routes/empresas");
const jornadasRoutes = require("./routes/jornadas");
const fichajesRoutes = require("./routes/fichajes");
const vistaempleadosRoutes = require("./routes/vistaempleados");

// Routes
app.use("/", indexRoutes);
app.use("/empleados", authempleado, empleadosRoutes);
app.use("/empresas", auth, empresasRoutes);
app.use("/jornadas", jornadasRoutes);
app.use("/fichajes", fichajesRoutes);
app.use("/vistaempleados", vistaempleadosRoutes);

//setting
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("port", port);

// Login endpoint
app.get("/login", async function (req, res) {
  result = await servicioempresas.filtrologin(req.query.nombre, req.query.password)
  console.log('login inicio');
  console.log(result);
  if (result == null) {
    res.redirect('vistaloginempresa')
  }

  else {
    req.session.user = result.nombre;
    req.session.idEmpresa = result._id;
    req.session.admin = true;
    req.session.employee = false;
    res.redirect('/')
  }
});


// Login endpoint
app.get("/loginempl", async function (req, res) {
  result = await servicioempleados.filtrologinempl(req.query.nombre, req.query.password)
  console.log(req.query.nombre, req.query.password);
  console.log('login inicio');
  console.log(result);
  if (result == null) {
    res.redirect('vistaLoginEmpleados')
  }

  else {

    req.session.user = result.nombre;
    req.session.idEmpresa = result.idEmpresa;
    req.session.userid = result._id;
    req.session.admin = false;
    req.session.employee = true;
    res.redirect('/')
  }
});

// Logout endpoint
app.get("/logout", function (req, res) {
  req.session.destroy();
  /*res.send("logout success!");*/
  res.redirect("/")
});


// Get content endpoint
app.get("/content", auth, function (req, res) {
  res.send("You can only see this after you've logged in.");
});

//Iniciando Servidor
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
