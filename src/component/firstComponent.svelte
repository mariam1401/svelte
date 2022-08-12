<script>
    import {Input, Label} from "flowbite-svelte";
    let click = false

    const handleClick = ()=>{
        click = !click
    }
</script>

<div class="w-[100%]  pl-[15px] pr-[15px] mt-[10px] flex flex-wrap">
    <div class="flex flex-row items-center">
      <div class="mb-6 flex flex-col w-[80%] ">
        <Label  class="mb-[5px] text-xs">Address</Label>
        <Input  inputClass=" rounded-lg "  class="text-gray-500 font-[400]" value="No data registered"  disabled={true}/>
      </div>
        {#if (click === true)}
            <div class=" flex items-center w-[43px] h-[43px] ml-[15px] overflow-hidden">
      <img src="assets/geo-location-blue.svg" alt="" on:click={handleClick}/>
                </div>
      {:else}
            <div class="border-black bg-black flex items-center w-[43px] h-[43px] ml-[15px] border border-gray-300 rounded-lg overflow-hidden">
      <img src="assets/geo-location (1).svg" alt=""  on:click={handleClick} />
            </div>
        {/if}
    </div>
    <div class="flex flex-wrap justify-between ">
        <div class="mb-6 flex flex-col w-[17%]">
            <Label  class="mb-[5px] text-[rgb(17 24 39)] text-xs">City</Label>
            <Input  inputClass=" rounded-lg" value="No data registered "  class="text-gray-500 font-[400]" disabled={true}/>
        </div>
        <div class="mb-6 flex flex-col w-[17%]">
            <Label  class="mb-[5px] text-xs">Zip</Label>
            <Input  inputClass=" rounded-lg"  class="text-gray-500 font-[400] focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0" value="No data registered" disabled={true} />
        </div>
        <div class="mb-6 flex flex-col w-[17%]">
            <Label  class="mb-[5px] text-xs">Phone Number</Label>
            <Input  inputClass=" rounded-lg"  class="text-gray-500 font-[400]" value="No data registered" disabled={true}/>
        </div>
        <div class="mb-6 flex flex-col w-[17%] ">
            <Label  class="mb-[5px] text-xs">Store DID</Label>
            <Input  inputClass="  rounded-lg"  class="text-gray-500 font-[400]" value="No data registered" disabled={true}/>
        </div>
        <div class="mb-6 flex flex-col w-[17%] ">
            <Label  class="mb-[5px] text-xs">Store ID Number</Label>
            <Input  inputClass=" rounded-lg" value="No data registered"  class="text-gray-500 font-[400]" disabled={true}/>
        </div>
    </div>
</div>