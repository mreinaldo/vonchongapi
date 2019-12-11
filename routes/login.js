var express = require('express');
var mysql = require('mysql');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

var app = express();

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'occo',
    multipleStatements: true
});

app.post('/', (req, resp) => {

    var body = req.body;

    connection.query(`SELECT email, password FROM users WHERE email = '${ body.email }'`, (error, rows) => {
        if (error) {
            return resp.status(500).json({
                ok: false,
                mensaje: 'Error al consultar usuarios',
                errors: error
            });
        }

        if (rows.length === 0) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas',
                errors: error
            });
        }

        if (!bcrypt.compareSync(body.password, rows[0].password)) {
            return resp.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas',
                errors: error
            });
        }

        // Creando el token 
        rows[0].password = ':)';
        var token = jwt.sign({ usuario: rows[0] }, SEED, { expiresIn: 14400 })
        return resp.status(200).json({
            ok: true,
            data: rows,
            token: token,
            message: 'Login correcto'
        });
    });
});

module.exports = app;