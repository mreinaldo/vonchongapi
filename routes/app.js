var express = require('express');

var app = express();

var os = require("os");
var hostname = os.networkInterfaces();

app.get('/', (req, resp) => {
    resp.status(200).json({
        ok: true,
        mensaje: hostname
    });
});

module.exports = app;