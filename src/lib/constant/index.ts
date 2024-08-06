import type { LogType } from '@prisma/client'

export const LOG_TYPE: Record<LogType, string> = {
  cash: 'Cash game',
  tours: 'Tournois',
} as const
