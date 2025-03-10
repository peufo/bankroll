<script lang="ts">
  import '../app.css'
  import { Toaster } from 'svelte-sonner'
  import TopBar from '$lib/layout/TopBar.svelte'
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  export let data

  onMount(() => {
    function shortcutHandler(event: KeyboardEvent) {
      if (!data.user || !event.ctrlKey) return
      if (event.key == 'n' && $page.route.id !== '/log') return goto('/log')
    }
    window.addEventListener('keydown', shortcutHandler)
    return () => {
      window.removeEventListener('keydown', shortcutHandler)
    }
  })
</script>

<Toaster />

<TopBar user={data.user} />

<slot></slot>
