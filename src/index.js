import './css/normalize.css';
import './css/style.css';

import './modules/users.js';
import './modules/timeline.js';
import getTasks from './modules/backlog.js';
import dnd from './modules/dnd.js';
import { setWeek } from './modules/timeline.js';
import { createCell } from './modules/users.js';

const backlogContainer = document.querySelector('.backlog_task-list');
const prevBtn = document.querySelector('.timeline_btn--prev');
const nextBtn = document.querySelector('.timeline_btn--next');

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
        //добавить размещение на несколько дат
      } else {
        backlogContainer.append(task);
      }
    });
  })
  .then(() => dnd());

prevBtn.addEventListener('click', () => {
  setWeek(-7);
  const users = document.querySelectorAll('.users_item');
  document.querySelector('.cells').innerHTML = '';
  for (let i = 0; i < users.length; i++) {
    createCell(users[i].getAttribute('data-user'));
  }
});
nextBtn.addEventListener('click', () => {
  setWeek(7);
  const users = document.querySelectorAll('.users_item');
  document.querySelector('.cells').innerHTML = '';
  for (let i = 0; i < users.length; i++) {
    createCell(users[i].getAttribute('data-user'));
  }
});
