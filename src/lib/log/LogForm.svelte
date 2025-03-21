<script lang="ts">
  import {
    Form,
    Icon,
    InputNumber,
    InputRelation,
    InputSelect,
    InputTextarea,
  } from 'fuma'
  import RangeInput from '../../routes/br/[bankrollId]/log/RangeInput.svelte'
  import { fade } from 'svelte/transition'
  import type { Bankroll, Log } from '@prisma/client'
  import { LOG_TYPE } from '$lib/constant'
  import { page } from '$app/stores'
  import { modelLog } from '$lib/models'
  import { mdiPlusMinusVariant } from '@mdi/js'
  import { onMount } from 'svelte'

  export let log: Partial<Log & { bankroll?: Bankroll }> = { type: 'cash' }
  let start = log.start || undefined
  let end = log.end || undefined
  let bankroll = log?.bankroll ?? $page.data.bankroll
  let blindSmall = log?.blindSmall ?? 0
  let blindBig = log?.blindBig ?? 0

  async function searchBankroll(search: string): Promise<Bankroll[]> {
    const res = await fetch(`/api/bankroll?search=${search}`)
    if (!res.ok) {
      const { message } = await res.json()
      throw message
    }
    return res.json() as Promise<Bankroll[]>
  }

  let inputRelation: InputRelation<Bankroll>

  onMount(() => {
    if (bankroll) return
    inputRelation.clear()
  })
</script>

<Form
  action="/br/{$page.params.bankrollId}/log?/log"
  model={modelLog}
  data={log}
>
  <InputRelation
    bind:this={inputRelation}
    key="bankroll"
    search={searchBankroll}
    label="Bankroll"
    slotItem={(br) => br.name}
    value={bankroll}
  />

  <InputSelect
    key="type"
    label="Type"
    options={LOG_TYPE}
    bind:value={log.type}
  />

  {#if log.type === 'tours'}
    <div class="grid grid-cols-2 gap-2" in:fade>
      <InputNumber key="position" label="Position" bind:value={log.position} />
      <InputNumber
        key="players"
        label="Nombre de joueurs"
        bind:value={log.players}
      />
    </div>
  {:else}
    <div class="grid grid-cols-2 gap-2" in:fade>
      <InputNumber
        key="blindSmall"
        label="Small blind"
        value={blindSmall / 100}
        input={{ step: 0.05, inputmode: 'decimal' }}
        on:input={(event) =>
          (blindBig = (event.target?.valueAsNumber || 0) * 200)}
      />

      <InputNumber
        key="blindBig"
        label="Big blind"
        value={(blindBig ?? 0) / 100}
        input={{ step: 0.05, inputmode: 'decimal' }}
      />
    </div>
  {/if}

  <div class="flex gap-2 items-end">
    <InputNumber key="sold" label="Solde" bind:value={log.sold} class="grow" />

    <button
      type="button"
      class="btn btn-square"
      on:click={() => (log.sold = -(log.sold || 0))}
    >
      <Icon path={mdiPlusMinusVariant} />
    </button>
  </div>

  <RangeInput {start} {end} />

  <InputTextarea key="comment" label="Commentaire" bind:value={log.comment} />
</Form>
