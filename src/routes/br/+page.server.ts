import { error, redirect } from '@sveltejs/kit'
import { formAction } from 'fuma/server'
import { prisma } from '$lib/server'
import { modelBankroll } from '$lib/models/bankroll.js'

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
}
