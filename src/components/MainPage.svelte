<script>
  import AgentProfile from 'src/components/AgentProfile.svelte';
  import {clickOutside, convertSingleNumberToTwoDigits} from 'src/utils';
  import {checkboxPlans, checkboxStars} from 'src/utils/checkboxes';
  import Checkbox from 'svelte-checkbox';
  import DatePicker from '@beyonk/svelte-datepicker/src/components/DatePicker.svelte';
  import {onMount} from 'svelte';
  import {Spinner} from 'flowbite-svelte';
  import * as axios from 'axios';
  import {Link} from 'svelte-navigator';
  import {getRatingsData} from 'src/stores/RatingsStore';
  import {useLocation, navigate} from 'svelte-navigator';

  const location = useLocation();

  let plans = false;
  let totalRating = 0;
  let loading = false;
  let items = [];
  let firstCursor = '';
  let lastCursor = '';
  let noData = false;
  let noNextData = false;
  let cursors = [];
  let currentIndex = 0;
  let ratings = [];
  let switchingFromCalendar = false;
  let filteredData = false;

  let selectedPlans = {
    newClient: false,
    existingClient: false,
    cx: false
  };

  let selectedStars = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
  };

  let history = [];
  const agentId = 'Guadalupe5433d69c-ac84-11ec-8475-c2bb32e40a46';

  const dateFromCalendar = $location.search.substring(6, 16);

  let dayFromForRating = new Date();
  let dayToForRating = new Date();
  let formattedDateFrom = new Date();

  if (dateFromCalendar.length !== 0) {
    dayFromForRating = `${new Date(
      dateFromCalendar
    ).getUTCFullYear()}-${convertSingleNumberToTwoDigits(
      new Date(dateFromCalendar).getUTCMonth() + 1
    )}-${convertSingleNumberToTwoDigits(
      new Date(dateFromCalendar).getUTCDate()
    )}`;
    formattedDateFrom = `${new Date(
      dateFromCalendar
    ).getUTCFullYear()}-${convertSingleNumberToTwoDigits(
      new Date(dateFromCalendar).getUTCMonth() + 1
    )}-${convertSingleNumberToTwoDigits(
      new Date(dateFromCalendar).getUTCDate()
    )}`;
    dayToForRating = null;
  } else {
    dayFromForRating.setDate(dayFromForRating.getDate() - 7);
    formattedDateFrom = `${dayFromForRating.getUTCFullYear()}-${convertSingleNumberToTwoDigits(
      dayFromForRating.getUTCMonth() + 1
    )}-${convertSingleNumberToTwoDigits(dayFromForRating.getUTCDate())}`;
    dayToForRating = `${new Date().getUTCFullYear()}-${convertSingleNumberToTwoDigits(
      new Date().getUTCMonth() + 1
    )}-${convertSingleNumberToTwoDigits(new Date().getUTCDate())}`;
  }

  let filteredArr = [];

  let rating = 0;
  let interactions = 0;
  let earnings = 0;
  let opportunity = 0;

  $: onDateChange(filteredArr);
  let percentage = {};

  const onDateChange = arr => {
    interactions = 0;
    rating = 0;
    earnings = 0;
    opportunity = 0;
    filteredData = false;
    // const isTodaySelected = ratings.find((el) => el.id.includes(`${agentId}-2022-06-30`));
    // const isTodaySelected = { rating: 1 };
    // console.log(ratings, isTodaySelected, 'rati');
    for (let i = 0; i < arr.length; i++) {
      // if(isTodaySelected) {
      // 	rating += arr[i].rating  + isTodaySelected.rating / arr.length + 1;
      // } else {
      rating += arr[i].rating / arr.length;
      interactions += arr[i].interactions;
      earnings += arr[i].earnings;
      opportunity += arr[i].opportunity;
      // }
    }

    const starPercentageArr = [...new Set(filteredArr)];

    starPercentageArr.forEach(el => {
      const numItems = filteredArr.filter(
        rating => rating.rating === el.rating
      );
      percentage[el.rating] = Math.round(
        (numItems.length * 100) / starPercentageArr.length
      );
    });
  };

  let dayFrom = new Date();
  dayFrom.setDate(dayFrom.getDate() - 7);

  let dateFrom, dateTo;
  if (dateFromCalendar) {
    dateFrom = `${new Date(dateFromCalendar).toLocaleString('default', {
      month: 'short'
    })} ${convertSingleNumberToTwoDigits(
      new Date(dateFromCalendar).getUTCDate()
    )}, ${new Date(dateFromCalendar).getUTCFullYear()}`;
    dateTo = '';
  } else {
    dateFrom = `${dayFrom.toLocaleString('default', {
      month: 'short'
    })} ${convertSingleNumberToTwoDigits(
      dayFrom.getUTCDate()
    )}, ${dayFrom.getUTCFullYear()}`;
    dateTo = `${new Date().toLocaleString('default', {
      month: 'short'
    })} ${convertSingleNumberToTwoDigits(
      new Date().getUTCDate()
    )}, ${new Date().getUTCFullYear()}`;
  }

  onMount(async () => {
    loading = true;
    filteredData = false;

    let response;
    if (dateFromCalendar.length !== 0) {
      response = await getRatingsData(
        5,
        '',
        dateFromCalendar,
        dateFromCalendar
      );
      switchingFromCalendar = true;
    } else {
      response = await getRatingsData(5, '');
    }

    if (response.length === 0) {
      ratings = response;
      noData = true;
      loading = false;
    } else {
      ratings = response;
      lastCursor = response[ratings.length - 1].id;
      firstCursor = response[0].id;
      cursors = [...cursors, firstCursor, lastCursor];
    }

    const {data} = await axios.get(
      'https://us-central1-ccaas-untangl.cloudfunctions.net/ratings/history'
    );

    history = data;

    for (let i = 0; i < history.length; i++) {
      totalRating += history[i].rating / history.length;
    }

    if (dayToForRating) {
      filteredArr = history
        .filter(el => el.id.includes(agentId))
        .filter(
          el =>
            el.id >= `${agentId}-${formattedDateFrom}` &&
            el.id <= `${agentId}-${dayToForRating}`
        );
    } else {
      filteredArr = history
        .filter(el => el.id.includes(agentId))
        .filter(el => el.id === `${agentId}-${formattedDateFrom}`);
    }

    navigate('/');
    loading = false;
  });

  const nextPage = async () => {
    loading = true;
    filteredData = false;
    if (currentIndex === -1) currentIndex = 0;

    if (currentIndex % 2 === 0) {
      currentIndex++;
    } else if (currentIndex % 2 === 1) {
      currentIndex += 2;
    }

    const response = await getRatingsData(
      5,
      cursors[currentIndex],
      formattedDateFrom,
      dayToForRating
    );

    if (response.length !== 0) {
      ratings = [...response];

      cursors = [...cursors, ratings[0].id, ratings[ratings.length - 1].id];
    } else {
      cursors = [...cursors];
      ratings = [...response];
      noData = true;
    }

    loading = false;
  };

  const previousPage = async () => {
    loading = true;
    noData = false;
    filteredData = false;

    if (currentIndex === -1) currentIndex = 0;

    if (currentIndex % 2 === 0) {
      currentIndex--;
    } else if (currentIndex % 2 === 1) {
      currentIndex -= 2;
    }

    let response;
    response = await getRatingsData(
      5,
      cursors[currentIndex],
      formattedDateFrom,
      dayToForRating
    );

    ratings = [...response];

    cursors = [...cursors, ratings[0]?.id, ratings[ratings.length - 1]?.id];

    loading = false;
  };

  const sevenDaysBefore = new Date();

  sevenDaysBefore.setDate(sevenDaysBefore.getDate() - 7);
  let startDate = `${sevenDaysBefore.getUTCFullYear()}-${convertSingleNumberToTwoDigits(
          sevenDaysBefore.getUTCMonth() + 1
  )}-${convertSingleNumberToTwoDigits(sevenDaysBefore.getUTCDate())}`;
  let endDate = `${new Date().getUTCFullYear()}-${convertSingleNumberToTwoDigits(
          new Date().getUTCMonth() + 1
  )}-${convertSingleNumberToTwoDigits(new Date().getUTCDate())}`;

  const onDateApply = async ({detail}) => {
    currentIndex = 0;
    percentage = {};
    noData = false;
    noNextData = false;
    filteredData = false;
    switchingFromCalendar = false;
    items = [];
    Object.keys(selectedStars).forEach(key => {
      selectedStars[key] = false;
    });
    Object.keys(selectedPlans).forEach(key => {
      selectedStars[key] = false;
    });
    loading = true;
    startDate = `${new Date(
      detail.from
    ).getUTCFullYear()}-${convertSingleNumberToTwoDigits(
      new Date(detail.from).getUTCMonth() + 1
    )}-${convertSingleNumberToTwoDigits(new Date(detail.from).getDate())}`;
    endDate = `${new Date(
      detail.to
    ).getUTCFullYear()}-${convertSingleNumberToTwoDigits(
      new Date(detail.to).getUTCMonth() + 1
    )}-${convertSingleNumberToTwoDigits(new Date(detail.to).getDate())}`;

    dayFromForRating = startDate;
    formattedDateFrom = startDate;
    dayToForRating = endDate;

    const response = await getRatingsData(5, '', startDate, endDate);

    filteredArr = history
      .filter(el => el.id.includes(agentId))
      .filter(
        el =>
          el.id >= `${agentId}-${dayFromForRating}` &&
          el.id <= `${agentId}-${dayToForRating}`
      );

    if (response.length === 0) {
      noData = true;
      ratings = [...response];
    } else {
      ratings = [...response];
      cursors = [ratings[0].id, ratings[ratings.length - 1].id];
    }
    loading = false;
  };

  const filterDataByPlanAndRating = async (planObj, starObj) => {
    loading = true;
    filteredData = false;
    noData = false;
    let selectedStarsArr = [];
    let notSortedItems = [];

    for (let key in starObj) {
      if (Object.prototype.hasOwnProperty.call(starObj, key)) {
        if (starObj[key] === true) selectedStarsArr.push(parseInt(key));
      }
    }

    let response;

    if (selectedStarsArr.length === 0) {
      response = await getRatingsData(5, '', startDate, endDate);

      ratings = response;

      rating = 0;
      earnings = 0;
      opportunity = 0;
      interactions = 0;
      percentage = {};

      for (let i = 0; i < ratings.length; i++) {
        const item = ratings[i];

        rating += Math.round(item.rating) / ratings.length;
        earnings += item.earnings;
        opportunity += item.opportunity;

        interactions += item.items.length;
      }

      const starPercentageArr = [...new Set(ratings)];

      starPercentageArr.forEach(el => {
        const numItems = ratings.filter(
          rating => Math.round(rating.rating) === Math.round(el.rating)
        );
        percentage[Math.round(el.rating)] = Math.round(
          (numItems.length * 100) / starPercentageArr.length
        );
      });
      noNextData = false;
    } else {
      filteredData = true;

      response = await getRatingsData(0, '', '', '', selectedStarsArr.join());

      const sortedArrayOfRatingsByDate = [];

      for (let i = 0; i < response.length; i++) {
        const item = response[i];
        const id = `${item.agent}-${new Date(
          item.timestamp
        ).getUTCFullYear()}-${convertSingleNumberToTwoDigits(
          new Date(item.timestamp).getUTCMonth() + 1
        )}-${convertSingleNumberToTwoDigits(
          new Date(item.timestamp).getUTCDate()
        )}`;
        const items = response.filter(e => e.callId.includes(id));

        notSortedItems = [...notSortedItems, ...items];

        const exist = sortedArrayOfRatingsByDate.find(e => e.id === id);

        let rating = 0;
        let earnings = 0;
        let opportunity = 0;
        for (let i = 0; i < items.length; i++) {
          rating += items[i].rating / items.length;
          earnings += items[i].earnings;
          opportunity += items[i].opportunity;
        }

        if (!exist) {
          sortedArrayOfRatingsByDate.push({
            id,
            items,
            rating,
            opportunity,
            earnings
          });
        }
      }

      ratings = sortedArrayOfRatingsByDate;

      rating = 0;
      earnings = 0;
      opportunity = 0;
      interactions = 0;
      percentage = {};

      for (let i = 0; i < ratings.length; i++) {
        const item = ratings[i];

        rating += item.rating / ratings.length;
        earnings += item.earnings;
        opportunity += item.opportunity;

        interactions += item.items.length;
      }

      const ratingsPercentageArr = [];

      for (const item of ratings) {
        for (const subItem of item.items) {
          ratingsPercentageArr.push({rating: subItem.rating});
          console.log(subItem, 'rgr');
        }
      }
      console.log(ratingsPercentageArr, '22222');

      const starPercentageArr = [...new Set(ratingsPercentageArr)];

      starPercentageArr.forEach(el => {
        const numItems = ratingsPercentageArr.filter(
          rating => Math.round(rating.rating) === Math.round(el.rating)
        );
        percentage[Math.round(el.rating)] = Math.round(
          (numItems.length * 100) / starPercentageArr.length
        );
      });

      // console.log(notSortedItems, "3333333")
      noNextData = true;
    }

    loading = false;
  };

  let activeTab = 'Current';
