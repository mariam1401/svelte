<script>
  import {Checkbox, Label, Select} from 'flowbite-svelte';
  import {
    campaigns,
    clients,
    brands,
    countries,
    lobs,
    skills,
    states,
    cities,
    locations,
    tenureBin,
    staff, lifetimeValues, tenure
  } from 'src/utils/selectInputs';

  let selectBrand = {
    label: 'Brand',
  };

  let selectClient = {
    label: 'Client'
  };

  let selectLob = {
    label: 'LOB'
  };

  let selectSkill = {
    label: 'Skill'
  };

  let selectCampaign = {
    label: 'Campaign'
  };

  let selectCountry = {
    label: 'Country'
  };

  let selectState = {
    label: 'State'
  };

  let selectCity = {
    label: 'City'
  };

  let selectLocation = {
    label: 'Location'
  };

  let selectTenureBin = {
    label: 'Tenure Bin'
  };

  let selectStaff = {
    label: 'Staff hierarchy'
  };

  let selectLifetimeValue = {
    label: 'Lifetime value bins'
  };

  let selectTenure = {
    label: 'Tenure'
  };

  let selectedBrand = '';
  let selectedClient = '';
  let selectedLob = '';
  let selectedSkill = '';
  let selectedCampaign = '';
  let selectedCountry = '';
  let selectedState = '';
  let selectedCity = '';
  let selectedLocation = '';
  let selectedTenureBin = '';
  let selectedStaff = '';
  let selectedTenure = '';
  let selectedLifetimeValueBins = '';

  // $: console.log(selectedBrand);
</script>

<div class="inter">
  <div class="border-b pb-8">
    <div class="text-left text=[#111928] h-[39px] leading-[39px] mt-6 align-middle text-[18px] font-normal">
      Line of business
    </div>
    <div class="flex justify-between gap-6">
      <div class="w-full">
        <Select {...selectBrand} bind:value={selectedBrand}>
          {#each brands as brand}
            <option value={brand}>{brand}</option>
          {/each}
        </Select>
      </div>
      <div class="w-full">
        <Select {...selectClient} bind:value={selectedClient}>
          {#each clients as client}
            <option value={client}>{client}</option>
          {/each}
        </Select>
      </div>
      <div class="w-full">
        <Select {...selectLob} bind:value={selectedLob}>
          {#each lobs as lob}
            <option value={lob}>{lob}</option>
          {/each}
        </Select>
      </div>
      <div class="w-full">
        <Select {...selectSkill} bind:value={selectedSkill}>
          {#each skills as skill}
            <option value={skill}>{skill}</option>
          {/each}
        </Select>
      </div>
      <div class="w-full">
        <Select {...selectCampaign} bind:value={selectedCampaign}>
          {#each campaigns as campaign}
            <option value={campaign}>{campaign}</option>
          {/each}
        </Select>
      </div>
    </div>
  </div>
  <div class="border-b pt-4 pb-8">
    <div class="text-left text=[#111928] h-[39px] leading-[39px] align-middle text-[18px] font-normal">Employee</div>
    <div class="flex justify-between gap-6">
      <div class="w-full">
        <Select {...selectCountry} bind:value={selectedCountry}>
          {#each countries as country}
            <option value={country}>{country}</option>
          {/each}
        </Select>
      </div>
      <div class="w-full">
        <Select {...selectState} bind:value={selectedState}>
          {#each states as state}
            <option value={state}>{state}</option>
          {/each}
        </Select>
      </div>
      <div class="w-full">
        <Select {...selectCity} bind:value={selectedCity}>
          {#each cities as city}
            <option value={city}>{city}</option>
          {/each}
        </Select>
      </div>
      <div class="w-full">
        <Select {...selectLocation} bind:value={selectedLocation}>
          {#each locations as location}
            <option value={location}>{location}</option>
          {/each}
        </Select>
      </div>
      <div class="w-full">
        <Select {...selectTenureBin} bind:value={selectedTenureBin}>
          {#each tenureBin as tenure}
            <option value={tenure}>{tenure}</option>
          {/each}
        </Select>
      </div>
      <div class="w-full">
        <Select {...selectStaff} bind:value={selectedStaff}>
          {#each staff as staff}
            <option value={staff}>{staff}</option>
          {/each}
        </Select>
      </div>
    </div>
  </div>
  <div class="border-b pt-4 pb-8">
    <div class="text-left text=[#111928] h-[39px] leading-[39px] align-middle text-[18px] font-normal">Customer</div>
    <div class="flex gap-6">
      <div class="w-[250px]">
        <Select {...selectLifetimeValue} bind:value={selectedLifetimeValueBins}>
          {#each lifetimeValues as value}
            <option value={value}>{value}</option>
          {/each}
        </Select>
      </div>
      <div class="w-[250px]">
        <Select {...selectTenure} bind:value={selectedTenure}>
          {#each tenure as tenure}
            <option value={tenure}>{tenure}</option>
          {/each}
        </Select>
      </div>
    </div>
  </div>
  <div class="py-4">
    <div class="text-[#111928] font-medium text-[16px] mb-4">Chanel CS</div>
    <div class="flex gap-6">
      <div class="flex items-center mb-4">
        <Checkbox checked id='default-checkbox' value='' />
        <Label for='default-checkbox' class='ml-2'>Phone</Label>
      </div>
      <div class="flex items-center mb-4">
        <Checkbox id='checked-checkbox' value='' />
        <Label for='checked-checkbox' class='ml-2'>Chat and webchat</Label>
      </div>
      <div class="flex items-center mb-4">
        <Checkbox id='checked-checkbox' value='' />
        <Label for='checked-checkbox' class='ml-2'>Email</Label>
      </div>
      <div class="flex items-center mb-4">
        <Checkbox id='checked-checkbox' value='' />
        <Label for='checked-checkbox' class='ml-2'>SMS</Label>
      </div>
      <div class="flex items-center mb-4">
        <Checkbox id='checked-checkbox' value='' />
        <Label for='checked-checkbox' class='ml-2'>Social messaging</Label>
      </div>
    </div>
  </div>
</div>

<style>
  .inter {
    font-family: 'Inter', sans-serif;
  }
</style>
