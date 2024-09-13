const express = require('express');

const app = express();

app.use(express.json());

const cors = require('cors');
app.use(cors());

const usuarios = [
    { nombre: "ana", apellido: "martinez", email: "ana@gmail.com", constrasena: "123456", pokemon: "pikachu" }
];

app.post('/validar', (req, res) => {
    const { email } = req.body;

    // Verificar si el email está registrado
    const usuarioExistente = usuarios.find((usuario) => usuario.email === email);

    // Si el usuario ya existe, retornamos el código 409 (Conflict)
    if (usuarioExistente) {
        return res.status(409).json({ mensaje: 'El email ya está registrado' });
    }

    // Si el usuaro no existe, devolvemos el 200 (OK)
    return res.status(200).json({ mensaje: 'El email no está registrado' });
});


app.post('/crearusuario', (req, res) => {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const email = req.body.email;
    const constrasena = req.body.constrasena;
    const pokemon = req.body.pokemon;

    const nuevousuario = {
        nombre,
        apellido,
        email,
        constrasena,
        pokemon
    }

    usuarios.push(nuevousuario);
    return res.status(201).json({ msg: "Usuario creado", nombre: nuevousuario.nombre })

});


app.listen(3000, () => {
    console.log(`Servidor corriendo en http://localhost:${3000}`);
});