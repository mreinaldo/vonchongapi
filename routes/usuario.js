var express = require('express');
var mysql = require('mysql');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutenticacion = require('../middelwares/autenticacion');

var app = express();

var connection = mysql.createPool({
    host: 'vonchong.com',
    user: 'davilase_dbdav',
    password: 'YB7k@+aH)Sgt',
    database: 'davilase_vonchong_system',
    multipleStatements: true
});

// OBTENER TODOS LOS USUARIOS

app.get('/', (req, resp) => {

    connection.query("SELECT * FROM users", (error, rows) => {
        if (error) {
            return resp.status(500).json({
                ok: false,
                mensaje: 'Existe error cargando usuarios.',
                errors: error
            });
        } else {
            console.log('Datos bien');
            return resp.status(200).json({
                ok: true,
                data: rows
            });
        }
    });
});

// CREAR UN NUEVO USUARIO
app.post('/', mdAutenticacion.verifica_token, (req, resp) => {

    var body = req.body;

    connection.query("INSERT INTO users (name, email, password ) VALUES ('" + body.name + "', '" + body.email + "', '" + bcrypt.hashSync(body.password, 10) + "')", (error, rows) => {
        if (error) {
            return resp.status(500).json({
                ok: false,
                mensaje: 'Existe error insertando el usuario.',
                errors: error
            });
        } else {
            return resp.status(201).json({
                ok: true,
                data: body,
                usuarioToken: req.usuario
            });
        }
    });
});

// ACTUALIZAR USUARIO
app.put('/:id', mdAutenticacion.verifica_token, (req, resp) => {
    var id = req.params.id;

    var body = req.body;

    connection.query("SELECT id FROM users WHERE id = " + id, (error, rows) => {
        if (error) {
            return resp.status(500).json({
                ok: false,
                mensaje: 'NO Existe error insertando el usuario.',
                errors: error
            });
        } else {
            var query_string = '';
            if (body.nombre && body.nombre != '') {
                query_string += " name = '" + body.nombre + "'";
            }

            connection.query("UPDATE users SET " + query_string + "WHERE id = " + id, (error, rows) => {
                if (error) {
                    return resp.status(500).json({
                        ok: false,
                        mensaje: 'Existe error actualizando el usuario.',
                        errors: error
                    });
                } else {
                    return resp.status(201).json({
                        ok: true,
                        data: body,
                        usuarioToken: req.usuario
                    });
                }
            });
        }
    });
});

module.exports = app;