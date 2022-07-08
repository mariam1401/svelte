<script>
  import calendarize from 'calendarize';
  import Arrow from './Arrow.svelte';
  import {Spinner} from 'flowbite-svelte';
  import {onMount} from 'svelte';
  import {convertSingleNumberToTwoDigits, buildUrl} from 'src/utils';
  import StarRating from 'svelte-star-rating';
  import {getRatingsData} from 'src/stores/RatingsStore';
  import {navigate} from 'svelte-navigator';

  const today = new Date();
  let year = new Date().getFullYear();
  let month = new Date().getMonth();
  let offset = 0; // Sun

  let daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  let loading = false;
  let ratings = [];

  let dayFrom = '';
  let dayTo = '';

  const switchToExactDate = async day => {
    const date = `${year}-${convertSingleNumberToTwoDigits(
      month + 1
    )}-${convertSingleNumberToTwoDigits(day)}`;
    const response = await getRatingsData(1, date, date);
    const dayRating = response[0];
    console.log(dayRating);
    const url = buildUrl('/', {date});
    navigate(url);
  };

  onMount(async () => {
    loading = true;
    dayFrom = `${year}-${convertSingleNumberToTwoDigits(month + 1)}-01`;
    dayTo = `${year}-${convertSingleNumberToTwoDigits(month + 1)}-31`;

    ratings = await getRatingsData(31, '', dayFrom, dayTo);

    loading = false;
  });

  $: today_month = today && today.getMonth();
  $: today_year = today && today.getFullYear();
  $: today_day = today && today.getDate();

  let prev = calendarize(new Date(year, month - 1), offset);
  let current = calendarize(new Date(year, month), offset);
  let next = calendarize(new Date(year, month + 1), offset);

  const toPrevMonth = async () => {
    loading = true;
    [current, next] = [prev, current];

    if (--month < 0) {
      month = 11;
      year--;
    }

    prev = calendarize(new Date(year, month - 1), offset);
    dayFrom = `${year}-${convertSingleNumberToTwoDigits(month + 1)}-01`;
    dayTo = `${year}-${convertSingleNumberToTwoDigits(month + 1)}-31`;
    ratings = await getRatingsData(31, '', dayFrom, dayTo);
    loading = false;
  };

  const toNextMonth = async () => {
    loading = true;
    [prev, current] = [current, next];

    if (++month > 11) {
      month = 0;
      year++;
    }

    next = calendarize(new Date(year, month + 1), offset);
    dayFrom = `${year}-${convertSingleNumberToTwoDigits(month + 1)}-01`;
    dayTo = `${year}-${convertSingleNumberToTwoDigits(month + 1)}-31`;
    ratings = await getRatingsData(31, '', dayFrom, dayTo);
    ratings = [];
    loading = false;
  };

  const isToday = day => {
    return (
      today && today_year === year && today_month === month && today_day === day
    );
  };
  const getDailyData = (arr, day) => {
    return arr.find(e => day === new Date(e.items[0].timestamp).getUTCDate());
  };
  const config = {
    fullColor: '#faca15',
    emptyColor: '#ebe8ee'
  };
</script>

<div class="w-11/12 p-2 m-auto mt-10">
  <div class="text-[30px] text-[#101828] text-left open-sans pb-5">
    Calendar
  </div>
  <div
    class="bg-white h-full text-center p-4 rounded-[8px] border-[#e4e7ec] shadow-[0_10px_13px_0px_rgba(17,38,146,0.05)]"
  >
    <div class="open-sans flex justify-center mx-auto">
      <Arrow left on:click={toPrevMonth} />
      <div
        class="w-[200px] text-[#344054] text-[20px] font-semibold text-center h-[40px] mb-7 leading-[40px] align-middle"
      >
        {months[month]}
        {year}
      </div>
      <Arrow on:click={toNextMonth} />
    </div>

    <div class="month">
      {#each daysOfWeek as txt, day}
        <span class="font-medium text-center mb-2 text-[#344054]"
          >{daysOfWeek[(day + offset) % 7]}</span
        >
      {/each}

      {#each {length: 6} as w, week}
        {#if current[week]}
          {#each {length: 7} as d, day}
            {#if current[week][day] !== 0}
              <div
                class="date"
                class:today={isToday(current[week][day])}
                class:cursor-pointer={getDailyData(ratings, current[week][day])}
                on:click={getDailyData(ratings, current[week][day]) &&
                  switchToExactDate(current[week][day])}
              >
                <div>{current[week][day]}</div>
                {#if getDailyData(ratings, current[week][day])}
                  <StarRating
                    rating={Math.round(
                      getDailyData(ratings, current[week][day])?.rating * 100
                    ) / 100}
                    {config}
                  />
                  <div class="text-[#667085] text-[14px] flex justify-between">
                    <span class="text-[#667085] text-[14px] font-light"
                      >Rating:</span
                    ><span class="text-[#adb4c5] font-semibold"
                      >{Math.round(
                        getDailyData(ratings, current[week][day])?.rating * 100
                      ) / 100}</span
                    >
                  </div>
                  <div class="text-[#667085] text-[14px] flex justify-between">
                    <span class="text-[#667085] text-[14px] font-light"
                      >Interactions:</span
                    ><span class="text-[#adb4c5] font-semibold"
                      >{getDailyData(ratings, current[week][day])?.items
                        ?.length}</span
                    >
                  </div>
                  <div class="text-[#667085] text-[14px] flex justify-between">
                    <span class="text-[#667085] text-[14px] font-light"
                      >Earnings:</span
                    ><span class="text-[#adb4c5] font-semibold"
                      >${Math.round(
                        getDailyData(ratings, current[week][day])?.earnings *
                          100
                      ) / 100}</span
                    >
                  </div>
                {/if}
              </div>
            {:else if week < 1}
              <span class="date other">{prev[prev.length - 1][day]}</span>
            {:else}
              <span class="date other">{next[0][day]}</span>
            {/if}
          {/each}
        {/if}
      {/each}
    </div>
    {#if loading}
      <div class="fixed bg-[#00000033] left-0 top-0 w-full h-full z-50">
        <div class="top-1/2 translate-y-[-50%] w-[50px] m-auto relative">
          <Spinner size="12" />
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .month {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: right;
    grid-gap: 4px;
  }

  .date {
    height: 150px;
    min-width: 50px;
    font-size: 16px;
    border: 1px solid #e6e4e4;
    padding: 10px 15px 10px;
    letter-spacing: -1px;
    color: #667085;
    font-weight: 500;
  }

  .date:hover {
    border: 1px solid #344054;
  }

  .date.today {
    color: #5286fa;
    background: #eff8ef;
    border-color: currentColor;
  }

  .date.other {
    opacity: 0.2;
  }
  .date.other:hover {
    border: 1px solid #e6e4e4;
  }
  .open-sans {
    font-family: 'OpenSans', sans-serif;
  }
  @media screen and (max-width: 992px) {
    .date {
      padding: 10px 5px 10px;
    }
  }
</style>
