import type { Prisma } from '@prisma/client'
import { toTuple, z, type ZodObj } from 'fuma'
import { LOG_TYPE } from '$lib/constant'

export const modelLog = {
  sold: z.number(),
  start: z.date().nullish(),
  end: z.date().nullish(),
  type: z.enum(toTuple(LOG_TYPE)),
  position: z.number().nullish(),
  players: z.number().nullish(),
  comment: z.string().nullish(),
} satisfies ZodObj<Omit<Prisma.LogCreateInput, 'bankroll'>>
