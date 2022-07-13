<script>
  import {
    Input,
    Label,
    Select,
    Spinner,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell
  } from 'flowbite-svelte';
  import {metrics} from 'src/utils/selectInputs';

  let loading = false;

  let rewardsArr = [
    {
      id: 0,
      lowLimit: '-500',
      highLimit: '.5',
      units: 'Points',
      value: 5
    },
    {
      id: 1,
      lowLimit: '10',
      highLimit: '19',
      units: 'Dollars',
      value: 10.05
    }
  ];

  let newReward = false;

  let lowLimit = '';
  let highLimit = '';
  let units = '';
  let value = '';

  const onInputChange = score => {
    if (lowLimit.length !== 0 && highLimit.length !== 0 && score.length !== 0) {
      rewardsArr.push({
        id: rewardsArr.length,
        highLimit,
        lowLimit,
        units,
        value
      });

      rewardsArr = rewardsArr;
      newReward = false;
      lowLimit = '';
      highLimit = '';
      units = '';
      value = '';
    }
  };

  $: onInputChange(value);

  const removeReward = id => {
    const index = rewardsArr.findIndex(e => e.id === id);
    rewardsArr.splice(index, 1);
    rewardsArr = rewardsArr;
  };
</script>

<div class="grid grid-cols-2">
  <div class="w-full p-2 m-auto inter">
    <!--  <h1 class="title hidden">Welcome to MicroPai</h1>-->
    <div class="flex gap-[20px] justify-between mb-3">
      <div
        class="text-left text=[#111928] h-[39px] leading-[39px] align-middle text-[18px] font-normal"
      >
        Star calculation
      </div>
      <div>
        <div
          on:click={() => (newReward = true)}
          class="border w-[142px] text-[14px] text-[#1f2a37] h-[39px] text-center leading-[39px] align-middle rounded-lg hover:bg-gray-300 cursor-pointer"
        >
          + Add new
        </div>
      </div>
    </div>
    <Table striped={true} divClass="shadow-md sm:rounded-lg border">
      <TableHead>
        <TableHeadCell>STAR LOWER LIMIT</TableHeadCell>
        <TableHeadCell>STAR UPPER LIMIT</TableHeadCell>
        <TableHeadCell>REWARD UNITS</TableHeadCell>
        <TableHeadCell>VALUE</TableHeadCell>
        <TableHeadCell />
      </TableHead>
      <TableBody class="divide-y">
        {#each rewardsArr as reward}
          <TableBodyRow>
            <TableBodyCell
              tdClass="text-[#6b7280] px-6 py-4 font-medium dark:text-white"
              >{reward.lowLimit}</TableBodyCell
            >
            <TableBodyCell
              tdClass="text-[#6b7280] px-6 py-4 font-medium dark:text-white"
              >{reward.highLimit}</TableBodyCell
            >
            <TableBodyCell
              tdClass="text-[#6b7280] px-6 font-medium dark:text-white"
            >
              {reward.units}
            </TableBodyCell>
            <TableBodyCell
              tdClass="text-[#6b7280] px-6 pt-4 font-medium dark:text-white"
            >
              {reward.value}
            </TableBodyCell>
            <TableBodyCell>
              <div
                class="cursor-pointer"
                on:click={() => removeReward(reward.id)}
              >
                <img src="assets/delete.svg" />
              </div>
            </TableBodyCell>
          </TableBodyRow>
        {/each}
        {#if newReward}
          <TableBodyRow>
            <TableBodyCell
              tdClass="text-[#6b7280] py-4 pl-3 font-medium dark:text-white"
              ><Input
                bind:value={lowLimit}
                placeholder="number"
                inputClass="w-[100px] h-[42px] rounded-lg bg-[#e5e7eb] border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 text-[14px] text-[#6b7280] border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              /></TableBodyCell
            >
            <TableBodyCell
              tdClass="text-[#6b7280] py-4 pl-3 font-medium dark:text-white"
              ><Input
                bind:value={highLimit}
                placeholder="number"
                inputClass="w-[100px] h-[42px] rounded-lg bg-[#e5e7eb] border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 text-[14px] text-[#6b7280] border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              /></TableBodyCell
            >
            <TableBodyCell
              tdClass="text-[#6b7280] py-4 pl-3 font-medium dark:text-white"
            >
              <Select
                selectClass="bg-transparent bg-none border-none p-0 focus:ring-transparent"
              >
                <option value="points">Points</option>
                <option value="dollars">Dollars</option>
              </Select>
            </TableBodyCell>
            <TableBodyCell
              tdClass="text-[#6b7280] py-4 pl-3 font-medium dark:text-white"
            >
              <Input
                bind:value
                placeholder="number"
                inputClass="w-[100px] h-[42px] rounded-lg bg-[#e5e7eb] border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 text-[14px] text-[#6b7280] border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </TableBodyCell>
            <TableBodyCell />
          </TableBodyRow>
        {/if}
      </TableBody>
    </Table>
  </div>
</div>

{#if loading}
  <div class="fixed bg-[#00000033] left-0 top-0 w-full h-full z-50">
    <div class="top-1/2 translate-y-[-50%] w-[50px] m-auto relative">
      <Spinner size="12" />
    </div>
  </div>
{/if}

<style>
  .inter {
    font-family: 'Inter', sans-serif;
  }
</style>
