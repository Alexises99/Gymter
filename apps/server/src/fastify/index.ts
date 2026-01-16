import fastify from 'fastify'
import cors from '@fastify/cors'
import {
  fastifyTRPCPlugin,
  type FastifyTRPCPluginOptions
} from '@trpc/server/adapters/fastify'
import { appRouter, type AppRouter } from '../trpc'
import { createContext } from '../trpc/context'

import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider
} from 'fastify-type-provider-zod'

import { createUserRestRoutes } from '../core/presentation/rest/user.routes'
import { DIContainer } from '../core/infrastructure/di/container'

export const createServer = () => {
  const server = fastify({
    maxParamLength: 5000
  }).withTypeProvider<ZodTypeProvider>()

  server.setValidatorCompiler(validatorCompiler)
  server.setSerializerCompiler(serializerCompiler)

  server.register(cors)

  // tRPC setup
  server.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: {
      router: appRouter,
      createContext,
      onError({ path, error }) {
        console.error(`Error in tRPC handler on path '${path}':`, error)
      }
    } satisfies FastifyTRPCPluginOptions<AppRouter>['trpcOptions']
  })

  // REST API setup
  const container = DIContainer.getInstance()
  server.register(createUserRestRoutes(container.userRepository), {
    prefix: '/api'
  })

  return server
}
