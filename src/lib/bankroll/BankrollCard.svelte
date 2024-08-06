<script lang="ts">
  import type { Bankroll } from '@prisma/client'
  import BankrollState from './BankrollState.svelte'

  export let bankroll: Bankroll
</script>

<a href="/br/{bankroll.id}" class="card bg-base-300 shadow-md">
  <div class="card-body">
    <div class="flex">
      <h2 class="card-title">{bankroll.name}</h2>
      <slot name="actions" />
    </div>

    <div class="flex gap-4 overflow-auto">
      <BankrollState range="total" />
      <div class="border-r border-base-100" />
      <BankrollState range="month" />
      <div class="border-r border-base-100" />
      <BankrollState range="week" />
    </div>

    <slot />
  </div>
</a>
