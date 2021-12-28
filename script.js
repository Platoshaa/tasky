

const form = document.querySelector('.form')
const input = document.querySelector('.input')
const box = document.querySelector('.box')
const deleteAll = document.querySelector('.delete-all')
let data = []
let items =box.querySelectorAll('.item')
const select = document.querySelector('select')
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
        data.push(input.value)
        input.value = ''
        }
input.focus()   
setlocStor()
doneTask()
deleteTask()
})}
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
                for(let i =0;i<data.length;i++){
                    if(text==data[i]||text+'#d__d#'==data[i]){
                    console.log(data[i])
                       data.splice(i,1)
                       item.remove()
                    } } setlocStor()
            })})}
function setlocStor(){
     items=box.querySelectorAll('.item')
    for(let k = 0;k<data.length;k++){
        // let x = 
        if(items[data.length-k-1].classList.contains('done')){
            if(/#d__d#$/.test(data[k])){
              
            }
            else{
                data[k]=data[k]+'#d__d#' 
            }
         
        }
    }
    let  name = new XMLHttpRequest();
             name.open("POST", "http://enstf.platomyworks.ru/edit.php",true);
                name.onreadystatechange = function () {
                        if (name.readyState === 4 && name.status === 200) {
                                
      }}
      console.log(JSON.stringify(data))
              name.send(JSON.stringify(data));
    
    }
function getJsonData(url,fn){
        let  name = new XMLHttpRequest();
             name.open("GET", url);
            //   name.setRequestHeader("Content-type: application/json; charset=utf-8");
                name.onreadystatechange = function () {
                        if (name.readyState === 4 && name.status === 200) {
                                let jsonAnswer = this.responseText;
                                console.log(jsonAnswer, typeof jsonAnswer)
                               fn(jsonAnswer)
      }}
               name.send();
       }
       function parseData(jsonAnswer){
           data = JSON.parse(jsonAnswer)
           for(let i = 0;i<data.length;i++){
            if(/#d__d#$/.test(data[i])){
                data[i] = data[i].replace(/#d__d#$/,'')
                box.insertAdjacentHTML('afterbegin','<div class="item done"> <span>'+data[i]+'</span><div class="btns"><button disabled class=" btn btn-done">done</button><button class=" btn btn-delete">delete</button> </div> </div>') 
            }
            else{
                box.insertAdjacentHTML('afterbegin','<div class="item"> <span>'+data[i]+'</span><div class="btns"><button class=" btn btn-done">done</button><button class=" btn btn-delete">delete</button> </div> </div>') 
            }}
        addTask()
doneTask()
deleteTask()
        }
       
       getJsonData("http://enstf.platomyworks.ru/functions.php",parseData)