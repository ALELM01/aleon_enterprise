const express = require('express');
const app = express();
const path = require('path');
// parse application/json
var bodyParser = require('body-parser')
app.use(bodyParser.json())
const port = 3000;

// Importing Routes
const indexRoutes = require('./routes/index')
const empleadosRoutes = require('./routes/empleados')
const empresasRoutes = require('./routes/empresas')
const jornadasRoutes = require('./routes/jornadas')
const fichajesRoutes = require('./routes/fichajes')
// Routes
app.use('/', indexRoutes)
app.use('/empleados', empleadosRoutes)
app.use('/empresas', empresasRoutes)
app.use('/jornadas', jornadasRoutes)
app.use('/fichajes', fichajesRoutes)

//setting
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.set('port', port)


//Iniciando Servidor
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})






