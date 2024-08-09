import { error } from '@sveltejs/kit'
import { z } from 'fuma'
import { formAction } from 'fuma/server'
import { prisma } from '$lib/server'
import { modelBankroll, modelBankrollUpdate } from '$lib/models'

export const actions = {
  bankroll_create: formAction(
    modelBankroll,
    ({ data, event }) => {
      const { user } = event.locals
      if (!user) error(401)
      return prisma.bankroll.create({
        data: {
          ...data,
          ownerId: user.id,
        },
      })
    },
    {
      redirectTo: (bankroll) => `/br/${bankroll.id}`,
    }
  ),
  bankroll_update: formAction(
    modelBankrollUpdate,
    ({ data, event }) => {
      const { user } = event.locals
      if (!user) error(401)
      return prisma.bankroll.update({
        where: { id: data.id, ownerId: user.id },
        data,
      })
    },
    {
      redirectTo: (bankroll) => `/br/${bankroll.id}`,
    }
  ),
  bankroll_delete: formAction(
    { id: z.string() },
    ({ data, event }) => {
      const { user } = event.locals
      if (!user) error(401)
      return prisma.bankroll.delete({
        where: { id: data.id, ownerId: user.id },
      })
    },
    {
      redirectTo: () => '/',
    }
  ),
}
