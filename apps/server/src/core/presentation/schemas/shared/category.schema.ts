import { z } from 'zod'

export const categorySchema = z.string().min(4)
