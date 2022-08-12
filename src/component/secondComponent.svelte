<script>

    import {Checkbox, Input, Label} from "flowbite-svelte";
    let click = false

    const handleClick = ()=>{
        click = !click
    }
</script>


<div>
    <div class="flex flex-wrap pr-[15px] pl-[15px] mt-[10px] text-[12px] justify-between">
        <div class="flex flex-col ">
            <p class="text-black font-[500]">Most Used Channel</p>
            <span class="text-sm text-gray-500 font-[400]">PHONECALL</span>
        </div>
        <div class="flex flex-col">
            <span class="text-black font-[500]">Customer Since</span>
            <span class="text-sm text-gray-500 font-[400]">28/06/2022</span>
        </div>
        <div class="flex flex-col">
            <span class="text-black font-[500]">Communication Profile</span>
            <span class="text-sm text-gray-500 font-[400]">Reassurance</span>
        </div>
        <div class="flex flex-col">
            <span class="text-black font-[500]">Last Interaction</span>
            <span class="text-sm text-gray-500 font-[400]">3 days and 4 hours ago</span>
        </div >
        <div class="flex flex-col">
            <span class="text-black font-[500]">Last Csat Score</span>
            <span class="text-sm flex items-center text-gray-500 font-[400]">89.5%
            <img  src="assets/up-arrow.png" alt="" class="w-[10px] h-[10px] ml-[10px]"/>
            </span>
        </div>
        <div class="flex flex-col">
            <span class="text-black font-[500]">Related Accounts</span>
            <span class="text-sm text-gray-500 font-[400]">Dan Dougherty</span>
        </div>
    </div>

    <div class="pr-[15px] pl-[15px] mt-[35px] flex justify-between">
        <div class="flex items-center">
            <input type="checkbox" class=" outline-green-600 text-red-600 rounded-md focus:outline-none" />
            <div class=" ml-[10px] flex items-center text-[#991B1E] font-500 justify-center w-[100px] h-8 bg-[red] bg-opacity-[.15] rounded-lg">Do not call</div>
        </div>

        <div class="bg-stone-300 w-[120px] rounded-lg flex justify-center items-center bg-opacity-[.4]">
            <div class="text-violet-800">Show history</div>
        </div>
    </div>
    <div class="pr-[15px] pl-[15px]">
        <div class="w-full h-[1px] bg-gray-500 mt-[15px]"></div>
        <div class="flex justify-between mt-[15px]">
            <span class="text-blue-700 font-[400]">Default Information</span>
            <button class="w-[50px] bg-stone-300 bg-opacity-[.4] h-8 rounded-lg">Edit</button>
        </div>
        <div class="flex justify-between">
            <div class="mb-6 flex flex-col w-[17%] ">
                <Label  class="mb-[5px] text-[rgb(17 24 39)] text-xs">Customer</Label>
                <Input  inputClass=" rounded-lg" class="text-gray-500 font-[400]" value="Daniel  Dougherty" disabled={true}/>
            </div>
            <div class="mb-6 flex flex-col w-[17%]">
                <Label  class="mb-[5px] text-[rgb(17 24 39)] text-xs">Account ID</Label>
                <Input  inputClass=" rounded-lg" class="text-gray-500 font-[400]" value="No data registered" disabled={true}/>
            </div>
            <div class="mb-6 flex flex-col w-[17%]">
                <Label  class="mb-[5px] text-[rgb(17 24 39)] text-xs">Number</Label>
                <Input  inputClass=" rounded-lg" class="text-gray-500 font-[400]" value="(202) 460-8478" disabled={true}/>
            </div>
            <div class="mb-6 flex flex-col w-[17%]">
                <Label  class="mb-[5px] text-[rgb(17 24 39)] text-xs">Email</Label>
                <Input  inputClass=" rounded-lg" class="text-gray-500 font-[400]" value="Dan@untangl.ne" disabled={true}/>
            </div>
        </div>
    </div>
    <div class="flex flex-row pr-[15px] pl-[15px] items-center">
        <div class="mb-6 flex flex-col w-[30%] ">
            <Label  class="mb-[5px] text-xs">Address</Label>
            <Input  inputClass=" rounded-lg " class="text-gray-500 font-[400]" value="163 Sugar Beet Circle, Longmont, CO 80501"  disabled={true}/>
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

</div>