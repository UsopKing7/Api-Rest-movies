#!/usr/bin/env node
import { json, Router } from 'express';
import apimovies from '../movies.json' with { type: 'json'}

const routerGet = Router()

routerGet.get('/', (req, res) => {
  try {
    console.log('request recivida...', req.url)

    const { gender, yearOfBirth } = req.query
    if (gender) {
      const categoriaFiltrada = apimovies.filter(video => video.gender === gender)
      if (categoriaFiltrada) {
        res.status(200).json(categoriaFiltrada)
      } else {
        res.status(404).json({ message: "Error Not Font"})
      }

    } else if (yearOfBirth){
      const year = parseInt(yearOfBirth, 10)
      const filtrarYears = apimovies.filter(video => video.yearOfBirth === year && video.yearOfBirth !== null)
      if (filtrarYears) {
        res.status(200).json(filtrarYears)
      } else {
        res.status(404).json({ message: "Erro Not Font"})
      }
      
    } else {
      res.status(200).json(apimovies)
    }


  } catch (error) {
    res.status(500).json({ message: "Error interno en el servidor"})
  }
})

routerGet.get('/:id', (req, res) => {
  console.log('request recivida...', req.url)
  const { id } = req.params
  const video = apimovies.find(video => video.id === id)
  if (video) {
    res.status(200).json(video)
  } else {
    res.status(500).json({ message: "Error en el servidor"})
  }
})

routerGet.use((req, res) => {
  res.status(404).send('<h1> Error 404 Not Font </h1>')
})
export default routerGet
