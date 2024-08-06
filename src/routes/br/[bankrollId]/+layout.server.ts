import { prisma } from '$lib/server/prisma.js'

export const load = async ({ params: { bankrollId }, parent }) => {
  const { user } = await parent()
  return {
    bankroll: await prisma.bankroll.findUniqueOrThrow({
      where: { id: bankrollId, ownerId: user.id },
    }),
  }
}
