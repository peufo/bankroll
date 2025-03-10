import { modelLog, modelLogUpdate } from '$lib/models/log.js'
import { prisma } from '$lib/server'
import { error } from '@sveltejs/kit'
import { z } from 'fuma'
import { formAction } from 'fuma/server'

export const actions = {
  log_create: formAction(
    modelLog,
    ({ data, event }) => {
      const { user } = event.locals
      if (!user) error(401)
      return prisma.log.create({
        data,
      })
    },
    {
      redirectTo: (log) => `/br/${log.bankrollId}`,
    }
  ),
  log_update: formAction(
    modelLogUpdate,
    ({ data, event }) => {
      const { user } = event.locals
      if (!user) error(401)
      return prisma.log.update({
        where: {
          id: data.id,
          bankroll: { ownerId: user.id },
        },
        data,
      })
    },
    { redirectTo: (log) => `/br/${log.bankrollId}` }
  ),
  log_delete: formAction(
    { id: z.string() },
    ({ data, event }) => {
      const { user } = event.locals
      if (!user) error(401)
      return prisma.log.delete({
        where: {
          id: data.id,
          bankroll: { ownerId: user.id },
        },
      })
    },
    {
      redirectTo: (log) => `/br/${log.bankrollId}`,
    }
  ),
}
