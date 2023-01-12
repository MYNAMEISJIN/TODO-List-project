let addButton = document.getElementById("add-button");
let userInput = document.getElementById("user-input");
let tabButtons = document.querySelectorAll(".tabs div")
let tabUnderline = document.getElementById("underline-bar");

let list =[];
let filteredList=[];
let mode ="all";
addButton.addEventListener("click",addTask);
userInput.addEventListener("keypress",function(press){
    if(press.key == "Enter")
    {
        addTask();
    }
})
console.log(tabButtons)

for(let i=0; i<tabButtons.length;i++)
{
    tabButtons[i].addEventListener("click",function(event){filter(event)})
}

function filter(event)
{
    mode = event.target.id //target.id는 각 event의 id를 알기위해서 이다.
    filteredList=[];

    tabUnderline.style.left = event.currentTarget.offsetLeft + "px";
    tabUnderline.style.width = event.currentTarget.offsetWidth + "px";
    tabUnderline.style.top = 
    event.currentTarget.offsetTop+event.currentTarget.offsetHeight + "px" +10;

    if(mode=="all")
    {
        render()
    }
    else if(mode == "ongoing")
    {
        for(let i=0; i<list.length;i++)
        {
            if(list[i].isComplete==false)
            {
                filteredList.push(list[i]);
            }
        }
        render()
    }
    else if(mode == "done")
    {
        for(let i=0; i<list.length;i++)
        {
            if(list[i].isComplete==true)
            {
                filteredList.push(list[i]);
            }
        }
        render()
    }
}

function addTask()
{
    
    let newTaskList = {
        id:generateID(),
        task:userInput.value,
        isComplete:false
    }
    list.push(newTaskList)
    
    console.log(list)
    render()
}

function render()
{
    let listHTML='';
    let taskList =[];

    if(mode=="all")
    {
        taskList = list;
    }
    else if(mode=="ongoing"||mode=="done")
    {
        taskList = filteredList;
    }


    for(let i=0;i<taskList.length; i++)
    {

        if(taskList[i].isComplete==true)
        {
            listHTML = listHTML + `
            <div class="lists">
                <div class="task-done">${taskList[i].task}</div>
                <div>
                    <button onclick="completeTask('${taskList[i].id}')">Done</button>
                    <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
                </div>
            </div>
        `
        }
        else
        {
            listHTML = listHTML + `
            <div class="lists">
                <div>${taskList[i].task}</div>
                <div>
                    <button onclick="completeTask('${taskList[i].id}')">Complete</button>
                    <button onclick="deleteTask('${taskList[i].id}')">Delete</button>
                </div>
            </div>
        `
        }
    }

    document.getElementById("lists-board").innerHTML = listHTML;
}

function completeTask(id)
{
    for(let i=0; i<list.length;i++)
    {
        if(list[i].id == id)
        {
            list[i].isComplete=!list[i].isComplete;
            break;
        }
    }
    render();

}

function deleteTask(id)
{
    for(let i=0; i<list.length;i++)
    {
        if(list[i].id == id)
        {
            list.splice(i,1);
            break;
        }
    }
    
    render();
}
function generateID()
{
    return 'id' + (new Date()).getTime();
}