</script>

<div class="w-11/12 p-2 m-auto mt-10">
  <h1 class="title hidden">Welcome to MicroPai</h1>
  <h1 class="title">Welcome to MicroPai</h1>
  <div class="flex gap-[20px] ml-6 justify-between mb-4">
    <div class="flex gap-5">
      <div
        on:click={() => (activeTab = 'Previous')}
        class="text-[#667085] text-[14px]
				border-b-[2px] h-[40px] leading-[40px] align-middle cursor-pointer"
        class:active={activeTab === 'Previous'}
      >
        Previous Pay Period
      </div>
      <div
        on:click={() => (activeTab = 'Current')}
        class="text-[#667085] text-[14px]
				border-b-[2px] h-[40px] leading-[40px] align-middle cursor-pointer"
        class:active={activeTab === 'Current'}
      >
        Current Pay Period
      </div>
    </div>
    <div class="flex gap-3">
      <div
        class="z-50 hover:shadow-[0_0_5px_0_rgba(16,24,40,0.1)] hover:rounded-[8px]"
      >
        <DatePicker
          range={true}
          on:range-selected={onDateApply}
          placeholder={filteredData
            ? 'All period data'
            : `${dateFrom} - ${dateTo}`}
          continueText="Apply"
        />
      </div>
      <div use:clickOutside on:click_outside={() => (plans = false)}>
        <div
          class="w-[100px] rounded-[8px] border-[#d0d5dd] bg-white
				text-center h-[40px] leading-[40px] align-middle shadow-[0_0_4px_2px_rgba(16,24,40,0.05)]
				shadow-[0_1px_2px_0px_rgba(16,24,40,0.05)] flex justify-center text-[14px] text-[#344054] cursor-pointer
				hover:shadow-[0_0_5px_0_rgba(16,24,40,0.1)]"
          on:click={() => (plans = !plans)}
        >
          <img src="src/assets/filters.svg" width="20" class="mr-2" alt="" />All
          plans
        </div>
        {#if plans}
          <div
            class="bg-white absolute rounded-[8px] w-[240px] z-50 h-[380px] translate-x-[-140px]
				shadow-[3px_3px_10px_0px_#888888]"
          >
            <div
              class="text-[#344054] pl-3 text-[14px] h-[40px] leading-[40px] align-middle border-b font-semibold"
            >
              All plans
            </div>
            {#each checkboxPlans as option}
              <div class=" pl-3 p-2 flex justify-between">
                <div
                  class="flex gap-[10px] h-[16px] leading-[16px] align-middle"
                >
                  <Checkbox
                    bind:checked={selectedPlans[option.name]}
                    on:change={() =>
                      filterDataByPlanAndRating(selectedPlans, selectedStars)}
                    size="1rem"
                    primaryColor="#3538cd"
                  />
                  <div class="text-[#344054] text-[14px] font-light">
                    {option.label}
                  </div>
                </div>
                <div class="text-[#667085] text-[12px] mt-[1px] font-light">
                  {option.id}
                </div>
              </div>
            {/each}
            <div
              class="text-[#344054] pl-3 text-[14px] h-[40px] leading-[40px] align-middle border-b font-semibold"
            >
              Stars
            </div>
            {#each checkboxStars as option}
              <div class=" pl-3 p-2 flex justify-between">
                <div
                  class="flex gap-[10px] h-[16px] leading-[16px] align-middle"
                >
                  <Checkbox
                    bind:checked={selectedStars[option.id]}
                    size="1rem"
                    primaryColor="#3538cd"
                    on:change={() =>
                      filterDataByPlanAndRating(selectedPlans, selectedStars)}
                  />
                  <div class="text-[#344054] text-[14px] font-light">
                    {option.label}
                  </div>
                </div>
                <div class="text-[#667085] text-[12px] mt-[1px] font-light">
                  {option.id}
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>
      <Link to="calendar">
        <div
          class="w-[40px] rounded-[8px] border-[#d0d5dd] bg-white
					text-center h-[40px] leading-[40px] align-middle shadow-[0_0_4px_2px_rgba(16,24,40,0.05)]
					shadow-[0_1px_2px_0px_rgba(16,24,40,0.05)] flex justify-center text-[14px] text-[#344054] cursor-pointer
					hover:shadow-[0_0_5px_0_rgba(16,24,40,0.1)]"
        >
          <img src="src/assets/calendar.svg" alt="" width="20" />
        </div>
      </Link>
    </div>
  </div>
</div>
{#if loading}
  <div class="fixed bg-[#00000033] left-0 top-0 w-full h-full z-50">
    <div class="top-1/2 translate-y-[-50%] w-[50px] m-auto relative">
      <Spinner size="12" />
    </div>
  </div>
{/if}

{#if activeTab === 'Current'}
  <AgentProfile
    {percentage}
    {ratings}
    {previousPage}
    {nextPage}
    {currentIndex}
    {noData}
    {dayToForRating}
    {dayFromForRating}
    {filteredArr}
    {rating}
    {interactions}
    {earnings}
    {opportunity}
    {totalRating}
    {switchingFromCalendar}
    {noNextData}
    {filteredData}
  />
{:else}
  <AgentProfile
    {percentage}
    {ratings}
    {previousPage}
    {nextPage}
    {currentIndex}
    {noData}
    {dayToForRating}
    {dayFromForRating}
    {filteredArr}
    {rating}
    {interactions}
    {earnings}
    {opportunity}
    {totalRating}
    {switchingFromCalendar}
    {noNextData}
    {filteredData}
  />
{/if}

<style>
  .title {
    font-family: OpenSans, sans-serif;
    font-size: 30px;
    line-height: 1.27;
    text-align: left;
    color: #101828;
  }
  .active {
    border-bottom-color: #175cd3;
    color: #175cd3;
  }
</style>
