import readline from 'node:readline'
import bcrypt from 'bcryptjs'
import 'dotenv/config'
import { pool } from './database.js'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function prompt(question) {
  const interfaceInstance = readline.createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((resolve) => interfaceInstance.question(question, (answer) => { interfaceInstance.close(); resolve(answer.trim()) }))
}

function promptPassword(question) {
  if (!process.stdin.isTTY || !process.stdout.isTTY) return prompt(question)
  process.stdout.write(question)
  process.stdin.setRawMode(true)
  process.stdin.resume()
  return new Promise((resolve) => {
    let value = ''
    const onData = (chunk) => {
      const character = chunk.toString()
      if (character === '\u0003') process.exit(1)
      if (character === '\r' || character === '\n') {
        process.stdin.setRawMode(false)
        process.stdin.pause()
        process.stdin.removeListener('data', onData)
        process.stdout.write('\n')
        resolve(value)
      } else if (character === '\u007f') {
        value = value.slice(0, -1)
      } else {
        value += character
      }
    }
    process.stdin.on('data', onData)
  })
}

let email
let password
if (!process.stdin.isTTY || !process.stdout.isTTY) {
  const input = []
  const interfaceInstance = readline.createInterface({ input: process.stdin })
  for await (const line of interfaceInstance) input.push(line.trim())
  email = (input[0] || '').toLowerCase()
  password = input[1] || ''
} else {
  email = (await prompt('Admin email: ')).toLowerCase()
  password = await promptPassword('Admin password: ')
}

if (!emailPattern.test(email) || password.length < 12) {
  console.error('Use a valid email and a password of at least 12 characters.')
  process.exitCode = 1
  await pool.end()
} else {
  try {
    const passwordHash = await bcrypt.hash(password, 12)
    await pool.query('INSERT INTO administrators (email, password_hash) VALUES ($1, $2)', [email, passwordHash])
    console.log(`Administrator created for ${email}`)
  } catch (error) {
    if (error.code === '23505') console.error('An administrator with that email already exists.')
    else {
      console.error('Administrator creation failed')
      process.exitCode = 1
    }
  } finally {
    await pool.end()
  }
}
