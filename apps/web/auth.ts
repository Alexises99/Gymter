import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { prisma } from 'database'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql'
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 // 5 minutes
    }
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!
    },
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!
    }
  }
})
