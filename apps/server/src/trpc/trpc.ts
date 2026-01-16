import { initTRPC, TRPCError } from '@trpc/server'
import { type Context } from './context'

/**
 * Initialize tRPC with context and error handling
 */
const t = initTRPC.context<Context>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof Error && error.cause.name === 'ZodError'
            ? error.cause
            : null
      }
    }
  }
})

/**
 * Middleware to check if user is authenticated
 * Use this for protected procedures
 */
const isAuthed = t.middleware(async ({ ctx, next }) => {
  // TODO: Add your authentication logic here
  // Example: check session from headers/cookies
  // const session = await getSessionFromHeaders(ctx.headers)

  // if (!session?.user) {
  //   throw new TRPCError({ code: 'UNAUTHORIZED' })
  // }

  return next({
    ctx: {
      ...ctx,
      // user: session.user
    }
  })
})

/**
 * Export reusable router and procedure builders
 */
export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthed)
export const middleware = t.middleware
export const mergeRouters = t.mergeRouters
