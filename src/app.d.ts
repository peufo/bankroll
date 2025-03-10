import type { Bankroll } from '@prisma/client'

declare global {
  namespace App {
    interface Locals {
      user: import('lucia').User | null
      session: import('lucia').Session | null
    }
    // interface Error {}
    interface PageData {
      bankroll: Bankroll
    }
    // interface PageState {}
    // interface Platform {}
  }
}

export {}
