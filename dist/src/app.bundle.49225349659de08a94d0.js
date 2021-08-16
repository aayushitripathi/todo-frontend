/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAllTasks": () => (/* binding */ getAllTasks),
/* harmony export */   "addTasks": () => (/* binding */ addTasks),
/* harmony export */   "deleteTasks": () => (/* binding */ deleteTasks),
/* harmony export */   "updateTasks": () => (/* binding */ updateTasks),
/* harmony export */   "doneEditTasks": () => (/* binding */ doneEditTasks),
/* harmony export */   "taskCompleted": () => (/* binding */ taskCompleted)
/* harmony export */ });
/* harmony import */ var _apiCalls_taskAPI_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _components_task_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);



// const url = "http://127.0.0.1:3000/tasks";
const url = "https://todo-backend-server-v1.herokuapp.com/tasks";

const getAllTasks = async () => {
    let allTasks = await (0,_apiCalls_taskAPI_js__WEBPACK_IMPORTED_MODULE_0__.taskapiCall)(`${url}`);
    allTasks.forEach((item) => {
        (0,_components_task_js__WEBPACK_IMPORTED_MODULE_1__.createTask)(item);
       
    });
    
}

const addTasks = async (event) => {
    event.preventDefault();
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
    const addTask = await (0,_apiCalls_taskAPI_js__WEBPACK_IMPORTED_MODULE_0__.taskapiCall)(`${url}`, taskObj);
    (0,_components_task_js__WEBPACK_IMPORTED_MODULE_1__.createTask)(addTask);
}

const deleteTasks = (e) => {
    let taskObj = {
        method: 'DELETE'
    }
    const id = e.target.parentElement.id;
    console.log(id);
    const deleteTask = document.getElementById(id);
    (0,_apiCalls_taskAPI_js__WEBPACK_IMPORTED_MODULE_0__.taskapiCall)(`${url}/${id}`, taskObj);
    deleteTask.remove();
}

const updateTasks = (e) => {
    const enableInput = e.target.parentElement.childNodes[1];
    enableInput.disabled = false;


}

const doneEditTasks = async (e) => {
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
     await (0,_apiCalls_taskAPI_js__WEBPACK_IMPORTED_MODULE_0__.taskapiCall)(`${url}/${id}`, taskObj);
     console.log("api called");
     parentelem.isEdited=false;
}
     enableInput.disabled = true;
}


const taskCompleted = async (e) => {
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
    await (0,_apiCalls_taskAPI_js__WEBPACK_IMPORTED_MODULE_0__.taskapiCall)(`${url}/${id}`, taskObj);

}

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "taskapiCall": () => (/* binding */ taskapiCall)
/* harmony export */ });

const taskapiCall = async (url, taskObj = {}) => {
    try{
   const response = await fetch(url, taskObj);
   const data = await response.json();
   const taskData = await data.data;

   return taskData;
    }
    catch(err){
        console.log(err);
    }
  }



/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTask": () => (/* binding */ createTask)
/* harmony export */ });
/* harmony import */ var _actions_domOperation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


let rootDiv = document.getElementById("root");

const createTask = (item) => {
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
completeBtn.addEventListener('click', _actions_domOperation_js__WEBPACK_IMPORTED_MODULE_0__.taskCompleted) 
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
delBtn.addEventListener('click', _actions_domOperation_js__WEBPACK_IMPORTED_MODULE_0__.deleteTasks);

editBtn.classList.add("far");
editBtn.classList.add("fa-edit","fa-2x");
editBtn.addEventListener('click', _actions_domOperation_js__WEBPACK_IMPORTED_MODULE_0__.updateTasks) 

doneEdit.classList.add("fas");
doneEdit.classList.add("fa-thumbs-up","fa-2x");
doneEdit.addEventListener('click', _actions_domOperation_js__WEBPACK_IMPORTED_MODULE_0__.doneEditTasks) 

listElement.appendChild(completeBtn)
listElement.appendChild(listfield);
listElement.appendChild(delBtn);
listElement.appendChild(editBtn);
listElement.appendChild(doneEdit);
rootDiv.appendChild(listElement);
}

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _actions_domOperation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);



// import { addTasks} from './actions/domOperation.js'
window.onload = function () {
    (0,_actions_domOperation_js__WEBPACK_IMPORTED_MODULE_0__.getAllTasks)();
  };
  
  todo.addEventListener('submit', _actions_domOperation_js__WEBPACK_IMPORTED_MODULE_0__.addTasks);




})();

/******/ })()
;