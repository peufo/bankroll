import { prisma } from '$lib/server/prisma.js'

export const load = async ({ params: { logId } }) => {
  return {
    log: await prisma.log.findUniqueOrThrow({ where: { id: logId } }),
  }
}
