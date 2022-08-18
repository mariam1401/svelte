<script>

    let data = [
        {items:'reading books',done:false,edit:false},
        {items:'coding',done:false,edit:false},
        {items:'do homework',done:false,edit:false}
    ]
    let click = false
    let newTodo = ''
    let editItem = false
    const addTodo = ()=>{
        if(newTodo !== '') {
            data = [...data, {items: newTodo, done: false, edit: false}]
            newTodo = ''
        }
    }
    const removeTodo = (status,index)=>{
            data.splice(index,1)
            data=data
    }
    const edit = (index,update)=>{
            data[index].items = update
            data[index].edit = false
    }
    const update = (index)=>{
        if(data[index].done === false) {
            data[index].edit = !data[index].edit
        }
    }
    let a = 0
    const counting = () => {
        let count = 0
        for (let i = 0; i < data.length; i++) {
                if (data[i].done === true) {
                    count++
                }
            }
        return a= count
        }
$:counting(data)
</script>
<div class="container">
<div class="div">
    <div class="header">
        <input placeholder="Add new todo" bind:value={newTodo} class="input"/>
        <button on:click={addTodo} class="button">Add</button>
    </div>
    {#each data as item, index}
        <div class="div2">
            <input type="checkbox" bind:checked={item.done}/>
            <span class:checked={item.done} >{item.items}</span>
            <button on:click={()=>removeTodo(item.done,index)} class="button" style="background: red"> X </button>
            <button on:click={()=>update(index)} class="button" style="background: green">Edit </button>
            {#if (item.edit)}
               <input bind:value={item.items} class="input"/>
               <button on:click={()=>edit(index,item.items) } class="button">done</button>
            {/if}
        </div>
    {/each}
    </div>
    <div>
        <span class="span">{data.length}/{a}</span>
    </div>
</div>


<style>
    .container{
        width: 500px;
        height: 500px;
        margin: 50px auto 0;
        background: #a5c5ff;
        border-radius: 10px;
        box-shadow: 2px 3px 1px 4px #95abb6;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        /*align-items: center;*/
    }
    .checked{
        text-decoration: line-through;
        color:green;
    }
    .input{
        width: 60%;
        height: 30px;
        border: none;
        border-radius: 10px;
        padding-left: 10px;
        outline-color: #95abb6;
    }
    .button{
        width: 20%;
        height: 30px;
        border-radius: 15px;
        border-color: darkcyan;
        cursor: pointer;
        background: cornflowerblue;
    }
    .header{
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        margin-top: 20px;
    }
    .div2{
        display: flex;
        margin-top: 10px;
        margin-left: 30px;
    }
    .span{
        margin-left: 30px;
        font-size: 20px;
        color: blue;
    }
.div{
    width: 100%;
}
</style>