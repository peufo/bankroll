<script>
  import '../app.css'
  import { Toaster } from 'svelte-sonner'
  import TopBar from '$lib/layout/TopBar.svelte'

  export let data
</script>

<Toaster />

<TopBar user={data.user} />

<slot></slot>
