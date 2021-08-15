
import { addTasks, getAllTasks} from './actions/domOperation.js'
// import { addTasks} from './actions/domOperation.js'
window.onload = function () {
    getAllTasks();
  };
  
  todo.addEventListener('submit', addTasks);



