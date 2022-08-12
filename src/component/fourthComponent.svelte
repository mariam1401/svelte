<script>
    import {Input, Label} from "flowbite-svelte";
</script>

    <div class="flex justify-start w-[100%]  pr-[15px] pl-[15px] mt-[15px]">
        <div class="mb-6 flex flex-col w-[17%]">
            <Label  class="mb-[5px] text-xs">IVR CC Status</Label>
            <Input  inputClass=" rounded-lg" class="text-gray-500 font-[400]" value="No data registered" disabled={true}/>
        </div>
        <div class="mb-6 flex flex-col w-[17%] ml-[15px]">
            <Label  class="mb-[5px] text-xs">IVR CVV Status</Label>
            <Input  inputClass=" rounded-lg" class="text-gray-500 font-[400]" value="No data registered" disabled={true}/>
        </div>
    </div>