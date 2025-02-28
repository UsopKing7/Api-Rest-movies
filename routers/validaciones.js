#!/usr/bin/env node

import z from 'zod'

const validacion = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  alternate_names: z.array(z.string()).optional(),
  species: z.string().optional(),
  gender: z.string().optional(),
  house: z.string().optional(),
  dateOfBirth: z.string().nullable().optional(),
  yearOfBirth: z.number().nullable().optional(),
  wizard: z.boolean().optional(),
  ancestry: z.string().optional(),
  eyeColour: z.string().optional(),
  hairColour: z.string().optional(),
  wand: z.object({
    wood: z.string().optional(),
    core: z.string().optional(),
    length: z.number().nullable().optional()
  }).optional(),
  patronus: z.string().optional(),
  hogwartsStudent: z.boolean().optional(),
  hogwartsStaff: z.boolean().optional(),
  actor: z.string().optional(),
  alternate_actors: z.array(z.string()).optional(),
  alive: z.boolean().optional(),
  image: z.string().url().optional().nullable()
});

export default validacion