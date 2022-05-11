import { createCells } from './users.js';
import { updateTasks } from './backlog.js';

const timeline = document.querySelector('.timeline_wrapper');
const prevBtn = document.querySelector('.timeline_btn--prev');
const nextBtn = document.querySelector('.timeline_btn--next');

const currentDate = new Date();
const options = { month: 'numeric', day: 'numeric' };
const today = currentDate.toLocaleString('ru', options);
let weekNumber = 0;

export const setWeek = (n = 0) => {
  const week = [];
  timeline.innerHTML = '';
  weekNumber += n;

  for (let i = 1; i <= 7; i++) {
    let date = document.createElement('div');
    let day = new Date();

    day.setDate(currentDate.getDate() - currentDate.getDay() + i + weekNumber);
    date.setAttribute(
      'data-date',
      day.toLocaleString('ru', { year: 'numeric', month: 'numeric', day: 'numeric' })
    );
    week.push(day.toLocaleString('ru', { year: 'numeric', month: 'numeric', day: 'numeric' }));

    day = day.toLocaleString('ru', options);
    day === today
      ? date.classList.add('timeline_item', 'timeline_item--today')
      : date.classList.add('timeline_item');
    date.innerText = day;

    timeline.append(date);
  }
  return week;
};

prevBtn.addEventListener('click', () => {
  setWeek(-7);
  const tasks = JSON.parse(sessionStorage.getItem('tasks'));
  const users = document.querySelectorAll('.users_item');
  document.querySelectorAll('.cells').forEach((i) => (i.innerHTML = ''));
  for (let i = 0; i < users.length; i++) {
    createCells(users[i].getAttribute('data-user'));
  }
  updateTasks(tasks);
});

nextBtn.addEventListener('click', () => {
  setWeek(7);
  const tasks = JSON.parse(sessionStorage.getItem('tasks'));
  const users = document.querySelectorAll('.users_item');
  document.querySelectorAll('.cells').forEach((i) => (i.innerHTML = ''));
  for (let i = 0; i < users.length; i++) {
    createCells(users[i].getAttribute('data-user'));
  }
  updateTasks(tasks);
});

timeline.addEventListener('click', (event) => {
  if (window.matchMedia('screen and (max-width: 768px)').matches) {
    const cells = document.querySelectorAll('.cells_item');
    const date =
      event.target.getAttribute('data-date') || event.target[0].getAttribute('data-date');
    cells.forEach((cell) => {
      cell.getAttribute('data-date') != date
        ? cell.classList.add('hidden')
        : cell.classList.remove('hidden');
    });
    document.querySelector('.header_subtitle').innerText = `Задачи на ${date}:`;
  }
});
