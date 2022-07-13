<script>
  import {Button, Input, Label} from 'flowbite-svelte';
  import {useLocation} from 'svelte-navigator';
  import CohortSelection from 'src/components/CohortSelection.svelte';
  import MetricScoring from 'src/components/MetricScoring.svelte';
  import {createEventDispatcher, onMount} from 'svelte';
  import StarCalculation from 'src/components/StarCalculation.svelte';
  import RewardConfiguration from 'src/components/RewardConfiguration.svelte';
  import DatePicker from '@beyonk/svelte-datepicker/src/components/DatePicker.svelte';

  const location = useLocation();

  const dispatch = createEventDispatcher();
  function getPath() {
    dispatch('getPath', {
      path: $location.pathname
    });
  }

  onMount(() => getPath());

  let activeTab = 'cohorts';
</script>

<div class="w-[93%] m-auto inter mt-2 text-left">
  <div class="flex gap-[20px] ml-4 justify-between mb-4 m-auto w-[98%]">
    <div class="flex gap-5 justify-between">
      <div class="text-left text=[#111928] text-[24px] font-semibold">
        New Plan
      </div>
      <div
        class="text-left text=[#6b7280] text-[12px] font-normal h-[39px] leading-[39px] align-middle"
      >
        All changes are saved
      </div>
    </div>
    <div class="flex gap-3">
      <div
        class="border w-[75px] text-[14px] text-[#1f2a37] h-[39px] text-center leading-[39px] align-middle rounded-lg hover:bg-gray-300 cursor-pointer"
      >
        Save
      </div>
      <Button size="sm">Publish</Button>
    </div>
  </div>
  <div class="flex ml-4 mb-7">
    <div class="mr-10">
      <Label
        for="name"
        class="block mb-2 text-[#111928] font-medium text-[16px]"
        >Plan Name</Label
      >
      <Input
        id="name"
        placeholder=""
        inputClass="w-[416px] h-[42px] rounded-lg bg-[#e5e7eb] border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 text-[14px] text-[#6b7280] border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
    <div class="flex gap-4">
      <div>
        <div class="block mb-2 text-[#111928] font-medium text-[14px]">
          Start date
        </div>
        <div
          class="z-50 hover:shadow-[0_0_5px_0_rgba(16,24,40,0.1)] hover:rounded-[8px]"
        >
          <DatePicker
            format="MMM DD, YYYY"
            placeholder="Select start date"
            continueText="Apply"
          />
        </div>
      </div>
      <div>
        <div class="block mb-2 text-[#111928] font-medium text-[14px]">
          End date
        </div>
        <div
          class="z-50 hover:shadow-[0_0_5px_0_rgba(16,24,40,0.1)] hover:rounded-[8px]"
        >
          <DatePicker
            format="MMM DD, YYYY"
            placeholder="Select end date"
            continueText="Apply"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="flex gap-5 mb-4">
    <div
      on:click={() => (activeTab = 'cohorts')}
      class="text-[#667085] text-[14px]
				border-b-[2px] h-[40px] leading-[40px] align-middle cursor-pointer"
      class:active={activeTab === 'cohorts'}
    >
      Cohort selection
    </div>
    <div
      on:click={() => (activeTab = 'metrics')}
      class="text-[#667085] text-[14px]
				border-b-[2px] h-[40px] leading-[40px] align-middle cursor-pointer"
      class:active={activeTab === 'metrics'}
    >
      Metric scoring
    </div>
    <div
      on:click={() => (activeTab = 'stars')}
      class="text-[#667085] text-[14px]
				border-b-[2px] h-[40px] leading-[40px] align-middle cursor-pointer"
      class:active={activeTab === 'stars'}
    >
      Star calculation
    </div>
    <div
      on:click={() => (activeTab = 'rewards')}
      class="text-[#667085] text-[14px]
				border-b-[2px] h-[40px] leading-[40px] align-middle cursor-pointer"
      class:active={activeTab === 'rewards'}
    >
      Reward configuration
    </div>
  </div>
  {#if activeTab === 'cohorts'}
    <CohortSelection />
  {/if}
  {#if activeTab === 'metrics'}
    <MetricScoring />
  {/if}
  {#if activeTab === 'stars'}
    <StarCalculation />
  {/if}
  {#if activeTab === 'rewards'}
    <RewardConfiguration />
  {/if}
</div>

<style>
  .inter {
    font-family: 'Inter', sans-serif;
  }
  .active {
    transition: 300ms ease-in-out;
    border-bottom-color: #175cd3;
    color: #175cd3;
  }
</style>
