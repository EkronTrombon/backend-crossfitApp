// Requires
var express = require('express');
var mongoose = require('mongoose');

// Inicializar variables
var app = express();

// Conexión a BBDD (mongoose)
mongoose.connection.openUri('mongodb://localhost:27017/crossfitDB', (err, res) => {
    if (err) throw err;
    console.log('Base de datos <crossfitDB>: \x1b[32m%s\x1b[0m', 'online');
});

// Rutas
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Petición realizada correctamente'
    });
});

// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express server, Puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});