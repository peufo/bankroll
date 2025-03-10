<script lang="ts">
  import { Icon } from 'fuma'
  import MainMenu from './MainMenu.svelte'
  import { mdiPlus } from '@mdi/js'

  export let user: import('lucia').User | null = null
</script>

<div class="flex gap-2 p-2 border-b border-base-300 items-center pl-4">
  <a href="/">
    <h1 class="text-2xl">Bankroll</h1>
  </a>

  <div class="grow"></div>

  <a href="/log" class="btn btn-square">
    <Icon path={mdiPlus}></Icon>
  </a>

  <MainMenu {user} />
</div>
