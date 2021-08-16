
import { addTasks, getAllTasks} from './actions/domOperation.js'
import "../styles/style.css";
// import { addTasks} from './actions/domOperation.js'
window.onload = function () {
    getAllTasks();
  };
  
  todo.addEventListener('submit', addTasks);



