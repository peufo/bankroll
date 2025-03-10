import { type ApiConfig } from 'fuma/api'
import type { Prisma } from '@prisma/client'

export const apiConfig = {
  Bankroll: (search) => ({ where: { name: { contains: search } } }),
} satisfies ApiConfig<Prisma.TypeMap>
