<script lang="ts">
  import { modelBankroll } from '$lib/models/bankroll.js'
  import { Form, InputText } from 'fuma'
  export let data
</script>

<div class="mx-auto max-w-sm p-4">
  <h2 class="text-lg text-center">Modifier une bankroll</h2>

  <Form action="/br?/bankroll" data={data.bankroll} model={modelBankroll}>
    <InputText
      key="name"
      label="Nom de la bankroll"
      value={data.bankroll.name}
      input={{ autocomplete: 'off' }}
    />
  </Form>
</div>
