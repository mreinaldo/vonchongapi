var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

// VERIFICACIÓN DE TOKEN PARA BLOQUEAR CONSULTAS  SIN ESTAR AUTENTICADO
exports.verifica_token = function(req, resp, next) {
    var token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return resp.status(501).json({
                ok: false,
                mensaje: 'Token invalido',
                errors: err
            });
        }

        req.usuario = decoded.usuario;

        next();
    });
}