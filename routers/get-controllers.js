#!/usr/bin/env node
import { Router } from 'express';
import apimovies from '../api-movies/movies.json' with { type: 'json'}

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
    const filterName = apimovies.filter(video => video.name === name)
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
  const videoId = apimovies.find(video => video.id === id)
  if (videoId) {
    console.log('peticion resivida.../movies'+ req.url)
    res.status(200).json(videoId)
  } else {
    res.status(404).json({ message: "error 404 not font"})
  }
})

routerGet.use((req, res) => {
  res.status(404).json({ message: "error 404"})
})
export default routerGet
