<script lang="ts">
  import { Form, InputNumber, InputSelect, InputTextarea } from 'fuma'
  import RangeInput from '../../routes/br/[bankrollId]/log/RangeInput.svelte'
  import { slide } from 'svelte/transition'
  import type { Log } from '@prisma/client'
  import { LOG_TYPE } from '$lib/constant'
  import { page } from '$app/stores'
  import { modelLog } from '$lib/models'

  export let log: Partial<Log> = { type: 'cash' }
</script>

<Form
  action="/br/{$page.params.bankrollId}/log?/log"
  model={modelLog}
  data={log}
>
  <div class="grid grid-cols-2 gap-2">
    <InputNumber
      key="sold"
      label="Solde"
      input={{ autofocus: true }}
      value={log.sold}
    />
    <InputSelect
      key="type"
      label="Type"
      options={LOG_TYPE}
      bind:value={log.type}
    />
  </div>

  <RangeInput start={log.start || undefined} end={log.end || undefined} />

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
