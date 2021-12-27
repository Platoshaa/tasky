const form = document.querySelector('.form')
const input = document.querySelector('.input')
const box = document.querySelector('.box')
const deleteAll = document.querySelector('.delete-all')
let storage = []
let items =box.querySelectorAll('.item')
const select = document.querySelector('select')
getlocStor()    
deleteAll.addEventListener('click',()=>{
    localStorage.clear()
    box.remove()
})
select.addEventListener('click',()=>{
  switch (select.value) {
      case 'done':
        items =box.querySelectorAll('.item')
        itemsDone =box.querySelectorAll('.item.done')
        items.forEach((item)=>{
            item.style.display='none'
        })
        itemsDone.forEach((item)=>{
            item.style.display='flex'
        })
          break;
          case 'doing':
            items =box.querySelectorAll('.item')
        itemsDone =box.querySelectorAll('.item.done')
        items.forEach((item)=>{
            item.style.display='flex'
        })
        itemsDone.forEach((item)=>{
            item.style.display='none'
        })
            break;
      default:
        items.forEach((e)=>{
            e.style.display="flex"
        })
          break;
  }
})
function addTask(){
    input.focus()
    form.addEventListener('submit',(e)=>{
        e.preventDefault()
       if (input.value == ''){input.classList.add('err')}
       else{
        input.classList.remove('err')
        box.insertAdjacentHTML('afterbegin','<div class="item"> <span>'+input.value+'</span><div class="btns"><button class=" btn btn-done">done</button><button class=" btn btn-delete">delete</button> </div> </div>') 
        storage.push(input.value)
        input.value = ''
       }
input.focus()   
setlocStor()
doneTask()
deleteTask()
})}
function getlocStor(){
if(localStorage.getItem('tasky')==null){
}
else{
storage = JSON.parse(localStorage.getItem('tasky'))
for(let i = 0;i<storage.length;i++){
    if(/#d__d#$/.test(storage[i])){
        storage[i] = storage[i].replace(/#d__d#$/,'')
        box.insertAdjacentHTML('afterbegin','<div class="item done"> <span>'+storage[i]+'</span><div class="btns"><button disabled class=" btn btn-done">done</button><button class=" btn btn-delete">delete</button> </div> </div>') 
    }
    else{
        box.insertAdjacentHTML('afterbegin','<div class="item"> <span>'+storage[i]+'</span><div class="btns"><button class=" btn btn-done">done</button><button class=" btn btn-delete">delete</button> </div> </div>') 
    }}}
addTask()
doneTask()
deleteTask()
}
function setlocStor(){
     items=box.querySelectorAll('.item')
    for(let k = 0;k<storage.length;k++){
        // let x = 
        if(items[storage.length-k-1].classList.contains('done')){
            if(/#d__d#$/.test(storage[k])){
              
            }
            else{
                storage[k]=storage[k]+'#d__d#' 
            }
         
        }
    }
    localStorage.setItem('tasky',JSON.stringify(storage))
    }
function doneTask(){
        let btnDone = box.querySelectorAll('.btn-done')
        btnDone.forEach((it)=>{  
it.addEventListener('click',function(){
    let item =  it.parentNode.parentNode
   item.classList.add('done')
   it.setAttribute('disabled','true')
    setlocStor()
}) }) }
    function deleteTask(){
        let btnDel = box.querySelectorAll('.btn-delete')
        btnDel.forEach((it)=>{
            it.addEventListener('click',function(){
                let item =  it.parentNode.parentNode
                let text=item.querySelector('span').textContent
                for(let i =0;i<storage.length;i++){
                    if(text==storage[i]||text+'#d__d#'==storage[i]){
                    console.log(storage[i])
                       storage.splice(i,1  )
                       item.remove()
                    } } setlocStor()
            })})}
