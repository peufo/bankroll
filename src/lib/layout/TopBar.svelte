<script lang="ts">
  import MainMenu from './MainMenu.svelte'

  export let user: import('lucia').User | null = null
</script>

<div class="flex gap-2 p-2 border-b border-base-300 items-center pl-4">
  <a href="/">
    <h1 class="text-2xl">Bankroll</h1>
  </a>

  <div class="grow"></div>

  <MainMenu {user} />
</div>
