<script lang="ts">
  import { Router, Route } from "svelte-navigator";
  import MainPage from "src/components/MainPage.svelte";
  import Calendar from "src/components/Calendar.svelte";
</script>

<Router>
    <Route path="/">
      <MainPage />
    </Route>
    <Route path="calendar" component={Calendar} />
</Router>
