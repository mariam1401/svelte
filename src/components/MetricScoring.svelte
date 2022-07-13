<script>
  import {
    Dropdown,
    DropdownItem,
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

  const metricsArr = [
    {
      name: 'Silence',
      units: 'YES',
      breakpoints: 'NO'
    },
    {
      name: 'Happy',
      units: 'NO',
      breakpoints: 'YES'
    },
    {
      name: 'Happy',
      units: 'NO',
      breakpoints: 'YES'
    },
    {
      name: 'Duration',
      units: 'YES',
      breakpoints: 'NO'
    }
  ];

  let newMetric = false;
  let selected = 'single';

  let selectMetric = {
    label: 'Select metric'
  };

  let selectedMetric = '';

  let thresholdArr = [0];

  const removeThreshold = id => {
    const index = thresholdArr.findIndex(e => e === id);
    thresholdArr.splice(index, 1);
    thresholdArr = thresholdArr;
  };
</script>

<div class="grid grid-cols-2">
  <div class="w-full p-2 inter">
    <!--  <h1 class="title hidden">Welcome to MicroPai</h1>-->
    <div class="flex gap-[20px] justify-between mb-3">
      <div
        class="text-left text=[#111928] h-[39px] leading-[39px] align-middle text-[18px] font-normal"
      >
        Metrics
      </div>
      <div>
        <div
          on:click={() => (newMetric = true)}
          class="border w-[142px] text-[14px] text-[#1f2a37] h-[39px] text-center leading-[39px] align-middle rounded-lg hover:bg-gray-300 cursor-pointer"
        >
          + Add new
        </div>
      </div>
    </div>
    <Table striped={true} divClass="shadow-md sm:rounded-lg border">
      <TableHead>
        <TableHeadCell>METRICS</TableHeadCell>
        <TableHeadCell>MULTIPLE UNITS</TableHeadCell>
        <TableHeadCell>MULTIPLE BREAKPOINTS</TableHeadCell>
        <TableHeadCell />
      </TableHead>
      <TableBody class="divide-y">
        {#each metricsArr as metric}
          <TableBodyRow>
            <TableBodyCell
              tdClass="text-[#6b7280] px-6 py-4 font-medium dark:text-white"
              >{metric.name}</TableBodyCell
            >
            <TableBodyCell
              tdClass="text-[#6b7280] px-6 py-4 font-medium dark:text-white"
              >{metric.units}</TableBodyCell
            >
            <TableBodyCell
              tdClass="text-[#6b7280] px-6 py-4 font-medium dark:text-white"
              >{metric.breakpoints}</TableBodyCell
            >
            <TableBodyCell>
              <Dropdown
                label="&#8942;"
                inline={true}
                placement="bottom-start"
                arrowIcon={false}
                labelClass="items-center justify-between w-full py-0 pl-0 pr-0
                 font-medium text-gray-700 border-b border-gray-100
                 hover:bg-gray-50 md:hover:bg-transparent md:border-0
                 md:hover:text-blue-700 md:p-0 dark:text-gray-400
                 dark:hover:text-white dark:focus:text-white dark:border-gray-700
                 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                liClass="block w-[0px] cursor-pointer py-2 px-4 text-sm text-gray-700
                  hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Clone</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </Dropdown>
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  </div>
  {#if newMetric}
    <div>
      <div class="flex justify-between ml-10 border-b pb-2">
        <div>
          <div class="text-left text=[#111928] text-[18px] font-normal">
            New metric rule
          </div>
          <div class="text-left text=[#6b7280] text-[14px] font-normal">
            Start metric rule here.
          </div>
        </div>
        <div class="flex">
          <div
            class:active={selected === 'single'}
            class:bg={selected === 'multiple'}
            class="rounded-bl-lg rounded-tl-lg border cursor-pointer"
            on:click={() => (selected = 'single')}
          >
            Single
          </div>
          <div
            class:active={selected === 'multiple'}
            class:bg={selected === 'single'}
            class="rounded-br-lg rounded-tr-lg border cursor-pointer"
            on:click={() => (selected = 'multiple')}
          >
            Multiple
          </div>
        </div>
      </div>
      {#if selected === 'single'}
        <div class="ml-10 pt-4 flex gap-6">
          <div class="w-[178px]">
            <Select {...selectMetric} bind:value={selectedMetric}>
              {#each metrics as metric}
                <option value={metric}>{metric}</option>
              {/each}
            </Select>
          </div>
          <div class="grid-4">
            {#each thresholdArr as item}
              <div>
                <Label
                  for="name"
                  class="block mb-2 text-[#111928] font-medium text-[16px]"
                  >Min definition</Label
                >
                <Input
                  id="name"
                  placeholder="-"
                  inputClass="w-[70px] h-[42px] rounded-lg bg-[#e5e7eb] border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 text-[14px] text-[#6b7280] border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <Label
                  for="name"
                  class="block mb-2 text-[#111928] font-medium text-[16px]"
                  >Max definition</Label
                >
                <Input
                  id="name"
                  placeholder="-"
                  inputClass="w-[70px] h-[42px] rounded-lg bg-[#e5e7eb] border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 text-[14px] text-[#6b7280] border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <Label
                  for="name"
                  class="block mb-2 text-[#111928] font-medium text-[16px]"
                  >Score value</Label
                >
                <Input
                  id="name"
                  placeholder="-"
                  inputClass="w-[70px] h-[42px] rounded-lg bg-[#e5e7eb] border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 text-[14px] text-[#6b7280] border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div
                class="pt-9 cursor-pointer"
                on:click={item !== 0 && (() => removeThreshold(item))}
              >
                <img src="assets/delete.svg" />
              </div>
            {/each}
          </div>
        </div>
        <div class="text-[#6b7280] justify-center flex gap-2 mt-4 text-[14px]">
          <div
            class="w-[24px] h-[24px] leading-[24px] align-middle rounded-[12px] bg-white cursor-pointer text-center hover:border"
            on:click={() => {
              thresholdArr.push(thresholdArr.length);
              thresholdArr = thresholdArr;
            }}
          >
            +
          </div>
          <div class="h-[24px] leading-[24px] align-middle">Add threshold</div>
        </div>
      {:else}
        <div class="ml-10 pt-4 flex gap-6">
          <div class="w-[178px]">
            <Select {...selectMetric} bind:value={selectedMetric}>
              {#each metrics as metric}
                <option value={metric}>{metric}</option>
              {/each}
            </Select>
          </div>
          <div class="grid-4">
            {#each thresholdArr as item}
              <div>
                <Label
                  for="name"
                  class="block mb-2 text-[#111928] font-medium text-[16px]"
                  >Min definition</Label
                >
                <Input
                  id="name"
                  placeholder="-"
                  inputClass="w-[70px] h-[42px] rounded-lg bg-[#e5e7eb] border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 text-[14px] text-[#6b7280] border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <Label
                  for="name"
                  class="block mb-2 text-[#111928] font-medium text-[16px]"
                  >Max definition</Label
                >
                <Input
                  id="name"
                  placeholder="-"
                  inputClass="w-[70px] h-[42px] rounded-lg bg-[#e5e7eb] border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 text-[14px] text-[#6b7280] border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <Label
                  for="name"
                  class="block mb-2 text-[#111928] font-medium text-[16px]"
                  >Score value</Label
                >
                <Input
                  id="name"
                  placeholder="-"
                  inputClass="w-[70px] h-[42px] rounded-lg bg-[#e5e7eb] border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 text-[14px] text-[#6b7280] border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div
                class="pt-9 cursor-pointer"
                on:click={item !== 0 && (() => removeThreshold(item))}
              >
                <img src="assets/delete.svg" />
              </div>
            {/each}
          </div>
        </div>
<!--        <div class="text-[#6b7280] justify-center flex gap-2 mt-4 text-[14px]">-->
<!--          <div-->
<!--            class="w-[24px] h-[24px] leading-[24px] align-middle rounded-[12px] bg-white cursor-pointer text-center hover:border"-->
<!--          >-->
<!--            +-->
<!--          </div>-->
<!--          <div class="h-[24px] leading-[24px] align-middle">Add threshold</div>-->
<!--        </div>-->
        <div class="ml-10 pt-4 flex gap-6">
          <div class="w-[178px]">
            <Select {...selectMetric} bind:value={selectedMetric}>
              {#each metrics as metric}
                <option value={metric}>{metric}</option>
              {/each}
            </Select>
          </div>
          <div class="grid-4">
            {#each thresholdArr as item}
              <div>
                <Label
                  for="name"
                  class="block mb-2 text-[#111928] font-medium text-[16px]"
                  >Min definition</Label
                >
                <Input
                  id="name"
                  placeholder="-"
                  inputClass="w-[70px] h-[42px] rounded-lg bg-[#e5e7eb] border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 text-[14px] text-[#6b7280] border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <Label
                  for="name"
                  class="block mb-2 text-[#111928] font-medium text-[16px]"
                  >Max definition</Label
                >
                <Input
                  id="name"
                  placeholder="-"
                  inputClass="w-[70px] h-[42px] rounded-lg bg-[#e5e7eb] border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 text-[14px] text-[#6b7280] border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <Label
                  for="name"
                  class="block mb-2 text-[#111928] font-medium text-[16px]"
                  >Score value</Label
                >
                <Input
                  id="name"
                  placeholder="-"
                  inputClass="w-[70px] h-[42px] rounded-lg bg-[#e5e7eb] border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 text-[14px] text-[#6b7280] border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div
                class="pt-9 cursor-pointer"
                on:click={item !== 0 && (() => removeThreshold(item))}
              >
                <img src="assets/delete.svg" />
              </div>
            {/each}
          </div>
        </div>
<!--        <div class="text-[#6b7280] justify-center flex gap-2 mt-4 text-[14px]">-->
<!--          <div-->
<!--            class="w-[24px] h-[24px] leading-[24px] align-middle rounded-[12px] bg-white cursor-pointer text-center hover:border"-->
<!--          >-->
<!--            +-->
<!--          </div>-->
<!--          <div class="h-[24px] leading-[24px] align-middle">Add threshold</div>-->
<!--        </div>-->
      {/if}
    </div>
  {/if}
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

  .bg {
    background: #f9fafb;
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
    text-align: center;
    width: 80px;
    color: #4b5563;
    font-size: 14px;
    transition: 300ms ease;
  }
  .active {
    background: #362f78;
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
    text-align: center;
    width: 80px;
    color: #ffffff;
    font-size: 14px;
    transition: 300ms ease;
  }
  .active:hover {
    background: #401a60;
  }
  .bg:hover {
    background: #efefef;
  }
  .grid-4 {
    display: grid;
    grid-template-columns: 30% 30% 30% 10%;
    grid-gap: 20px;
  }
</style>
