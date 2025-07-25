import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId: "ws507jcw",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true, 
  token: process.env.SANITY_API_READ_TOKEN,
})
