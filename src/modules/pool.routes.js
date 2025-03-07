#!/usr/bin/env node

import { createPool} from 'mysql2/promise'

export const pool = createPool({
  // asegurate de poner tus credenciales de tu base de datos
  host: 'localhost',
  port: 3306,
  user: '',
  password: '',
  database: '',
});
