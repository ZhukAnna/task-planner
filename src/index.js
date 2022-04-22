import './css/normalize.css';
import './css/style.css';

import getTasks from './modules/backlog.js';
import './modules/users.js';
import './modules/timeline.js';
import dnd from './modules/dnd.js';

const backlogContainer = document.querySelector('.backlog_task-list');

getTasks()
  .then((tasks) => {
    return tasks.map((item) => {
      let task = document.createElement('div');
      task.classList.add('backlog_task');
      task.draggable = true;
      task.innerText = item.subject;
      backlogContainer.append(task);
    });
  })
  .then((onfulfilled) => dnd());
