<script lang="ts">
  import { mdiArrowDown, mdiArrowUp } from '@mdi/js'
  import { Icon } from 'fuma'
  import { renderAmount } from '$lib/utils'

  export let name: string
  export let value: number | null
</script>

<div>
  <h3 class="text-sm font-medium opacity-70">{name}</h3>

  <div class="flex items-center gap-1">
    {#if value === null || value === 0}
      <span>-</span>
    {:else if value > 0}
      <Icon path={mdiArrowUp} class="fill-success"></Icon>
      <span>{renderAmount(value)}</span>
    {:else if value < 0}
      <Icon path={mdiArrowDown} class="fill-error"></Icon>
      <span>{renderAmount(value)}</span>
    {/if}
  </div>
</div>
