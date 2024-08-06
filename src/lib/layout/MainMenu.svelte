<script lang="ts">
  import { DropDown, Icon } from 'fuma'
  import { mdiMenu } from '@mdi/js'

  export let user: import('lucia').User | null = null
</script>

<DropDown>
  <button slot="activator" class="btn btn-square">
    <Icon path={mdiMenu} />
  </button>

  <a href="/auth" class="menu-item">{user ? user.username : 'Connexion'}</a>
</DropDown>
