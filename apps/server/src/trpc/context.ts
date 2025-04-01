// import { prisma } from 'database'

export const createContext = () => ({})

export type Context = Awaited<ReturnType<typeof createContext>>
