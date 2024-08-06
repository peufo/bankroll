<script lang="ts">
  import { Form, InputNumber, InputSelect, InputTextarea } from 'fuma'
  import RangeInput from './RangeInput.svelte'
  import { LOG_TYPE } from '$lib/constant'
  import type { LogType } from '@prisma/client'
  import { slide } from 'svelte/transition'

  export let data

  let logType: LogType = 'cash'
</script>

<div class="mx-auto max-w-sm p-4">
  <h2 class="text-lg text-center my-4">
    Nouvelle entrée dans <b>{data.bankroll.name}</b>
  </h2>

  <Form action="/br/{data.bankroll.id}/log?/log">
    <div class="grid grid-cols-2 gap-2">
      <InputNumber key="sold" label="Solde" input={{ autofocus: true }} />
      <InputSelect
        key="type"
        label="Type"
        options={LOG_TYPE}
        bind:value={logType}
      />
    </div>

    <RangeInput />

    {#if logType === 'tours'}
      <div class="grid grid-cols-2 gap-2" transition:slide>
        <InputNumber key="position" label="Position" />
        <InputNumber key="players" label="Nombre de joueurs" />
      </div>
    {/if}
    <InputTextarea key="comment" label="Commentaire" />
  </Form>
</div>
