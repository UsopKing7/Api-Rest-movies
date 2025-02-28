#!/usr/bin/env node
import express from 'express';
import router from './routers/controllers.js';

const app = express()
app.use(express.json())

// los Gets dando informcion al usuaior 
app.use('/movies', router)
app.use('/movies/:id', router)

// servidor escuchando en el puerto
const port = process.env.PORT ?? 3333
app.listen(port, () => {
    console.log('Servidor => http://localhost:' + port)
})

