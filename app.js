//REQUIRES
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser')

// iNICIALIZAR VARIALES
var app = express();

//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT, OPTIONS");
    next();
});

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// IMPORTAR RUTAS
var appRoutes = require('./routes/app');
var usuarioRoute = require('./routes/usuario');
var loginRoute = require('./routes/login');
var os = require("os");
var hostname = os.hostname();


// CONNECTION MYSQL
var connection = mysql.createPool({
    host: 'vonchong.com',
    user: 'davilase_dbdav',
    password: 'YB7k@+aH)Sgt',
    database: 'davilase_vonchong_system'
});


app.set('port', process.env.PORT || 3000);
// connection.connect(error => {
//     if (!!error) {
//         console.log('Error de conección con la base de datos');
//     } else {
//         console.log('Conección satisfactoria a la base de datos');
//     }
// });


// RUTAS
app.use('/usuario', usuarioRoute);
app.use('/login', loginRoute);
app.use('/', appRoutes);

//ESCUCHAR PETICIONES
app.listen(app.get('port'), () => {
    console.log('Express server corriendo en Heroku: \x1b[32m%s\x1b[0m', ' online', hostname);
});