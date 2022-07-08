<script>
  import {Avatar, Spinner, Next, Previous} from 'flowbite-svelte';
  import AgentPlanTable from 'src/components/AgentPlanTable.svelte';
  import {Icon, Star as StarHero} from 'svelte-hero-icons';
  import StarRating from 'svelte-star-rating';

  export let ratings = [];
  export let totalRating = 0;
  export let switchingFromCalendar = false;
  export let rating = 0;
  export let interactions = 0;
  export let earnings = 0;
  export let opportunity = 0;
  export let percentage = {};
  export let previousPage;
  export let dayFromForRating = new Date();
  export let dayToForRating = new Date();
  export let nextPage;
  export let currentIndex = 0;
  export let noData = false;
  export let filteredData = false;
  export let noNextData = false;

  let loading = false;

  const config = {
    fullColor: '#faca15',
    emptyColor: '#ebe8ee'
  };

  let avatar = {
    src: 'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Round&hatColor=Black&facialHairType=Blank&facialHairColor=Auburn&clotheType=ShirtCrewNeck&clotheColor=Black&eyeType=Happy&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Light',
    alt: 'avatar',
    size: 12,
    round: true
  };
</script>

<div
  class="mb-5 mt-5 flex m-auto open-sans xl:w-[90%] xl:ml-20 xl:gap-[30px] sm:w-[98%] sm:gap-[10px] sm:m-auto sm:m-0"
