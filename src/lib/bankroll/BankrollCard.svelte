<script lang="ts">
  import type { Bankroll } from '@prisma/client'
  import { type BankrollSold, BankrollStats } from '.'

  export let bankroll: Pick<Bankroll, 'name'>
  export let sold: BankrollSold
  export let href = ''
</script>

<div class="card shadow-md relative">
  <div class="card-body px-2">
    <div class="flex">
      <h2 class="card-title">{bankroll.name}</h2>
      <slot name="actions" />
    </div>

    <div class="flex gap-4 overflow-auto">
      <BankrollStats name="Total" value={sold.total} />
      <div class="border-r border-base-100" />
      <BankrollStats name="Mois" value={sold.lastMonth} />
      <div class="border-r border-base-100" />
      <BankrollStats name="Semaine" value={sold.lastWeek} />
    </div>

    <slot />
  </div>

  {#if href}
    <a class="absolute inset-0" {href}>{' '}</a>
  {/if}
</div>
