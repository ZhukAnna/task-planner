import { dragStart, dragEnd, insertMultipleTasks } from './dnd.js';

const backlogContainer = document.querySelector('.backlog_task-list');
const preloader = document.createElement('div');
preloader.classList.add('preloader');
preloader.innerHTML = '<div class="animated-background"></div>';
for (let i = 1; i < 15; i++) {
  backlogContainer.append(preloader.cloneNode(true));
}

async function getTasks() {
  const response = await fetch(
    'https://varankin_dev.elma365.ru/api/extensions/2a38760e-083a-4dd0-aebc-78b570bfd3c7/script/tasks'
  );

  if (!response.ok) {
    throw new Error(`Can't get tasks from server ${response.status}`);
  }

  const tasks = await response.json();
  sessionStorage.setItem('tasks', JSON.stringify(tasks));
  return tasks;
}
getTasks().catch((err) => {
  console.log(err.message);
});

getTasks().then((tasks) => {
  updateTasks(tasks);
});

export function updateTasks(tasks) {
  backlogContainer.innerHTML = '';
  return tasks.map((item) => {
    let task = document.createElement('div');
    task.classList.add('backlog_task');
    task.draggable = true;
    task.innerHTML = `
    ${item.subject}
    <div class="tooltip" data-start="${item.planStartDate}" data-end="${item.planEndDate}">
    </div>`;
    task.setAttribute('data-id', item.id);
    task.setAttribute('data-start', item.planStartDate);
    task.setAttribute('data-end', item.planEndDate);
    task.addEventListener('dragstart', dragStart);
    task.addEventListener('dragend', dragEnd);
    if (item.executor) {
      task.classList.add('task');
      const target = document.querySelectorAll(`.cells_item[data-user='${item.executor}']`);
      insertMultipleTasks(target, task);
    } else {
      backlogContainer.append(task);
    }
  });
}
