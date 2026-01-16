import type { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify'

/**
 * Creates context for tRPC requests
 * This function runs for every tRPC request and provides the context to procedures
 */
export const createContext = async ({ req, res }: CreateFastifyContextOptions) => {
  return {
    req,
    res,
    // You can add more context here like:
    // - session/user info from headers
    // - database connection
    // - request metadata
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
