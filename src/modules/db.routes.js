#!/usr/bin/env node

import { Router } from 'express'
import { pool } from './pool.routes.js'

export const routerDb = Router()

routerDb.get('/', async (req, res) => {
  const [data] = await pool.query('SELECT 1 + 1 AS result')
  return res.status(200).json(data[0])
})