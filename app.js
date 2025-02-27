#!/usr/bin/env node
import express from 'express';
import routerGet from './routers/get-controllers.js';
const app = express()
app.use(express.json())

// los Gets dando informcion al usuaior 
app.get('/', (req, res) => {
    console.log('request recivida...', req.url)
    res.send('<h1> Hello Word </h1>')
})
app.use('/movies', routerGet)
app.use('/movies/:id', routerGet)

// servidor escuchando en el puerto
const port = process.env.PORT ?? 3333
app.listen(port, () => {
    console.log('Servidor => http://localhost:' + port)
})