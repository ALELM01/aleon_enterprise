const express = require("express");
const app = express();
const session = require("express-session");
const path = require("path");
const Servicioempresas = require("./services/empresa");
const servicioempresas = new Servicioempresas();
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

app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  res.locals.admin = req.session.admin;
  res.locals.empleado = req.session.empleado;
  next();
});

// Authentication and Authorization Middleware
var auth = function (req, res, next) {
  if (req.session && req.session.user === "pepe" && req.session.admin) {
    res.locals.user = req.session.user;
    res.locals.admin = req.session.admin;
    res.locals.empleado = req.session.empleado;
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
// Routes
app.use("/", indexRoutes);
app.use("/empleados", auth, empleadosRoutes);
app.use("/empresas", auth, empresasRoutes);
app.use("/jornadas", jornadasRoutes);
app.use("/fichajes", fichajesRoutes);

//setting
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.set("port", port);

// Login endpoint
app.get("/login", async function (req, res) {
  result = await servicioempresas.filtrologin(req.query.nombre, req.query.password)
  console.log('login inicio');
  console.log(result);
  if (result == null){
    res.redirect('vistaloginempresa')
  }
  
  else {
      req.session.user = result.nombre;
      req.session.admin = true;
      req.session.empleado = false;
    res.redirect('/')
  }
});

// Logout endpoint
app.get("/logout", function (req, res) {
  req.session.destroy();
  /*res.send("logout success!");*/
  res.redirect("/")
});

// Login endpoint
app.get("/loginempl", function (req, res) {
  console.log(req.query);
  if (!req.query.nombre || !req.query.password) {
    console.log("no he llegado a iniciar sesion");
    res.render("loginempleado");
  } else if (
    req.query.nombre === "pepe" &&
    req.query.password === "alejandro"
  ) {
    req.session.user = "pepe";
    req.session.admin = false;
    req.session.empleado = true;
    console.log("he llegado a iniciar sesion");
    res.redirect("/");
  } else {
    res.render("loginempleado");
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
