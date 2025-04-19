<script lang="ts">
  import { mdiPlus } from '@mdi/js'
  import { Icon } from 'fuma'
  import { BankrollCard, BankrollStats, type BankrollSold } from '$lib/bankroll'

  export let data

  function sumOfSold(key: keyof BankrollSold): number {
    return Object.entries(data.solds).reduce(
      (acc, [bankrollId, sold]) => acc + (sold[key] || 0),
      0
    )
  }
</script>

<div class="p-4 pb-20 flex flex-col gap-4 items-center">
  <div
    class="grid gap-4 p-4 w-full"
    style="grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr))"
  >
    {#if data.bankrolls.length > 1}
      <BankrollCard
        href="/br/all"
        bankroll={{ name: 'Toutes les bankrolls' }}
        sold={{
          total: sumOfSold('total'),
          lastMonth: sumOfSold('lastMonth'),
          lastWeek: sumOfSold('lastWeek'),
        }}
      />
    {/if}

    {#each data.bankrolls as bankroll}
      <BankrollCard
        {bankroll}
        sold={data.solds[bankroll.id]}
        href="/br/{bankroll.id}"
      />
    {/each}
  </div>

  <a class="btn" href="/br">
    <Icon path={mdiPlus} />
    <span>Ajouter une bankroll</span>
  </a>
</div>
