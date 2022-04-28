import './css/normalize.css';
import './css/style.css';

import getTasks from './modules/backlog.js';
import './modules/users.js';
import './modules/timeline.js';
import dnd from './modules/dnd.js';

const backlogContainer = document.querySelector('.backlog_task-list');

const preloader = document.createElement('div');
preloader.classList.add('preloader');
preloader.innerHTML = '<div class="animated-background"></div>';
for (let i = 1; i < 15; i++) {
  backlogContainer.append(preloader.cloneNode(true));
}

getTasks()
  .then((tasks) => {
    backlogContainer.innerHTML = '';
    return tasks.map((item) => {
      let task = document.createElement('div');
      task.classList.add('backlog_task');
      task.draggable = true;
      task.innerText = item.subject;
      task.setAttribute('data-start', item.planStartDate);
      task.setAttribute('data-end', item.planEndDate);
      if (item.executor) {
        task.classList.add('task');
        document.querySelector(`.cells_item[data-user='${item.executor}']`).append(task);
      } else {
        backlogContainer.append(task);
        //добавить размещение на несколько дат
      }
    });
  })
  .then(() => dnd());
