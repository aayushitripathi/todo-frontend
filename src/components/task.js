import { deleteTasks, doneEditTasks, taskCompleted, updateTasks} from '../actions/domOperation.js';

let rootDiv = document.getElementById("root");

export const createTask = (item) => {
const listElement = document.createElement("li");
listElement.id="showtask";
listElement.isEdited = false;
const listfield = document.createElement("input");
const delBtn = document.createElement("i");
const editBtn = document.createElement("i");
const doneEdit = document.createElement("i");
const completeBtn = document.createElement("i");
listElement.style.listStyle = "none";



listElement.setAttribute("id", item.taskId);

listfield.value = item.content;
listfield.disabled = true;
listfield.addEventListener("change", () =>{ 
listElement.isEdited = true;
})

completeBtn.classList.add("far");
completeBtn.classList.add("fa-check-circle","fa-2x");
completeBtn.addEventListener('click', taskCompleted) 
completeBtn.id="completed";

if(item.iscompleted)
    {
    // console.log("listfield.isComplete");
    listElement.style.backgroundColor ="#ae5f75";
    delBtn.style.color="white";
    completeBtn.style.color="white";
    editBtn.style.display="none";
    doneEdit.style.display="none";
    listfield.style = "text-decoration: line-through";
    }


delBtn.classList.add("far");
delBtn.classList.add("fa-trash-alt","fa-2x");
delBtn.addEventListener('click', deleteTasks);

editBtn.classList.add("far");
editBtn.classList.add("fa-edit","fa-2x");
editBtn.addEventListener('click', updateTasks) 

doneEdit.classList.add("fas");
doneEdit.classList.add("fa-thumbs-up","fa-2x");
doneEdit.addEventListener('click', doneEditTasks) 

listElement.appendChild(completeBtn)
listElement.appendChild(listfield);
listElement.appendChild(delBtn);
listElement.appendChild(editBtn);
listElement.appendChild(doneEdit);
rootDiv.appendChild(listElement);
}