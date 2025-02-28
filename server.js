#!/usr/bin/env node
import express from 'express';
import routes from './src/routers/index.js';

const app = express()
app.use(express.json())

// los Gets dando informcion al usuaior 

routes.forEach(routes => app.use('/movies', routes))

// servidor escuchando en el puerto
const port = process.env.PORT ?? 3333
app.listen(port, '0.0.0.0', () => {
    console.log('Servidor => http://0.0.0.0:' + port)
})

