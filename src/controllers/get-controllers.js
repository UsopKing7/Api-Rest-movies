#!/usr/bin/env node
import { Router } from 'express';
import apimovies from '../api-movies/movies.json' with { type: 'json'}
import validacion from './validaciones.js';

const routerGet = Router()

routerGet.get('/', (req, res) => {
  const { gender, yearOfBirth, name } = req.query

  if (gender) {
    const filterGender = apimovies.filter(video => video.gender === gender)
    if (filterGender) {
      console.log('peticion resivida.../movies' + req.url)
      return res.status(200).json(filterGender)
    } else {
      return res.status(200).json({ error: "404"})
    }

  } else if (yearOfBirth) {
    const filterYear = apimovies.filter(video => video.yearOfBirth === Number(yearOfBirth))
    if (filterYear.length > 0) {
      console.log('peticion resivida.../movies'+ req.url)
      return res.status(200).json(filterYear)
    } else {
      return res.status(200).json({ error: "404"})
    }

  }else if (name) {
    const filterName = apimovies.filter(video => video.name.toUpperCase() === name.toUpperCase())
    if (filterName) {
      console.log('peticion recivida.../movies'+ req.url)
      return res.status(200).json(filterName)
    } else {
      return res.status(404).json({ error: "404"})
    }
  }
  
  console.log('peticion resivida.../movies'+ req.url)
  return res.status(200).json(apimovies)
})

routerGet.get('/:id', (req, res) => {
  const { id } = req.params
  const videoId = apimovies.filter(video => video.id === id);
  if (videoId) {
    console.log('peticion resivida.../movies'+ req.url)
    res.status(200).json(videoId)
  } else {
    res.status(404).json({ message: "error 404 not font"})
  }
}) 

// para eliminar 
routerGet.delete('/:id', (req, res) => {
  const { id } = req.params
  const index = apimovies.findIndex(video => String(video.id) === id)
  if (index !== -1) {
    const videoDelete = apimovies.splice(index, 1)
    return res.status(200).json(videoDelete[0])
  } else {
    return res.status(404).json({ message: 'video eliminado'})
  }
})

//para actualisar
routerGet.patch('/:id', (req, res) => {
  try {
    const { id } = req.params
    const index = apimovies.findIndex(video => video.id.toString() === id);
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


routerGet.use((req, res) => {
  res.status(404).json({ message: "error 404"})
})
export default routerGet
