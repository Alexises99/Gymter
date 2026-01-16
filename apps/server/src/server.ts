import { PORT } from './config/env'
import { createServer } from './fastify'

const server = createServer()

server.listen({ port: PORT }, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`🚀 Server running at http://localhost:${PORT}`)
  console.log(`📡 tRPC endpoint: http://localhost:${PORT}/trpc`)
  console.log(`🌐 REST API endpoint: http://localhost:${PORT}/api`)
})
