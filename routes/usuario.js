var express = require('express');
var bcrypt = require('bcryptjs');

var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();

var Usuario = require('../models/usuario');

// =================================
// Obtener todos los usuarios (GET).
// =================================
app.get('/', (req, res, next) => {
    Usuario.find({}, 'nombre apellido altura peso role email password direccion tfno img')
        .exec((err, usuarios) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando usuarios',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                usuarios: usuarios
            });
        });
});

// =================================
// Crear un nuevo usuario (POST)
// =================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {
    var body = req.body;
    var usuario = new Usuario({
        nombre: body.nombre,
        apellido: body.apellido,
        altura: body.altura,
        peso: body.peso,
        role: body.role,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), // Encriptamos la contraseña
        direccion: body.direccion,
        tfno: body.tfno,
        img: body.img
    });
    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error creando el usuario',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
            usuarioToken: req.usuario
        });
    });
});

// =================================
// Actualizar un usuario (PUT).
// =================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;
    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar el usuario',
                errors: err
            });
        }
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id: ' + id + 'no existe!',
                errors: { message: 'No existe un usuario con ese ID' }
            });
        }
        // Campos actualizables
        usuario.nombre = body.nombre;
        usuario.apellido = body.apellido;
        usuario.altura = body.altura;
        usuario.peso = body.peso;
        usuario.role = body.role;
        usuario.email = body.email;
        usuario.direccion = body.direccion;
        usuario.tfno = body.tfno;
        usuario.save((err, usuarioActualizado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el usuario',
                    errors: err
                });
            }
            usuarioActualizado.password = ';)';
            res.status(200).json({
                ok: true,
                usuarioActualizado: usuarioActualizado
            });
        });
    });
});

// =================================
// Eliminar un usuario (DELETE).
// =================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {
    var id = req.params.id;
    Usuario.findByIdAndRemove(id, (err, usuarioEliminado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error eliminando el usuario',
                errors: err
            });
        }
        if (!usuarioEliminado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un usuario con el id: ' + id,
                errors: { message: 'No existe un usuario con el id: ' + id }
            });
        }
        res.status(200).json({
            ok: true,
            usuario: usuarioEliminado
        });
    });
});

module.exports = app;