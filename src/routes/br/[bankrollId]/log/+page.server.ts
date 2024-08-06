import { modelLog } from '$lib/models/log.js'
import { prisma } from '$lib/server'
import { error } from '@sveltejs/kit'
import { formAction } from 'fuma/server'

export const actions = {
  log_create: formAction(
    modelLog,
    async ({ data, event }) => {
      const { user } = event.locals
      if (!user) error(401)

      return prisma.log.create({
        data: {
          ...data,
          bankroll: {
            connect: {
              ownerId: user.id,
              id: event.params.bankrollId,
            },
          },
        },
      })
    },
    {
      redirectTo: (log) => `/br/${log.bankrollId}`,
    }
  ),
}
