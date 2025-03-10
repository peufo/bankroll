import type { Prisma } from '@prisma/client'
import { toTuple, z, type ZodObj } from 'fuma'
import { LOG_TYPE } from '$lib/constant'

export const modelLog = {
  sold: z.number(),
  start: z.date(),
  end: z.date(),
  type: z.enum(toTuple(LOG_TYPE)),
  position: z.number().nullish(),
  players: z.number().nullish(),
  blindSmall: z
    .number()
    .default(0)
    .transform((v) => v * 100),
  blindBig: z
    .number()
    .default(0)
    .transform((v) => v * 100),
  comment: z.string().nullish(),
  bankroll: z.relation.connect,
} satisfies ZodObj<Prisma.LogCreateInput>

export const modelLogUpdate = {
  id: z.string(),
  ...modelLog,
} satisfies ZodObj<Prisma.LogUpdateInput>
