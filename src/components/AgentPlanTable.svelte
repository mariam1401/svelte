<script>
  import AgentPlanRow from 'src/components/AgentPlanRow.svelte';

  export let ratings = [];
  export let noData = false;
</script>

<div class="border rounded-lg w-full m-auto">
  <div class="grid-table bg-[#f9fafb] p-2 pl-4 text-[12px] text-[#667085]">
    <div class="flex justify-center">
      Date
      <!--			<img src="assets/arrow-down.svg" class="pl-1" alt="" />-->
    </div>
    <div>Interactions</div>
    <div>Plan Name</div>
    <div>Stars</div>
    <div />
  </div>
  {#if !noData}
    {#each ratings as item}
      <AgentPlanRow {item} date={item.items[0].timestamp} />
    {/each}
  {/if}
</div>

{#if noData}
  <div class="text-[#344054] text-[18px] text-center w-full mx-auto mt-20">
    No Data
  </div>
{/if}

<style>
  .grid-table {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 0.3fr;
    text-align: center;
  }
</style>
