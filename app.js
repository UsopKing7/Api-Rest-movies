#!/usr/bin/env node
import express from 'express';
import routes from './routers/index.js';

const app = express()
app.use(express.json())

// los Gets dando informcion al usuaior 

routes.forEach(routes => app.use('/movies', routes))

// servidor escuchando en el puerto
const port = process.env.PORT ?? 3333
app.listen(port, () => {
    console.log('Servidor => http://localhost:' + port)
})


