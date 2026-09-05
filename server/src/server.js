import app from './app.js'
import { jwtSecret, port } from './config/env.js'

if (!jwtSecret || jwtSecret.length < 32) {
  console.error('JWT_SECRET must be configured with at least 32 characters')
  process.exit(1)
}

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`)
})
