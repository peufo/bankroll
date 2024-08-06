import { prisma } from '$lib/server'
import { redirect } from '@sveltejs/kit'

export const load = async ({ locals: { user } }) => {
  if (!user) redirect(303, '/auth')

  return {
    bankrolls: await prisma.bankroll.findMany({
      where: { ownerId: user.id },
    }),
  }
}
