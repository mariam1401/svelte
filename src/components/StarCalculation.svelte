<script>
  import {
    Input,
    Spinner,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell
  } from 'flowbite-svelte';
  import StarRating from 'svelte-star-rating';

  let loading = false;

  const config = {
    fullColor: '#faca15',
    emptyColor: '#ebe8ee'
  };

  let starsArr = [
    {
      id: 0,
      low: '-500',
      high: '.5',
      stars: 0.7
    },
    {
      id: 1,
      low: '0.51',
      high: '.99',
      stars: 2
    },
    {
      id: 2,
      low: '2',
      high: '5',
      stars: 4
    }
  ];

  let newStarCalculation = false;

  let lowValue = '';
  let highValue = '';
  let rating = '';

  const onInputChange = score => {
    if (lowValue.length !== 0 && highValue.length !== 0 && score.length !== 0) {
      starsArr.push({
        id: starsArr.length,
        high: highValue,
        low: lowValue,
        stars: rating
      });

      starsArr = starsArr;
      newStarCalculation = false;
      lowValue = '';
      highValue = '';
      rating = '';
    }
  };

  $: onInputChange(rating);

  const removeStar = id => {
    const index = starsArr.findIndex(e => e.id === id);
    starsArr.splice(index, 1);
    starsArr = starsArr;
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
          on:click={() => (newStarCalculation = true)}
          class="border w-[142px] text-[14px] text-[#1f2a37] h-[39px] text-center leading-[39px] align-middle rounded-lg hover:bg-gray-300 cursor-pointer"
        >
          + Add new
        </div>
      </div>
    </div>
    <Table striped={true} divClass="shadow-md sm:rounded-lg border">
      <TableHead>
        <TableHeadCell>METRIC VALUE LOW</TableHeadCell>
        <TableHeadCell>METRIC VALUE HIGH</TableHeadCell>
        <TableHeadCell>STARS AWARDED</TableHeadCell>
        <TableHeadCell />
      </TableHead>
      <TableBody class="divide-y">
        {#each starsArr as star}
          <TableBodyRow>
            <TableBodyCell
              tdClass="text-[#6b7280] px-6 py-4 font-medium dark:text-white"
              >{star.low}</TableBodyCell
            >
            <TableBodyCell
              tdClass="text-[#6b7280] px-6 py-4 font-medium dark:text-white"
              >{star.high}</TableBodyCell
            >
            <TableBodyCell
              tdClass="text-[#6b7280] px-6 pt-4 font-medium dark:text-white"
            >
              <StarRating rating={parseInt(star.stars)} {config} />
            </TableBodyCell>
            <TableBodyCell>
              <div class="cursor-pointer" on:click={() => removeStar(star.id)}>
                <img src="assets/delete.svg" alt="" />
              </div>
            </TableBodyCell>
          </TableBodyRow>
        {/each}
        {#if newStarCalculation}
          <TableBodyRow>
            <TableBodyCell
              tdClass="text-[#6b7280] px-4 py-4 font-medium dark:text-white"
              ><Input
                bind:value={lowValue}
                placeholder="Enter number"
              /></TableBodyCell
            >
            <TableBodyCell
              tdClass="text-[#6b7280] px-4 py-4 font-medium dark:text-white"
              ><Input
                bind:value={highValue}
                placeholder="Enter number"
              /></TableBodyCell
            >
            <TableBodyCell
              tdClass="text-[#6b7280] px-4 font-medium dark:text-white"
            >
              <Input bind:value={rating} placeholder="Enter number" />
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
