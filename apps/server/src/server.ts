import { PORT } from './config/env'
import { createServer } from './fastify'
import userRoutes from './modules/user/user.route'

const server = createServer()

server.register(userRoutes)

server.listen({ port: PORT }, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.log(`🚀 Server running in http://localhost:${PORT}`)
})
