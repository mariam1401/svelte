<script lang="ts">
  import Counter from "./lib/Counter.svelte";
  import { Alert } from "flowbite-svelte";
</script>

<main>
  <h1>Svelte</h1>
  <Alert id="alert-blue">
    <span slot="content">
      <span class="font-medium"> Info alert! </span>
      Change a few things up and try submitting again.
    </span>
  </Alert>
</main>
