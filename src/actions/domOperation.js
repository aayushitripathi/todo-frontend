import { taskapiCall } from "../apiCalls/taskAPI.js";
import { createTask } from "../components/task.js";

// const url = "http://127.0.0.1:3000/tasks";
const url = "https://todo-backend-server-v1.herokuapp.com/tasks";

export const getAllTasks = async () => {
    let allTasks = await taskapiCall(`${url}`);
    allTasks.forEach((item) => {
        createTask(item);
       
    });
    
}

export const addTasks = async (event) => {
    event.preventDefault();
    if (!navigator.onLine) {
        alert("you are offline!");
        return;
    }
    let taskField = document.getElementById("taskField");
    let inputValue = taskField.value;
    console.log(inputValue);
    taskField.value = "";
    let taskObj = {
        method: 'POST',
        body: JSON.stringify({content: inputValue,
            createdAt: new Date(),
            updatedAt: ""}),
        headers: {
            "Content-Type": "application/json"
        }
    }
    const addTask = await taskapiCall(`${url}`, taskObj);
    createTask(addTask);
}

export const deleteTasks = (e) => {
    if (!navigator.onLine) {
        alert("you are offline!");
        return;
    }
    let taskObj = {
        method: 'DELETE'
    }
    const id = e.target.parentElement.id;
    console.log(id);
    const deleteTask = document.getElementById(id);
    taskapiCall(`${url}/${id}`, taskObj);
    deleteTask.remove();
}

export const updateTasks = (e) => {
    if (!navigator.onLine) {
        alert("you are offline!");
        return;
    }
    const enableInput = e.target.parentElement.childNodes[1];
    enableInput.disabled = false;


}

export const doneEditTasks = async (e) => {
    if (!navigator.onLine) {
        alert("you are offline!");
        return;
    }
    const enableInput = e.target.parentElement.childNodes[1];
    const parentelem = e.target.parentElement;
    const id = e.target.parentElement.id;
    let inputValue = enableInput.value;
    if(parentelem.isEdited)
    {
    let taskObj = {
        method: 'PUT',
        body: JSON.stringify({content: inputValue, 
            createdAt: new Date(), 
            updatedAt: "", 
            iscompleted: false
        }),
        headers: {
            "Content-Type": "application/json"
        } 
    }
     await taskapiCall(`${url}/${id}`, taskObj);
     console.log("api called");
     parentelem.isEdited=false;
}
     enableInput.disabled = true;
}


export const taskCompleted = async (e) => {
    if (!navigator.onLine) {
        alert("you are offline!");
        return;
    }
    const enableInput = e.target.parentElement.childNodes[1];
    const complete = e.target.parentElement.childNodes[1];
    const editDisabled = e.target.parentElement.childNodes[3];
    const deleteBtn = e.target.parentElement.childNodes[2];
    const doneDisabled = e.target.parentElement.childNodes[4];
    const id = e.target.parentElement.id;
    editDisabled.disabled = true;
    doneDisabled.disabled = true;
    enableInput.style.textDecoration = "line-through";
    e.target.parentElement.style.backgroundColor = "#ae5f75";
    deleteBtn.style.color="white";
    editDisabled.style.display="none";
    doneDisabled.style.color="white";
    complete.style.color="white";

    console.log(editDisabled);
    let inputValue = enableInput.value;
 
    let taskObj = {
        method: 'PUT',
        body: JSON.stringify({content: inputValue, 
            createdAt: new Date(), 
            updatedAt: "", 
            iscompleted: true
        }),
        headers: {
            "Content-Type": "application/json"
        } 

    }
    await taskapiCall(`${url}/${id}`, taskObj);

}