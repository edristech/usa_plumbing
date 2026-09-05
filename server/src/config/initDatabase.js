import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import 'dotenv/config'
import { pool } from './database.js'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const schemaPath = path.join(projectRoot, 'database', 'schema.sql')

try {
  const schema = await fs.readFile(schemaPath, 'utf8')
  await pool.query(schema)
  console.log('Database schema initialized')
} catch (error) {
  console.error('Database schema initialization failed', error)
  process.exitCode = 1
} finally {
  await pool.end()
}