<script>
  import {Icon, Star as StarHero} from 'svelte-hero-icons';
  import {getDate} from 'src/utils';
  import Interactions from 'src/components/Interactions.svelte';

  export let item = {};
  export let date = '';
  let details = false;

  let day = '';
  let year = '';
  let month = '';

  $: onDateChange(date);

  const onDateChange = () => {
    const response = getDate(date);
    day = response.day;
    month = response.month;
    year = response.year;
  };
  // console.log(item, "item")
  const toggleDetails = () => {
    details = !details;
  };

  let meanRating = 0;
  for (let i = 0; i < item.items.length; i++) {
    meanRating += item.items[i].rating;
  }

  meanRating /= item.items.length;
</script>

<div
  class="bg-white grid-table text-center pl-4 border-t-[1px] h-[72px]
	border-l-[4px] border-l-[#fff] hover:border-l-[#f9fafb]
	leading-[72px] align-middle hover:bg-[#f9fafb]"
  class:selected={details}
>
  <div class="date">{month} {day}, {year}</div>
  <div class="text-[#667085] text-[14px] text-center font-light">
    {item.items.length} interactions
  </div>
  <div class="text-[#667085] text-[14px] text-center font-light">All plans</div>
  <div>
    <div class="h-[72px] flex justify-center">
      <Icon src={StarHero} size="18" solid color="#faca15" class="mt-[27px]" />
      <div class="text-[#667085] text-[12px] text-left mr-1 ml-1">
        <!--{JSON.stringify(item.items)}-->
        <!--{item.items.reduce(function (prevVal, ele) {-->
        <!--	return prevVal.rating + ele.rating;-->
        <!--}, 0) / item.items.length}-->
        {Math.round(item.rating * 100) / 100}
        <!--{Math.round(meanRating)}-->
      </div>
      <div class="flex relative">
        <img src="src/assets/info.svg" alt="" width="10" />
      </div>
    </div>
  </div>
  {#if details}
    <img
      src="src/assets/up.svg"
      alt=""
      width="20"
      class="mt-[23.5px] cursor-pointer hover:bg-[#fff] hover:rounded-[10px]"
      on:click={toggleDetails}
    />
  {:else}
    <img
      src="src/assets/down.svg"
      alt=""
      width="20"
      class="mt-[23.5px] cursor-pointer hover:bg-[#fff] hover:rounded-[10px]"
      on:click={toggleDetails}
    />
  {/if}
</div>

{#if details}
  {#each item.items as item}
    <Interactions {item} date={item.timestamp} />
  {/each}
{/if}

<style>
  .date {
    width: 110px;
    padding: 1px 10px;
    height: 22px;
    line-height: 22px;
    margin: 25px auto 0;
    vertical-align: middle;
    align-items: center;
    border-radius: 16px;
    background-color: #eef4ff;
    color: #3538cd;
    font-size: 12px;
  }
  .grid-table {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 0.3fr;
  }
  .selected {
    background-color: #eff8ff;
    border-left: 4px solid #3538cd;
  }
</style>
