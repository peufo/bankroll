import { error, json } from '@sveltejs/kit'
import { z } from 'fuma'
import { parseQuery } from 'fuma/server'
import { prisma } from '$lib/server'

export const GET = async ({ locals: { user }, url }) => {
  if (!user) error(401)
  const { search } = parseQuery(url, { search: z.string().optional() })
  const bankrolls = await prisma.bankroll.findMany({
    where: {
      ownerId: user.id,
      name: { contains: search },
    },
  })
  return json(bankrolls)
}
