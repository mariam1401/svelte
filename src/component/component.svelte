<script>
    export let click
    export let id
    export let handleClick
    export let number
    export let component
    export let title
</script>

<div class="w-[80%]  mt-[10px]  bg-[#ffffff]  rounded-[5px] shadow-[0 -1px 13px #1126920d] cursor-pointer">
    <div class="flex justify-between items-center h-[40px]" on:click={(e)=>handleClick(e,number)} >
    <span class="ml-[15px] text-[#4f4f4f] font-[500]">{title}</span>
    {#if (click === true && id===number)}
        <img src="assets/expand-more-button_down.svg" alt="" class="mr-[15px]"/>
    {:else}
        <img src="assets/expand-less-button.svg" alt="" class="mr-[15px]"/>
    {/if}
        </div>
    {#if (click === true && id===number)}
        <svelte:component this={component}/>
    {/if}

</div>