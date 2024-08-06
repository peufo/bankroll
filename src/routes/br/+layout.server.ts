import { error } from '@sveltejs/kit'

export const load = async ({ locals: { user } }) => {
  if (!user) error(401)
  return { user }
}
