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

export const createServer = () => {
  const server = fastify({
    maxParamLength: 5000
  }).withTypeProvider<ZodTypeProvider>()

  server.setValidatorCompiler(validatorCompiler)
  server.setSerializerCompiler(serializerCompiler)

  server.register(cors)
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

  return server
}
