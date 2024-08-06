import type { Prisma } from '@prisma/client'
import { z, type ZodObj } from 'fuma'

export const modelBankroll = {
  id: z.string().min(3),
} satisfies ZodObj<Omit<Prisma.BankrollCreateInput, 'owner'>>
