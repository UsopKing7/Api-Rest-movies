#!/usr/bin/env node

import { Router } from 'express';
import apimovies from '../api-movies/movies.json' with { type: 'json' }
import validacion from './validaciones.js';

const routerPost = Router()

routerPost.post('/', (req, res) => {
  try {
    const newMovies = validacion.parse(req.body)
    apimovies.push(newMovies)
    res.status(201).json(newMovies)
  } catch (error) {
    return res.status(400).json({ error: error.message || "Error en la solicitud" });
  }
})

export default routerPost
