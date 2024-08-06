<script lang="ts">
  import MainMenu from './MainMenu.svelte'

  export let user: import('lucia').User | null = null
</script>

<div class="flex gap-2 p-2 border-b items-center pl-4">
  <a href="/">
    <h1 class="text-xl">Bankroll</h1>
  </a>

  <div class="grow"></div>

  <MainMenu {user} />
</div>
