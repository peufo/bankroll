<script lang="ts">
  import { Form, InputText } from 'fuma'
</script>

<div class="mx-auto max-w-sm p-4">
  <h2 class="text-lg text-center">Ajouter une bankroll</h2>

  <Form action="/br?/bankroll">
    <InputText key="name" label="Nom de la bankroll" />
  </Form>
</div>
