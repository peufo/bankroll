import type { Prisma } from '@prisma/client'
import { toTuple, z, type ZodObj } from 'fuma'
import { LOG_TYPE } from '$lib/constant'

export const modelLog = {
  start: z.date().nullish(),
  end: z.date().nullish(),
  sold: z.number(),
  type: z.enum(toTuple(LOG_TYPE)),
  position: z.number().nullish(),
  players: z.number().nullish(),
  comment: z.string().nullish(),
  bankroll: z.relation.connect,
} satisfies ZodObj<Prisma.LogCreateInput>
