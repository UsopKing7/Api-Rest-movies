#!/usr/bin/env node
import { json, Router } from 'express';
import apimovies from '../movies.json' with { type: 'json'}

const router = Router()

router.get('/', (req, res) => {
  try {
    console.log('request recivida...', req.url)

    // Filtracion por genero 
    const { gender, yearOfBirth, name } = req.query
    if (gender) {
      const categoriaFiltrada = apimovies.filter(video => video.gender === gender)
      if (categoriaFiltrada) {
        res.status(200).json(categoriaFiltrada)
      } else {
        res.status(404).json({ message: "Error Not Font"})
      }

      // filtracion por año
    } else if (yearOfBirth){
      const year = parseInt(yearOfBirth)
      const filtrarYears = apimovies.filter(video => video.yearOfBirth === year && video.yearOfBirth !== null)
      if (filtrarYears) {
        res.status(200).json(filtrarYears)
      } else {
        res.status(404).json({ message: "Erro Not Font"})
      }
      // mostrar por name
    } else  if (name){
      const filterName = apimovies.filter(video => video.name.toLowerCase().trim() === name.toLowerCase().trim())
      if (filterName) {
        res.status(200).json(filterName)
      } else {
        res.status(404).json({ message: "Erron Not Font"})
      }

      // mostrar toda la API
    } else {
      res.status(200).json(apimovies)
    }

  } catch (error) {
    res.status(500).json({ message: "Error interno en el servidor"})
  }
})

router.get('/:id', (req, res) => {
  console.log('request recivida...', req.url)
  const { id } = req.params
  const video = apimovies.find(video => video.id === id)
  if (video) {
    res.status(200).json(video)
  } else {
    res.status(500).json({ message: "Error en el servidor"})
  }
})

router.use((req, res) => {
  res.status(404).send('<h1> Error 404 Not Font </h1>')
})
export default router