>
  <div
    class="w-2/6 bg-white h-full text-center p-4 rounded-[8px] border-[#e4e7ec] shadow-[0_10px_13px_0px_rgba(17,38,146,0.05)]"
  >
    <div class="m-auto w-[48px] z-10 relative"><Avatar {avatar} /></div>
    <div
      class="w-11/12 border bg-[#f9fafb] m-auto rounded-[8px] translate-y-[-20px]"
    >
      <h1 class="text-[#101828] text-[18px] pt-[30px]">Guadalupe</h1>
      <div
        class="flex h-[40px] justify-between leading-[40px] align-middle m-auto w-[60px]"
      >
        <Icon
          src={StarHero}
          size="18"
          solid
          color="#faca15"
          class="mt-[11px]"
        />
        <div class="text-[#667085] text-[12px] text-left mr-1 ml-1">
          {Math.round(totalRating)}
        </div>
        <img src="src/assets/info.svg" width="10" alt="" />
      </div>
    </div>
    <div class="flex justify-between gap-[15px] w-11/12 m-auto">
      <div
        class="rounded-[16px] bg-[#ecfdf3] w-6/12 h-[32px] leading-[32px] align-middle
					flex gap-[5px]"
      >
        <div
          class="mt-[3.5px] ml-[5px] sm:text-[10px] rounded-[16px] bg-[#fff] w-7/12 h-[24px] leading-[24px] align-middle
 						lg:text-[14px] text-center text-[#027a48]"
        >
          You earned
        </div>
        <div class="lg:text-[14px] sm:text-[10px] text-[#027a48]">
          ${Math.round(earnings * 100) / 100}
        </div>
      </div>
      <div
        class="rounded-[16px] bg-[#f9fafb] w-6/12 h-[32px] leading-[32px] align-middle
					flex gap-[5px]"
      >
        <div
          class="mt-[3.5px] ml-[5px] rounded-[16px] bg-[#fff] w-7/12 h-[24px] leading-[24px] align-middle
 						lg:text-[14px] sm:text-[10px] text-center text-[#344054]"
        >
          Opportunity
        </div>
        <div class="lg:text-[14px] sm:text-[10px] text-[#344054]">
          ${Math.round(opportunity * 100) / 100}
        </div>
      </div>
    </div>
    <div class="flex w-11/12 m-auto justify-between pt-6 pb-6">
      <div class="text-[#101828] lg:text-[14px] sm:text-[12px]">Pay Plans</div>
      <div class="text-[#667085] lg:text-[14px] sm:text-[12px]">
        New client Acquisition
      </div>
      <div class="text-[#667085] lg:text-[14px] sm:text-[12px]">
        New Client Upsale
      </div>
      <!--			<div class="text-[#667085] lg:text-[14px] sm:text-[12px]">{Math.round(ratings[2]?.rating)}</div>-->
    </div>
    <div class="w-11/12 m-auto flex justify-between">
      <StarRating rating={Math.round(rating * 100) / 100} {config} />
      <div
        class="text-[#101828] lg:text-[20px] xl:ml-20 sm:text-[14px] sm:ml-10 font-semibold"
      >
        {Math.round(rating * 100) / 100} out of 5
      </div>
    </div>
    <div class="flex justify-between w-[90%] m-auto">
      <span class="text-[#344054] lg:text-[14px] sm:text-[12px]">
        {interactions} Interaction Rated</span
      >
      <span class="w-[4px] h-[4px] bg-[#1d2939] rounded-[2px] mt-[7px]" />
      {#if filteredData}
        <span class="text-[#344054] lg:text-[14px] sm:text-[12px]"
          >All period data</span
        >
      {:else}
        <span class="text-[#344054] lg:text-[14px] sm:text-[12px]"
          >{dayToForRating
            ? `${new Date(dayFromForRating).toLocaleString('default', {
                month: 'short'
              })}
				${new Date(dayFromForRating).getUTCDate()}, ${new Date(
                dayFromForRating
              ).getUTCFullYear()}
				– ${new Date(dayToForRating).toLocaleString('default', {
          month: 'short'
        })}
				${new Date(dayToForRating).getUTCDate()}, ${new Date(
                dayToForRating
              ).getUTCFullYear()}`
            : `
				${new Date(dayFromForRating).toLocaleString('default', {month: 'short'})}
				${new Date(dayFromForRating).getUTCDate()}, ${new Date(
                dayFromForRating
              ).getUTCFullYear()}
				`}</span
        >
      {/if}
    </div>
    <div class="flex gap-2 w-[90%] m-auto mt-2 relative">
      <div
        class="text-[#475467] w-[50px] lg:text-[14px] sm:text-[12px] font-light"
      >
        5 star
      </div>
      <div class="w-full">
        <div class="mt-[6px] rounded-[8px] w-full h-[10px] bg-[#f9fafb]">
          {#if percentage[5]}
            <div
              class={`mt-[6px] rounded-[8px] h-[10px] bg-[#faca15] left-12`}
              style="width: {`${percentage[5]}%`}"
            />
          {/if}
        </div>
      </div>
      <span class="text-[#475467] lg:text-[14px] sm:text-[12px] font-light"
        >{percentage[5] ? percentage[5] : 0}%</span
      >
    </div>
    <div class="flex gap-2 w-[90%] m-auto mt-2">
      <div
        class="text-[#475467] w-[50px] lg:text-[14px] sm:text-[12px] font-light"
      >
        4 star
      </div>
      <div class="w-full">
        <div class="mt-[6px] rounded-[8px] w-full h-[10px] bg-[#f9fafb]">
          {#if percentage[4]}
            <div
              class={`mt-[6px] rounded-[8px] h-[10px] bg-[#faca15] left-12`}
              style="width: {`${percentage[4]}%`}"
            />
          {/if}
        </div>
      </div>
      <span class="text-[#475467] lg:text-[14px] sm:text-[12px] font-light"
        >{percentage[4] ? percentage[4] : 0}%</span
      >
    </div>
    <div class="flex gap-2 w-[90%] m-auto mt-2">
      <div
        class="text-[#475467] w-[50px] lg:text-[14px] sm:text-[12px] font-light"
      >
        3 star
      </div>
      <div class="w-full">
        <div class="mt-[6px] rounded-[8px] w-full h-[10px] bg-[#f9fafb]">
          {#if percentage[3]}
            <div
              class={`mt-[6px] rounded-[8px] h-[10px] bg-[#faca15] left-12`}
              style="width: {`${percentage[3]}%`}"
            />
          {/if}
        </div>
      </div>
      <span class="text-[#475467] lg:text-[14px] sm:text-[12px] font-light"
        >{percentage[3] ? percentage[3] : 0}%</span
      >
    </div>
    <div class="flex gap-2 w-[90%] m-auto mt-2">
      <div
        class="text-[#475467] w-[50px] lg:text-[14px] sm:text-[12px] font-light"
      >
        2 star
      </div>
      <div class="w-full">
        <div class="mt-[6px] rounded-[8px] w-full h-[10px] bg-[#f9fafb]">
          {#if percentage[2]}
            <div
              class={`mt-[6px] rounded-[8px] h-[10px] bg-[#faca15] left-12`}
              style="width: {`${percentage[2]}%`}"
            />
          {/if}
        </div>
      </div>
      <span class="text-[#475467] lg:text-[14px] sm:text-[12px] font-light"
        >{percentage[2] ? percentage[2] : 0}%</span
      >
    </div>
    <div class="flex gap-2 w-[90%] m-auto mt-2">
      <div
        class="text-[#475467] w-[50px] lg:text-[14px] sm:text-[12px] font-light"
      >
        1 star
      </div>
      <div class="w-full">
        <div class="mt-[6px] rounded-[8px] w-full h-[10px] bg-[#f9fafb]">
          {#if percentage[1]}
            <div
              class={`mt-[6px] rounded-[8px] h-[10px] bg-[#faca15] left-12`}
              style="width: {`${percentage[1]}%`}"
            />
          {/if}
        </div>
      </div>
      <span class="text-[#475467] lg:text-[14px] sm:text-[12px] font-light"
        >{percentage[1] ? percentage[1] : 0}%</span
      >
    </div>
    <div class="flex gap-2 w-[90%] m-auto mt-2">
      <div
        class="text-[#475467] w-[50px] lg:text-[14px] sm:text-[12px] font-light"
      >
        0 star
      </div>
      <div class="w-full">
        <div class="mt-[6px] rounded-[8px] w-full h-[10px] bg-[#f9fafb]">
          {#if percentage[0]}
            <div
              class={`mt-[6px] rounded-[8px] h-[10px] bg-[#faca15] left-12`}
              style="width: {`${percentage[0]}%`}"
            />
          {/if}
        </div>
      </div>
      <span class="text-[#475467] lg:text-[14px] sm:text-[12px] font-light"
        >{percentage[0] ? percentage[0] : 0}%</span
      >
    </div>
  </div>
  <div class="w-4/6">
    <AgentPlanTable {ratings} {noData} />
    <div class="flex justify-between mt-10 mx-auto">
      {#if currentIndex > 0 && !noNextData}
        <div>
          <Previous on:previous={previousPage} icon />
        </div>
      {:else}
        <div />
      {/if}
      {#if switchingFromCalendar || noData || noNextData}
        <div />
      {:else}
        <div>
          <Next on:next={nextPage} icon />
        </div>
      {/if}
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

<style>
  .open-sans {
    font-family: 'OpenSans', sans-serif;
  }
</style>
