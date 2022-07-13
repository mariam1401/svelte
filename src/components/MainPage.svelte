<script>
  import {
    Button,
    Dropdown,
    DropdownItem,
    Spinner,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell
  } from 'flowbite-svelte';
  import * as axios from 'axios';
  import {Link} from 'svelte-navigator';
  import {useLocation, navigate} from 'svelte-navigator';
  import {createEventDispatcher, onMount} from "svelte";

  let loading = false;

  const location = useLocation();

  const dispatch = createEventDispatcher()

  export let path = '';

  const plans = [
    {
      name: 'Send testing',
      startDate: '5/19/12',
      endDate: '5/29/12',
      createdBy: 'Darlene Robertson',
      brand: 'Untangl',
      status: 'Draft'
    },
    {
      name: 'Testing done',
      startDate: '9/18/16',
      endDate: '9/23/16',
      createdBy: 'Kristin Watson',
      brand: 'Warby Barker',
      status: 'Published'
    },
    {
      name: 'Rolled over',
      startDate: '9/23/16',
      endDate: '9/27/16',
      createdBy: 'Guy Hawkins',
      brand: 'Extended',
      status: 'Published'
    },
    {
      name: 'Send bugs',
      startDate: '8/30/14',
      endDate: '9/5/14',
      createdBy: 'Theresa Webb',
      brand: 'Connect one health',
      status: 'Published'
    }
  ];
</script>

<div class="w-11/12 p-2 m-auto inter">
  <!--  <h1 class="title hidden">Welcome to MicroPai</h1>-->
  <div class="flex gap-[20px] justify-between mb-5">
    <div class="text-left text=[#111928] text-[24px] font-semibold">
      All Plans
    </div>
    <div>
      <Link to="newplan">
        <Button size="sm">Create Plan</Button>
      </Link>
    </div>
  </div>
  <Table striped={true} divClass="shadow-md sm:rounded-lg border">
    <TableHead>
      <TableHeadCell>PLAN NAME</TableHeadCell>
      <TableHeadCell>START DATE</TableHeadCell>
      <TableHeadCell>END DATE</TableHeadCell>
      <TableHeadCell>CREATED BY</TableHeadCell>
      <TableHeadCell>BRAND</TableHeadCell>
      <TableHeadCell>STATUS</TableHeadCell>
      <TableHeadCell />
    </TableHead>
    <TableBody class="divide-y">
      {#each plans as plan}
        <TableBodyRow>
          <TableBodyCell
            tdClass="text-[#6b7280] px-6 py-4 font-medium dark:text-white"
            >{plan.name}</TableBodyCell
          >
          <TableBodyCell
            tdClass="text-[#6b7280] px-6 py-4 font-medium dark:text-white"
            >{plan.startDate}</TableBodyCell
          >
          <TableBodyCell
            tdClass="text-[#6b7280] px-6 py-4 font-medium dark:text-white"
            >{plan.endDate}</TableBodyCell
          >
          <TableBodyCell
            tdClass="text-[#6b7280] px-6 py-4 font-medium dark:text-white"
            >{plan.createdBy}</TableBodyCell
          >
          <TableBodyCell
            tdClass="text-[#6b7280] px-6 py-4 font-medium dark:text-white"
            >{plan.brand}</TableBodyCell
          >
          <TableBodyCell>
            <div
              class={plan.status === 'Draft'
                ? `w-[49px] h-[22px] bg-[#f3f4f6] text-center rounded-[6px] leading-[22px] align-middle px-2 text-[12px] text-[#111928] font-medium`
                : `w-[77px] h-[22px] bg-[#def7ec] text-center rounded-[6px] leading-[22px] align-middle px-2 text-[12px] text-[#03543f] font-medium`}
            >
              {plan.status}
            </div>
          </TableBodyCell>
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
