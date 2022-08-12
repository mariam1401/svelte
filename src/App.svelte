<script lang="ts">
import fourthComponent from "src/component/fourthComponent.svelte";

let click = false
let id
import Div from './component/component.svelte'
import firstComponent from "src/component/firstComponent.svelte";
import secondComponent from "src/component/secondComponent.svelte";
import thirdComponent from "src/component/thirdComponent.svelte";

const handleClick = (e,number)=>{
    e.preventDefault()
    click = !click
    id = number
}
const a = {
    item1:firstComponent,
    item2:secondComponent,
    item3:thirdComponent,
    item4:fourthComponent,
}
</script>

<div class="w-full h-[100vh] bg-[#f8f8f8] flex flex-col items-center pt-[100px] font-Roboto font-[300]">
    <Div {click} {id} number={1} {handleClick} component={a.item1} title="Store Details"/>
    <Div {click} {id} number={2} {handleClick} component={a.item2} title="Customer information" />
    <Div {click} {id} number={3} {handleClick} component={a.item3} title="Secure Pad"/>
    <Div {click} {id} number={4} {handleClick} component={a.item4} title="IVR Card Capture Details"/>
</div>


