#!/usr/bin/env node

import { json, Router } from 'express'
import apimovies from '../api-movies/movies.json' with { type: 'json' }
import validacion from './validaciones.js';

const routerPatch = Router()

routerPatch.patch('/:id', (req, res) => {
  try {
    const { id } = req.params
    const index = apimovies.findIndex(video => video.id === id);
    if (index === -1) {
      return res.status(404).json({ message: 'pelicula no encontrada'})
    }

    const data = validacion.parse(req.body)
    apimovies[index] = {...apimovies[index], ...data}
    res.status(200).json(apimovies[index])
  } catch (error) {
    res.status(404).json({ message: error})
  }
})

export default routerPatch
