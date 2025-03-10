import { apiServer } from 'fuma/api'
import { prisma } from '$lib/server'
import { apiConfig } from '$lib/api'

const api = apiServer(apiConfig, prisma)

export const GET = api.GET
