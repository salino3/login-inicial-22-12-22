// npm init -y
// npm i express cors nodemon
// npm install jsonwebtoken

//*> start with: nodemon login-api/app.js

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

const TOKEN_KEY = "xsdmf434bFFnH894HjnJmdjbdbbdsy";

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(authHeader);
    if(token == null)
      return res.status(401).send("Token requerido");
    
    jwt.verify(token, TOKEN_KEY, (err, user) => {
        if(err) return res.status(403).send("Token invalido");
        console.log(user);
        req.user = user;
        next();
    })
};


app.post("/usuario/login", (req, res) => {
  const usuario = req.body.usuario;
  const clave = req.body.clave;
  if(usuario == 'gigi123' && clave == '123456'){   
    const datos = {
        id: "123",
        nombre: "Gigi",
        email: "gigi@gmail.com",
        codigo: "abc123"
    };
    const token = jwt.sign(
        {userId: datos.id, email: datos.email},
        TOKEN_KEY,
        {expiresIn: "2h"}
    );
let nDatos = {...datos, token };

    res.status(200).json(nDatos)
  }else{
    res.status(400).send("Credenciales incorrectas");
  }
});

app.get('/usuario/:id/ventas', verifyToken, (req, res) => {
    const datos = [
      { id: 1, cliente: "Empresa A", total: 2500, fecha: "2022-01-15" },
      { id: 2, cliente: "Empresa B", total: 2100, fecha: "2022-01-18" },
      { id: 3, cliente: "Empresa C", total: 200, fecha: "2022-01-23" },
    ]; 
    res.json(datos)
});


app.listen(3300, () => {
    console.log("Servidor iniciando en el puerto 3300");
})



