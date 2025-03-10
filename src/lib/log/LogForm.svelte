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
  import { slide } from 'svelte/transition'
  import type { Bankroll, Log } from '@prisma/client'
  import { LOG_TYPE } from '$lib/constant'
  import { page } from '$app/stores'
  import { modelLog } from '$lib/models'
  import { mdiPlusMinusVariant } from '@mdi/js'
  import { useApiClient } from 'fuma/api'
  import { apiConfig } from '$lib/api'

  export let log: Partial<Log & { bankroll?: Bankroll }> = { type: 'cash' }
  let start = log.start || undefined
  let end = log.end || undefined

  let banckroll = log?.bankroll ?? $page.data.bankroll

  const api = useApiClient(apiConfig)
</script>

<Form
  action="/br/{$page.params.bankrollId}/log?/log"
  model={modelLog}
  data={log}
>
  <InputRelation
    key="bankroll"
    search={api.Bankroll}
    label="Banckroll"
    slotItem={(br) => br.name}
    value={banckroll}
    input={{ autofocus: true }}
  ></InputRelation>

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

  <InputSelect
    key="type"
    label="Type"
    options={LOG_TYPE}
    bind:value={log.type}
  />

  {#if log.type === 'tours'}
    <div class="grid grid-cols-2 gap-2" transition:slide>
      <InputNumber key="position" label="Position" value={log.position} />
      <InputNumber
        key="players"
        label="Nombre de joueurs"
        value={log.players}
      />
    </div>
  {/if}
  <InputTextarea key="comment" label="Commentaire" value={log.comment} />
</Form>
