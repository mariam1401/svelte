<script lang="ts">
  import {Router, Route, Link, navigate} from 'svelte-navigator';
  import MainPage from 'src/components/MainPage.svelte';
  import NewPlan from 'src/components/NewPlan.svelte';
  import {Breadcrumb, BreadcrumbItem} from 'flowbite-svelte';
  import SettingsIcon from 'src/components/SettingsIcon.svelte';

  let newPlanPath = false;

  const getLocationPath = event => {
    const path = event.detail.path;
    if (path === '/newplan') newPlanPath = true;
  };
</script>

<div class="flex justify-between">
  <div>
    <Breadcrumb
      aria-label="Solid background breadcrumb example"
      class="bg-[#f8f8f8] py-3 px-5"
    >
      <BreadcrumbItem href="/" variation="solid" icon={SettingsIcon}
        >Settings</BreadcrumbItem
      >
      <BreadcrumbItem href="/">All plans</BreadcrumbItem>
      {#if newPlanPath}
        <BreadcrumbItem>New Plan</BreadcrumbItem>
      {/if}
    </Breadcrumb>
  </div>
  {#if newPlanPath}
    <div
      class="mt-3 mr-16 h-[25px] cursor-pointer text-[#1c64f2] hover:border-b border-[#1c64f2]"
      on:click={() => {
        navigate('/');
        newPlanPath = false;
      }}
    >
      Return to list
    </div>
  {/if}
</div>

<Router>
  <Route path="/">
    <MainPage />
  </Route>
  <Route path="newplan">
    <NewPlan {newPlanPath} on:getPath={getLocationPath} />
  </Route>
</Router>
