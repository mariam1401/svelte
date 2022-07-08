<script>
  import {getDate} from 'src/utils';
  import StarRating from 'svelte-star-rating';

  export let item = {};
  export let date = '';

  let day = '';
  let year = '';
  let month = '';
  let hour = '';
  let minutes = '';
  let seconds = '';

  const config = {
    fullColor: '#faca15',
    emptyColor: '#ebe8ee',
    size: 15
  };

  $: onDateChange(date);

  const onDateChange = () => {
    const response = getDate(date);
    day = response.decimalDay;
    month = response.monthWithNumber;
    year = response.year;
    hour = response.hour;
    minutes = response.minutes;
    seconds = response.seconds;
  };
</script>

<div
  class="bg-white grid-table text-center pl-4 border-t-[1px] h-[72px] leading-[72px] align-middle hover:bg-[#f9fafb]"
>
  <div class="details">
    <h1 class="text-[#344054] text-[14px] text-center">{day}/{month}/{year}</h1>
    <div class="text-[#667085] text-[14px] text-center">
      {hour}:{minutes}:{seconds}
    </div>
  </div>
  <div class="text-[#667085] text-[14px] text-center font-light">
    {item.customer}
  </div>
  <div class="text-[#667085] text-[14px] text-center font-light">
    Warby Barker Sales Plan
  </div>
  <div class="details">
    <StarRating rating={Math.round(item.rating * 100) / 100} {config} />
    <div class="text-[#667085] text-[14px] text-center">
      Rating: <span class="text-[#101828]">{item.rating}</span>
    </div>
  </div>
  <div />
</div>

<style>
  .grid-table {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 0.3fr;
  }
  .details {
    line-height: 18px;
    text-align: center;
    margin: auto;
  }
</style>
